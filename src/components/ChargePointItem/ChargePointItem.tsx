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
      className={`px-md py-lg flex items-center justify-between w-846 ${className || ""}`}
    >
      <div className="flex flex-col items-start text-right w-144 shrink-0 text-body-medium text-nowrap whitespace-pre">
        <p className="text-body-large-medium text-black tracking-tight">{title}</p>
        <p className="text-body-small-medium text-[#c1c1c1] tracking-tight">{date}</p>
      </div>
      <Point value={points} showPrefix={true} prefix="+" />
    </div>
  );
};

