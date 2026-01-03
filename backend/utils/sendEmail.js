const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send email function
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `Dayflow HRMS <${process.env.SMTP_FROM}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

// Send password reset email
const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${user.Email}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
        .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Password Reset Request</h1>
        </div>
        <div class="content">
          <p>Hello <strong>${user.FullName}</strong>,</p>
          
          <p>We received a request to reset the password for your Dayflow HRMS account associated with <strong>${user.Email}</strong>.</p>
          
          <p>Click the button below to reset your password:</p>
          
          <center>
            <a href="${resetUrl}" class="button">Reset Password</a>
          </center>
          
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; background: #fff; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
            ${resetUrl}
          </p>
          
          <div class="warning">
            <strong>⚠️ Important:</strong>
            <ul>
              <li>This link will expire in <strong>15 minutes</strong></li>
              <li>If you didn't request this, please ignore this email</li>
              <li>Your password will remain unchanged</li>
            </ul>
          </div>
          
          <p><strong>Your Reset Token:</strong> <code style="background: #e9ecef; padding: 5px 10px; border-radius: 3px;">${resetToken}</code></p>
          
          <p>Best regards,<br><strong>Dayflow HRMS Team</strong></p>
        </div>
        <div class="footer">
          <p>This is an automated email. Please do not reply.</p>
          <p>&copy; 2026 Dayflow HRMS. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    Password Reset Request
    
    Hello ${user.FullName},
    
    We received a request to reset the password for your Dayflow HRMS account.
    
    Reset Token: ${resetToken}
    
    Reset Link: ${resetUrl}
    
    This link will expire in 15 minutes.
    
    If you didn't request this, please ignore this email.
    
    Best regards,
    Dayflow HRMS Team
  `;

  return await sendEmail({
    to: user.Email,
    subject: '🔐 Password Reset Request - Dayflow HRMS',
    html,
    text
  });
};

// Send password reset success email
const sendPasswordResetSuccessEmail = async (user) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .success { background: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Password Reset Successful</h1>
        </div>
        <div class="content">
          <p>Hello <strong>${user.FullName}</strong>,</p>
          
          <div class="success">
            <p><strong>✅ Your password has been successfully reset!</strong></p>
          </div>
          
          <p>Your Dayflow HRMS account password was changed on <strong>${new Date().toLocaleString()}</strong>.</p>
          
          <p>You can now log in to your account using your new password.</p>
          
          <p><strong>Login URL:</strong> ${process.env.FRONTEND_URL}/login</p>
          
          <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
            <p><strong>⚠️ Security Notice:</strong></p>
            <p>If you did not make this change, please contact your administrator immediately.</p>
          </div>
          
          <p>Best regards,<br><strong>Dayflow HRMS Team</strong></p>
        </div>
        <div class="footer">
          <p>This is an automated email. Please do not reply.</p>
          <p>&copy; 2026 Dayflow HRMS. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    Password Reset Successful
    
    Hello ${user.FullName},
    
    Your password has been successfully reset!
    
    Your Dayflow HRMS account password was changed on ${new Date().toLocaleString()}.
    
    You can now log in to your account using your new password.
    
    If you did not make this change, please contact your administrator immediately.
    
    Best regards,
    Dayflow HRMS Team
  `;

  return await sendEmail({
    to: user.Email,
    subject: '✅ Password Reset Successful - Dayflow HRMS',
    html,
    text
  });
};

module.exports = {
  sendEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail
};
