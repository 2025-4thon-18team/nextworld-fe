import { FC, PropsWithChildren, ButtonHTMLAttributes } from "react";
import { cn } from "@/utils";

type ButtonVariant = "default" | "accent" | "muted" | "subtle";

interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: ButtonVariant;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "default",
  className,
  ...props
}) => {
  const variantStyles = {
    default: "bg-foreground-default text-default",
    accent: "bg-foreground-on-accent text-default",
    muted: "bg-background-muted text-default",
    subtle:
      "border-md border-foreground-muted text-text-on-accent-second bg-transparent",
  };

  return (
    <button
      className={cn(
        "py-md flex items-center justify-center rounded-sm px-54",
        "text-headings-heading-3",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

