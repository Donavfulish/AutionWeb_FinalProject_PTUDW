"use client";

import Link from "next/link";

interface FooterLinkItem {
  name: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLinkItem[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Hỗ trợ",
    links: [
      {
        name: "Trợ giúp",
        href: "",
      },
      {
        name: "Liên hệ",
        href: "",
      },
      {
        name: "FAQs",
        href: "",
      },
    ],
  },
  {
    title: "Về chúng tôi",
    links: [
      {
        name: "Về AuctionHub",
        href: "",
      },
      {
        name: "Điều khoản",
        href: "",
      },
      {
        name: "Quyền riêng tư",
        href: "",
      },
    ],
  },
  {
    title: "Theo dõi",
    links: [
      {
        name: "Facebook",
        href: "",
      },
      {
        name: "Twitter",
        href: "",
      },
      {
        name: "Instagram",
        href: "",
      },
    ],
  },
];
export const Footer = () => {
  return (
    // Dùng thẻ semantic <footer> thay cho <div> để tốt hơn cho SEO
    <footer className="w-full bg-(--color-primary) text-white font-sans">
      <div className="mx-auto w-full max-w-screen-xl px-6 py-10 lg:py-16">
        {/* Container chính căn giữa */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-3 sm:gap-16 sm:text-left md:gap-24 lg:gap-32">
            {footerColumns.map((column, indexCol) => (
              <div key={indexCol}>
                {/* Tiêu đề: In hoa, đậm vừa phải, giãn chữ tạo cảm giác cao cấp */}
                <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
                  {column.title}
                </h2>

                {/* Danh sách link */}
                <ul className="space-y-4 font-medium text-gray-200/80">
                  {column.links.map((link, indexLink) => (
                    <li key={indexLink}>
                      <Link
                        className="transition-colors duration-300 hover:text-white hover:underline decoration-1 underline-offset-4"
                        href={link.href}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Đường kẻ ngang: Làm mờ bớt (opacity) để tinh tế hơn */}
        <hr className="my-8 border-white/20 sm:mx-auto lg:my-10" />

        {/* Phần bản quyền */}
        <div className="flex flex-col items-center justify-center">
          <span className="text-sm text-gray-300 sm:text-center">
            © 2025{" "}
            <Link
              href=""
              className="font-bold text-white transition-opacity hover:opacity-80"
            >
              AuctionHub
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
