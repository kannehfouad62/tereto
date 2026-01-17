// src/lib/contact/actions.ts
"use server";

import { prisma } from "@/lib/db/prisma";
import { sendContactEmail } from "@/lib/email";

export type ContactActionResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitContactAction(
  formData: FormData
): Promise<ContactActionResult> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return { ok: false, message: "Name, email, and message are required." };
  }
  if (!isValidEmail(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  try {
    // Save to DB
    await prisma.contactMessage.create({
      data: { name, email, subject: subject || null, message },
    });

    // Send email notification
    await sendContactEmail({ name, email, subject, message });

    return { ok: true, message: "Message sent! We’ll get back to you soon." };
  } catch (err) {
    console.error("Contact form error:", err);
    return {
      ok: false,
      message:
        "We could not send your message right now. Please try again later.",
    };
  }
}
