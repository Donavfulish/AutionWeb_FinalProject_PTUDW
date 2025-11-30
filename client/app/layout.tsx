// app/layout.tsx
import { Footer } from "@/components/Footer/Footer";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="mt-[100px] flex container gap-8 mb-[50px]">
          <Providers>{children}</Providers>
        </div>
        <Footer />
      </body>
    </html>
  );
}

/*
- Dien thoai --> sp3 , sp4  
+ Iphone: Sp1 , sp2 
*/