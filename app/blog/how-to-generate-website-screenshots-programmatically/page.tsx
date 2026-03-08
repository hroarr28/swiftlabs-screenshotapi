import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Generate Website Screenshots Programmatically",
  description:
    "Complete guide to capturing webpage screenshots with APIs. Code examples for Node.js, Python, and PHP. Learn screenshot automation best practices.",
  keywords: [
    "screenshot api",
    "generate website screenshot",
    "webpage screenshot programmatically",
    "html to screenshot",
    "automated screenshot capture",
  ],
};

export default function HowToGenerateWebsiteScreenshots() {
  return (
    <article className="prose-custom">
      <time className="text-zinc-500 text-sm">8 March 2026</time>
      <h1 className="text-3xl font-bold text-white mt-2 mb-6">
        How to Generate Website Screenshots Programmatically
      </h1>

      <p>
        You need screenshots of websites — for link previews, monitoring, reports, or testing. Running Chrome headlessly works but adds infrastructure complexity. Screenshot APIs are simpler.
      </p>
      <p>
        Here&apos;s how to capture website screenshots programmatically, with code examples and best practices.
      </p>

      <h2>Option 1: Use a Screenshot API (recommended)</h2>
      <p>
        The fastest way to add screenshot functionality: send an HTTP request, get an image back. No Chrome installation, no browser management, no scaling headaches.
      </p>

      <h3>Basic API call (Node.js)</h3>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-zinc-300">
          const fetch = require(&apos;node-fetch&apos;);
          <br />
          <br />
          const url = &apos;https://example.com&apos;;
          <br />
          {`const apiUrl = \`https://api.screenshotapi.dev/screenshot?url=\${encodeURIComponent(url)}\`;`}
          <br />
          <br />
          const response = await fetch(apiUrl);
          <br />
          const buffer = await response.buffer();
          <br />
          <br />
          <span className="text-zinc-500">// Save to file</span>
          <br />
          require(&apos;fs&apos;).writeFileSync(&apos;screenshot.png&apos;, buffer);
        </code>
      </div>

      <h3>With options (viewport, format)</h3>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto mt-4">
        <code className="text-sm text-zinc-300">
          {`const apiUrl = \`https://api.screenshotapi.dev/screenshot?\` +`}
          <br />
          {`  \`url=\${encodeURIComponent(url)}&\` +`}
          <br />
          {`  \`width=1280&height=800&\` +`}
          <br />
          {`  \`format=jpg\`;`}
        </code>
      </div>

      <h3>Python example</h3>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto mt-4">
        <code className="text-sm text-zinc-300">
          import requests
          <br />
          <br />
          url = &apos;https://example.com&apos;
          <br />
          {`api_url = f'https://api.screenshotapi.dev/screenshot?url={url}'`}
          <br />
          <br />
          response = requests.get(api_url)
          <br />
          <br />
          with open(&apos;screenshot.png&apos;, &apos;wb&apos;) as f:
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;f.write(response.content)
        </code>
      </div>

      <h3>PHP example</h3>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto mt-4">
        <code className="text-sm text-zinc-300">
          $url = &apos;https://example.com&apos;;
          <br />
          $apiUrl = &apos;https://api.screenshotapi.dev/screenshot?url=&apos; . urlencode($url);
          <br />
          <br />
          $image = file_get_contents($apiUrl);
          <br />
          file_put_contents(&apos;screenshot.png&apos;, $image);
        </code>
      </div>

      <h2>Option 2: Self-hosted Puppeteer (full control)</h2>
      <p>
        For complex use cases — authenticated pages, custom JavaScript execution, full-page scrolling — you need headless Chrome. Puppeteer is the standard Node.js library.
      </p>

      <h3>Basic Puppeteer screenshot</h3>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-zinc-300">
          const puppeteer = require(&apos;puppeteer&apos;);
          <br />
          <br />
          (async () =&gt; {`{`}
          <br />
          &nbsp;&nbsp;const browser = await puppeteer.launch();
          <br />
          &nbsp;&nbsp;const page = await browser.newPage();
          <br />
          &nbsp;&nbsp;await page.goto(&apos;https://example.com&apos;);
          <br />
          &nbsp;&nbsp;await page.screenshot({`{ path: 'screenshot.png' }`});
          <br />
          &nbsp;&nbsp;await browser.close();
          <br />
          {`})();`}
        </code>
      </div>

      <h3>Advanced options</h3>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto mt-4">
        <code className="text-sm text-zinc-300">
          await page.screenshot({`{`}
          <br />
          &nbsp;&nbsp;path: &apos;screenshot.png&apos;,
          <br />
          &nbsp;&nbsp;fullPage: true, <span className="text-zinc-500">// Capture entire page, not just viewport</span>
          <br />
          &nbsp;&nbsp;type: &apos;jpeg&apos;,
          <br />
          &nbsp;&nbsp;quality: 90,
          <br />
          &nbsp;&nbsp;clip: {`{`}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;x: 0,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;y: 0,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;width: 1280,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;height: 800
          <br />
          &nbsp;&nbsp;{`}`}
          <br />
          {`});`}
        </code>
      </div>

      <h3>Wait for content to load</h3>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto mt-4">
        <code className="text-sm text-zinc-300">
          await page.goto(&apos;https://example.com&apos;, {`{`}
          <br />
          &nbsp;&nbsp;waitUntil: &apos;networkidle2&apos; <span className="text-zinc-500">// Wait until network is idle</span>
          <br />
          {`});`}
          <br />
          <br />
          <span className="text-zinc-500">// Or wait for specific element</span>
          <br />
          await page.waitForSelector(&apos;.main-content&apos;);
        </code>
      </div>

      <h2>Best practices</h2>

      <h3>Handle timeouts</h3>
      <p>
        Websites don&apos;t always load quickly. Set realistic timeouts and handle failures gracefully:
      </p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-zinc-300">
          try {`{`}
          <br />
          &nbsp;&nbsp;await page.goto(url, {`{`}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;timeout: 30000, <span className="text-zinc-500">// 30 second timeout</span>
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;waitUntil: &apos;networkidle2&apos;
          <br />
          &nbsp;&nbsp;{`});`}
          <br />
          {`}`} catch (error) {`{`}
          <br />
          &nbsp;&nbsp;console.error(&apos;Timeout or navigation error&apos;, error);
          <br />
          &nbsp;&nbsp;<span className="text-zinc-500">// Return default placeholder or retry</span>
          <br />
          {`}`}
        </code>
      </div>

      <h3>Set viewport size</h3>
      <p>
        Default viewport is 800×600. Most modern sites look better at desktop resolutions:
      </p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-zinc-300">
          await page.setViewport({`{`}
          <br />
          &nbsp;&nbsp;width: 1280,
          <br />
          &nbsp;&nbsp;height: 800,
          <br />
          &nbsp;&nbsp;deviceScaleFactor: 2 <span className="text-zinc-500">// Retina/high-DPI</span>
          <br />
          {`});`}
        </code>
      </div>

      <h3>Hide cookie banners and popups</h3>
      <p>
        Nothing ruins screenshots like EU cookie banners. Remove them with CSS:
      </p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-zinc-300">
          await page.addStyleTag({`{`}
          <br />
          &nbsp;&nbsp;content: &apos;.cookie-banner, .popup-overlay {`{ display: none !important; }`}&apos;
          <br />
          {`});`}
        </code>
      </div>

      <h3>Optimize for file size</h3>
      <p>
        PNG screenshots can be 2-5MB. Use JPG for smaller files when transparency isn&apos;t needed:
      </p>

      <ul>
        <li><strong>PNG:</strong> Lossless, larger files — good for UI screenshots</li>
        <li><strong>JPG:</strong> Lossy, smaller files — good for full-page captures</li>
      </ul>

      <h2>Common pitfalls</h2>

      <h3>Not closing browsers (memory leaks)</h3>
      <p>
        Every <code>puppeteer.launch()</code> spawns a Chrome process. If you don&apos;t close it, you run out of memory:
      </p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-zinc-300">
          let browser;
          <br />
          try {`{`}
          <br />
          &nbsp;&nbsp;browser = await puppeteer.launch();
          <br />
          &nbsp;&nbsp;<span className="text-zinc-500">// ... screenshot logic</span>
          <br />
          {`}`} finally {`{`}
          <br />
          &nbsp;&nbsp;if (browser) await browser.close(); <span className="text-zinc-500">// Always close</span>
          <br />
          {`}`}
        </code>
      </div>

      <h3>Taking screenshots too early</h3>
      <p>
        Waiting for <code>load</code> event isn&apos;t enough for JavaScript-heavy sites. Use <code>networkidle2</code> or wait for specific elements.
      </p>

      <h3>Ignoring failed requests</h3>
      <p>
        Sites with 404 images or blocked resources still render, but look broken. Check for critical resource failures before taking the screenshot.
      </p>

      <h2>Performance at scale</h2>

      <h3>Reuse browser instances</h3>
      <p>
        Launching Chrome takes ~1 second. For high volume, keep one browser instance alive and open new pages:
      </p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-zinc-300">
          const browser = await puppeteer.launch();
          <br />
          <br />
          <span className="text-zinc-500">// For each screenshot:</span>
          <br />
          const page = await browser.newPage();
          <br />
          await page.goto(url);
          <br />
          await page.screenshot({`{ path: 'screenshot.png' }`});
          <br />
          await page.close(); <span className="text-zinc-500">// Close page, not browser</span>
        </code>
      </div>

      <h3>Queue screenshots asynchronously</h3>
      <p>
        Don&apos;t make users wait for screenshots. Queue them with a background worker (Redis, BullMQ) and deliver results via webhook or polling.
      </p>

      <h2>When to use APIs vs self-hosted</h2>

      <table className="w-full text-sm text-zinc-300 border-collapse border border-zinc-800">
        <thead>
          <tr className="bg-zinc-900">
            <th className="border border-zinc-800 p-3 text-left">Scenario</th>
            <th className="border border-zinc-800 p-3 text-left">Best choice</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-zinc-800 p-3">&lt;10k screenshots/month</td>
            <td className="border border-zinc-800 p-3">Screenshot API (cheaper, simpler)</td>
          </tr>
          <tr className="bg-zinc-900/30">
            <td className="border border-zinc-800 p-3">Authenticated pages</td>
            <td className="border border-zinc-800 p-3">Self-hosted Puppeteer</td>
          </tr>
          <tr>
            <td className="border border-zinc-800 p-3">Custom JavaScript execution</td>
            <td className="border border-zinc-800 p-3">Self-hosted Puppeteer</td>
          </tr>
          <tr className="bg-zinc-900/30">
            <td className="border border-zinc-800 p-3">10k-100k screenshots/month</td>
            <td className="border border-zinc-800 p-3">Screenshot API (easier scaling)</td>
          </tr>
          <tr>
            <td className="border border-zinc-800 p-3">&gt;1M screenshots/month</td>
            <td className="border border-zinc-800 p-3">Self-hosted (cost wins)</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-8 p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
        <h3 className="text-white font-semibold text-lg mb-2">
          Screenshot API — £0.001/screenshot
        </h3>
        <p className="text-zinc-400 text-sm mb-4">
          Simple HTTP API for website screenshots. No browser management, no infrastructure. Custom viewport, PNG/JPG/PDF output. Try it free — no account needed.
        </p>
        <Link
          href="/"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2.5 rounded-md transition-colors text-sm"
        >
          Get started →
        </Link>
      </div>
    </article>
  );
}
