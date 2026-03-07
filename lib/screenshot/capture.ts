/**
 * Screenshot Capture Service
 * 
 * Handles webpage screenshots using Puppeteer with support for:
 * - Multiple formats (PNG, JPEG, PDF)
 * - Custom viewport sizes
 * - Full page or viewport-only capture
 * - Mobile emulation
 */

import puppeteer, { type Browser } from 'puppeteer';

export type ScreenshotFormat = 'png' | 'jpeg' | 'pdf';

export interface ScreenshotOptions {
  url: string;
  format?: ScreenshotFormat;
  width?: number;
  height?: number;
  fullPage?: boolean;
  quality?: number; // 0-100, only for JPEG
  delay?: number; // Wait time in ms before capturing
  timeout?: number; // Max time to wait for page load (ms)
}

export interface ScreenshotResult {
  buffer: Buffer;
  format: ScreenshotFormat;
  size: number; // bytes
  duration: number; // ms
  url: string;
}

// Browser instance pool (reuse for performance)
let browserInstance: Browser | null = null;

/**
 * Get or create a Puppeteer browser instance
 * Reuses existing browser for better performance
 */
async function getBrowser(): Promise<Browser> {
  if (!browserInstance || !browserInstance.connected) {
    browserInstance = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage', // Overcome limited resource problems
        '--disable-gpu',
        '--no-first-run',
        '--no-zygote',
        '--single-process', // Required for some hosting environments
      ],
    });
  }
  return browserInstance;
}

/**
 * Validate URL format
 */
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Capture a screenshot of a webpage
 * 
 * @param options Screenshot configuration
 * @returns Screenshot buffer and metadata
 * @throws Error if URL is invalid or screenshot fails
 */
export async function captureScreenshot(
  options: ScreenshotOptions
): Promise<ScreenshotResult> {
  const startTime = Date.now();
  
  // Validate URL
  if (!isValidUrl(options.url)) {
    throw new Error('Invalid URL. Must start with http:// or https://');
  }
  
  // Defaults
  const format = options.format || 'png';
  const width = options.width || 1280;
  const height = options.height || 720;
  const fullPage = options.fullPage ?? false;
  const quality = options.quality || 80;
  const delay = options.delay || 0;
  const timeout = options.timeout || 30000; // 30s default
  
  // Validate dimensions
  if (width < 320 || width > 3840) {
    throw new Error('Width must be between 320 and 3840 pixels');
  }
  if (height < 240 || height > 2160) {
    throw new Error('Height must be between 240 and 2160 pixels');
  }
  
  const browser = await getBrowser();
  const page = await browser.newPage();
  
  try {
    // Set viewport
    await page.setViewport({ width, height });
    
    // Set timeout
    page.setDefaultTimeout(timeout);
    
    // Navigate to URL
    await page.goto(options.url, {
      waitUntil: 'networkidle0', // Wait until no network connections for 500ms
      timeout,
    });
    
    // Additional delay if requested (for animations, lazy loading, etc.)
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    let buffer: Buffer;
    
    if (format === 'pdf') {
      // PDF generation
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px',
        },
      });
      buffer = Buffer.from(pdfBuffer);
    } else {
      // Image screenshot (PNG or JPEG)
      const screenshotBuffer = await page.screenshot({
        type: format,
        fullPage,
        quality: format === 'jpeg' ? quality : undefined,
      });
      buffer = Buffer.from(screenshotBuffer);
    }
    
    const duration = Date.now() - startTime;
    
    return {
      buffer,
      format,
      size: buffer.length,
      duration,
      url: options.url,
    };
    
  } catch (error) {
    if (error instanceof Error) {
      // Handle common errors
      if (error.message.includes('timeout')) {
        throw new Error(`Page load timeout after ${timeout}ms. The website may be slow or unresponsive.`);
      }
      if (error.message.includes('net::ERR')) {
        throw new Error('Failed to load page. The website may be down or blocking automated access.');
      }
      throw new Error(`Screenshot failed: ${error.message}`);
    }
    throw new Error('Screenshot failed with unknown error');
  } finally {
    await page.close();
  }
}

/**
 * Cleanup function to close browser
 * Call this on server shutdown
 */
export async function closeBrowser(): Promise<void> {
  if (browserInstance) {
    await browserInstance.close();
    browserInstance = null;
  }
}

/**
 * Preset viewport sizes for common devices
 */
export const VIEWPORT_PRESETS = {
  // Desktop
  desktop: { width: 1920, height: 1080 },
  laptop: { width: 1366, height: 768 },
  
  // Tablets
  ipad_pro: { width: 1024, height: 1366 },
  ipad: { width: 768, height: 1024 },
  
  // Mobile
  iphone_14_pro: { width: 393, height: 852 },
  iphone_se: { width: 375, height: 667 },
  pixel_7: { width: 412, height: 915 },
  
  // Social media OG images
  og_image: { width: 1200, height: 630 },
  twitter_card: { width: 1200, height: 600 },
} as const;

/**
 * Common format presets
 */
export const FORMAT_PRESETS = {
  thumbnail: {
    format: 'jpeg' as const,
    width: 400,
    height: 300,
    quality: 70,
  },
  preview: {
    format: 'png' as const,
    width: 800,
    height: 600,
  },
  full: {
    format: 'png' as const,
    width: 1920,
    height: 1080,
    fullPage: true,
  },
  pdf_document: {
    format: 'pdf' as const,
    width: 1280,
    height: 720,
  },
} as const;
