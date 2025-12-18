// app/layout.tsx
import "./globals.css";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <ToastContainer />
      </body>
    </html>
  );
}

/*
- Dien thoai --> sp3 , sp4  
+ Iphone: Sp1 , sp2 
*/
