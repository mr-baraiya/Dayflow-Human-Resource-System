import nodemailer from 'nodemailer'

interface SendEmailParams {
  to: string
  subject: string
  html: string
}

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

// Verify connection configuration
transporter.verify(function (error: any, success: any) {
  if (error) {
    console.error('SMTP connection error:', error)
  } else {
    console.log('SMTP server is ready to send emails')
  }
})

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    const info = await transporter.sendMail({
      from: `"Dayflow HRMS" <${process.env.SMTP_FROM}>`,
      to,
      subject,
      html,
    })

    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export function generatePasswordResetEmail(resetLink: string, userName: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="padding: 40px 40px 30px 40px; text-align: center; border-bottom: 1px solid #e5e5e5;">
                  <h1 style="margin: 0; color: #5b7cff; font-size: 28px; font-weight: 700;">Dayflow HRMS</h1>
                  <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">Human Resource Management System</p>
                </td>
              </tr>
              
              <!-- Body -->
              <tr>
                <td style="padding: 40px;">
                  <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">Reset Your Password</h2>
                  <p style="margin: 0 0 20px 0; color: #666; font-size: 16px; line-height: 1.6;">
                    Hello${userName ? ` ${userName}` : ''},
                  </p>
                  <p style="margin: 0 0 20px 0; color: #666; font-size: 16px; line-height: 1.6;">
                    We received a request to reset your password for your Dayflow HRMS account. Click the button below to create a new password:
                  </p>
                  
                  <!-- Button -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                    <tr>
                      <td align="center">
                        <a href="${resetLink}" style="display: inline-block; padding: 14px 40px; background-color: #5b7cff; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(91, 124, 255, 0.3);">
                          Reset Password
                        </a>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 20px 0 0 0; color: #666; font-size: 14px; line-height: 1.6;">
                    Or copy and paste this link into your browser:
                  </p>
                  <p style="margin: 10px 0 20px 0; padding: 12px; background-color: #f5f5f5; border-radius: 4px; color: #5b7cff; font-size: 14px; word-break: break-all;">
                    ${resetLink}
                  </p>
                  
                  <p style="margin: 20px 0 0 0; color: #999; font-size: 14px; line-height: 1.6;">
                    This link will expire in <strong>1 hour</strong> for security reasons.
                  </p>
                  
                  <div style="margin: 30px 0 0 0; padding: 20px; background-color: #fff8e1; border-left: 4px solid #ffc107; border-radius: 4px;">
                    <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
                      <strong>⚠️ Security Note:</strong> If you didn't request this password reset, please ignore this email or contact support if you have concerns. Your account remains secure.
                    </p>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 30px 40px; background-color: #f9f9f9; border-top: 1px solid #e5e5e5; border-radius: 0 0 8px 8px;">
                  <p style="margin: 0 0 10px 0; color: #999; font-size: 12px; text-align: center; line-height: 1.6;">
                    This email was sent by Dayflow HRMS
                  </p>
                  <p style="margin: 0; color: #999; font-size: 12px; text-align: center;">
                    © ${new Date().getFullYear()} Dayflow HRMS. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

export function generateLeaveApprovalEmail(employeeName: string, leaveType: string, startDate: string, endDate: string, days: number) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
        <tr>
          <td style="padding: 40px 20px;">
            <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <tr>
                <td style="padding: 40px 40px 30px 40px; text-align: center; background: linear-gradient(135deg, #5b7cff 0%, #4a5fd9 100%); border-radius: 8px 8px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Leave Request Approved ✅</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 40px;">
                  <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">
                    Hi <strong>${employeeName}</strong>,
                  </p>
                  <p style="margin: 0 0 30px 0; color: #666; font-size: 16px; line-height: 1.6;">
                    Great news! Your leave request has been <strong style="color: #10b981;">approved</strong>.
                  </p>
                  
                  <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; border-radius: 4px; margin: 30px 0;">
                    <p style="margin: 0 0 10px 0; color: #333; font-size: 14px;"><strong>Leave Type:</strong> ${leaveType}</p>
                    <p style="margin: 0 0 10px 0; color: #333; font-size: 14px;"><strong>Duration:</strong> ${days} day${days > 1 ? 's' : ''}</p>
                    <p style="margin: 0 0 10px 0; color: #333; font-size: 14px;"><strong>From:</strong> ${startDate}</p>
                    <p style="margin: 0; color: #333; font-size: 14px;"><strong>To:</strong> ${endDate}</p>
                  </div>
                  
                  <p style="margin: 20px 0 0 0; color: #666; font-size: 14px; line-height: 1.6;">
                    Enjoy your time off! If you have any questions, please contact HR.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px 40px; background-color: #f9f9f9; border-top: 1px solid #e5e5e5; border-radius: 0 0 8px 8px;">
                  <p style="margin: 0 0 10px 0; color: #999; font-size: 12px; text-align: center;">
                    This email was sent by Dayflow HRMS
                  </p>
                  <p style="margin: 0; color: #999; font-size: 12px; text-align: center;">
                    © ${new Date().getFullYear()} Dayflow HRMS. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

export function generateLeaveRejectionEmail(employeeName: string, leaveType: string, startDate: string, endDate: string, days: number) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
        <tr>
          <td style="padding: 40px 20px;">
            <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <tr>
                <td style="padding: 40px 40px 30px 40px; text-align: center; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); border-radius: 8px 8px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Leave Request Update</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 40px;">
                  <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">
                    Hi <strong>${employeeName}</strong>,
                  </p>
                  <p style="margin: 0 0 30px 0; color: #666; font-size: 16px; line-height: 1.6;">
                    We regret to inform you that your leave request has been <strong style="color: #ef4444;">rejected</strong>.
                  </p>
                  
                  <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; border-radius: 4px; margin: 30px 0;">
                    <p style="margin: 0 0 10px 0; color: #333; font-size: 14px;"><strong>Leave Type:</strong> ${leaveType}</p>
                    <p style="margin: 0 0 10px 0; color: #333; font-size: 14px;"><strong>Duration:</strong> ${days} day${days > 1 ? 's' : ''}</p>
                    <p style="margin: 0 0 10px 0; color: #333; font-size: 14px;"><strong>From:</strong> ${startDate}</p>
                    <p style="margin: 0; color: #333; font-size: 14px;"><strong>To:</strong> ${endDate}</p>
                  </div>
                  
                  <p style="margin: 20px 0 0 0; color: #666; font-size: 14px; line-height: 1.6;">
                    Please contact HR for more information or to discuss alternative dates.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px 40px; background-color: #f9f9f9; border-top: 1px solid #e5e5e5; border-radius: 0 0 8px 8px;">
                  <p style="margin: 0 0 10px 0; color: #999; font-size: 12px; text-align: center;">
                    This email was sent by Dayflow HRMS
                  </p>
                  <p style="margin: 0; color: #999; font-size: 12px; text-align: center;">
                    © ${new Date().getFullYear()} Dayflow HRMS. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}
