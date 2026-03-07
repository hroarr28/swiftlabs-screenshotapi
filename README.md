# Screenshot API

A professional website screenshot API service built with Next.js, Puppeteer, and Supabase.

## Features

- 📸 **Multiple Formats** — PNG, JPEG, PDF
- ⚡ **Lightning Fast** — Puppeteer-powered rendering engine
- 🔐 **Secure Authentication** — API key-based authentication
- 📊 **Usage Analytics** — Track every request with detailed metrics
- 💳 **Usage-Based Pricing** — Free tier + paid plans with overage billing
- 🎨 **Customisable** — Custom viewport sizes, quality control, delays
- 🚀 **Production Ready** — Rate limiting, quota enforcement, error handling

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Screenshot Engine:** Puppeteer
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Payments:** Stripe
- **Hosting:** Vercel
- **Language:** TypeScript (strict mode)

## Pricing Tiers

| Tier | Price | Screenshots/Month | Overage Rate |
|------|-------|------------------|--------------|
| Free | £0 | 100 | — |
| Starter | £10 | 20,000 | £0.001 |
| Pro | £25 | 100,000 | £0.0005 |

## API Usage

### Authentication

All API requests require an API key sent via the `Authorization` header:

```bash
curl -X POST https://screenshotapi.example.com/api/screenshot \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "format": "png"
  }'
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `url` | string | required | Website URL to capture |
| `format` | string | `png` | Output format (`png`, `jpeg`, `pdf`) |
| `width` | number | `1920` | Viewport width (320-3840) |
| `height` | number | `1080` | Viewport height (320-3840) |
| `fullPage` | boolean | `false` | Capture full scrollable page |
| `quality` | number | `80` | JPEG quality (1-100) |
| `delay` | number | `0` | Delay before capture (ms, max 5000) |

### Response

- **Success (200):** Binary image/PDF data
- **Bad Request (400):** Invalid parameters
- **Unauthorized (401):** Invalid or missing API key
- **Payment Required (402):** Quota exceeded
- **Too Many Requests (429):** Rate limit exceeded

## Local Development

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account
- Stripe account (for payments)

### Setup

1. **Clone and install:**

```bash
cd screenshotapi
npm install
```

2. **Configure environment variables:**

Create `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL=your_customer_portal_url

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. **Run database migrations:**

```bash
# In Supabase SQL Editor, run:
# supabase/migrations/003_screenshot_api.sql
```

4. **Start development server:**

```bash
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
screenshotapi/
├── app/
│   ├── api/
│   │   ├── og/              # OG image generation
│   │   ├── screenshot/      # Main screenshot endpoint
│   │   └── usage/           # Quota check endpoint
│   ├── auth/
│   │   ├── callback/        # OAuth callback
│   │   ├── login/           # Login page
│   │   ├── logout/          # Logout action
│   │   └── signup/          # Registration page
│   ├── dashboard/
│   │   ├── api-keys/        # API key management
│   │   ├── settings/        # Account settings
│   │   └── page.tsx         # Dashboard overview
│   ├── docs/                # API documentation
│   ├── pricing/             # Pricing page
│   ├── privacy/             # Privacy policy
│   ├── terms/               # Terms of service
│   └── page.tsx             # Landing page
├── lib/
│   ├── api-keys/            # API key hashing and validation
│   ├── screenshot/          # Puppeteer screenshot service
│   └── supabase/            # Supabase client utilities
├── supabase/
│   └── migrations/          # Database schema
└── public/                  # Static assets
```

## Database Schema

### Tables

- **`api_keys`** — API key storage (hashed)
- **`screenshot_usage`** — Request logs and metrics
- **`subscriptions`** — User subscription details

### Row-Level Security (RLS)

All tables have RLS enabled. Users can only access their own data.

## Rate Limiting

- **60 requests/minute** per API key
- In-memory rate limiting (single-instance)
- Upgrade path to Redis (Upstash) for multi-instance scaling

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Security

- API keys are cryptographically hashed (SHA-256)
- Passwords hashed with bcrypt
- HTTPS/TLS encryption enforced
- Row-level security (RLS) on all database tables
- Rate limiting to prevent abuse
- CORS headers configured
- Environment variables for secrets

## Support

- **Email:** hello@swiftlabs.dev
- **Documentation:** `/docs`
- **Dashboard:** `/dashboard`

## License

Proprietary — SwiftLabs 2026
