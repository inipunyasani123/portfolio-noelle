import { Geist, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESC, pageMeta } from "@/lib/seo";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], weight: ["300", "400", "600", "700"] });

const __jsonld = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, "url": SITE_URL, "name": SITE_TITLE, "description": SITE_DESC, "inLanguage": "en", "author": { "@id": `${SITE_URL}/#person` } },
    { "@type": "Person", "@id": `${SITE_URL}/#person`, "name": "Noelle", "jobTitle": "UI/UX Designer", "description": "A fictional persona for this portfolio template.", "url": SITE_URL },
  ],
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s — ${SITE_NAME}` },
  applicationName: SITE_NAME,
  keywords: ["UI/UX designer", "product designer", "portfolio", "user experience", "interface design"],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  ...pageMeta({ description: SITE_DESC, path: '/' }),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${bricolage.variable}`} suppressHydrationWarning>
      <body className="bg-white text-black antialiased">
        <a href="#konten" className="skip-link">Skip to content</a>
        <ThemeProvider>
          <Header />
          <div id="konten">{children}</div>
          <Footer />
          <ThemeToggle />
        </ThemeProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        <aside aria-label="About this demo site" style={{ display: 'block', margin: 0, padding: '12px 76px', background: '#0f1b33', color: '#dfe6f3', font: '400 13px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', textAlign: 'center' }}>
          A demo site by PintuWeb — names and content are fictional.{' '}
          <a href="https://www.pintuweb.id/en/contact?demo=noelle" style={{ color: '#ffffff', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}>Get a site like this →</a>
        </aside>
        </body>
    </html>
  );
}
