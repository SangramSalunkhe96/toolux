// src/app/api/feedback/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { tool, type, severity, email, message } = await req.json();

    if (!message || !message.trim()) {
      return NextResponse.json(
        { ok: false, error: "Message is required" },
        { status: 400 }
      );
    }

      console.log("=== FEEDBACK SMTP DEBUG ===");
    console.log("SMTP_USER:", process.env.SMTP_USER);
    console.log("SMTP_HOST:", process.env.SMTP_HOST);
    console.log("SMTP_PORT:", process.env.SMTP_PORT);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // smtp.titan.email
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER, // snstudio@toolux.in
        pass: process.env.SMTP_PASS, // Titan mailbox password / app password
      },
    });

    const subject = `[Toolux Feedback] ${type || "Feedback"} (${severity || "Medium"})`;

    const text = [
      `Tool / Area: ${tool || "General"}`,
      `Type: ${type || "Feedback"}`,
      `Severity: ${severity || "Medium"}`,
      `User Email: ${email || "(not provided)"}`,
      "",
      "Message:",
      message,
      "",
      "–––",
      "Sent via Toolux feedback form",
    ].join("\n");

    await transporter.sendMail({
      from: `"Toolux Feedback" <${process.env.SMTP_USER}>`,
      to: "snstudio@toolux.in",
      replyTo: email && email.trim() ? email.trim() : undefined,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Feedback send error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send feedback" },
      { status: 500 }
    );
  }
}



console.log("SMTP user:", process.env.SMTP_USER);
console.log("SMTP host:", process.env.SMTP_HOST, "port:", process.env.SMTP_PORT);
