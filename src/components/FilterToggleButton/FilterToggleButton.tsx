import { FC } from "react";
import { cn } from "@/utils";

interface FilterToggleButtonProps {
  label: string;
  subLabel?: string;
  onClick?: () => void;
  className?: string;
}

export const FilterToggleButton: FC<FilterToggleButtonProps> = ({
  label,
  subLabel,
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("relative h-24 w-fit", className)}
    >
      <p className="text-body-regular tracking-tight text-nowrap whitespace-pre text-black">
        {label}
        {subLabel && <span className="text-text-subtle"> {subLabel}</span>}
      </p>
    </button>
  );
};
