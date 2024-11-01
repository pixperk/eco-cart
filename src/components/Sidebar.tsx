'use client'

import React, { useEffect, useState } from 'react'
import { ShoppingCart, Leaf, Sparkles, List, Settings, HelpCircle, Menu, LogOut, Sun, Moon } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { getCurrentUser } from '@/actions/getCurrent'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { useTheme } from "next-themes"

interface ShoppingList {
  id: number;
  name: string;
}

interface SidebarProps {
  lists: ShoppingList[];
  currentList: ShoppingList;
  onListChange: (listId: number) => void;
}

interface SidebarContentProps {
  lists: ShoppingList[];
  currentList: ShoppingList;
  onListChange: (listId: number) => void;
  user: { name: string; email: string; image: string } | null;
  loading: boolean;
  onLogout: () => void;
}

const ModeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-10 h-10 rounded-full bg-green-700 hover:bg-green-600 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

const SidebarContent: React.FC<SidebarContentProps> = ({ lists, currentList, onListChange, user, loading, onLogout }) => (
  <>
    <div className="flex items-center justify-between mb-8 px-4 py-2">
      <div className="flex items-center space-x-2">
        <ShoppingCart className="h-8 w-8 text-green-200" />
        <h1 className="text-2xl font-bold tracking-wide text-green-100">EcoCart</h1>
      </div>
      <ModeToggle />
    </div>

    <div className="mb-6 px-4">
      <Select
        value={currentList.id.toString()}
        onValueChange={(value: string) => onListChange(parseInt(value))}
      >
        <SelectTrigger className="w-full bg-green-700 dark:bg-gray-800 border-none text-green-100 hover:ring-2 hover:ring-green-500">
          <SelectValue placeholder="Select a list" />
        </SelectTrigger>
        <SelectContent>
          {lists.map((list) => (
            <SelectItem key={list.id} value={list.id.toString()}>
              {list.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <nav className="flex-grow px-4">
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard" className="flex items-center p-3 rounded-lg hover:bg-green-600 dark:hover:bg-gray-800 transition-colors">
            <List className="h-5 w-5 mr-3 text-green-100" />
            My Lists
          </Link>
        </li>
        <li>
          <Link href="/eco-products" className="flex items-center p-3 rounded-lg hover:bg-green-600 dark:hover:bg-gray-800 transition-colors">
            <Leaf className="h-5 w-5 mr-3 text-green-100" />
            Eco Products
          </Link>
        </li>
        <li>
          <Link href="/ai-recommendations" className="flex items-center p-3 rounded-lg hover:bg-green-600 dark:hover:bg-gray-800 transition-colors">
            <Sparkles className="h-5 w-5 mr-3 text-green-100" />
            AI Recommendations
          </Link>
        </li>
        <li>
          <Link href="/settings" className="flex items-center p-3 rounded-lg hover:bg-green-600 dark:hover:bg-gray-800 transition-colors">
            <Settings className="h-5 w-5 mr-3 text-green-100" />
            Settings
          </Link>
        </li>
        <li>
          <Link href="/help" className="flex items-center p-3 rounded-lg hover:bg-green-600 dark:hover:bg-gray-800 transition-colors">
            <HelpCircle className="h-5 w-5 mr-3 text-green-100" />
            Help & Support
          </Link>
        </li>
      </ul>
    </nav>

    <div className="mt-auto pt-4 border-t border-green-700 dark:border-gray-700 px-4 pb-6">
      <div className="flex items-center">
        {loading ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="p-0 w-full justify-start hover:bg-transparent">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={user?.image || 'https://via.placeholder.com/40'} alt={user?.name || 'User Avatar'} />
                    <AvatarFallback>{user?.name ? user.name[0] : 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="ml-1 mr-1 text-left overflow-hidden">
                    <p className="text-sm font-medium truncate text-black dark:text-white">{user?.name || 'Guest User'}</p>
                    <p className="text-xs text-black dark:text-gray-400 truncate">{user?.email || 'Not logged in'}</p>
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0 bg-green-50 dark:bg-gray-900">
              <Button 
                variant="ghost" 
                className="w-full justify-start rounded-none h-auto py-3 px-4 text-left hover:bg-green-200 dark:hover:bg-gray-800 transition-colors"
                onClick={onLogout}
              >
                <LogOut className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  </>
)

const Sidebar: React.FC<SidebarProps> = ({ lists, currentList, onListChange }) => {
  const [user, setUser] = useState<{ name: string; email: string; image: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser()
        setUser(userData)
      } catch (error) {
        console.error("Failed to load user:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = () => {
    console.log("Logout clicked")
    // Add logout logic here if needed
  }

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-green-800 dark:bg-gray-900 text-green-100 p-0">
          <SidebarContent 
            lists={lists} 
            currentList={currentList} 
            onListChange={onListChange} 
            user={user} 
            loading={loading}
            onLogout={handleLogout}
          />
        </SheetContent>
      </Sheet>
      <aside className="hidden md:flex bg-green-800 dark:bg-gray-900 text-green-100 w-64 min-h-screen flex-col">
        <SidebarContent 
          lists={lists} 
          currentList={currentList} 
          onListChange={onListChange} 
          user={user} 
          loading={loading}
          onLogout={handleLogout}
        />
      </aside>
    </>
  )
}

export default Sidebar
