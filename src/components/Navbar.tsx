"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Menu, X, LogOut } from 'lucide-react';
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";

export const Navbar = ({ user }: { user: User | null | undefined }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
              <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
              <span className="text-2xl font-bold text-green-800 dark:text-green-200">EcoCart</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard" passHref>
                  <Button variant="ghost" className="text-gray-600 hover:text-green-600 hover:bg-green-50 dark:text-gray-200 dark:hover:text-green-400 dark:hover:bg-gray-800">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/api/auth/logout" passHref>
                  <Button variant="ghost" className="text-gray-600 hover:text-green-600 hover:bg-green-50 dark:text-gray-200 dark:hover:text-green-400 dark:hover:bg-gray-800">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <LoginLink>
                  <Button variant="ghost" className="text-gray-600 hover:text-green-600 hover:bg-green-50 dark:text-gray-200 dark:hover:text-green-400 dark:hover:bg-gray-800">
                    Log in
                  </Button>
                </LoginLink>
                <RegisterLink>
                  <Button className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                    Sign up
                  </Button>
                </RegisterLink>
              </>
            )}
            <ModeToggle />
          </div>
          <div className="md:hidden flex items-center">
            <ModeToggle />
            <Button variant="ghost" onClick={toggleMenu} className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-green-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500" aria-expanded="false">
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
                <Link href="/dashboard" passHref>
                  <Button variant="ghost" className="w-full text-left text-gray-600 hover:text-green-600 hover:bg-green-50 dark:text-gray-200 dark:hover:text-green-400 dark:hover:bg-gray-800">
                    Dashboard
                  </Button>
                </Link>
                <LogoutLink postLogoutRedirectURL="/">
                  <Button variant="ghost" className="w-full text-left text-gray-600 hover:text-green-600 hover:bg-green-50 dark:text-gray-200 dark:hover:text-green-400 dark:hover:bg-gray-800">
                    <LogOut className="mr-2 h-4 w-4 inline" />
                    Sign Out
                  </Button>
                </LogoutLink>
              </>
            ) : (
              <>
                <LoginLink>
                  <Button variant="ghost" className="w-full text-left text-gray-600 hover:text-green-600 hover:bg-green-50 dark:text-gray-200 dark:hover:text-green-400 dark:hover:bg-gray-800">
                    Log in
                  </Button>
                </LoginLink>
                <RegisterLink>
                  <Button className="w-full bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                    Sign up
                  </Button>
                </RegisterLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};