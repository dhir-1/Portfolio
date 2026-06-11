import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const submitContactForm = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email address"),
      subject: z.string().min(1, "Subject is required"),
      message: z.string().min(1, "Message is required"),
    })
  )
  .handler(async ({ data }) => {
    // 1. Log to server console so the developer can see it works
    console.log("\n========================================");
    console.log("📨 NEW CONTACT FORM SUBMISSION RECEIVED");
    console.log("----------------------------------------");
    console.log(`From:    ${data.name} <${data.email}>`);
    console.log(`Subject: ${data.subject}`);
    console.log(`Message:\n${data.message}`);
    console.log("========================================\n");

    const resendKey = process.env.RESEND_API_KEY;
    const web3formsKey = process.env.VITE_WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_ACCESS_KEY;

    // 2. Try Resend if API key is provided
    if (resendKey) {
      try {
        console.log("Attempting to send email via Resend API...");
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: "dhiragrawal17@gmail.com",
            subject: `Portfolio: ${data.subject}`,
            html: `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
                     <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; color: #111;">New Portfolio Message</h2>
                     <p><strong>Name:</strong> ${data.name}</p>
                     <p><strong>Email:</strong> ${data.email}</p>
                     <p><strong>Subject:</strong> ${data.subject}</p>
                     <p><strong>Message:</strong></p>
                     <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${data.message}</div>
                   </div>`,
          }),
        });

        if (res.ok) {
          console.log("Email sent successfully via Resend.");
          return {
            success: true,
            method: "resend",
            message: "Email sent successfully!",
          };
        } else {
          const errText = await res.text();
          console.error(`Resend API returned status ${res.status}: ${errText}`);
        }
      } catch (err) {
        console.error("Resend API error:", err);
      }
    }

    // 3. Try Web3Forms if Access Key is provided
    if (web3formsKey) {
      try {
        console.log("Attempting to send email via Web3Forms API...");
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
          }),
        });

        const result = await res.json();
        if (res.ok && result.success) {
          console.log("Email sent successfully via Web3Forms.");
          return {
            success: true,
            method: "web3forms",
            message: "Email sent successfully via Web3Forms!",
          };
        } else {
          console.error("Web3Forms API returned error:", result);
        }
      } catch (err) {
        console.error("Web3Forms API error:", err);
      }
    }

    // 4. Default: local log response
    console.log("Demo/Console Mode: Setup RESEND_API_KEY or VITE_WEB3FORMS_ACCESS_KEY in .env to receive emails.");
    return {
      success: true,
      method: "console",
      message: "Message logged successfully! (Demo Mode: Please configure environment keys to receive emails in your inbox)",
    };
  });
