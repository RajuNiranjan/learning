import { RESEND_API_KEY } from "../utils/envVar.js";
import { Resend } from "resend";

const resend = new Resend(RESEND_API_KEY);

export const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Blinkit <onboarding@resend.dev>",
      to: sendTo,
      subject,
      html,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
