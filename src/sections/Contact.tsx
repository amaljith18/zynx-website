import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CircleCheck, Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { services } from "../data/content";

type Fields = { name: string; email: string; company: string; service: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", email: "", company: "", service: "", message: "" };

// TODO: replace with your real contact details.
const contactInfo = [
  { Icon: Mail, label: "Email", value: "hello@zynx.com", href: "mailto:hello@zynx.com" },
  { Icon: Phone, label: "Phone", value: "+971 00 000 0000", href: "tel:+971000000000" },
  { Icon: MapPin, label: "Office", value: "Dubai, United Arab Emirates" },
];

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) e.email = "Please enter a valid email address.";
  if (!f.service) e.service = "Choose the area you need help with.";
  if (f.message.trim().length < 10) e.message = "Tell us a little more (10+ characters).";
  return e;
}

const inputCls =
  "w-full rounded-xl border bg-ink/60 px-4 py-3.5 text-[15px] text-white placeholder:text-white/30 transition-colors outline-none focus:border-brand focus:bg-ink";

export default function Contact() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    // TODO: connect to your backend / form service (e.g. POST /api/contact).
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
    setFields(empty);
  };

  const field = (k: keyof Fields) => ({
    id: `contact-${k}`,
    name: k,
    value: fields[k],
    onChange: set(k),
    "aria-invalid": Boolean(errors[k]),
    "aria-describedby": errors[k] ? `contact-${k}-err` : undefined,
    className: `${inputCls} ${errors[k] ? "border-red-400/70" : "border-white/10"}`,
  });

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`contact-${k}-err`} className="mt-1.5 text-[13px] text-red-300">
        {errors[k]}
      </p>
    ) : null;

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(29,203,87,0.14),transparent_65%)]"
      />
      <div className="relative mx-auto grid max-w-[1320px] gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <SectionHeading
            index="07"
            eyebrow="Contact & Enquiries"
            title={
              <>
                Let's build what's <span className="text-gradient">next.</span>
              </>
            }
            description="Tell us about your goals. A specialist will get back to you within one business day."
          />
          <ul className="mt-12 grid gap-3">
            {contactInfo.map(({ Icon, label, value, href }) => {
              const body = (
                <>
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-brand">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block text-[12px] tracking-[0.14em] text-muted uppercase">{label}</span>
                    <span className="block font-display text-[16px] text-white">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a href={href} className="flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-white/[0.03]">
                      {body}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-2">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="glass relative rounded-[28px] p-6 sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid min-h-[420px] place-items-center text-center"
                  role="status"
                >
                  <div>
                    <CircleCheck className="mx-auto h-14 w-14 text-brand" strokeWidth={1.5} />
                    <h3 className="mt-6 font-display text-[28px] font-semibold tracking-tight text-white">
                      Thank you — message received.
                    </h3>
                    <p className="mt-3 text-muted">We'll be in touch within one business day.</p>
                    <Button variant="ghost" className="mt-8" onClick={() => setStatus("idle")}>
                      Send another enquiry
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <div>
                    <label htmlFor="contact-name" className="mb-2 block text-[13.5px] text-white/80">
                      Full name *
                    </label>
                    <input {...field("name")} autoComplete="name" placeholder="Your name" />
                    {err("name")}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-2 block text-[13.5px] text-white/80">
                      Work email *
                    </label>
                    <input {...field("email")} type="email" autoComplete="email" placeholder="you@company.com" />
                    {err("email")}
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="mb-2 block text-[13.5px] text-white/80">
                      Company
                    </label>
                    <input {...field("company")} autoComplete="organization" placeholder="Company name" />
                  </div>
                  <div>
                    <label htmlFor="contact-service" className="mb-2 block text-[13.5px] text-white/80">
                      I'm interested in *
                    </label>
                    <select {...field("service")} className={`${field("service").className} appearance-none`}>
                      <option value="" disabled>
                        Select a service
                      </option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id} className="bg-ink">
                          {s.title}
                        </option>
                      ))}
                      <option value="multiple" className="bg-ink">
                        Multiple / not sure yet
                      </option>
                    </select>
                    {err("service")}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-message" className="mb-2 block text-[13.5px] text-white/80">
                      How can we help? *
                    </label>
                    <textarea {...field("message")} rows={5} placeholder="A few lines about your project, timeline and goals." />
                    {err("message")}
                  </div>
                  <div className="flex flex-col items-start justify-between gap-4 sm:col-span-2 sm:flex-row sm:items-center">
                    <p className="text-[13px] text-muted">We never share your details.</p>
                    <Button
                      type="submit"
                      disabled={status === "sending"}
                      icon={<ArrowRight className="h-4 w-4" />}
                    >
                      {status === "sending" ? "Sending…" : "Send enquiry"}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
