/**
 * Usage API Endpoint
 * 
 * GET /api/usage
 * 
 * Get current usage statistics and quota information.
 * Requires API key authentication.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { extractApiKey, validateApiKey } from '@/lib/api-keys/manager';

export async function GET(request: NextRequest) {
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
    
    const userId = await validateApiKey(apiKey);
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid or revoked API key' },
        { status: 401 }
      );
    }
    
    // 2. Get subscription details
    const supabase = await createClient();
    
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('tier, screenshots_included, screenshots_used, overage_rate')
      .eq('user_id', userId)
      .single();
    
    if (subError || !subscription) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      );
    }
    
    // 3. Get usage history (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { data: recentUsage, error: usageError } = await supabase
      .from('screenshot_usage')
      .select('created_at, format, file_size')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: false });
    
    if (usageError) {
      console.error('Failed to fetch usage history:', usageError);
    }
    
    // 4. Calculate statistics
    const remaining = Math.max(0, subscription.screenshots_included - subscription.screenshots_used);
    const percentUsed = subscription.screenshots_included > 0
      ? Math.round((subscription.screenshots_used / subscription.screenshots_included) * 100)
      : 0;
    
    const totalSize = (recentUsage || []).reduce((sum, u) => sum + (u.file_size || 0), 0);
    const avgSize = recentUsage && recentUsage.length > 0 
      ? Math.round(totalSize / recentUsage.length) 
      : 0;
    
    return NextResponse.json({
      tier: subscription.tier,
      quota: {
        included: subscription.screenshots_included,
        used: subscription.screenshots_used,
        remaining,
        percentUsed,
      },
      overage: {
        rate: subscription.overage_rate,
        currency: 'GBP',
      },
      usage: {
        last30Days: recentUsage?.length || 0,
        totalSize,
        averageSize: avgSize,
      },
      resetDate: getNextResetDate(),
    });
    
  } catch (error) {
    console.error('Usage API error:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch usage data' },
      { status: 500 }
    );
  }
}

/**
 * Calculate the next monthly reset date (1st of next month)
 */
function getNextResetDate(): string {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return nextMonth.toISOString();
}
