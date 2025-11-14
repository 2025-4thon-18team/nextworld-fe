import { FC } from "react";
import { IconPoint } from "@/assets/icons";
import { cn } from "@/utils";

interface ChargePointOptionProps {
  points: number;
  price: number;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export const ChargePointOption: FC<ChargePointOptionProps> = ({
  points,
  price,
  isSelected,
  onClick,
  className,
}) => {
  const formattedPoints = points.toLocaleString();
  const formattedPrice = price.toLocaleString();

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "gap-xs px-md py-md border-default flex w-full items-center justify-between rounded-md border transition-colors",
        isSelected
          ? "bg-primary-100 border-accent"
          : "hover:bg-background-muted bg-white",
        className,
      )}
    >
      <div className="gap-xs flex items-center">
        <div
          className={cn(
            "flex size-24 shrink-0 items-center justify-center rounded-full",
            isSelected ? "bg-foreground-default" : "bg-grayscale-g3",
          )}
        >
          {isSelected && <div className="size-12 rounded-full bg-white" />}
        </div>
        <p className="text-body-medium text-black">{formattedPoints}P</p>
      </div>
      <p className="text-body-medium text-black">{formattedPrice}원</p>
    </button>
  );
};
