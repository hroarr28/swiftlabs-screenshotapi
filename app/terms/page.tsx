import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service | Screenshot API',
  description: 'Terms of Service for Screenshot API',
}

export default function TermsPage() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-blue-600">Legal</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-6 text-xl leading-8">
          Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="mt-10 max-w-2xl">
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            1. Acceptance of Terms
          </h2>
          <p className="mt-6">
            By accessing and using Screenshot API (&quot;the Service&quot;), you accept and agree to be
            bound by the terms and provision of this agreement. If you do not agree to these
            terms, please do not use the Service.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            2. Description of Service
          </h2>
          <p className="mt-6">
            Screenshot API provides an HTTP API endpoint for capturing screenshots of websites.
            The Service is provided on a subscription basis with usage-based pricing tiers.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            3. API Usage and Restrictions
          </h2>
          <p className="mt-6">You agree to:</p>
          <ul className="mt-4 space-y-2 list-disc pl-6">
            <li>Use the Service only for lawful purposes</li>
            <li>Not attempt to circumvent rate limits or usage quotas</li>
            <li>Not capture screenshots of websites that explicitly prohibit automated access</li>
            <li>Not use the Service to capture illegal, harmful, or inappropriate content</li>
            <li>Not resell or redistribute API access without written permission</li>
            <li>Keep your API keys secure and confidential</li>
          </ul>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            4. Billing and Payment
          </h2>
          <p className="mt-6">
            Subscription fees are billed monthly in advance. Usage beyond your plan&apos;s included
            quota will be charged at the overage rate specified in your pricing tier. All fees
            are non-refundable except as required by law.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            5. API Keys and Security
          </h2>
          <p className="mt-6">
            You are responsible for maintaining the confidentiality of your API keys. Any
            activity performed using your API keys is your responsibility. Notify us
            immediately if you suspect unauthorised use of your account.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            6. Service Availability
          </h2>
          <p className="mt-6">
            We strive to provide reliable service but do not guarantee 100% uptime. The Service
            is provided &quot;as is&quot; without warranties of any kind. We reserve the right to modify,
            suspend, or discontinue the Service at any time.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            7. Rate Limits
          </h2>
          <p className="mt-6">
            API requests are subject to rate limiting to ensure fair usage. Current limits are
            60 requests per minute per API key. Exceeding rate limits may result in temporary
            blocking or account suspension.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            8. Termination
          </h2>
          <p className="mt-6">
            We reserve the right to suspend or terminate your account if you violate these
            terms. You may cancel your subscription at any time through your account settings
            or the billing portal.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            9. Limitation of Liability
          </h2>
          <p className="mt-6">
            To the maximum extent permitted by law, we shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages arising from your use of
            the Service.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            10. Changes to Terms
          </h2>
          <p className="mt-6">
            We reserve the right to modify these terms at any time. Continued use of the
            Service after changes constitutes acceptance of the modified terms.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            11. Contact
          </h2>
          <p className="mt-6">
            For questions about these terms, please contact us at{' '}
            <a href="mailto:hello@swiftlabs.dev" className="text-blue-600 hover:text-blue-500">
              hello@swiftlabs.dev
            </a>
            .
          </p>

          <div className="mt-16 border-t border-gray-200 pt-8">
            <Link href="/" className="text-blue-600 hover:text-blue-500">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
