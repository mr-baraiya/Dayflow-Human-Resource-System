"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Settings, User, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Link from "next/link"
import { getCurrentUser, getCurrentUserProfileImage } from "@/lib/user-utils"

interface NavbarProps {
  role: "admin" | "employee"
  userName: string
  userEmail: string
  profileImage?: string
}

export function Navbar({ role, userName, userEmail, profileImage: initialProfileImage }: NavbarProps) {
  const [profileImage, setProfileImage] = useState<string>(initialProfileImage || "")

  useEffect(() => {
    // Load profile image from localStorage
    const loadProfileImage = () => {
      const image = getCurrentUserProfileImage()
      if (image) {
        setProfileImage(image)
      }
    }

    loadProfileImage()

    // Listen for profile image updates
    const handleProfileImageUpdate = () => {
      loadProfileImage()
    }

    window.addEventListener('profileImageUpdated', handleProfileImageUpdate)

    return () => {
      window.removeEventListener('profileImageUpdated', handleProfileImageUpdate)
    }
  }, [initialProfileImage])
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-card/80 backdrop-blur-xl border-b border-border z-10">
      <div className="h-full px-6 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            {role === "admin" ? "Admin Portal" : "Employee Portal"}
          </h2>
          <p className="text-xs text-muted-foreground">Manage your workspace efficiently</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative hover:bg-accent">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-accent transition-all duration-200">
                <div className="text-right">
                  <p className="text-sm font-semibold">{userName}</p>
                  <p className="text-xs text-muted-foreground">{userEmail}</p>
                </div>
                <Avatar className="h-9 w-9 border-2 border-primary/20">
                  {profileImage ? (
                    <AvatarImage src={profileImage} alt={userName} />
                  ) : null}
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    <UserCircle className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href={role === "admin" ? "/admin/profile" : "/employee/profile"}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={() => (window.location.href = "/")}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
