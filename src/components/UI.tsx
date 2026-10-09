import { ReactNode } from "react";

export type IconName = "arrow-left" | "bag" | "check" | "chevron" | "close" | "heart" | "menu" | "minus" | "moon" | "plus" | "search" | "sun";

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    "arrow-left": <path d="m15 18-6-6 6-6" />,
    bag: <><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    close: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    minus: <path d="M5 12h14" />,
    moon: <path d="M20.5 14.2A8 8 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  };
  return (
    <svg aria-hidden="true" className="icon" fill="none" height={size} viewBox="0 0 24 24" width={size}>
      {paths[name]}
    </svg>
  );
}

export function ImagePlaceholder({ tone = "sand", className = "", label = "Image placeholder" }: { tone?: string; className?: string; label?: string; }) {
  return (
    <div aria-label={label} className={`photo-placeholder tone-${tone} ${className}`} role="img">
      <span className="photo-arch" />
      <span className="photo-figure"><i /></span>
      <span className="photo-label">IMAGE</span>
    </div>
  );
}

export function formatPrice(price: number) {
  return `KSh ${price.toLocaleString("en-KE")}`;
}
