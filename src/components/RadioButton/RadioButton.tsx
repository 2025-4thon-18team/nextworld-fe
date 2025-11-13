import { FC, ButtonHTMLAttributes } from "react";
import { cn } from "@/utils";

interface RadioButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  selected?: boolean;
  children: string;
  className?: string;
}

export const RadioButton: FC<RadioButtonProps> = ({
  selected = false,
  children,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(
        "gap-sm border-b-md flex w-full min-w-120 flex-col items-center justify-center rounded-sm border-t-0 border-r-0 border-l-0 border-solid px-8 py-6",
        selected
          ? "border-border-default-second bg-foreground-default"
          : "border-grayscale-g2 bg-background-subtle",
        className,
      )}
      aria-pressed={selected}
      {...props}
    >
      <p
        className={cn(
          "text-headings-heading-4 min-w-50 text-center whitespace-nowrap",
          selected ? "text-grayscale-white" : "text-text-subtle",
        )}
      >
        {children}
      </p>
    </button>
  );
};
