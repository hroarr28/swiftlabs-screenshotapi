import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | Screenshot API',
  description: 'Privacy Policy for Screenshot API',
}

export default function PrivacyPage() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-blue-600">Legal</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-xl leading-8">
          Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="mt-10 max-w-2xl">
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            1. Information We Collect
          </h2>
          <p className="mt-6">
            We collect information you provide directly to us, including:
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-6">
            <li>
              <strong>Account Information:</strong> Email address, password (hashed), and account
              creation date
            </li>
            <li>
              <strong>Usage Data:</strong> API requests (URL captured, timestamp, format, file
              size, response time)
            </li>
            <li>
              <strong>Payment Information:</strong> Processed securely by Stripe (we do not store
              credit card details)
            </li>
            <li>
              <strong>API Keys:</strong> Cryptographically hashed API keys for authentication
            </li>
          </ul>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            2. How We Use Your Information
          </h2>
          <p className="mt-6">We use the information we collect to:</p>
          <ul className="mt-4 space-y-2 list-disc pl-6">
            <li>Provide, maintain, and improve the Service</li>
            <li>Process your payments and manage your subscription</li>
            <li>Monitor usage and enforce quota limits</li>
            <li>Send service-related communications (downtime, updates, billing)</li>
            <li>Detect and prevent abuse or fraudulent activity</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            3. Data Storage and Security
          </h2>
          <p className="mt-6">
            Your data is stored securely using industry-standard practices:
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-6">
            <li>Database hosted on Supabase (EU West London region)</li>
            <li>API keys are cryptographically hashed (never stored in plain text)</li>
            <li>Passwords are hashed using bcrypt</li>
            <li>All connections use HTTPS/TLS encryption</li>
            <li>Regular security updates and monitoring</li>
          </ul>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            4. Screenshot Data
          </h2>
          <p className="mt-6">
            Screenshots captured via the API are <strong>not stored</strong> on our servers. They
            are generated on-demand and returned directly to you. We only log metadata (URL,
            timestamp, file size, format) for usage tracking and billing purposes.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            5. Data Retention
          </h2>
          <p className="mt-6">We retain your data as follows:</p>
          <ul className="mt-4 space-y-2 list-disc pl-6">
            <li>
              <strong>Account data:</strong> Retained while your account is active
            </li>
            <li>
              <strong>Usage logs:</strong> Retained for 12 months for billing and analytics
            </li>
            <li>
              <strong>Payment records:</strong> Retained as required by tax law (typically 7
              years)
            </li>
          </ul>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            6. Third-Party Services
          </h2>
          <p className="mt-6">We use the following third-party services:</p>
          <ul className="mt-4 space-y-2 list-disc pl-6">
            <li>
              <strong>Supabase:</strong> Database and authentication (EU West London)
            </li>
            <li>
              <strong>Stripe:</strong> Payment processing (PCI DSS compliant)
            </li>
            <li>
              <strong>Vercel:</strong> Application hosting (auto-scaling infrastructure)
            </li>
          </ul>
          <p className="mt-4">
            These services have their own privacy policies and security practices. We do not
            share your data with third parties for marketing purposes.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            7. Your Rights (GDPR)
          </h2>
          <p className="mt-6">
            If you are in the European Economic Area, you have the following rights:
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-6">
            <li>
              <strong>Access:</strong> Request a copy of your data
            </li>
            <li>
              <strong>Correction:</strong> Update incorrect or incomplete data
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your account and data
            </li>
            <li>
              <strong>Portability:</strong> Receive your data in a machine-readable format
            </li>
            <li>
              <strong>Object:</strong> Object to processing of your data
            </li>
          </ul>
          <p className="mt-4">
            To exercise these rights, contact us at{' '}
            <a
              href="mailto:hello@swiftlabs.dev"
              className="text-blue-600 hover:text-blue-500"
            >
              hello@swiftlabs.dev
            </a>
            .
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            8. Cookies
          </h2>
          <p className="mt-6">
            We use essential cookies for authentication (session management). We do not use
            tracking or advertising cookies. You can disable cookies in your browser, but this
            will prevent you from logging in.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            9. Children&apos;s Privacy
          </h2>
          <p className="mt-6">
            The Service is not intended for users under 18 years of age. We do not knowingly
            collect data from children. If you become aware that a child has provided us with
            personal information, please contact us.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            10. Changes to This Policy
          </h2>
          <p className="mt-6">
            We may update this privacy policy from time to time. We will notify you of material
            changes by email or via the Service. Continued use after changes constitutes
            acceptance.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            11. Contact Us
          </h2>
          <p className="mt-6">
            For questions about this privacy policy or to exercise your rights, contact:
          </p>
          <p className="mt-4">
            Email:{' '}
            <a
              href="mailto:hello@swiftlabs.dev"
              className="text-blue-600 hover:text-blue-500"
            >
              hello@swiftlabs.dev
            </a>
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
