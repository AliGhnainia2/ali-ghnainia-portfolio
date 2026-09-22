import type { Metadata } from "next";
import Link from "next/link";
import { en } from "@/content/en";
import { fr } from "@/content/fr";
import "./globals.css";

export const metadata: Metadata = { title: "404 | Ali Ghnainia", robots: { index: false, follow: false } };

export default function GlobalNotFound() {
  const switchScript = `if(location.pathname === '/fr' || location.pathname.startsWith('/fr/')){document.documentElement.lang='fr';document.documentElement.dataset.errorLocale='fr';document.title=${JSON.stringify(`${fr.notFound.title} | Ali Ghnainia`)};}`;
  return <html lang="en"><body>
    <main className="not-found container global-not-found">
      <div className="global-404-en"><p className="eyebrow">{en.notFound.eyebrow}</p><h1>{en.notFound.title}</h1><p>{en.notFound.body}</p><Link className="button button-primary" href="/en">{en.notFound.action} →</Link></div>
      <div className="global-404-fr" lang="fr"><p className="eyebrow">{fr.notFound.eyebrow}</p><h1>{fr.notFound.title}</h1><p>{fr.notFound.body}</p><Link className="button button-primary" href="/fr">{fr.notFound.action} →</Link></div>
    </main>
    <script dangerouslySetInnerHTML={{ __html: switchScript }} />
  </body></html>;
}
