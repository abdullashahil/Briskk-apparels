"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Heart, ShoppingBag, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "../app/context/CartContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { toggleCart, totalItems } = useCart();

  // Handle scrolling effect - only on homepage
  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Set initial scroll state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Force re-evaluation of isHomePage when pathname changes
  useEffect(() => {
    const checkHomePage = pathname === "/";
    if (!checkHomePage) {
      setIsScrolled(true);
    } else if (window.scrollY <= 50) {
      setIsScrolled(false);
    }
  }, [pathname]);

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-semibold tracking-wider">
            <h1
              className={`font-bold tracking-tight ${
                isScrolled ? "text-black drop-shadow-[2px_2px_0px_#e5e7eb]" : isHomePage ? "text-white" : "text-black drop-shadow-[2px_2px_0px_#e5e7eb]"
              } `}
            >
              BRISKK
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`nav-item hover:cursor-pointer hover:opacity-85 transition-opacity ${
                isScrolled ? "text-brand-dark" : isHomePage ? "text-white" : "text-brand-dark"
              }`}
            >
              HOME
            </Link>
            <Link
              href="/shop"
              className={`nav-item hover:cursor-pointer hover:opacity-85 transition-opacity ${
                isScrolled ? "text-brand-dark" : isHomePage ? "text-white" : "text-brand-dark"
              }`}
            >
              SHOP
            </Link>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-6">
            <button
              className={`hidden md:block hover:cursor-pointer hover:opacity-85 transition-opacity ${
                isScrolled ? "text-brand-dark" : isHomePage ? "text-white" : "text-brand-dark"
              }`}
            >
              <User className="h-5 w-5" />
            </button>

            <button
              className={`hidden md:block hover:cursor-pointer hover:opacity-85 transition-opacity ${
                isScrolled ? "text-brand-dark" : isHomePage ? "text-white" : "text-brand-dark"
              }`}
            >
              <Heart className="h-5 w-5" />
            </button>

            <button
              onClick={toggleCart}
              className={`hidden md:block hover:cursor-pointer hover:opacity-85 transition-opacity relative ${
                isScrolled ? "text-brand-dark" : isHomePage ? "text-white" : "text-brand-dark"
              }`}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#5c564a] text-white text-xs rounded-full h-5 w-5 scale-75 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className={`md:hidden ${
                    isScrolled ? "text-brand-dark" : isHomePage ? "text-white" : "text-brand-dark"
                  }`}
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 w-[85%] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <h2 className="font-bold text-lg">BRISKK</h2>
                  </div>
                  
                  <div className="p-4 flex-1">
                    <div className="flex flex-col space-y-1">
                      <Link
                        href="/"
                        className="text-lg text-black hover:cursor-pointer hover:bg-gray-100 px-4 py-3 rounded-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Home
                      </Link>
                      <Link
                        href="/shop"
                        className="text-lg text-black hover:cursor-pointer hover:bg-gray-100 px-4 py-3 rounded-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Shop
                      </Link>
                    </div>
                    
                    <div className="h-px bg-gray-200 my-4" />
                    
                    <div className="flex flex-col space-y-1">
                      <button className="flex items-center justify-start text-left hover:cursor-pointer hover:bg-gray-100 px-4 py-3 text-black rounded-lg transition-all">
                        <Heart className="h-5 w-5 mr-3" />
                        <span>Wishlist</span>
                      </button>
                      
                      <button 
                        onClick={() => {
                          toggleCart();
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center justify-start text-left hover:cursor-pointer hover:bg-gray-100 px-4 py-3 text-black rounded-lg transition-all"
                      >
                        <ShoppingBag className="h-5 w-5 mr-3" />
                        <span>Cart ({totalItems})</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t mt-auto">
                    <div className="text-sm text-gray-500">© 2023 BRISKK. All rights reserved.</div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;