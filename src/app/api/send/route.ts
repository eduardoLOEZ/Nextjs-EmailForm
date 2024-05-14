"use server";

import { Resend } from "resend";
import { validateString } from "@/app/utils/utils";

const resend = new Resend(process.env.RESEDN_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const username = formData.get("name");
  const message = formData.get("message");
  const senderEmail = formData.get("email");

  if (!validateString(message, 5000)) {
    return {
      error: "invalid message",
    };
  }

  if (!validateString(senderEmail, 5000)) {
    return {
      error: "invalid sender email",
    };
  }

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: "loezaali39@gmail.com",
    subject: "Aysnc Desarrollo Web y Apps",
    text: `Mensaje enviado por ${username} (${senderEmail}):\n${
      message as string
    }`,
    reply_to: senderEmail as string,
  });
};
