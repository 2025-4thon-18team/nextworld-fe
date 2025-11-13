import { FC } from "react";
import { Point } from "@/components/Point/Point";

interface ChargePointItemProps {
  title: string;
  date: string;
  points: number;
  className?: string;
}

export const ChargePointItem: FC<ChargePointItemProps> = ({
  title,
  date,
  points,
  className,
}) => {
  return (
    <div
      className={`px-md py-lg flex w-full items-center justify-between ${className || ""}`}
    >
      <div className="text-body-medium flex shrink-0 flex-col items-start text-right text-nowrap whitespace-pre">
        <p className="text-body-large-medium tracking-tight text-black">
          {title}
        </p>
        <p className="text-body-small-medium tracking-tight text-[#c1c1c1]">
          {date}
        </p>
      </div>
      <Point value={points} showPrefix={true} prefix="+" />
    </div>
  );
};
