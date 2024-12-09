"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Menu, X, LogOut } from 'lucide-react';
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { User } from "@prisma/client";
import { Button, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";

export const Navbar = ({ user }: { user: User | null | undefined }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-background shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">EcoCart</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard" className={buttonVariants({ variant: "ghost" })}>
                  Dashboard
                </Link>
                <LogoutLink postLogoutRedirectURL="/">
                  <span className={buttonVariants({ variant: "ghost" })}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </span>
                </LogoutLink>
              </>
            ) : (
              <>
                <LoginLink>
                  <span className={buttonVariants({ variant: "ghost" })}>
                    Log in
                  </span>
                </LoginLink>
                <RegisterLink>
                  <span className={buttonVariants({ variant: "default" })}>
                    Sign up
                  </span>
                </RegisterLink>
              </>
            )}
            <ModeToggle />
          </div>
          <div className="md:hidden flex items-center">
            <ModeToggle />
            <Button variant="ghost" onClick={toggleMenu} className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                <Link href="/dashboard" className={buttonVariants({ variant: "ghost", className: "w-full justify-start" })}>
                  Dashboard
                </Link>
                <LogoutLink postLogoutRedirectURL="/">
                  <span className={buttonVariants({ variant: "ghost", className: "w-full justify-start" })}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </span>
                </LogoutLink>
              </>
            ) : (
              <>
                <LoginLink>
                  <span className={buttonVariants({ variant: "ghost", className: "w-full justify-start" })}>
                    Log in
                  </span>
                </LoginLink>
                <RegisterLink>
                  <span className={buttonVariants({ variant: "default", className: "w-full justify-start" })}>
                    Sign up
                  </span>
                </RegisterLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

