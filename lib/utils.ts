import * as z from "zod"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const protocol =
  process.env.NODE_ENV === 'production' ? 'https' : 'http';
export const rootDomain =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return email;

  const [username, domain] = email.split("@");

  if (username.length <= 4) {
    return `${username}@${domain}`;
  }

  const visiblePart = username.slice(0, 4);
  const lastChar = username.slice(-1);
  const maskedLength = username.length - 5;

  const middleMask = maskedLength > 0 ? "*".repeat(maskedLength) : "";

  return `${visiblePart}${middleMask}${lastChar}@${domain}`;
}

export const passwordSchema = z.string()
  .min(8, "At least 8 characters")
  .regex(/[A-Z]/, "At least 1 uppercase")
  .regex(/[a-z]/, "At least 1 lower case")
  .regex(/[0-9]/, "At least 1 number")
  .regex(/[^A-Za-z0-9]/, "Atleast 1 symbol");