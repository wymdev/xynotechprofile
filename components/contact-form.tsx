"use client";

import { useState, type FormEvent } from "react";

const EMAIL = "support@xynotechmm.com";
const INTERESTS = ["Web platform", "Mobile app", "Data & BI", "AI", "Consulting"];

/**
 * The site is a static export with no backend, so the form opens the visitor's
 * email app with everything pre-filled instead of pretending to send.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<{ kind: "" | "ok" | "err"; text: string }>({ kind: "", text: "" });
  const [invalid, setInvalid] = useState<string[]>([]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) || "").trim();
    const bad = ["name", "email", "subject", "message"].filter((k) => !get(k));
    if (get("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) bad.push("email");
    setInvalid(bad);
    if (bad.length) {
      setStatus({ kind: "err", text: "Please fill in the highlighted fields." });
      return;
    }
    const interests = fd.getAll("interest").join(", ");
    const header = [`Name: ${get("name")}`, `Email: ${get("email")}`];
    if (interests) header.push(`Interested in: ${interests}`);
    const bodyText = `${header.join("\n")}\n\n${get("message")}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(get("subject"))}&body=${encodeURIComponent(bodyText)}`;
    setStatus({ kind: "ok", text: `Your email app should open with the message ready — just hit send. If nothing opens, write to ${EMAIL}.` });
  };

  const cls = (k: string) => `field${invalid.includes(k) ? " invalid" : ""}`;

  return (
    <form className="contact-form" noValidate onSubmit={submit}>
      <h3>Send us a message</h3>
      <div className="form-row">
        <label className={cls("name")}>
          <input type="text" name="name" required placeholder=" " autoComplete="name" />
          <span>Full name</span>
        </label>
        <label className={cls("email")}>
          <input type="email" name="email" required placeholder=" " autoComplete="email" />
          <span>Email</span>
        </label>
      </div>
      <fieldset className="field-chips">
        <legend>I&apos;m interested in</legend>
        {INTERESTS.map((v) => (
          <label key={v}>
            <input type="checkbox" name="interest" value={v} />
            <span>{v}</span>
          </label>
        ))}
      </fieldset>
      <label className={cls("subject")}>
        <input type="text" name="subject" required placeholder=" " />
        <span>Subject</span>
      </label>
      <label className={cls("message")}>
        <textarea name="message" rows={4} required placeholder=" " />
        <span>Tell us about your project</span>
      </label>
      <button type="submit" className="btn btn-primary btn-lg btn-block magnetic">
        <span>Send message</span>
        <i className="fas fa-paper-plane" />
      </button>
      <p className={`form-status ${status.kind}`} role="status" aria-live="polite">
        {status.text}
      </p>
    </form>
  );
}
