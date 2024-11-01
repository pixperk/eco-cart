import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
      
        <Navbar />
        <main className="flex-grow">
          {children}</main>
        <Footer />
      </body>
    </html>
  );
}