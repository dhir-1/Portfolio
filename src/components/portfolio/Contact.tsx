import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { toast } from "sonner";
import { submitContactForm } from "@/lib/api/contact";

const socials = [
  { label: "Email", value: "dhiragrawal17@gmail.com", href: "mailto:dhiragrawal17@gmail.com" },
  { label: "Phone", value: "+91 7779051838", href: "tel:+917779051838" },
  { label: "GitHub", value: "github.com/dhir-1", href: "https://github.com/dhir-1" },
  { label: "LinkedIn", value: "linkedin.com/in/dhir-agrawal21", href: "https://www.linkedin.com/in/dhir-agrawal21/" },
];

export function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    try {
      const response = await submitContactForm({
        data: { name, email, subject, message },
      });

      if (response.success) {
        setSent(true);
        form.reset();
        toast.success(response.message || "Message sent successfully!");
        if (response.method === "console") {
          toast.info("Demo Mode: Messages are logged to the console.", { duration: 6000 });
        }
        setTimeout(() => setSent(false), 4000);
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="contact-section border-t border-border py-24 md:py-32 relative overflow-hidden reveal-on-scroll">
      <div className="absolute inset-0 grain opacity-50 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-5 lg:px-10 relative">
        <div className="font-mono text-[11px] uppercase tracking-widest text-white/50">
          <span className="text-win-blue">§ 06</span> — Contact
        </div>
        <h2 className="mt-6 font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-[-0.03em]">
          Let's make
          <br />
          <em className="italic font-light text-white/70">something good.</em>
        </h2>

        <div className="mt-16 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="text-white/70 text-[15px] leading-relaxed max-w-sm">
              Open to internships, freelance builds, and data analytics work.
              I reply within a day or two.
            </p>

            <ul className="mt-10 space-y-4">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group flex items-baseline justify-between gap-6 py-3 border-t border-white/10 hover:border-white/40 transition-colors"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-widest text-white/50 w-20 shrink-0">
                      {s.label}
                    </span>
                    <span className="font-display text-xl flex-1 truncate">{s.value}</span>
                    <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" />
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="/resume.pdf"
              download
              className="mt-10 inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white text-black font-medium hover:bg-white/90 transition-colors"
            >
              Download Resume (PDF)
            </a>
          </div>

          <form
            onSubmit={onSubmit}
            className="md:col-span-7 space-y-5 bg-white/[0.03] border border-white/10 rounded-xl p-6 md:p-8 backdrop-blur"
          >
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-white/40">
              <span>compose · message</span>
              <span>encrypted</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Name" name="name" placeholder="Your name" />
              <Field label="Email" name="email" type="email" placeholder="you@studio.com" />
            </div>
            <Field label="Subject" name="subject" placeholder="A short headline" />

            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                Message
              </span>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Tell me about the project, timeline, and what success looks like."
                className="mt-2 w-full bg-transparent border border-white/15 rounded-md px-4 py-3 text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-win-blue transition-colors resize-none"
              />
            </label>

            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-[11px] text-white/40">
                {isSending ? "sending · please wait" : sent ? "delivered · thanks" : "ready to send"}
              </span>
              <button
                type="submit"
                disabled={isSending}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-win-blue text-white font-medium hover:brightness-110 disabled:opacity-50 transition"
              >
                {isSending ? (
                  <>Sending...</>
                ) : sent ? (
                  <>
                    <Check className="h-4 w-4" /> Sent
                  </>
                ) : (
                  <>Send message</>
                )}
              </button>
            </div>
          </form>
        </div>

        <footer className="mt-24 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-white/40 uppercase tracking-widest">
          <span>© 2026 · Dhir Agrawal</span>
          <span>Crafted with care · Set in Fraunces & Inter</span>
        </footer>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
        {label}
      </span>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        className="mt-2 w-full bg-transparent border border-white/15 rounded-md px-4 py-3 text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-win-blue transition-colors"
      />
    </label>
  );
}
