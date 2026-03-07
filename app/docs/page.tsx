/**
 * API Documentation Page
 */

import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-xl">Screenshot API</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/docs" className="text-sm font-semibold text-blue-600">
              Docs
            </Link>
            <Link href="/pricing" className="text-sm hover:text-blue-600">
              Pricing
            </Link>
            <Link href="/dashboard" className="text-sm hover:text-blue-600">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
          <p className="text-xl text-gray-600 mb-12">
            Everything you need to integrate Screenshot API into your application.
          </p>
          
          {/* Quick Start */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-4">
              <pre className="text-sm text-gray-100">
                <code>{`curl -X POST https://screenshotapi.swiftlabs.dev/api/screenshot \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com"
  }' \\
  --output screenshot.png`}</code>
              </pre>
            </div>
            <p className="text-gray-600">
              Get your API key from the{' '}
              <Link href="/dashboard/api-keys" className="text-blue-600 hover:underline">
                dashboard
              </Link>
              .
            </p>
          </section>
          
          {/* Authentication */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Authentication</h2>
            <p className="mb-4 text-gray-700">
              All API requests require authentication using a Bearer token in the Authorization header:
            </p>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-gray-100">
                <code>Authorization: Bearer sk_live_your_api_key_here</code>
              </pre>
            </div>
          </section>
          
          {/* Endpoint */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Endpoint</h2>
            <div className="border rounded-lg p-6 bg-white mb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">POST</span>
                <code className="text-lg">/api/screenshot</code>
              </div>
              <p className="text-gray-600">
                Capture a screenshot of any webpage with customizable options.
              </p>
            </div>
            
            <h3 className="text-xl font-semibold mb-3">Request Body</h3>
            <div className="border rounded-lg overflow-hidden mb-6">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Parameter</th>
                    <th className="text-left p-4 font-semibold">Type</th>
                    <th className="text-left p-4 font-semibold">Required</th>
                    <th className="text-left p-4 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-4"><code>url</code></td>
                    <td className="p-4 text-sm">string</td>
                    <td className="p-4 text-sm">✓</td>
                    <td className="p-4 text-sm">The URL to capture</td>
                  </tr>
                  <tr>
                    <td className="p-4"><code>format</code></td>
                    <td className="p-4 text-sm">string</td>
                    <td className="p-4 text-sm">—</td>
                    <td className="p-4 text-sm">Output format: <code>png</code>, <code>jpeg</code>, or <code>pdf</code> (default: <code>png</code>)</td>
                  </tr>
                  <tr>
                    <td className="p-4"><code>width</code></td>
                    <td className="p-4 text-sm">number</td>
                    <td className="p-4 text-sm">—</td>
                    <td className="p-4 text-sm">Viewport width in pixels (default: 1280, min: 320, max: 3840)</td>
                  </tr>
                  <tr>
                    <td className="p-4"><code>height</code></td>
                    <td className="p-4 text-sm">number</td>
                    <td className="p-4 text-sm">—</td>
                    <td className="p-4 text-sm">Viewport height in pixels (default: 720, min: 240, max: 2160)</td>
                  </tr>
                  <tr>
                    <td className="p-4"><code>fullPage</code></td>
                    <td className="p-4 text-sm">boolean</td>
                    <td className="p-4 text-sm">—</td>
                    <td className="p-4 text-sm">Capture full scrollable page (default: <code>false</code>)</td>
                  </tr>
                  <tr>
                    <td className="p-4"><code>quality</code></td>
                    <td className="p-4 text-sm">number</td>
                    <td className="p-4 text-sm">—</td>
                    <td className="p-4 text-sm">JPEG quality 0-100 (default: 80, ignored for PNG/PDF)</td>
                  </tr>
                  <tr>
                    <td className="p-4"><code>delay</code></td>
                    <td className="p-4 text-sm">number</td>
                    <td className="p-4 text-sm">—</td>
                    <td className="p-4 text-sm">Wait time in ms before capture (default: 0, max: 10000)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h3 className="text-xl font-semibold mb-3">Response</h3>
            <p className="mb-4 text-gray-700">
              Returns binary image or PDF data with appropriate headers. Status codes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li><code>200</code> — Success, screenshot returned</li>
              <li><code>400</code> — Invalid request parameters</li>
              <li><code>401</code> — Missing or invalid API key</li>
              <li><code>403</code> — Quota exceeded</li>
              <li><code>429</code> — Rate limit exceeded (60 requests/minute)</li>
              <li><code>500</code> — Server error</li>
            </ul>
          </section>
          
          {/* Code Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Code Examples</h2>
            
            <h3 className="text-xl font-semibold mb-3">cURL</h3>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
              <pre className="text-sm text-gray-100">
                <code>{`# Basic screenshot
curl -X POST https://screenshotapi.swiftlabs.dev/api/screenshot \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com"}' \\
  --output screenshot.png

# Full page screenshot
curl -X POST https://screenshotapi.swiftlabs.dev/api/screenshot \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com",
    "fullPage": true
  }' \\
  --output fullpage.png

# Mobile viewport (iPhone 14 Pro)
curl -X POST https://screenshotapi.swiftlabs.dev/api/screenshot \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com",
    "width": 393,
    "height": 852
  }' \\
  --output mobile.png

# PDF export
curl -X POST https://screenshotapi.swiftlabs.dev/api/screenshot \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com",
    "format": "pdf"
  }' \\
  --output page.pdf`}</code>
              </pre>
            </div>
            
            <h3 className="text-xl font-semibold mb-3">JavaScript / Node.js</h3>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
              <pre className="text-sm text-gray-100">
                <code>{`const fs = require('fs');

const API_KEY = 'YOUR_API_KEY';
const API_URL = 'https://screenshotapi.swiftlabs.dev/api/screenshot';

async function captureScreenshot(url, options = {}) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      ...options,
    }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Screenshot failed');
  }
  
  return response.arrayBuffer();
}

// Basic usage
captureScreenshot('https://example.com')
  .then(buffer => {
    fs.writeFileSync('screenshot.png', Buffer.from(buffer));
    console.log('Screenshot saved!');
  })
  .catch(err => console.error('Error:', err));

// Full page screenshot
captureScreenshot('https://example.com', { fullPage: true })
  .then(buffer => fs.writeFileSync('fullpage.png', Buffer.from(buffer)));

// PDF export
captureScreenshot('https://example.com', { format: 'pdf' })
  .then(buffer => fs.writeFileSync('page.pdf', Buffer.from(buffer)));`}</code>
              </pre>
            </div>
            
            <h3 className="text-xl font-semibold mb-3">Python</h3>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
              <pre className="text-sm text-gray-100">
                <code>{`import requests

API_KEY = 'YOUR_API_KEY'
API_URL = 'https://screenshotapi.swiftlabs.dev/api/screenshot'

def capture_screenshot(url, **options):
    response = requests.post(
        API_URL,
        headers={
            'Authorization': f'Bearer {API_KEY}',
            'Content-Type': 'application/json',
        },
        json={
            'url': url,
            **options
        }
    )
    
    response.raise_for_status()
    return response.content

# Basic usage
screenshot = capture_screenshot('https://example.com')
with open('screenshot.png', 'wb') as f:
    f.write(screenshot)

# Full page screenshot
screenshot = capture_screenshot('https://example.com', fullPage=True)
with open('fullpage.png', 'wb') as f:
    f.write(screenshot)

# PDF export
pdf = capture_screenshot('https://example.com', format='pdf')
with open('page.pdf', 'wb') as f:
    f.write(pdf)`}</code>
              </pre>
            </div>
            
            <h3 className="text-xl font-semibold mb-3">PHP</h3>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
              <pre className="text-sm text-gray-100">
                <code>{`<?php

$apiKey = 'YOUR_API_KEY';
$apiUrl = 'https://screenshotapi.swiftlabs.dev/api/screenshot';

function captureScreenshot($url, $options = []) {
    global $apiKey, $apiUrl;
    
    $data = array_merge(['url' => $url], $options);
    
    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        throw new Exception('Screenshot failed');
    }
    
    return $result;
}

// Basic usage
$screenshot = captureScreenshot('https://example.com');
file_put_contents('screenshot.png', $screenshot);

// Full page screenshot
$screenshot = captureScreenshot('https://example.com', ['fullPage' => true]);
file_put_contents('fullpage.png', $screenshot);

// PDF export
$pdf = captureScreenshot('https://example.com', ['format' => 'pdf']);
file_put_contents('page.pdf', $pdf);`}</code>
              </pre>
            </div>
          </section>
          
          {/* Rate Limits */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Rate Limits</h2>
            <p className="mb-4 text-gray-700">
              All plans have a rate limit of <strong>60 requests per minute</strong> per API key.
            </p>
            <p className="mb-4 text-gray-700">
              Rate limit information is included in response headers:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li><code>X-RateLimit-Limit</code> — Total requests allowed per window</li>
              <li><code>X-RateLimit-Remaining</code> — Requests remaining in current window</li>
              <li><code>X-RateLimit-Reset</code> — Timestamp when the limit resets</li>
            </ul>
          </section>
          
          {/* Common Presets */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Common Viewport Sizes</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded p-4">
                <h3 className="font-semibold mb-2">Desktop</h3>
                <ul className="text-sm space-y-1">
                  <li>Full HD: <code>1920×1080</code></li>
                  <li>Laptop: <code>1366×768</code></li>
                  <li>Default: <code>1280×720</code></li>
                </ul>
              </div>
              <div className="border rounded p-4">
                <h3 className="font-semibold mb-2">Mobile</h3>
                <ul className="text-sm space-y-1">
                  <li>iPhone 14 Pro: <code>393×852</code></li>
                  <li>iPhone SE: <code>375×667</code></li>
                  <li>Pixel 7: <code>412×915</code></li>
                </ul>
              </div>
              <div className="border rounded p-4">
                <h3 className="font-semibold mb-2">Tablet</h3>
                <ul className="text-sm space-y-1">
                  <li>iPad Pro: <code>1024×1366</code></li>
                  <li>iPad: <code>768×1024</code></li>
                </ul>
              </div>
              <div className="border rounded p-4">
                <h3 className="font-semibold mb-2">Social Media</h3>
                <ul className="text-sm space-y-1">
                  <li>OG Image: <code>1200×630</code></li>
                  <li>Twitter Card: <code>1200×600</code></li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* Support */}
          <section className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
            <p className="text-gray-700 mb-4">
              If you have questions or need assistance, we're here to help:
            </p>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hello@swiftlabs.dev" className="text-blue-600 hover:underline">
                  Email Support: hello@swiftlabs.dev
                </a>
              </li>
              <li>
                <Link href="/dashboard" className="text-blue-600 hover:underline">
                  Dashboard
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
