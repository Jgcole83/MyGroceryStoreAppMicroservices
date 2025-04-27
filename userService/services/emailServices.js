// /userService/services/emailService.js

const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',  // Use your preferred service
      auth: {
        user: 'your-email@gmail.com',  // Replace with your real email
        pass: 'your-email-password'     // Replace with your email password
      }
    });
  }

  // Method to send the password reset email
  sendPasswordResetEmail(to, resetLink) {
    const mailOptions = {
      from: 'your-email@gmail.com',  // Replace with your real email
      to,
      subject: 'Reset Password',
      text: `Click the link to reset your password: ${resetLink}`
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (err) => {
        if (err) reject('Failed to send reset email');
        else resolve('Reset email sent');
      });
    });
  }
}

module.exports = new EmailService();
