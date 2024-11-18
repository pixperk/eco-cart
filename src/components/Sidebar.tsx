'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { Invite, User } from '@prisma/client'
import { Leaf, LeafIcon, List, LogOut, Moon, ShoppingCart, Sparkles, Sun, UserPlus } from 'lucide-react'
import { useTheme } from "next-themes"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from "react"

interface SidebarProps {
  user: User
  invites: Invite[]
}

const navItems = [
  { href: "/dashboard", icon: List, label: "My Carts" },
  { href: "/dashboard/eco-products", icon: Leaf, label: "Eco Products" },
  { href: "/dashboard/ai-cart", icon: Sparkles, label: "AI Cart" },
  { href: "/dashboard/invites", icon: UserPlus, label: "Invites" },

]

const ModeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-10 h-10 rounded-full bg-green-700/20 hover:bg-green-700/30 dark:bg-gray-800/20 dark:hover:bg-gray-800/30"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

const SidebarContent = ({ user, invites, onNavigate }: SidebarProps & { onNavigate?: () => void }) => {
  const pathname = usePathname()

  const handleNavigation = () => {
    if (onNavigate) onNavigate()
  }

  return (
    <div className="flex flex-col h-full bg-green-800 dark:bg-gray-900">
      <div className="flex items-center justify-between mb-8 px-6 py-4">
        <div className="flex mt-2 items-center space-x-2">
          <LeafIcon className="h-8 w-8 text-green-400" />
          <h1 className="text-2xl font-bold tracking-wide text-green-50">EcoCart</h1>
        </div>
        <ModeToggle />
      </div>

      <nav className="flex-grow px-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={item.href} passHref>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-green-100 hover:text-green-50 hover:bg-green-700/20 dark:hover:bg-gray-800/50",
                          pathname === item.href && "bg-green-700/30 dark:bg-gray-800/30"
                        )}
                        onClick={() => handleNavigation()}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.label}</span>
                        {item.href === "/dashboard/invites" && invites.length > 0 && (
                          <Badge variant="secondary" className="ml-auto bg-green-500 text-white">
                            {invites.length}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 pt-4 border-t border-green-700/30 dark:border-gray-700/30 px-4 pb-6">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-10 w-10 border-2 border-green-400 dark:border-green-600">
            <AvatarImage src={user.picture} alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback className="bg-green-600 text-white">
              {user.firstName[0]}{user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-green-50 truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-green-300 dark:text-gray-400 truncate">
              {user.email}
            </p>
          </div>
        </div>
        <LogoutLink>
          <Button
            variant="ghost"
            className="w-full justify-start text-green-100 hover:text-green-50 hover:bg-green-700/20 dark:hover:bg-gray-800/50"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>Log out</span>
          </Button>
        </LogoutLink>
      </div>
    </div>
  )
}

export default function Sidebar({ user, invites }: SidebarProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 md:hidden">
            <ShoppingCart className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0">
          <SidebarContent user={user} invites={invites} onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
      <aside className="hidden md:flex bg-green-800 dark:bg-gray-900 text-green-100 w-64 min-h-screen flex-col">
        <SidebarContent user={user} invites={invites} />
      </aside>
    </>
  )
}