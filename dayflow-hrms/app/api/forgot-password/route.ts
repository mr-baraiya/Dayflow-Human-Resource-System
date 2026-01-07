import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, generatePasswordResetEmail } from '@/lib/email'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if user exists in localStorage (simulate server-side check)
    // In production, you'd check your database here
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = Date.now() + 3600000 // 1 hour from now

    // Store reset token (in production, store in database)
    // For now, we'll create a reset link
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const resetLink = `${appUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`

    // Generate email HTML
    const emailHtml = generatePasswordResetEmail(resetLink, '')

    // Send email
    const result = await sendEmail({
      to: email,
      subject: 'Reset Your Dayflow HRMS Password',
      html: emailHtml,
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Password reset email sent successfully',
      })
    } else {
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
