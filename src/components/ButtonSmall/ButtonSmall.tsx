import { FC, ButtonHTMLAttributes } from "react";
import { cn } from "@/utils";

type ButtonSmallVariant = "default" | "subtle";

interface ButtonSmallProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: ButtonSmallVariant;
  children: string;
  className?: string;
  onClick?: () => void;
}

export const ButtonSmall: FC<ButtonSmallProps> = ({
  variant = "subtle",
  children,
  className,
  onClick,
  ...props
}) => {
  if (variant === "default") {
    return (
      <button
        type="button"
        className={cn(
          "gap-sm px-xl py-sm flex items-center justify-center rounded-sm",
          "text-headings-heading-3",
          props.disabled
            ? "bg-grayscale-g2 text-text-muted cursor-not-allowed"
            : "bg-foreground-default text-grayscale-white",
          className,
        )}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={cn(
        "gap-sm px-xl py-sm flex items-center justify-center rounded-sm",
        "text-headings-heading-3",
        props.disabled
          ? "border-md border-grayscale-g2 text-text-muted bg-transparent cursor-not-allowed"
          : "border-md border-foreground-muted text-text-on-accent-second bg-transparent",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
