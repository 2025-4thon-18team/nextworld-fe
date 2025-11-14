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
          "bg-foreground-default gap-sm px-xl py-sm flex items-center justify-center rounded-sm",
          "text-headings-heading-3 text-grayscale-white",
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
        "border-md border-foreground-muted gap-sm px-xl py-sm flex items-center justify-center rounded-sm",
        "text-headings-heading-3 text-text-on-accent-second bg-transparent",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
