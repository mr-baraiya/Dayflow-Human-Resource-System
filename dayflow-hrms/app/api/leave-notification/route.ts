import { NextResponse } from 'next/server'
import { sendEmail, generateLeaveApprovalEmail, generateLeaveRejectionEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { employeeEmail, employeeName, action, leaveType, startDate, endDate, days } = await request.json()

    if (!employeeEmail) {
      return NextResponse.json(
        { success: false, error: 'Employee email not provided' },
        { status: 400 }
      )
    }

    const emailHtml = action === 'approved'
      ? generateLeaveApprovalEmail(employeeName, leaveType, startDate, endDate, days)
      : generateLeaveRejectionEmail(employeeName, leaveType, startDate, endDate, days)

    const subject = action === 'approved'
      ? '✅ Leave Request Approved'
      : '📋 Leave Request Update'

    const result = await sendEmail({
      to: employeeEmail,
      subject,
      html: emailHtml,
    })

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Email sent successfully' })
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error sending leave notification:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to send email' },
      { status: 500 }
    )
  }
}
