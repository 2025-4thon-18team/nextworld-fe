import { FC } from "react";
import { IconPoint } from "@/assets/icons";
import { cn } from "@/utils";

interface PointProps {
  value: number;
  showPrefix?: boolean;
  prefix?: "+" | "-";
  className?: string;
}

export const Point: FC<PointProps> = ({
  value,
  showPrefix = false,
  prefix = "+",
  className,
}) => {
  return (
    <div className={cn("flex items-center justify-end", className)}>
      {showPrefix && (
        <div className="flex flex-col justify-center leading-0 relative shrink-0 text-body-large-medium text-black text-nowrap tracking-tight">
          <p className="leading-normal whitespace-pre">{prefix}</p>
        </div>
      )}
      <p className="text-body-large-medium text-black text-nowrap tracking-tight whitespace-pre">
        {value}
      </p>
      <IconPoint className="flex size-24 items-center justify-center gap-10 relative shrink-0" />
    </div>
  );
};

