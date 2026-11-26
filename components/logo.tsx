import Link from "next/link";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/brand";

type MarkProps = {
  className?: string;
  "aria-label"?: string;
};

/**
 * Primary circular crescent mark for flagship RweruSynapse touchpoints.
 */
export function CrescentMark({ className, "aria-label": ariaLabel }: MarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
      className={cn("shrink-0", className)}
    >
      <path
        d="M31.2 24.8C47.9 11.4 72.3 13.8 86.1 30.3C92.3 37.7 95.6 46.8 96.0 56.2C92.7 38.6 77.3 25.3 58.7 25.3C47.8 25.3 37.9 29.9 31.0 37.3C30.4 33.1 30.5 28.9 31.2 24.8Z"
        fill="currentColor"
      />
      <path
        d="M82.4 43.2C87.4 64.6 74.2 86.1 52.8 91.1C43.4 93.3 33.7 92.0 25.3 87.7C42.4 93.1 61.2 85.8 70.5 69.8C76.0 60.4 76.9 49.5 73.8 39.8C77.0 40.7 79.8 41.8 82.4 43.2Z"
        fill="currentColor"
      />
      <path
        d="M40.8 78.6C19.7 72.2 7.8 49.9 14.2 28.8C17.0 19.6 22.9 11.9 30.8 6.9C17.6 19.1 14.6 39.1 23.9 55.1C29.4 64.5 38.4 70.8 48.3 72.9C45.8 75.1 43.3 77.0 40.8 78.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Compact R/S monogram seal for product footers and merchandise.
 */
export function RsBadgeMark({ className, "aria-label": ariaLabel }: MarkProps) {
  return (
    <svg
      viewBox="0 0 84 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
      className={cn("shrink-0", className)}
    >
      <path
        d="M8 50V12H23.5C30.4 12 35 16.2 35 22.6C35 27.7 32.0 31.4 27.1 32.7L36.2 50H29.4L21.0 33.6H14.0V50H8ZM14.0 28.4H23.0C26.8 28.4 29.0 26.2 29.0 22.6C29.0 19.0 26.8 17.0 23.0 17.0H14.0V28.4Z"
        fill="currentColor"
      />
      <path d="M51.5 8H57.2L39.8 56H34.1L51.5 8Z" fill="currentColor" />
      <path
        d="M66.2 50.6C58.8 50.6 53.8 46.8 53.2 40.8H59.2C59.8 43.9 62.4 45.6 66.4 45.6C70.4 45.6 73.0 43.7 73.0 40.7C73.0 38.0 71.1 36.5 66.8 35.5L62.6 34.5C56.6 33.1 54.0 29.9 54.0 25.0C54.0 18.8 59.0 14.6 66.1 14.6C73.0 14.6 77.7 18.4 78.3 24.1H72.4C71.8 21.2 69.5 19.5 66.0 19.5C62.3 19.5 59.9 21.4 59.9 24.4C59.9 27.0 61.7 28.4 65.8 29.4L70.0 30.4C76.4 31.9 79.0 35.1 79.0 40.3C79.0 46.6 73.8 50.6 66.2 50.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

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
      aria-label={`${brand.company} home`}
      className={cn(
        "inline-flex items-center gap-2.5 font-sans text-[0.95rem] font-bold uppercase leading-none tracking-[0.08em] transition-opacity hover:opacity-80 sm:text-[1.05rem]",
        tone === "light" ? "text-slate" : "text-ivory",
        className
      )}
    >
      <CrescentMark className="size-6 sm:size-7" />
      <span>
        Rweru
        <span className="mx-[0.08em] font-normal opacity-50" aria-hidden>
          \
        </span>
        Synapse
      </span>
    </Link>
  );
}
