import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "%s | Screenshot API Blog",
    default: "Blog — Screenshot API",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-zinc-800 py-4 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white font-semibold hover:text-purple-500 transition-colors">
            Screenshot API
          </Link>
          <Link href="/blog" className="text-zinc-400 hover:text-white text-sm transition-colors">
            Blog
          </Link>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto px-6 py-12">{children}</main>
      <footer className="border-t border-zinc-800 py-8 px-6">
        <div className="max-w-3xl mx-auto text-center text-zinc-500 text-sm">
          <Link href="/" className="hover:text-white transition-colors">
            Screenshot API
          </Link>{" "}
          — Website screenshots as a service
        </div>
      </footer>
    </div>
  );
}
