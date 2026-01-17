// src/lib/email.ts
import nodemailer from "nodemailer";

export function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "Missing SMTP env vars. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env.local"
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = SSL
    auth: { user, pass },
  });
}

export async function sendContactEmail(input: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  if (!to || !from) {
    throw new Error(
      "Missing CONTACT_TO_EMAIL or SMTP_FROM. Set them in .env.local"
    );
  }

  const transporter = getTransporter();

  const safeSubject = input.subject?.trim() || "New Contact Message (Tereto)";

  await transporter.sendMail({
    from,
    to,
    replyTo: input.email,
    subject: safeSubject,
    text: `
New message from Tereto website:

Name: ${input.name}
Email: ${input.email}
Subject: ${input.subject || "(none)"}

Message:
${input.message}
`.trim(),
    html: `
      <h2>New message from Tereto website</h2>
      <p><b>Name:</b> ${escapeHtml(input.name)}</p>
      <p><b>Email:</b> ${escapeHtml(input.email)}</p>
      <p><b>Subject:</b> ${escapeHtml(input.subject || "(none)")}</p>
      <p><b>Message:</b></p>
      <pre style="white-space:pre-wrap;font-family:ui-sans-serif,system-ui">${escapeHtml(
        input.message
      )}</pre>
    `,
  });
}

// tiny helper to avoid HTML injection in the email
function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
