import type { Metadata } from "next";
import { Urbanist} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner"
import NextTopLoader from 'nextjs-toploader'

const UrbanistSans = Urbanist({
  variable: "--font-Urbanist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Punto y Coma",
  description: "Bienvenido a Punto y Coma by FEERVICK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      
      <body
        className={`${UrbanistSans.variable} antialiased`}
      > 
      
      
           <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader
            color= "#2299DD"
            initialPosition= {0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD, 0 0 5px #2299DD" />

            <Navbar />
      
        {children}
        <Toaster />
        <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
