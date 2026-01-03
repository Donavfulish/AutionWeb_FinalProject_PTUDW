"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, User, UserPen } from "lucide-react";
import { SearchBar } from "../SearchBar";
import Image from "next/image";
import { useAuthStore } from "@/store/auth.store";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const role = useAuthStore().user?.role;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="container-layout">
        <div className="flex items-center justify-between h-16">
          <div className="relative h-full py-2">
            <Link href="/" className="shrink-0">
              <Image
                src="/logo.png"
                alt="Logo AuctionHub"
                width={180}
                height={180}
              />
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <SearchBar />
          </div>
          {role && role !== "guest" ? (
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/user/favorite_products"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                <ShoppingCart size={20} />
                <span className="text-sm">Yêu thích</span>
              </Link>
              <Link
                href="/user/info"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                <User size={20} />
                <span className="text-sm">Hồ sơ cá nhân</span>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/login"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                <User size={20} />
                <span className="text-sm">Đăng nhập</span>
              </Link>
              <Link
                href="/sign-up"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                <UserPen size={20} />
                <span className="text-sm">Đăng ký</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            {/* <div className="py-4">
              <SearchDropdown />
            </div> */}
            <Link
              href="/user/favorite_products"
              className="block py-2 text-sm text-gray-600 hover:text-blue-600 font-medium"
            >
              Sản phẩm yêu thích
            </Link>
            <Link
              href="/user/info"
              className="block py-2 text-sm text-gray-600 hover:text-blue-600 font-medium"
            >
              Hồ sơ
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
