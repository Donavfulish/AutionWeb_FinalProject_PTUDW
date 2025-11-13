"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart, User } from "lucide-react"
// import SearchBar

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <div className="text-2xl font-bold text-blue-600">
              AE Tao<span className="text-amber-400">Lỏ VC</span>
            </div>
          </Link>

          {/* Search Bar - Desktop
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <SearchDropdown />
          </div> */}

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/watchlist"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              <ShoppingCart size={20} />
              <span className="text-sm">Watch List</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              <User size={20} />
              <span className="text-sm">Profile</span>
            </Link>
          </div>

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
            <Link href="/watchlist" className="block py-2 text-sm text-gray-600 hover:text-blue-600 font-medium">
              Watch List
            </Link>
            <Link href="/profile" className="block py-2 text-sm text-gray-600 hover:text-blue-600 font-medium">
              Profile
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header;
