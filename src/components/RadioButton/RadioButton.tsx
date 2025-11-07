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
        "flex min-w-[120px] w-[120px] flex-col items-center justify-center gap-[10px] rounded-sm border-b-md border-l-0 border-r-0 border-t-0 border-solid px-[8px] py-[6px]",
        selected
          ? "border-foreground-muted bg-foreground-default"
          : "border-grayscale-g2 bg-background-subtle",
        className,
      )}
      aria-pressed={selected}
      {...props}
    >
      <p
        className={cn(
          "text-headings-heading-4 min-w-[50px] whitespace-nowrap text-center",
          selected ? "text-default" : "text-subtle",
        )}
      >
        {children}
      </p>
    </button>
  );
};

