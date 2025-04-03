export const forgetPasswordTemplate = (otp) => {
  return `
  <div style="max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center;">
    <h2 style="color: #333;">Reset Your Password</h2>
    <p style="color: #555;">Use the OTP below to reset your password. This OTP is valid for 1 hour.</p>
    <div style="font-size: 24px; font-weight: bold; color: #ff6600; margin: 20px 0;">${otp}</div>
    <p style="color: #777;">If you did not request a password reset, please ignore this email.</p>
    <div style="margin-top: 20px; font-size: 12px; color: #666;">&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</div>
  </div>
  `;
};
