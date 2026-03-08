# Screenshot API Deployment Guide

## Quick Deploy

**Product:** Website screenshot API — HTTP endpoint to capture webpages as image/PDF  
**Pricing:** Usage-based £0.001/screenshot, £10/month base (20k included)  
**Stripe IDs:** prod_U6nDuX3bZfaQz3, price_1T8ZczCjlSeC9GYcXtWXimSR  
**GitHub:** https://github.com/hroarr28/swiftlabs-screenshotapi

---

## 1. Run Database Migrations

```bash
cd ~/projects/swiftlabs/projects/screenshotapi
cat supabase/migrations/*.sql
```

Copy output → paste into https://supabase.com/dashboard/project/ijejglwvvufgbgpwouus/sql/new

Verify tables created:
- `screenshotapi_api_keys`
- `screenshotapi_screenshots`
- `screenshotapi_usage`
- `screenshotapi_subscriptions`

---

## 2. Deploy to Vercel

```bash
cd ~/projects/swiftlabs/projects/screenshotapi
npm install
npm run build  # Verify zero errors
vercel --prod
```

**Environment variables:**
```env
NEXT_PUBLIC_SUPABASE_URL=<from .env.local>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<from .env.local>
SUPABASE_SERVICE_ROLE_KEY=<from .env.local>
STRIPE_SECRET_KEY=<from .env.local>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<from .env.local>
STRIPE_PRICE_ID=price_1T8ZczCjlSeC9GYcXtWXimSR
STRIPE_WEBHOOK_SECRET=<from Stripe dashboard>
NEXT_PUBLIC_APP_URL=https://screenshotapi.swiftlabs.dev
```

---

## 3. Configure Stripe Webhook

https://dashboard.stripe.com/test/webhooks → Add endpoint:
- URL: `https://screenshotapi.swiftlabs.dev/api/webhooks/stripe`
- Events: `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_*`
- Copy signing secret → update Vercel env var

---

## 4. Test API

```bash
# Generate API key in dashboard
export API_KEY="your_api_key"

# Test basic screenshot
curl "https://screenshotapi.swiftlabs.dev/api/screenshot?url=https://example.com&key=$API_KEY"

# Test with options
curl "https://screenshotapi.swiftlabs.dev/api/screenshot?url=https://example.com&key=$API_KEY&width=1920&height=1080&format=png&fullPage=true"

# Test PDF export
curl "https://screenshotapi.swiftlabs.dev/api/screenshot?url=https://example.com&key=$API_KEY&format=pdf" -o test.pdf
```

**Expected:** Image/PDF returned, usage tracked in database.

---

## 5. Monitor Usage

- Check dashboard for API call analytics
- Verify usage limits enforced (rate limiting)
- Test quota warnings when approaching limits
- Verify overage billing triggers correctly

---

## Post-Deployment

```bash
node ~/projects/swiftlabs/scripts/log-activity.mjs deploy builder screenshotapi "Deployed to https://screenshotapi.swiftlabs.dev"
```
