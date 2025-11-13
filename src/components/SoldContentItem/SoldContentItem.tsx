import { FC } from "react";
import { Point } from "@/components/Point/Point";

interface SoldContentItemProps {
  contentTitle: string;
  buyer: string;
  points: number;
  date: string;
  className?: string;
}

export const SoldContentItem: FC<SoldContentItemProps> = ({
  contentTitle,
  buyer,
  points,
  date,
  className,
}) => {
  return (
    <div
      className={`px-md py-lg flex w-full items-center justify-between ${className || ""}`}
    >
      <div className="gap-xs text-body-medium w-min-content flex shrink-0 flex-col items-start">
        <p className="text-body-large-medium w-full tracking-tight text-black">
          {contentTitle}
        </p>
        <p className="text-body-small-medium text-subtle w-full tracking-tight">
          @{buyer} 구매
        </p>
      </div>
      <div className="gap-xs w-min-content flex shrink-0 flex-col items-end">
        <Point value={points} showPrefix={false} />
        <p className="text-body-small-medium text-subtle w-min-content text-right tracking-tight">
          {date}
        </p>
      </div>
    </div>
  );
};
