# Screenshot API — Deployment Guide

Complete step-by-step guide to deploy Screenshot API to production.

## Prerequisites

Before deploying, ensure you have:

- [ ] GitHub account (for version control)
- [ ] Supabase account (database and auth)
- [ ] Stripe account (payments)
- [ ] Vercel account (hosting)
- [ ] Domain name (optional, can use Vercel subdomain)

---

## 1. Database Setup (Supabase)

### Create Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose **EU West (London)** region (for GDPR compliance)
4. Set a strong database password
5. Wait for project provisioning (~2 minutes)

### Run Migrations

1. Go to **SQL Editor** in Supabase dashboard
2. Copy contents of `supabase/migrations/003_screenshot_api.sql`
3. Paste and click "Run"
4. Verify tables created: `api_keys`, `screenshot_usage`, `subscriptions`

### Configure Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. **Disable email confirmation** for faster signup (or configure SMTP for production)
4. Set **Site URL** to your production domain (or Vercel preview URL temporarily)
5. Add **Redirect URLs**:
   - `https://yourdomain.com/auth/callback`
   - `https://yourdomain.vercel.app/auth/callback` (Vercel subdomain)

### Get API Keys

Go to **Settings** → **API** and copy:
- `Project URL` (NEXT_PUBLIC_SUPABASE_URL)
- `anon public` key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
- `service_role` key (SUPABASE_SERVICE_ROLE_KEY) — **keep secret!**

---

## 2. Payment Setup (Stripe)

### Create Account

1. Go to [stripe.com](https://stripe.com)
2. Complete business verification (required for live payments)
3. Switch to **Test Mode** for initial setup

### Create Products

Create 3 products in Stripe Dashboard:

**Starter Plan:**
- Name: Screenshot API — Starter
- Price: £10/month (recurring)
- Metadata: `tier=starter`, `screenshots_included=20000`, `overage_rate=0.001`

**Pro Plan:**
- Name: Screenshot API — Pro
- Price: £25/month (recurring)
- Metadata: `tier=pro`, `screenshots_included=100000`, `overage_rate=0.0005`

**Free Plan:**
- No Stripe product needed (handled in app logic)

### Configure Webhook

1. Go to **Developers** → **Webhooks**
2. Click "Add endpoint"
3. URL: `https://yourdomain.com/api/webhooks/stripe`
4. Events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy **Webhook signing secret** (STRIPE_WEBHOOK_SECRET)

### Create Customer Portal

1. Go to **Settings** → **Billing** → **Customer Portal**
2. Enable portal
3. Configure allowed features:
   - Cancel subscription
   - Update payment method
   - View invoices
4. Set branding (logo, colours)
5. Copy **Customer Portal URL** (NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL)

### Get API Keys

Go to **Developers** → **API keys**:
- Publishable key (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
- Secret key (STRIPE_SECRET_KEY) — **keep secret!**

---

## 3. GitHub Repository

### Create Repository

```bash
cd ~/projects/swiftlabs/products/screenshotapi
git remote add origin git@github.com:yourusername/screenshotapi.git
git branch -M main
git push -u origin main
```

### Set Repository to Private

1. Go to repository **Settings**
2. Scroll to **Danger Zone**
3. Click "Change visibility" → **Private**

---

## 4. Vercel Deployment

### Import Project

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Framework Preset: **Next.js** (auto-detected)
5. Root Directory: `./`
6. Build Command: `npm run build`
7. Output Directory: `.next`

### Configure Environment Variables

Add these in **Project Settings** → **Environment Variables**:

**Supabase:**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Stripe:**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL=https://billing.stripe.com/p/login/...
```

**Site:**
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

**Important:** Add environment variables to **all environments** (Production, Preview, Development)

### Deploy

1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Visit your deployed site (e.g., `screenshotapi.vercel.app`)

---

## 5. Custom Domain (Optional)

### Add Domain to Vercel

1. Go to **Project Settings** → **Domains**
2. Add your domain (e.g., `screenshotapi.com`)
3. Follow DNS configuration instructions
4. Wait for SSL certificate provisioning

### DNS Configuration (Cloudflare example)

Add these DNS records:

| Type | Name | Value | Proxy |
|------|------|-------|-------|
| CNAME | @ | cname.vercel-dns.com | No |
| CNAME | www | cname.vercel-dns.com | No |

### Update Environment Variables

Update `NEXT_PUBLIC_SITE_URL` to your custom domain:

```
NEXT_PUBLIC_SITE_URL=https://screenshotapi.com
```

Redeploy after changing environment variables.

---

## 6. Stripe Webhook Update

Once your domain is live:

1. Go to Stripe **Developers** → **Webhooks**
2. Update webhook endpoint URL to production domain
3. Verify webhook is receiving events (test by making a test purchase)

---

## 7. Switch Stripe to Live Mode

**Only after testing thoroughly:**

1. Complete Stripe business verification
2. Switch dashboard to **Live Mode**
3. Create live products (same as test products)
4. Create live webhook endpoint
5. Update environment variables with **live keys**:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...`
   - `STRIPE_SECRET_KEY=sk_live_...`
   - `STRIPE_WEBHOOK_SECRET=whsec_...` (live webhook)
6. Redeploy

---

## 8. Final Checks

Before going live, verify:

- [ ] All pages load without errors
- [ ] Signup → Login → Dashboard flow works
- [ ] API key creation works
- [ ] Screenshot API endpoint responds correctly
- [ ] Test Stripe checkout (use live card or test mode)
- [ ] Webhook receives events (check Stripe dashboard)
- [ ] Rate limiting works (test 60+ requests/minute)
- [ ] Quota enforcement works (exhaust free tier)
- [ ] Mobile responsive (test on phone)
- [ ] SEO meta tags present (view source on `/`)
- [ ] Terms and privacy pages load
- [ ] Customer portal link works (manage subscription)
- [ ] Logout works
- [ ] Settings page displays correctly
- [ ] Usage stats update after API calls

---

## 9. Monitoring

### Vercel

- Monitor deployment logs in Vercel dashboard
- Set up **Log Drains** for persistent logs
- Enable **Web Analytics** for traffic insights

### Supabase

- Check **Database** → **Logs** for query errors
- Monitor **Authentication** → **Users** for signup activity
- Set up **Database Webhooks** for real-time notifications

### Stripe

- Monitor **Payments** → **Overview** for revenue
- Check **Developers** → **Webhooks** for delivery failures
- Set up email alerts for failed payments

---

## 10. Scaling Considerations

### Rate Limiting

Current setup uses in-memory rate limiting (single instance). For multi-instance scaling:

1. Add Upstash Redis:
   ```bash
   npm install @upstash/redis
   ```
2. Update `lib/middleware/rate-limit.ts` to use Redis
3. Add Redis environment variables

### Screenshot Generation

Puppeteer can be memory-intensive. For high traffic:

1. Consider serverless screenshot service (e.g., Browserless, ScreenshotOne)
2. Or deploy Puppeteer to AWS Lambda with extra memory
3. Current setup handles ~100 requests/hour comfortably

### Database

Supabase free tier limits:
- 500 MB database size
- 2 GB bandwidth/month
- 50k monthly active users

Upgrade to **Pro plan** (£20/month) for production traffic.

---

## 11. Backup Strategy

### Database Backups

1. Enable **Point-in-Time Recovery** in Supabase (Pro plan)
2. Or set up daily pg_dump via cron:
   ```bash
   pg_dump $DATABASE_URL > backup-$(date +%F).sql
   ```

### Code Backups

GitHub is your source of truth. Ensure:
- Regular commits
- Protected main branch
- Pull request reviews for production changes

---

## 12. Post-Launch Tasks

- [ ] Set up Google Analytics (or Plausible for privacy-focused)
- [ ] Create status page (e.g., status.screenshotapi.com)
- [ ] Set up uptime monitoring (e.g., UptimeRobot, BetterUptime)
- [ ] Create API changelog page
- [ ] Write launch blog post
- [ ] Submit to Product Hunt, Hacker News, Reddit
- [ ] Create demo video for landing page
- [ ] Set up customer support (email, chat, or ticketing)
- [ ] Document common issues in FAQ
- [ ] Create example integrations (Node.js, Python, PHP repos)

---

## Support

Questions? Email hello@swiftlabs.dev

## Deployment Checklist

Use this checklist for each deployment:

- [ ] Run `npm run build` locally (zero errors)
- [ ] Test all critical user flows
- [ ] Update `CHANGELOG.md`
- [ ] Commit changes with clear message
- [ ] Push to GitHub
- [ ] Verify Vercel auto-deploy succeeds
- [ ] Test production site
- [ ] Monitor logs for 10 minutes
- [ ] Announce changes (if customer-facing)

---

**Last updated:** March 2026
