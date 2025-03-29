export const verifyEmailTemplate = (name, url) => {
  return `
     <div style="max-width: 600px; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin: auto;">
        
        <h2 style="color: #333;">Hello ${name},</h2>
        
        <p style="font-size: 16px; color: #555;">
            Thank you for signing up with <strong>BlinkIt</strong>! 🎉  
            Before you start shopping for groceries, please verify your email address.
        </p>

        <p style="margin: 20px 0;">
            <a href=${url} style="background-color: #28a745; color: #ffffff; padding: 12px 20px; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px; display: inline-block;">
                👉 Verify My Email
            </a>
        </p>

        <p style="font-size: 14px; color: #777;">
            If you didn’t sign up, please ignore this email.
        </p>

        <p style="font-size: 16px; color: #555;">
            Looking forward to delivering fresh groceries to your doorstep! 🚀
        </p>

        <p style="font-size: 16px; color: #333; font-weight: bold;">
            Best,<br> 
            <span style="color: #28a745;">BlinkIt Team</span>
        </p>

    </div>
    `;
};
