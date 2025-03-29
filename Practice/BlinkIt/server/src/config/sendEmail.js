import { Resend } from "resend";
import { ENV_VARIABLES } from "../utils/env.js";

const resend = new Resend(ENV_VARIABLES.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "BlinkIt <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      return console.error({ error });
    }

    console.log({ data });
  } catch (error) {
    console.log(error);
  }
};
