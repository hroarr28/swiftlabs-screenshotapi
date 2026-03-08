import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Website Screenshot API Guides & Tutorials",
  description:
    "Learn how to capture website screenshots programmatically. API comparisons, integration guides, and best practices.",
};

const articles = [
  {
    slug: "website-screenshot-api-comparison-2026",
    title: "Website Screenshot API Comparison 2026",
    description:
      "Comparing Screenshot API, Screenshotmachine, Urlbox, ApiFlash, and Puppeteer. Pricing, features, and what actually matters.",
    date: "8 March 2026",
  },
  {
    slug: "how-to-generate-website-screenshots-programmatically",
    title: "How to Generate Website Screenshots Programmatically",
    description:
      "Complete guide to capturing webpage screenshots with APIs. Code examples for Node.js, Python, and PHP.",
    date: "8 March 2026",
  },
  {
    slug: "website-screenshot-api-use-cases",
    title: "Website Screenshot API Use Cases",
    description:
      "Real-world applications: link previews, website monitoring, portfolio builders, QA testing, and more.",
    date: "8 March 2026",
  },
];

export default function BlogPage() {
  return (
    <div className="prose-custom">
      <h1 className="text-3xl font-bold text-white mb-8">
        Screenshot API Guides
      </h1>
      <p className="text-zinc-400 mb-12">
        Practical tutorials for capturing website screenshots programmatically.
      </p>

      <div className="space-y-8">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="border-b border-zinc-800 pb-8 last:border-0"
          >
            <time className="text-zinc-500 text-sm">{article.date}</time>
            <Link href={`/blog/${article.slug}`}>
              <h2 className="text-xl font-semibold text-white hover:text-purple-500 transition-colors mt-2 mb-3">
                {article.title}
              </h2>
            </Link>
            <p className="text-zinc-400 text-sm">{article.description}</p>
            <Link
              href={`/blog/${article.slug}`}
              className="text-purple-500 hover:text-purple-400 text-sm font-medium mt-3 inline-block"
            >
              Read article →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
