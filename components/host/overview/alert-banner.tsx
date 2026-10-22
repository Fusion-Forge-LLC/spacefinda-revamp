import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VARIANTS = {
  danger: { box: "border-red-100 bg-red-50", icon: "bg-white text-red-600", button: "bg-[#CD3A2F] hover:bg-[#CD3A2F]/90" },
  info: { box: "border-blue-100 bg-primary-containers", icon: "bg-white text-primary", button: "" },
};

export default function AlertBanner({
  variant,
  icon: Icon,
  title,
  description,
  action,
}: {
  variant: keyof typeof VARIANTS;
  icon: React.ElementType;
  title: string;
  description: React.ReactNode;
  action: { label: string; href: string };
}) {
  const styles = VARIANTS[variant];
  return (
    <div className={cn("rounded-2xl border p-4 md:p-5", styles.box)}>
      <div className={cn("flex size-8 items-center justify-center rounded-lg", styles.icon)}>
        <Icon className="size-4" strokeWidth={1.5} />
      </div>
      <p className="mt-3 text-sm md:text-base font-medium text-Text-dark">{title}</p>
      <p className="mt-1 text-xs md:text-sm leading-5 text-Text-body-text">{description}</p>
      <Button asChild className={cn("mt-4 h-9 rounded-md px-4", styles.button)}>
        <Link href={action.href}>{action.label}</Link>
      </Button>
    </div>
  );
}
