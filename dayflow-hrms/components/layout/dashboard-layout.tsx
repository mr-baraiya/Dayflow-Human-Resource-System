"use client"
import type React from "react"
import { Sidebar } from "./sidebar"
import { Navbar } from "./navbar"
import { useState, useEffect } from "react"
import { getCurrentUserProfileImage } from "@/lib/user-utils"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "admin" | "employee"
  userName: string
  userEmail: string
}

export function DashboardLayout({ children, role, userName, userEmail }: DashboardLayoutProps) {
  const [profileImage, setProfileImage] = useState<string>("")

  useEffect(() => {
    // Load profile image from localStorage
    const image = getCurrentUserProfileImage()
    if (image) {
      setProfileImage(image)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar role={role} />
      <Navbar role={role} userName={userName} userEmail={userEmail} profileImage={profileImage} />
      <main className="ml-64 mt-16 p-6">{children}</main>
    </div>
  )
}
