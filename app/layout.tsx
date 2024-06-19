import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Infinity Books",
  description: "Infinity Book Store And Library",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col justify-between min-h-screen  bg-[#f2f2f2] dark:bg-[#121212]">
            <Navbar/>
              <main>
                {children}
              </main>
            <Toaster position="bottom-left"/>
            <Footer />
          </div>
        </ThemeProvider>
        </body>
    </html>
  );
}
