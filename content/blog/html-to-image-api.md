---
title: "HTML to Image APIs: Convert Web Pages to PNG/JPEG (2026)"
description: "Compare HTML to image APIs for developers. Convert HTML, CSS, and JavaScript to PNG, JPEG, or WebP programmatically."
publishedAt: "2026-03-08"
author: "SwiftLabs Team"
tags: ["api", "html", "image", "conversion"]
---

You need to turn HTML into an image. Maybe you're generating Open Graph previews for blog posts, creating PDF invoices from templates, or building a social media scheduler that renders posts as images.

You could use canvas manipulation libraries or server-side DOM rendering. Or you could use an HTML-to-image API that handles browser rendering, font loading, and edge cases for you.

Here's how HTML-to-image APIs work, which to use, and best practices for production apps.

## How HTML-to-Image APIs Work

### Input Options

**1. URL:** Point to a live webpage  
**2. Raw HTML:** Submit HTML/CSS as a string  
**3. HTML + External Assets:** HTML with linked stylesheets and scripts  

Most APIs support all three. Raw HTML is fastest (no external network requests).

### Rendering Engine

APIs use headless browsers (Chromium, Firefox, WebKit) or custom rendering engines:

- **Chromium-based:** Most common (Puppeteer, Playwright). Best CSS support.
- **Firefox-based:** Rare. Useful for cross-browser testing.
- **Custom engines:** Faster but may have CSS quirks.

### Output Formats

**PNG:** Lossless, supports transparency. Best for logos, UI screenshots.  
**JPEG:** Lossy compression. Best for photos, large images (smaller file sizes).  
**WebP:** Modern format. Smaller than JPEG, supports transparency.  
**PDF:** Vector format. Best for invoices, documents.

## Best HTML-to-Image APIs

### 1. ApiFlash

**URL:** https://apiflash.com  
**Pricing:** Free (100/month) → £7/month (1,000) → £40/month (10,000)

#### Input Methods

✅ **URL:** `?url=https://example.com`  
✅ **Raw HTML:** `?html=<div>...</div>`  
✅ **CSS injection:** `?css=body{background:red}`  

#### API Example: Raw HTML

```javascript
const html = `
  <div style="width:1200px;height:630px;background:#1a1a1a;color:white;padding:50px;font-family:Arial;">
    <h1>Hello World</h1>
    <p>This is a dynamically generated image.</p>
  </div>
`;

const url = 'https://api.apiflash.com/v1/urltoimage';
const params = new URLSearchParams({
  access_key: 'YOUR_KEY',
  html: html,
  format: 'png',
  width: 1200,
  height: 630
});

const response = await fetch(`${url}?${params}`);
const blob = await response.blob();
// blob is now a PNG image
```

#### Features

✅ **JavaScript execution** (React/Vue rendering)  
✅ **Custom fonts** (Google Fonts, local fonts via `@font-face`)  
✅ **Responsive** (custom viewport sizes)  
✅ **Delay option** (wait for lazy-loaded images)  

#### Pros

✅ Fastest rendering (avg 1.5s)  
✅ Good free tier  
✅ Supports SVG → PNG conversion  

#### Cons

❌ Watermark on free tier  
❌ No PDF export on free tier  

**Best For:** SaaS tools generating social media previews, UI screenshots.

### 2. Urlbox

**URL:** https://urlbox.io  
**Pricing:** £9/month (5,000) → £49/month (50,000) → Custom (enterprise)

#### Input Methods

✅ **URL:** `?url=https://example.com`  
✅ **Raw HTML:** `?html=<div>...</div>`  
✅ **HTML + CSS:** Separate `html` and `css` params  
✅ **Custom fonts:** Load Google Fonts automatically  

#### API Example: HTML + CSS

```javascript
const html = '<h1>Hello World</h1><p>Custom styles applied.</p>';
const css = 'body { background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 50px; }';

const url = 'https://api.urlbox.io/v1/YOUR_KEY/png';
const params = new URLSearchParams({
  html,
  css,
  width: 1200,
  height: 630,
  retina: true // 2x resolution for sharp images
});

const response = await fetch(`${url}?${params}`);
```

#### Features

✅ **Retina support** (2x resolution for HiDPI displays)  
✅ **GPU-accelerated** (faster rendering for complex CSS)  
✅ **Ad blocking** (remove ads from rendered pages)  
✅ **GDPR popup removal**  
✅ **99.99% SLA**  

#### Pros

✅ Best rendering quality  
✅ Advanced CSS support (animations, gradients, shadows)  
✅ Excellent documentation  

#### Cons

❌ No free tier  
❌ Expensive for high volume  

**Best For:** Professional SaaS products, high-quality image generation.

### 3. HTML/CSS to Image API (hcti.io)

**URL:** https://hcti.io  
**Pricing:** Free (50/month) → $19/month (1,000) → $99/month (10,000)

#### Input Methods

✅ **HTML + CSS:** Submit as JSON  
✅ **Google Fonts:** Auto-load fonts  
✅ **External stylesheets:** Link to CSS files  

#### API Example

```javascript
const response = await fetch('https://hcti.io/v1/image', {
  method: 'POST',
  headers: {
    'Authorization': 'Basic ' + btoa('user_id:api_key'),
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    html: '<h1>Invoice #12345</h1><p>Total: $250.00</p>',
    css: 'body { font-family: Arial; padding: 20px; background: white; }',
    google_fonts: 'Roboto'
  })
});

const { url } = await response.json();
// url points to hosted image (e.g., https://hcti.io/v1/image/abc123.png)
```

#### Features

✅ **Hosted images** (CDN-backed URLs)  
✅ **Automatic caching** (same HTML → same image URL)  
✅ **Webhook callbacks** (async rendering)  
✅ **Custom viewport** (responsive images)  

#### Pros

✅ CDN hosting included (no need to store images yourself)  
✅ Simple API (POST JSON, get URL back)  

#### Cons

❌ Small free tier (50/month)  
❌ No raw binary response (must download from URL)  

**Best For:** Generating invoices, receipts, social media images with hosting included.

### 4. ScreenshotAPI.net

**URL:** https://screenshotapi.net  
**Pricing:** Free (100/month) → £9/month (5,000) → £29/month (20,000)

#### Input Methods

✅ **URL:** Primary method  
✅ **Custom HTML:** POST raw HTML  
✅ **Dark mode:** Simulate dark mode rendering  

#### API Example: Custom HTML

```javascript
const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { background: #000; color: #fff; font-family: 'Courier New'; padding: 50px; }
    </style>
  </head>
  <body>
    <h1>Terminal-Style Image</h1>
    <p>$ echo "Hello from HTML"</p>
  </body>
  </html>
`;

const response = await fetch('https://shot.screenshotapi.net/screenshot', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    token: 'YOUR_TOKEN',
    html,
    width: 800,
    height: 600,
    output: 'image'
  })
});

const blob = await response.blob();
```

#### Features

✅ **No watermarks** (even on free tier)  
✅ **Dark mode simulation**  
✅ **Full-page rendering**  

#### Pros

✅ Generous free tier (100/month)  
✅ No watermarks  

#### Cons

❌ Slower than ApiFlash (3-5s)  
❌ Limited customisation options  

**Best For:** Budget-conscious developers, dark mode image generation.

### 5. Screenshot API (Our Service)

**URL:** /  
**Pricing:** £10/month (20,000 screenshots, £0.001/additional)

#### Input Methods

✅ **URL:** Screenshot live websites  
✅ **Raw HTML:** POST HTML/CSS as JSON  
✅ **PDF export:** Convert HTML to PDF  

#### API Example

```javascript
const response = await fetch('https://screenshotapi.swiftlabs.dev/api/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    html: '<div style="padding:50px;background:#fff;"><h1>Receipt</h1></div>',
    width: 800,
    height: 1000,
    format: 'pdf'
  })
});

const pdfBlob = await response.blob();
```

#### Features

✅ **Simple pricing** (no tiers, no overage fees)  
✅ **PDF and PNG** (one API, multiple formats)  
✅ **Fast rendering** (2-3s average)  

#### Pros

✅ Predictable costs  
✅ PDF support included  

#### Cons

❌ Newer service (less proven uptime)  

**Best For:** Developers who want simple pricing, PDF + PNG output.

## Comparison Table

| API | Free Tier | Paid Start | Formats | Hosting | Avg Speed |
|-----|-----------|------------|---------|---------|-----------|
| ApiFlash | 100/month | £7/month | PNG, JPEG | No | 1.5s |
| Urlbox | None | £9/month | PNG, JPEG, WebP, PDF | No | 2.0s |
| HCTI.io | 50/month | $19/month | PNG, JPEG | Yes (CDN) | 3.0s |
| ScreenshotAPI.net | 100/month | £9/month | PNG, JPEG | No | 3.5s |
| Screenshot API | None | £10/month | PNG, PDF | No | 2.5s |

## Common Use Cases

### 1. Open Graph Images for Blog Posts

**Problem:** Need unique social preview images for each blog post.

**Solution:** Render HTML templates with title + excerpt.

```javascript
const html = `
  <div style="width:1200px;height:630px;background:linear-gradient(135deg,#667eea,#764ba2);padding:80px;color:white;font-family:Arial;">
    <h1 style="font-size:60px;margin:0;">${post.title}</h1>
    <p style="font-size:30px;opacity:0.9;">${post.excerpt}</p>
  </div>
`;

const ogImage = await apiFlash.render(html);
await saveToS3(ogImage, `og-images/${post.slug}.png`);
```

**Cache:** Generate once, reuse forever (or until post updates).

### 2. PDF Invoices

**Problem:** Generate printable receipts from HTML templates.

**Solution:** Use Urlbox or Screenshot API with `format=pdf`.

```javascript
const invoiceHtml = `
  <html>
  <head><style>
    body { font-family: Arial; padding: 50px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
  </style></head>
  <body>
    <h1>Invoice #12345</h1>
    <table>
      <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
      <tr><td>Web Development</td><td>10 hrs</td><td>$1,000</td></tr>
    </table>
    <p><strong>Total: $1,000</strong></p>
  </body>
  </html>
`;

const pdf = await urlbox.render(invoiceHtml, { format: 'pdf' });
await sendEmail({ attachment: pdf, filename: 'invoice.pdf' });
```

### 3. Social Media Post Previews

**Problem:** Show Twitter/Instagram post previews in a dashboard.

**Solution:** Render HTML mockups with user content.

```javascript
const tweetHtml = `
  <div style="width:600px;background:white;border:1px solid #ddd;border-radius:12px;padding:20px;font-family:Arial;">
    <div style="display:flex;align-items:center;margin-bottom:10px;">
      <img src="${user.avatar}" style="width:48px;height:48px;border-radius:50%;margin-right:10px;">
      <div>
        <strong>${user.name}</strong><br>
        <span style="color:#666;">@${user.handle}</span>
      </div>
    </div>
    <p>${tweet.text}</p>
  </div>
`;

const preview = await apiFlash.render(tweetHtml);
```

### 4. Email Newsletter Images

**Problem:** Email clients don't support modern CSS. Convert HTML to images.

**Solution:** Render HTML sections as images, embed in email.

```javascript
const ctaHtml = `
  <div style="width:600px;padding:30px;background:linear-gradient(90deg,#ff6b6b,#f06595);color:white;text-align:center;border-radius:8px;">
    <h2>Limited Time Offer!</h2>
    <p>Get 50% off annual plans this week only.</p>
    <a href="https://example.com/signup" style="display:inline-block;background:white;color:#ff6b6b;padding:15px 30px;text-decoration:none;border-radius:5px;font-weight:bold;">Claim Offer</a>
  </div>
`;

const ctaImage = await hcti.render(ctaHtml);
// Embed ctaImage URL in email HTML: <img src="${ctaImage}" />
```

### 5. Certificate Generation

**Problem:** Auto-generate course completion certificates.

**Solution:** HTML template with user name + course title.

```javascript
const certHtml = `
  <div style="width:1000px;height:700px;background:url('https://example.com/cert-bg.png');padding:100px;text-align:center;font-family:Georgia;">
    <h1 style="font-size:48px;color:#333;">Certificate of Completion</h1>
    <p style="font-size:24px;margin-top:30px;">This certifies that</p>
    <p style="font-size:36px;font-weight:bold;color:#1a1a1a;">${user.name}</p>
    <p style="font-size:24px;">has successfully completed</p>
    <p style="font-size:30px;font-weight:bold;">${course.title}</p>
    <p style="margin-top:50px;">Issued: ${new Date().toLocaleDateString()}</p>
  </div>
`;

const cert = await urlbox.render(certHtml, { format: 'pdf' });
await db.saveCertificate(user.id, course.id, cert);
```

## Best Practices

### 1. Use Inline Styles

External stylesheets may not load in time. Inline all CSS:

**Bad:**
```html
<link rel="stylesheet" href="https://example.com/style.css">
<div class="card">...</div>
```

**Good:**
```html
<div style="background:white;border:1px solid #ddd;padding:20px;">...</div>
```

Or submit CSS separately:

```javascript
await apiFlash.render({
  html: '<div class="card">...</div>',
  css: '.card { background: white; border: 1px solid #ddd; padding: 20px; }'
});
```

### 2. Set Explicit Dimensions

Don't rely on auto-layout. Set width and height explicitly:

```html
<div style="width:1200px;height:630px;">...</div>
```

Prevents cropping or unexpected scaling.

### 3. Optimize Font Loading

**Google Fonts:** Use API's built-in support (faster than external requests).

```javascript
await hcti.render({
  html: '<h1 style="font-family:Roboto;">Hello</h1>',
  google_fonts: 'Roboto'
});
```

**Custom fonts:** Use base64-encoded `@font-face`:

```css
@font-face {
  font-family: 'CustomFont';
  src: url(data:font/woff2;base64,d09GMgABAAAAAA...) format('woff2');
}
```

### 4. Cache Aggressively

Rendering is expensive. Cache identical renders:

```javascript
const cacheKey = `html:${hashHtml(html)}`;
let image = await cache.get(cacheKey);
if (!image) {
  image = await apiFlash.render(html);
  await cache.set(cacheKey, image, '7d'); // 7-day TTL
}
```

### 5. Handle Errors Gracefully

Rendering can fail (malformed HTML, timeout, network issues). Retry with exponential backoff:

```javascript
async function renderWithRetry(html, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await apiFlash.render(html);
    } catch (err) {
      if (i === retries - 1) throw err;
      await sleep(1000 * Math.pow(2, i)); // 1s, 2s, 4s
    }
  }
}
```

## Advanced Techniques

### Dynamic Data Binding

Render charts or graphs with D3.js/Chart.js:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<canvas id="chart" width="800" height="400"></canvas>
<script>
  new Chart(document.getElementById('chart'), {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [{ data: [10, 20, 30] }]
    }
  });
</script>
```

Set API delay to ensure rendering completes:

```javascript
await apiFlash.render({ html, delay: 2000 }); // Wait 2s for chart to draw
```

### Responsive Images

Generate multiple sizes for different devices:

```javascript
const sizes = [
  { width: 1200, height: 630, name: 'og-image.png' },
  { width: 600, height: 315, name: 'twitter-image.png' },
  { width: 400, height: 400, name: 'square.png' }
];

for (const size of sizes) {
  const image = await urlbox.render({ html, ...size });
  await saveImage(image, size.name);
}
```

### Watermarking

Add text overlays programmatically:

```html
<div style="position:relative;width:1200px;height:630px;background:url('photo.jpg');">
  <div style="position:absolute;bottom:20px;right:20px;background:rgba(0,0,0,0.7);color:white;padding:10px;border-radius:5px;">
    © 2026 Your Company
  </div>
</div>
```

## Pricing Comparison

### Low Volume (<1,000/month)

**Best:** ApiFlash free tier (100/month) + ScreenshotAPI.net free tier (100/month) = 200 free renders.

### Medium Volume (1,000-10,000/month)

**Best:** Screenshot API (£10/month for 20k).

### High Volume (10,000+/month)

**Best:** Urlbox (£49/month for 50k) or Screenshot API (£10 + overage at £0.001/render).

## Conclusion

HTML-to-image APIs eliminate the complexity of headless browser management. They handle font loading, JavaScript execution, and edge cases so you can focus on generating great content.

**For free tiers:** ApiFlash or ScreenshotAPI.net.  
**For quality:** Urlbox (Retina, GPU-accelerated).  
**For simplicity:** HCTI.io (POST JSON, get URL).  
**For PDF + PNG:** Screenshot API or Urlbox.

Pick based on volume, budget, and output format needs. All are better than rolling your own Puppeteer setup.

---

**Need to convert HTML to images or PDFs?** [Screenshot API](/) — £10/month for 20,000 renders. PNG, JPEG, and PDF output. No watermarks, no hidden fees. Fast rendering in <3s.
