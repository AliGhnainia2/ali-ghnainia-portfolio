import "../globals.css";
import { fontVariables } from "../fonts";

export default function RedirectLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" data-scroll-behavior="smooth" className={fontVariables}><body suppressHydrationWarning>{children}</body></html>;
}
