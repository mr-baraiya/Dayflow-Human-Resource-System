"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { initializeDefaultAdmin } from "@/lib/local-storage"

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Initialize default admin on component mount
  useEffect(() => {
    initializeDefaultAdmin()
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validate inputs
    if (!email || !password) {
      setError("Please enter both email and password")
      setIsLoading(false)
      return
    }

    setTimeout(() => {
      const users = localStorage.getItem("users")
      if (users) {
        const userList = JSON.parse(users)
        const user = userList.find((u: any) => u.email === email && u.password === password)

        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user))

          if (user.role === "admin") {
            window.location.href = "/admin/dashboard"
          } else {
            window.location.href = "/employee/dashboard"
          }
        } else {
          setError("Invalid email or password")
          setIsLoading(false)
        }
      } else {
        setError("No users found. Please contact your administrator.")
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <Card className="w-full max-w-md border-border relative z-10 shadow-2xl shadow-primary/5">
        <CardHeader className="space-y-6 text-center pb-8">
          <div className="flex justify-center">
            <Logo size={60} showText={false} />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Dayflow HRMS</CardTitle>
            <CardDescription className="text-muted-foreground mt-3 text-base">
              Sign in to your account to continue
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-accent border-border h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <a href="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-accent border-border h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive font-medium">{error}</p>
              </div>
            )}
            <Button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Don't have an account?{" "}
              <a href="/signup" className="text-primary hover:underline font-medium">
                Sign Up
              </a>
            </p>
            <p className="mt-2">
              <a href="/" className="text-muted-foreground hover:text-primary">
                ← Back to Home
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
