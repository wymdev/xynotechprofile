"use client";

import { useEffect, useState } from "react";

/*
 * Contact details are assembled in the browser, so the email address and phone number
 * never appear in the static HTML that scrapers and address harvesters download.
 * Visitors with JavaScript see normal, clickable links.
 */
const EMAIL_PARTS = ["support", "xynotechmm", "com"];
const PHONE_PARTS = ["+95", "9", "4543", "7511", "6"];

export const getEmail = () => `${EMAIL_PARTS[0]}@${EMAIL_PARTS[1]}.${EMAIL_PARTS[2]}`;
const getPhone = () => PHONE_PARTS.join(" ");
const getTel = () => PHONE_PARTS.join("");

type Kind = "email" | "phone";
type Props = {
  kind: Kind;
  variant?: "plain" | "card" | "icon";
  className?: string;
  label?: string;
};

const FALLBACK: Record<Kind, string> = {
  email: "support [at] xynotechmm [dot] com",
  phone: "+95 9 4543 …",
};

export default function ProtectedContact({ kind, variant = "plain", className, label }: Props) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const text = ready ? (kind === "email" ? getEmail() : getPhone()) : FALLBACK[kind];
  const href = ready ? (kind === "email" ? `mailto:${getEmail()}` : `tel:${getTel()}`) : undefined;
  const icon = kind === "email" ? "fas fa-envelope" : "fas fa-phone";

  if (variant === "icon") {
    return (
      <a href={href} className={className} aria-label={label ?? (kind === "email" ? "Email XynoTech" : "Call XynoTech")}>
        <i className={kind === "email" ? "fas fa-at" : icon} />
      </a>
    );
  }

  if (variant === "card") {
    return (
      <a className={`contact-card ${className ?? ""}`} href={href}>
        <span className="contact-icon">
          <i className={icon} />
        </span>
        <span>
          <small>{label}</small>
          {text}
        </span>
      </a>
    );
  }

  return (
    <a className={className} href={href}>
      {text}
    </a>
  );
}
