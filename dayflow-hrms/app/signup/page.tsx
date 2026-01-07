"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import { addUser } from "@/lib/local-storage"
import Link from "next/link"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    employeeId: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "employee" as "employee" | "admin",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    // Add user to localStorage
    const newUser = addUser({
      employeeId: formData.employeeId,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      verified: true, // Auto-verify for demo
    })

    setTimeout(() => {
      if (newUser) {
        alert("Account created successfully! Please sign in.")
        window.location.href = "/"
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <Logo size={48} showText={false} />
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold">Create Account</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">Sign up for Dayflow HRMS</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input
                id="employeeId"
                placeholder="EMP001"
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                required
                className="bg-accent border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-accent border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-accent border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="bg-accent border-border"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign In
              </Link>
            </p>
            <p className="mt-2">
              <Link href="/" className="text-muted-foreground hover:text-primary">
                ← Back to Home
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
