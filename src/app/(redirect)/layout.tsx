import { themeBootstrapScript } from "@/lib/theme";
import "../globals.css";
import { fontVariables } from "../fonts";

export default function RedirectLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={fontVariables}><head><script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} /></head><body suppressHydrationWarning>{children}</body></html>;
}
