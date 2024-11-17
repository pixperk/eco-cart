'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Cart, Invite, User } from '@prisma/client'
import { HelpCircle, Leaf, List, LogOut, Mail, Moon, Settings, ShoppingCart, Sparkles, Sun } from 'lucide-react'
import { useTheme } from "next-themes"
import Link from 'next/link'

// Mock data for carts and invites



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

const SidebarContent = ({user, invites}:{user:User, invites:Invite[]}) => {
 
  return (
    <>
      <div className="flex items-center justify-between mb-8 px-4 py-2">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="h-8 w-8 text-green-200" />
          <h1 className="text-2xl font-bold tracking-wide text-green-100">EcoCart</h1>
        </div>
        <ModeToggle />
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
            <Link href="/dashboard/ai-cart" className="flex items-center p-3 rounded-lg hover:bg-green-600 dark:hover:bg-gray-800 transition-colors">
              <Sparkles className="h-5 w-5 mr-3 text-green-100" />
              AI Cart
            </Link>
          </li>
          <li>
            <Link href="/dashboard/invites" className="flex items-center justify-between p-3 rounded-lg hover:bg-green-600 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-green-100" />
                Invites
              </div>
              {invites.length > 0 && (
                <Badge variant="secondary" className="bg-green-500 text-white">
                  {invites.length}
                </Badge>
              )}
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
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="p-0 w-full justify-start hover:bg-transparent">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={user.picture} alt="User Avatar" />
                  <AvatarFallback>{user.firstName[0] || "User"}</AvatarFallback>
                </Avatar>
                <div className="ml-1 mr-1 text-left overflow-hidden">
                  <p className="text-sm font-medium truncatetext-white">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-0 bg-green-50 dark:bg-gray-900">
            <Button 
              variant="ghost" 
              className="w-full justify-start rounded-none h-auto py-3 px-4 text-left hover:bg-green-200 dark:hover:bg-gray-800 transition-colors"
              onClick={() => console.log("Logout clicked")}
            >
              <LogOut className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
              Logout
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}

export default function Sidebar({user, invites}:{user:User, invites:Invite[]}) {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 md:hidden">
            <ShoppingCart className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-green-800 dark:bg-gray-900 text-green-100 p-0">
          <SidebarContent user={user} invites={invites}/>
        </SheetContent>
      </Sheet>
      <aside className="hidden md:flex bg-green-800 dark:bg-gray-900 text-green-100 w-64 min-h-screen flex-col">
        <SidebarContent user={user} invites={invites}/>
      </aside>
    </>
  )
}