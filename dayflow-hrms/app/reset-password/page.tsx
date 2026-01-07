"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const email = searchParams.get('email')
  const { toast } = useToast()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!token || !email) {
      setError("Invalid reset link")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        toast({
          title: "Password reset successful",
          description: "You can now sign in with your new password",
        })
      } else {
        setError(data.error || "Failed to reset password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <Card className="w-full max-w-md border-border relative z-10 shadow-2xl shadow-primary/5">
          <CardHeader className="space-y-6 text-center pb-8">
            <div className="flex justify-center">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/10 ring-1 ring-green-500/20">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
            </div>
            <div>
              <CardTitle className="text-3xl font-bold tracking-tight">Password Reset Successful</CardTitle>
              <CardDescription className="text-muted-foreground mt-3 text-base">
                Your password has been successfully updated
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pb-8">
            <Link href="/" className="block">
              <Button className="w-full h-11 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 font-medium">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sign In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
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
            <CardTitle className="text-3xl font-bold tracking-tight">Create New Password</CardTitle>
            <CardDescription className="text-muted-foreground mt-3 text-base">
              Enter your new password below
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                New Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-accent border-border h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {isLoading ? "Resetting password..." : "Reset Password"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-primary hover:underline font-medium inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
