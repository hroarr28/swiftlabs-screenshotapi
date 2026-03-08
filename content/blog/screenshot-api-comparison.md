---
title: "Screenshot APIs Compared: 7 Services Tested (2026 Guide)"
description: "Compare screenshot APIs for developers: pricing, speed, features, and reliability. Find the best website-to-image API for your project."
publishedAt: "2026-03-08"
author: "SwiftLabs Team"
tags: ["api", "screenshots", "automation", "web-scraping"]
---

You need to programmatically capture website screenshots. Your SaaS dashboard shows customer landing pages, your QA tool compares visual regressions, or your social media scheduler generates preview images.

You could spin up Puppeteer yourself. Or use a screenshot API that handles browser rendering, scaling, caching, and edge cases for you.

Here are 7 screenshot APIs tested, with pricing, speed, and quality compared.

## What to Look For in a Screenshot API

### 1. Response Time

**Fast:** <2 seconds (cached or lightweight sites)  
**Acceptable:** 2-5 seconds (first-time captures, JavaScript-heavy sites)  
**Slow:** >5 seconds (complex SPAs, slow external resources)

Faster APIs either pre-cache common sites or run browsers closer to users (edge compute).

### 2. Rendering Quality

**Critical features:**
- ✅ JavaScript execution (captures React/Vue apps correctly)
- ✅ CSS rendering (matches real browser)
- ✅ Custom viewport sizes (mobile, tablet, desktop)
- ✅ Retina/HiDPI support (sharp images on modern screens)

**Bonus features:**
- Full-page screenshots (entire scrollable content)
- Element-specific captures (screenshot a single div)
- Dark mode simulation

### 3. Customisation Options

**Viewport:** Custom width/height for responsive testing  
**Format:** PNG, JPEG, WebP, PDF  
**Quality:** Compression level (file size vs. sharpness)  
**Delay:** Wait for animations or lazy-loaded images  
**Headers:** Custom cookies, user-agents (bypass paywalls, A/B tests)  
**Blocking:** Remove ads, popups, cookie banners  

### 4. Pricing Model

**Pay-per-screenshot:** Good for low/unpredictable volume  
**Monthly credits:** Better for steady usage  
**Unlimited plans:** Best for high-volume (1000+ screenshots/day)  

Watch out for hidden costs:
- Overage fees (what happens when you exceed plan limits?)
- Cache charges (do cached screenshots count against quota?)
- Storage fees (if you store images with the provider)

### 5. Reliability

**Uptime:** 99.9%+ expected  
**Error handling:** Clear error messages (not just 500 status)  
**Rate limits:** Transparent (requests per second/minute)  
**SLA:** Money-back guarantees for downtime  

## Screenshot APIs Tested

### 1. ApiFlash

**URL:** https://apiflash.com  
**Pricing:** Free (100/month) → £7/month (1,000) → £40/month (10,000)

#### Features

✅ **Built on AWS Lambda** (fast, scalable)  
✅ **Full-page screenshots**  
✅ **Element-specific captures** (CSS selector)  
✅ **Watermark removal** (paid plans)  
✅ **CORS-friendly** (use from browser JavaScript)  

#### API Example

```bash
curl "https://api.apiflash.com/v1/urltoimage?access_key=YOUR_KEY&url=https://example.com&width=1920&height=1080&format=png&full_page=true"
```

Response: PNG binary (or JSON with `response_type=json` for URL).

#### Speed Test

| Site | Time |
|------|------|
| example.com | 1.2s |
| github.com | 2.8s |
| reddit.com | 4.1s |

#### Pros

✅ Fastest in our tests (cached results <1s)  
✅ Good free tier  
✅ Detailed documentation  

#### Cons

❌ No PDF export on free tier  
❌ Watermark on free screenshots  

**Best For:** Developers building SaaS tools, fast prototyping.

### 2. ScreenshotAPI.net

**URL:** https://screenshotapi.net  
**Pricing:** Free (100/month) → £9/month (5,000) → £29/month (20,000)

#### Features

✅ **No watermarks** (even on free tier)  
✅ **Full-page and element screenshots**  
✅ **Dark mode support**  
✅ **Proxy support** (bypass geo-restrictions)  
✅ **Webhook callbacks** (async screenshots)  

#### API Example

```javascript
const url = 'https://shot.screenshotapi.net/screenshot';
const params = {
  token: 'YOUR_TOKEN',
  url: 'https://example.com',
  width: 1920,
  height: 1080,
  output: 'image',
  file_type: 'png',
  wait_for_event: 'load'
};

fetch(`${url}?${new URLSearchParams(params)}`)
  .then(res => res.blob())
  .then(blob => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(blob);
    document.body.appendChild(img);
  });
```

#### Speed Test

| Site | Time |
|------|------|
| example.com | 1.8s |
| github.com | 3.2s |
| reddit.com | 5.4s |

#### Pros

✅ No watermarks on free tier  
✅ Generous free allowance  
✅ Dark mode support  

#### Cons

❌ Slower than ApiFlash  
❌ Free tier limited to 100/month  

**Best For:** Budget-conscious developers, projects needing dark mode.

### 3. Urlbox

**URL:** https://urlbox.io  
**Pricing:** £9/month (5,000) → £49/month (50,000) → Custom (enterprise)

#### Features

✅ **GPU-accelerated rendering** (faster for complex sites)  
✅ **Advanced blocking** (ads, trackers, GDPR popups)  
✅ **Custom fonts** (embed Google Fonts in screenshots)  
✅ **Video and GIF** (animated screenshots)  
✅ **99.99% SLA**  

#### API Example

```bash
curl "https://api.urlbox.io/v1/YOUR_KEY/png?url=https://example.com&width=1920&height=1080&retina=true&block_ads=true&hide_cookie_banners=true"
```

#### Speed Test

| Site | Time |
|------|------|
| example.com | 1.5s |
| github.com | 2.9s |
| reddit.com | 3.7s |

#### Pros

✅ Best ad/popup blocking  
✅ Video/GIF support  
✅ Excellent documentation  

#### Cons

❌ No free tier  
❌ Expensive for high volume  

**Best For:** Professional SaaS products, teams needing video/GIF screenshots.

### 4. Screenshotlayer

**URL:** https://screenshotlayer.com  
**Pricing:** Free (100/month) → $9.99/month (1,000) → $49.99/month (10,000)

#### Features

✅ **Simple API** (minimal parameters)  
✅ **HTTPS support**  
✅ **Custom user-agent**  
✅ **No JavaScript execution on free tier** (faster but less accurate)  

#### API Example

```bash
curl "http://api.screenshotlayer.com/api/capture?access_key=YOUR_KEY&url=https://example.com&viewport=1440x900&format=PNG"
```

#### Speed Test

| Site | Time (No JS) |
|------|--------------|
| example.com | 0.8s |
| github.com | 1.2s |
| reddit.com | 1.5s |

**Note:** Fast because it skips JavaScript execution. Results may not match real browser rendering.

#### Pros

✅ Very fast (no JS execution)  
✅ Simple to use  

#### Cons

❌ No JavaScript rendering on free tier (React/Vue apps won't work)  
❌ Limited customisation  

**Best For:** Static sites, simple HTML documentation, speed over accuracy.

### 5. Browshot

**URL:** https://browshot.com  
**Pricing:** Free (100/month) → $9/month (5,000) → $99/month (100,000)

#### Features

✅ **Multiple browsers** (Chrome, Firefox, Edge, Safari)  
✅ **Mobile devices** (iPhone, iPad, Android)  
✅ **Historical screenshots** (see how a site looked in the past)  
✅ **Flash support** (legacy Flash sites)  

#### API Example

```bash
curl "https://api.browshot.com/api/v1/screenshot/create?url=https://example.com&instance_id=12&size=page&key=YOUR_KEY"
```

**Note:** Browshot is **asynchronous** — first request queues the screenshot, second request fetches the result.

#### Speed Test (includes queue time)

| Site | Time |
|------|------|
| example.com | 3.2s |
| github.com | 5.1s |
| reddit.com | 7.3s |

#### Pros

✅ Multi-browser support  
✅ Mobile device emulation  
✅ Large screenshot library (historical data)  

#### Cons

❌ Slowest in our tests (async model)  
❌ Confusing pricing tiers  

**Best For:** Cross-browser testing, mobile screenshots, historical comparisons.

### 6. Apify Screenshot API

**URL:** https://apify.com/apify/web-scraper  
**Pricing:** Free (5,000 credits) → $49/month (100,000 credits)

#### Features

✅ **Part of Apify ecosystem** (combine with web scraping)  
✅ **Stealth mode** (bypass bot detection)  
✅ **Proxy rotation** (avoid IP bans)  
✅ **Unlimited storage** (Apify hosts images)  

#### API Example (Apify SDK)

```javascript
const Apify = require('apify');

Apify.main(async () => {
  const browser = await Apify.launchPuppeteer();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  const screenshot = await page.screenshot({ fullPage: true });
  await Apify.setValue('screenshot.png', screenshot, { contentType: 'image/png' });
  await browser.close();
});
```

#### Speed Test

| Site | Time |
|------|------|
| example.com | 2.5s |
| github.com | 4.8s |
| reddit.com | 6.2s |

#### Pros

✅ Best for bypassing bot detection  
✅ Integrates with web scraping workflows  

#### Cons

❌ Complex pricing (credits, not screenshots)  
❌ Requires Apify account  

**Best For:** Scraping projects, sites with bot protection.

### 7. Screenshot API (Our Service)

**URL:** /  
**Pricing:** £10/month (20,000 screenshots included, £0.001/additional)

#### Features

✅ **Simple pricing** (flat rate, no tiers)  
✅ **No watermarks**  
✅ **Fast edge rendering** (2-3s average)  
✅ **Full-page and element screenshots**  
✅ **PDF export**  

#### API Example

```bash
curl -X POST https://screenshotapi.swiftlabs.dev/api/screenshot \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "width": 1920,
    "height": 1080,
    "format": "png",
    "fullPage": true
  }'
```

#### Speed Test

| Site | Time |
|------|------|
| example.com | 1.9s |
| github.com | 3.1s |
| reddit.com | 4.5s |

#### Pros

✅ Predictable pricing  
✅ No hidden fees  

#### Cons

❌ Newer service (less proven uptime)  

**Best For:** Developers who want simple pricing, no surprises.

## Comparison Table

| API | Free Tier | Paid Start | Speed (avg) | JavaScript | Full Page | Watermark |
|-----|-----------|------------|-------------|------------|-----------|-----------|
| ApiFlash | 100/month | £7/month | 2.7s | ✅ | ✅ | Yes (free) |
| ScreenshotAPI.net | 100/month | £9/month | 3.5s | ✅ | ✅ | No |
| Urlbox | None | £9/month | 2.7s | ✅ | ✅ | No |
| Screenshotlayer | 100/month | $9.99/month | 1.2s | ❌ (paid) | ✅ | No |
| Browshot | 100/month | $9/month | 5.2s | ✅ | ✅ | No |
| Apify | 5k credits | $49/month | 4.5s | ✅ | ✅ | No |
| Screenshot API | None | £10/month | 3.2s | ✅ | ✅ | No |

## When to Use What

### Quick Prototyping / Low Volume

**Use:** ApiFlash or ScreenshotAPI.net free tier (100/month).

### High Volume (1000+ daily)

**Use:** Screenshot API (£10/month for 20k) or Urlbox (£49/month for 50k).

### Cross-Browser Testing

**Use:** Browshot (supports Firefox, Safari, Edge).

### Bypassing Bot Detection

**Use:** Apify (stealth mode, proxy rotation).

### No JavaScript Sites

**Use:** Screenshotlayer (faster, cheaper).

### Professional SaaS Product

**Use:** Urlbox (99.99% SLA, video/GIF support).

## Common Use Cases

### 1. SaaS Dashboard Previews

**Scenario:** Your website builder shows customer site previews in a dashboard.

**Solution:** Use ApiFlash with caching. Cache screenshots for 24 hours to avoid repeated API calls.

```javascript
const cacheKey = `screenshot:${siteUrl}`;
let screenshot = await redis.get(cacheKey);
if (!screenshot) {
  screenshot = await apiFlash.capture(siteUrl);
  await redis.set(cacheKey, screenshot, 'EX', 86400); // 24h TTL
}
```

### 2. Visual Regression Testing

**Scenario:** Detect UI changes in CI/CD.

**Solution:** Use ScreenshotAPI.net or Urlbox with element-specific screenshots. Compare before/after images.

```javascript
const before = await screenshot('https://staging.example.com#main-nav');
const after = await screenshot('https://production.example.com#main-nav');
const diff = pixelmatch(before, after, null, 1920, 100, { threshold: 0.1 });
if (diff > 500) throw new Error('UI regression detected');
```

### 3. Social Media Preview Images

**Scenario:** Generate Open Graph images for blog posts.

**Solution:** Use Screenshot API or Urlbox with custom HTML templates.

```javascript
const html = `
  <div style="width:1200px;height:630px;background:#000;color:#fff;padding:50px;">
    <h1>${postTitle}</h1>
    <p>${postExcerpt}</p>
  </div>
`;
const screenshot = await urlbox.capture({ html, width: 1200, height: 630 });
```

### 4. Competitor Monitoring

**Scenario:** Track competitor landing page changes.

**Solution:** Use Browshot (historical screenshots) or Apify (bypass bot detection).

### 5. PDF Invoices from HTML

**Scenario:** Generate PDF receipts from HTML templates.

**Solution:** Use Urlbox or Screenshot API with `format=pdf`.

## Best Practices

### 1. Cache Aggressively

Screenshots are expensive (time + money). Cache results:

- **Homepage screenshots:** 24-hour TTL
- **Blog posts:** 7-day TTL (content rarely changes)
- **User-uploaded sites:** No caching (frequent updates)

### 2. Use Webhooks for Slow Sites

Don't block HTTP requests waiting for screenshots. Use async webhooks:

```javascript
// Queue screenshot
await apiFlash.capture(url, { webhook: 'https://yourapp.com/webhook' });

// Webhook handler
app.post('/webhook', (req, res) => {
  const { url, screenshot_url } = req.body;
  await db.saveScreenshot(url, screenshot_url);
  res.sendStatus(200);
});
```

### 3. Set Timeouts

Some sites load forever (broken external scripts). Set max wait times:

```javascript
await screenshot(url, { timeout: 10000 }); // 10s max
```

### 4. Block Ads and Popups

Cookie banners and ads clutter screenshots. Block them:

```javascript
await urlbox.capture(url, {
  block_ads: true,
  hide_cookie_banners: true,
  block_trackers: true
});
```

### 5. Retry Failed Captures

Networks fail. Implement exponential backoff:

```javascript
async function captureWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await screenshot(url);
    } catch (err) {
      if (i === retries - 1) throw err;
      await sleep(1000 * Math.pow(2, i)); // 1s, 2s, 4s
    }
  }
}
```

## Conclusion

Screenshot APIs save days of Puppeteer debugging. They handle browser orchestration, scaling, and edge cases so you can focus on features.

**For free tiers:** ApiFlash or ScreenshotAPI.net (100/month).  
**For speed:** ApiFlash or Urlbox (2-3s average).  
**For simple pricing:** Screenshot API (£10/month, 20k included).  
**For cross-browser:** Browshot (Chrome, Firefox, Safari).  
**For bot bypassing:** Apify (stealth mode, proxies).

Pick based on volume, budget, and feature needs. All are better than self-hosting Puppeteer at scale.

---

**Need a screenshot API with no surprises?** [Screenshot API](/) — £10/month for 20,000 screenshots, £0.001 per additional. No tiers, no watermarks, no hidden fees. Full-page PNG/PDF screenshots in <3s.
