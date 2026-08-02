import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import type { Metadata } from "next";
import { Tajawal, Cairo } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Preloader } from "@/components/animations/Preloader";
import { getAssociationInfo, getNavLinks } from "@/lib/queries";
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import "../globals.css";

const tajawal = Tajawal({
  variable: "--font-heading",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
});

const cairo = Cairo({
  variable: "--font-sans",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "جمعية الصويرة دارنا | رعاية وإيواء الأطفال في وضعية صعبة",
  description: "جمعية الصويرة دارنا لرعاية وإيواء وإدماج الأطفال في وضعية صعبة بإقليم الصويرة.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  // Fetch shared data for Navbar & Footer
  const [associationInfo, navLinks] = await Promise.all([
    getAssociationInfo(),
    getNavLinks(),
  ]);

  // Use translations if available, fallback to Arabic
  const name = locale === 'fr' ? associationInfo?.name_fr : locale === 'en' ? associationInfo?.name_en : associationInfo?.name;
  const tagline = locale === 'fr' ? associationInfo?.tagline_fr : locale === 'en' ? associationInfo?.tagline_en : associationInfo?.tagline;
  const address = locale === 'fr' ? associationInfo?.address_fr : locale === 'en' ? associationInfo?.address_en : associationInfo?.address;

  const navLinksSimple = (navLinks || []).map((l) => ({ 
    href: l.href, 
    label: locale === 'fr' ? (l.label_fr || l.label) : locale === 'en' ? (l.label_en || l.label) : l.label 
  }));
  
  const infoForNav = {
    name: name || associationInfo?.name || "جمعية الصويرة دارنا",
    tagline: tagline || associationInfo?.tagline || "",
    address: address || associationInfo?.address || "",
    phone: associationInfo?.phone ?? "",
    email: associationInfo?.email ?? "",
  };

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${cairo.variable} ${tajawal.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-charcoal selection:bg-secondary/30 transition-colors duration-500">
        <NextIntlClientProvider messages={messages}>
          <Preloader />
          <Navbar navLinks={navLinksSimple} associationName={infoForNav.name} />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer navLinks={navLinksSimple} associationInfo={infoForNav} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
