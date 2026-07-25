import Link from "next/link";
import { LucideIcon } from "lucide-react";

type BaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  icon?: LucideIcon;
  className?: string;
};

type LinkProps = BaseProps & { href: string; onClick?: never };
type ButtonProps = BaseProps & {
  href?: undefined;
  onClick: () => void;
  type?: "button" | "submit";
};

type Props = LinkProps | ButtonProps;

export default function GoldButton(props: Props) {
  const { children, variant = "primary", icon: Icon, className = "" } = props;
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm sm:text-base font-medium tracking-wide transition-all duration-200 active:scale-[0.97]";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-b from-gold-bright to-gold text-ink shadow-gold hover:brightness-110"
      : "border border-gold/50 text-ivory hover:bg-gold/10 hover:border-gold";

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={`${base} ${styles} ${className}`}>
        {Icon && <Icon size={18} strokeWidth={1.75} />}
        {children}
      </Link>
    );
  }

  const { onClick, type = "button" } = props as ButtonProps;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
    >
      {Icon && <Icon size={18} strokeWidth={1.75} />}
      {children}
    </button>
  );
}
