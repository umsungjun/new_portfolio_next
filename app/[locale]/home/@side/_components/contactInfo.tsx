"use client";

import { useState } from "react";

import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

interface ContactInfoProps {
  value: string;
  type: "phone" | "email";
}

/**
 * Renders a button that reveals masked contact information on first click and copies the full value on subsequent clicks.
 *
 * When revealed, the value is shown in monospace and a clipboard icon appears; after a successful copy the icon changes to a check for 2 seconds.
 *
 * @param value - The contact string to display (phone number or email).
 * @param type - "phone" to mask a hyphenated phone number's middle segment, "email" to mask an email's local part.
 * @returns The button element that displays, reveals, and copies the contact information.
 */
export default function ContactInfo({ value, type }: ContactInfoProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const maskValue = (val: string) => {
    if (type === "phone") {
      // 010-1234-5678 -> 010-****-5678
      const parts = val.split("-");
      if (parts.length === 3) {
        return `${parts[0]}-****-${parts[2]}`;
      }
    } else {
      // example@email.com -> exa***@email.com
      const [localPart, domain] = val.split("@");
      if (localPart && domain) {
        const visiblePart = localPart.slice(0, 3);
        return `${visiblePart}*******@${domain}`;
      }
    }
    return val;
  };

  const handleClick = async () => {
    if (!isVisible) {
      setIsVisible(true);
    } else {
      try {
        await navigator.clipboard.writeText(value);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="mt-2 text-lg flex items-center gap-2 group hover:text-blue-500 transition-colors"
      title={isVisible ? "클릭하여 복사" : "클릭하여 보기"}
    >
      <span className="font-mono">{isVisible ? value : maskValue(value)}</span>
      {isVisible && (
        <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          {isCopied ? (
            <ClipboardDocumentCheckIcon className="size-5 text-purple-500" />
          ) : (
            <ClipboardDocumentIcon className="size-5" />
          )}
        </span>
      )}
    </button>
  );
}