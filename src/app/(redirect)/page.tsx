import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Ali Ghnainia", robots: { index: false, follow: true } };

export default function RootRedirect() {
  return <main className="redirect-page"><meta httpEquiv="refresh" content="0;url=/en" /><p>Continue to the <Link href="/en">English portfolio</Link>.</p></main>;
}
