/**
 * Pricing Page
 */

import Link from 'next/link';
import { Check } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-xl">Screenshot API</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/docs" className="text-sm hover:text-blue-600">
              Docs
            </Link>
            <Link href="/pricing" className="text-sm font-semibold text-blue-600">
              Pricing
            </Link>
            <Link href="/auth/login" className="text-sm hover:text-blue-600">
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Start free with 100 screenshots per month. Scale as you grow with pay-as-you-go pricing.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free */}
          <div className="border rounded-lg p-8">
            <h3 className="text-xl font-bold mb-2">Free</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">£0</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">100 screenshots/month</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">PNG, JPEG, PDF formats</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Custom viewport sizes</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Full-page screenshots</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">30-second timeout</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Basic support</span>
              </li>
            </ul>
            <Link
              href="/auth/signup"
              className="block w-full text-center border border-gray-300 px-4 py-2 rounded-lg font-semibold hover:border-gray-400"
            >
              Start Free
            </Link>
          </div>

          {/* Starter - Most Popular */}
          <div className="border-2 border-blue-600 rounded-lg p-8 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>
            <h3 className="text-xl font-bold mb-2">Starter</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">£10</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold">20,000 screenshots/month</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">£0.001 per extra screenshot</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">All Free features</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Priority support</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Usage analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Multiple API keys</span>
              </li>
            </ul>
            <Link
              href="/auth/signup"
              className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              Start 14-Day Trial
            </Link>
          </div>

          {/* Pro */}
          <div className="border rounded-lg p-8">
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">£25</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold">100,000 screenshots/month</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">£0.0005 per extra screenshot</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">All Starter features</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">60-second timeout</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Dedicated support</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">99.9% SLA uptime</span>
              </li>
            </ul>
            <Link
              href="/auth/signup"
              className="block w-full text-center border border-gray-300 px-4 py-2 rounded-lg font-semibold hover:border-gray-400"
            >
              Start 14-Day Trial
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="font-semibold mb-2">What happens if I exceed my monthly quota?</h3>
              <p className="text-gray-600">
                On the Free plan, API requests will return a 403 error when you hit the limit. 
                On paid plans, you'll be charged the overage rate for each additional screenshot.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Do unused screenshots roll over?</h3>
              <p className="text-gray-600">
                No, screenshot quotas reset on the 1st of each month. They don't accumulate.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. You'll continue to have access 
                until the end of your billing period.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Do you store the screenshots?</h3>
              <p className="text-gray-600">
                No, screenshots are generated on-demand and deleted immediately after delivery. 
                We don't store any of your screenshots.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">What are the rate limits?</h3>
              <p className="text-gray-600">
                All plans have a rate limit of 60 requests per minute per API key. 
                Contact us if you need higher limits.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Can I get a refund?</h3>
              <p className="text-gray-600">
                We offer a 14-day money-back guarantee. If you're not satisfied, contact us 
                within 14 days of your first payment for a full refund.
              </p>
            </div>
          </div>
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
