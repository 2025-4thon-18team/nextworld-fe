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
      className={`px-md py-lg flex items-center justify-between w-797 ${className || ""}`}
    >
      <div className="flex flex-col gap-xs items-start w-312 shrink-0 text-body-medium">
        <p className="text-body-large-medium text-black tracking-tight w-full">
          {contentTitle}
        </p>
        <p className="text-body-small-medium text-subtle tracking-tight w-full">
          @{buyer} 구매
        </p>
      </div>
      <div className="flex flex-col gap-xs items-end w-77 shrink-0">
        <Point value={points} showPrefix={false} />
        <p className="text-body-small-medium text-subtle text-right tracking-tight w-min-content">
          {date}
        </p>
      </div>
    </div>
  );
};

