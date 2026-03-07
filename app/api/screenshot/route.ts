/**
 * Screenshot API Endpoint
 * 
 * POST /api/screenshot
 * 
 * Capture a screenshot of any webpage with customizable options.
 * Requires API key authentication via Bearer token.
 * 
 * Request body:
 * {
 *   "url": "https://example.com",
 *   "format": "png" | "jpeg" | "pdf",
 *   "width": 1280,
 *   "height": 720,
 *   "fullPage": false,
 *   "quality": 80,
 *   "delay": 0
 * }
 * 
 * Response: Binary image/pdf data with appropriate Content-Type header
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { extractApiKey, validateApiKey } from '@/lib/api-keys/manager';
import { captureScreenshot, type ScreenshotOptions } from '@/lib/screenshot/capture';

// Simple in-memory rate limiter for user IDs
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(userId: string): { success: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now();
  const limit = 60;
  const window = 60 * 1000; // 1 minute
  
  const current = rateLimitStore.get(userId);
  
  if (!current || current.resetTime < now) {
    rateLimitStore.set(userId, { count: 1, resetTime: now + window });
    return { success: true, limit, remaining: limit - 1, reset: now + window };
  }
  
  if (current.count >= limit) {
    return { success: false, limit, remaining: 0, reset: current.resetTime };
  }
  
  current.count++;
  return { success: true, limit, remaining: limit - current.count, reset: current.resetTime };
}

interface ScreenshotRequest {
  url: string;
  format?: 'png' | 'jpeg' | 'pdf';
  width?: number;
  height?: number;
  fullPage?: boolean;
  quality?: number;
  delay?: number;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Extract and validate API key
    const authHeader = request.headers.get('authorization');
    const apiKey = extractApiKey(authHeader);
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing API key. Include your key in the Authorization header as "Bearer YOUR_API_KEY"' },
        { status: 401 }
      );
    }
    
    // Validate API key and get user ID
    const userId = await validateApiKey(apiKey);
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid or revoked API key' },
        { status: 401 }
      );
    }
    
    // 2. Rate limiting
    const { success, limit, remaining, reset } = checkRateLimit(userId);
    
    if (!success) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          limit,
          remaining: 0,
          reset: new Date(reset).toISOString(),
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': reset.toString(),
            'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }
    
    // 3. Check usage quota
    const supabase = await createClient();
    
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('tier, screenshots_included, screenshots_used')
      .eq('user_id', userId)
      .single();
    
    if (subError || !subscription) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 403 }
      );
    }
    
    // Check if user has available screenshots
    if (subscription.screenshots_used >= subscription.screenshots_included) {
      return NextResponse.json(
        { 
          error: 'Screenshot quota exceeded',
          quota: {
            included: subscription.screenshots_included,
            used: subscription.screenshots_used,
            tier: subscription.tier,
          },
          message: 'Upgrade your plan to get more screenshots',
        },
        { status: 403 }
      );
    }
    
    // 4. Parse request body
    let body: ScreenshotRequest;
    
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    if (!body.url) {
      return NextResponse.json(
        { error: 'Missing required field: url' },
        { status: 400 }
      );
    }
    
    // 5. Capture screenshot
    const options: ScreenshotOptions = {
      url: body.url,
      format: body.format || 'png',
      width: body.width || 1280,
      height: body.height || 720,
      fullPage: body.fullPage ?? false,
      quality: body.quality || 80,
      delay: body.delay || 0,
      timeout: 30000, // 30s max
    };
    
    const result = await captureScreenshot(options);
    
    // 6. Track usage
    await Promise.all([
      // Increment usage counter
      supabase.rpc('increment_screenshot_usage', { p_user_id: userId }),
      
      // Log detailed usage
      supabase.from('screenshot_usage').insert({
        user_id: userId,
        url: body.url,
        format: result.format,
        viewport_width: options.width,
        viewport_height: options.height,
        full_page: options.fullPage,
        file_size: result.size,
        duration_ms: result.duration,
      }),
    ]);
    
    // 7. Return screenshot with appropriate headers
    const contentType = result.format === 'pdf' 
      ? 'application/pdf' 
      : `image/${result.format}`;
    
    const filename = `screenshot-${Date.now()}.${result.format}`;
    
    // Convert Buffer to Uint8Array for NextResponse
    return new NextResponse(new Uint8Array(result.buffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': result.size.toString(),
        'X-Screenshot-Duration': `${result.duration}ms`,
        'X-Screenshot-Format': result.format,
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      },
    });
    
  } catch (error) {
    console.error('Screenshot API error:', error);
    
    const message = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { error: 'Screenshot capture failed', details: message },
      { status: 500 }
    );
  }
}

// GET endpoint: Return API documentation
export async function GET() {
  return NextResponse.json({
    name: 'Screenshot API',
    version: '1.0.0',
    documentation: 'https://screenshotapi.swiftlabs.dev/docs',
    endpoint: '/api/screenshot',
    method: 'POST',
    authentication: 'Bearer token (API key)',
    rateLimit: '60 requests per minute',
    parameters: {
      url: {
        type: 'string',
        required: true,
        description: 'The URL to capture',
        example: 'https://example.com',
      },
      format: {
        type: 'string',
        required: false,
        default: 'png',
        options: ['png', 'jpeg', 'pdf'],
        description: 'Output format',
      },
      width: {
        type: 'number',
        required: false,
        default: 1280,
        min: 320,
        max: 3840,
        description: 'Viewport width in pixels',
      },
      height: {
        type: 'number',
        required: false,
        default: 720,
        min: 240,
        max: 2160,
        description: 'Viewport height in pixels',
      },
      fullPage: {
        type: 'boolean',
        required: false,
        default: false,
        description: 'Capture full scrollable page',
      },
      quality: {
        type: 'number',
        required: false,
        default: 80,
        min: 0,
        max: 100,
        description: 'JPEG quality (ignored for PNG/PDF)',
      },
      delay: {
        type: 'number',
        required: false,
        default: 0,
        min: 0,
        max: 10000,
        description: 'Delay in milliseconds before capture',
      },
    },
    examples: {
      basic: {
        description: 'Basic PNG screenshot',
        request: {
          url: 'https://example.com',
        },
      },
      fullPage: {
        description: 'Full page screenshot',
        request: {
          url: 'https://example.com',
          fullPage: true,
        },
      },
      mobile: {
        description: 'Mobile viewport (iPhone 14 Pro)',
        request: {
          url: 'https://example.com',
          width: 393,
          height: 852,
        },
      },
      pdf: {
        description: 'PDF export',
        request: {
          url: 'https://example.com',
          format: 'pdf',
        },
      },
    },
  });
}
