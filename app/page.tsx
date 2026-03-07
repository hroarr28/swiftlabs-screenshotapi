/**
 * Screenshot API Landing Page
 */

import Link from 'next/link';
import { Code2, Zap, Shield, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-xl">Screenshot API</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/docs" className="text-sm hover:text-blue-600">
              Docs
            </Link>
            <Link href="/pricing" className="text-sm hover:text-blue-600">
              Pricing
            </Link>
            <Link href="/auth/login" className="text-sm hover:text-blue-600">
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Start Free
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Website Screenshot API <br />
            <span className="text-blue-600">Simple. Fast. Reliable.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Capture perfect screenshots of any webpage with a single HTTP request. 
            PNG, JPEG, or PDF. Custom viewport sizes. Full-page screenshots.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
            >
              Start Free Trial
            </Link>
            <Link
              href="/docs"
              className="border border-gray-300 px-8 py-3 rounded-lg text-lg font-semibold hover:border-gray-400"
            >
              Read Docs
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            100 screenshots free every month. No credit card required.
          </p>
        </div>
      </section>

      {/* Code Example */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              Get started in seconds
            </h2>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-gray-100">
                <code>{`curl -X POST https://screenshotapi.swiftlabs.dev/api/screenshot \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com",
    "format": "png",
    "width": 1280,
    "height": 720,
    "fullPage": false
  }' \\
  --output screenshot.png`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need in a screenshot API
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Code2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Multiple Formats</h3>
            <p className="text-sm text-gray-600">
              PNG, JPEG, or PDF. Choose the format that works for your use case.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-600">
              Average response time under 3 seconds. Optimized infrastructure.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Secure & Private</h3>
            <p className="text-sm text-gray-600">
              Your screenshots are never stored. Deleted immediately after delivery.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Usage Analytics</h3>
            <p className="text-sm text-gray-600">
              Track your API usage, monitor quotas, and optimize costs.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Built for developers
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-semibold mb-2">Website Monitoring</h3>
              <p className="text-sm text-gray-600">
                Capture visual snapshots of your sites for monitoring and archiving.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-semibold mb-2">Social Media</h3>
              <p className="text-sm text-gray-600">
                Generate preview images for link sharing on Twitter, Facebook, LinkedIn.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-semibold mb-2">Testing & QA</h3>
              <p className="text-sm text-gray-600">
                Automated visual regression testing across different viewports.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-sm text-gray-600">
                Generate screenshots for user guides, tutorials, and help docs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-semibold mb-2">Reports & PDFs</h3>
              <p className="text-sm text-gray-600">
                Embed webpage screenshots in automated reports and PDF exports.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-semibold mb-2">Lead Generation</h3>
              <p className="text-sm text-gray-600">
                Show previews of customer websites in your SaaS product.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center bg-blue-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to start capturing screenshots?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get 100 screenshots free every month. No credit card required.
          </p>
          <Link
            href="/auth/signup"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              © 2026 SwiftLabs. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/terms" className="hover:text-gray-900">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-gray-900">
                Privacy
              </Link>
              <Link href="mailto:hello@swiftlabs.dev" className="hover:text-gray-900">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
