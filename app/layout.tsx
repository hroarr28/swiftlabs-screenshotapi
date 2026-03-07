import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://screenshotapi.vercel.app'),
  title: {
    default: 'Screenshot API — Website Screenshot Service',
    template: '%s | Screenshot API',
  },
  description:
    'Professional website screenshot API. Capture any webpage as PNG, JPEG, or PDF with a simple HTTP request. Custom viewport sizes, full-page screenshots, and more.',
  keywords: [
    'screenshot api',
    'website screenshot',
    'webpage capture',
    'screenshot service',
    'puppeteer api',
    'html to image',
    'web scraping',
    'screenshot tool',
  ],
  authors: [{ name: 'SwiftLabs' }],
  creator: 'SwiftLabs',
  publisher: 'SwiftLabs',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: '/',
    title: 'Screenshot API — Website Screenshot Service',
    description:
      'Professional website screenshot API. Capture any webpage as PNG, JPEG, or PDF with a simple HTTP request.',
    siteName: 'Screenshot API',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Screenshot API',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Screenshot API — Website Screenshot Service',
    description:
      'Professional website screenshot API. Capture any webpage as PNG, JPEG, or PDF with a simple HTTP request.',
    images: ['/og-image.png'],
    creator: '@swiftlabs',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
