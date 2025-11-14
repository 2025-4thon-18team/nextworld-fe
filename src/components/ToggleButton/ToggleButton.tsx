import { FC } from "react";
import { cn } from "@/utils";

interface ToggleButtonProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const ToggleButton: FC<ToggleButtonProps> = ({
  checked = false,
  onChange,
  disabled = false,
  className,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "relative h-34 w-68 rounded-md border-sm transition-colors duration-200",
        checked
          ? "border-grayscale-g2 bg-foreground-default"
          : "border-grayscale-g2 bg-foreground-subtle",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[inherit]">
        <div
          className={cn(
            "bg-grayscale-white absolute top-1/2 h-26 w-30 -translate-y-1/2 rounded-sm transition-all duration-200",
            checked ? "right-4" : "left-4",
          )}
        />
      </div>
    </button>
  );
};

