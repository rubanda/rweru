import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  onClick?: () => void;
  className?: string;
  tone?: "light" | "dark";
};

export function Logo({
  href = "/",
  onClick,
  className,
  tone = "light",
}: LogoProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="RweruSynapse home"
      className={cn(
        "font-sans text-[0.95rem] font-bold uppercase leading-none tracking-[0.08em] transition-opacity hover:opacity-80 sm:text-[1.05rem]",
        tone === "light" ? "text-slate" : "text-ivory",
        className
      )}
    >
      Rweru
      <span className="mx-[0.08em] font-normal opacity-50" aria-hidden>
        \
      </span>
      Synapse
    </Link>
  );
}
