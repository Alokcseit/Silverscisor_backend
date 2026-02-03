import { mailTransporter } from "./email.util";
import { SendEmailOptions } from "./utils.types";

export const sendEmail = async ({
  to,
  subject,
  html,
}: SendEmailOptions): Promise<void> => {
  await mailTransporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
};
