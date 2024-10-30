"use client";

import { Leaf, Sun, Moon, Loader } from "lucide-react";
import { useDarkMode } from "../utils/useDarkMode";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { UserBadge } from "./user-badge";

export const Navbar = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch("/api/auth/get-user");
        if (response.ok) {
          const { user } = await response.json();
          setUserInfo(user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const authButtons = useMemo(() => (
    <>
      <LoginLink>
        <Button variant="ghost" className="text-gray-600 hover:text-green-600 hover:bg-green-50 dark:text-gray-200 dark:hover:text-green-400 dark:hover:bg-gray-700">
          Log in
        </Button>
      </LoginLink>
      <RegisterLink>
        <Button className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
          Sign up
        </Button>
      </RegisterLink>
    </>
  ), []);

  return (
    <nav className="sticky top-0 z-50 bg-transparent backdrop-blur-md flex items-center justify-between p-4 h-16 transition-all duration-300 shadow-lg">
      <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
        <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
        <span className="text-2xl font-bold text-green-800 dark:text-green-200">EcoCart</span>
      </Link>
      <div className="flex items-center space-x-3">
        {loading ? (
          <Loader className="animate-spin h-6 w-6 text-gray-500 dark:text-gray-300" />
        ) : isAuthenticated && userInfo ? (
          <UserBadge userInfo={userInfo} />
        ) : (
          authButtons
        )}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </nav>
  );
};
