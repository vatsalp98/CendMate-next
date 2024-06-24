import { env } from "~/env";
import { Resend } from "resend";
import { otpMailTemplate } from "~/emails/otp-code-mail";

const resend = new Resend(env.RESEND_KEY);

export const sendTwoFactorEmail = async (email: string, token: string) => {
  const result = await resend.emails.send({
    from: "CendMate <donotreply@cendmate.com>",
    to: email,
    subject: "2FA Sign-In Code",
    html: otpMailTemplate(token),
  });
  console.log("RESULT", result);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${env.NEXT_PUBLIC_URL}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "CendMate <donotreply@cendmate.com>",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
};

export const sendVerificationToken = async (email: string, token: string) => {
  const confirmLink = `${env.NEXT_PUBLIC_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "CendMate <donotreply@cendmate.com>",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
