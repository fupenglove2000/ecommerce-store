"use client";

import Link from "next/link";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import { useState } from "react";

export function Header() {
  const totalItems = useCart((state) => state.totalItems());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">ShopNext</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
              All Products
            </Link>
            <Link href="/products?category=electronics" className="text-sm font-medium hover:text-primary transition-colors">
              Electronics
            </Link>
            <Link href="/products?category=clothing" className="text-sm font-medium hover:text-primary transition-colors">
              Clothing
            </Link>
            <Link href="/products?category=accessories" className="text-sm font-medium hover:text-primary transition-colors">
              Accessories
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="/products" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              All Products
            </Link>
            <Link href="/products?category=electronics" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Electronics
            </Link>
            <Link href="/products?category=clothing" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Clothing
            </Link>
            <Link href="/products?category=accessories" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Accessories
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
