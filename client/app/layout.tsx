// app/layout.tsx
import "./globals.css";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer/Footer";
import UserSidebarWrapper from "@/components/UserSidebarWrapper";
import Providers from "./provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Client Query Provider */}
        <Providers>
          <Header />
          <div className="mt-[100px] flex container gap-8 mb-[50px]">
            <aside>
              {/* Client component kiểm tra route */}
              <UserSidebarWrapper />
            </aside>
            <main className="w-full">{children}</main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
