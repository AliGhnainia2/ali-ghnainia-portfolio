import "../globals.css";

export default function RedirectLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" data-scroll-behavior="smooth"><body>{children}</body></html>;
}
