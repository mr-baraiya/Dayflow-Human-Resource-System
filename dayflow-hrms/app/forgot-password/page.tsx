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
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Check if user exists locally first
      const users = localStorage.getItem("users")
      if (users) {
        const userList = JSON.parse(users)
        const user = userList.find((u: any) => u.email === email)

        if (!user) {
          setError("No account found with this email address")
          setIsLoading(false)
          return
        }
      } else {
        setError("No account found with this email address")
        setIsLoading(false)
        return
      }

      // Send reset email via API
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        toast({
          title: "Reset link sent!",
          description: "Check your email for password reset instructions",
        })
      } else {
        setError(data.error || "Failed to send reset email. Please try again.")
      }
    } catch (err) {
      console.error('Forgot password error:', err)
      setError("An error occurred. Please try again later.")
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
              <CardTitle className="text-3xl font-bold tracking-tight">Check your email</CardTitle>
              <CardDescription className="text-muted-foreground mt-3 text-base">
                We've sent password reset instructions to <span className="font-semibold text-foreground">{email}</span>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pb-8">
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-accent/50 border border-border">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If you don't see the email, check your spam folder or try again with a different email address.
                </p>
              </div>
              <Link href="/" className="block">
                <Button className="w-full h-11 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 font-medium">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Sign In
                </Button>
              </Link>
            </div>
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
            <CardTitle className="text-3xl font-bold tracking-tight">Reset your password</CardTitle>
            <CardDescription className="text-muted-foreground mt-3 text-base">
              Enter your email address and we'll send you instructions to reset your password
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleResetPassword} className="space-y-5">
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
              {isLoading ? "Sending reset link..." : "Send reset link"}
            </Button>
          </form>
          <div className="mt-6 text-center space-y-2">
            <Link href="/login" className="text-sm text-primary hover:underline font-medium inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Link>
            <div>
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                ← Back to Home
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
