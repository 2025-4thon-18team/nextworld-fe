import { FC } from "react";
import { Point } from "@/components/Point/Point";

type PaymentItemType = "post" | "series";

interface PaymentItemProps {
  type: PaymentItemType;
  title: string;
  subtitle: string;
  points: number;
  date: string;
  className?: string;
}

export const PaymentItem: FC<PaymentItemProps> = ({
  title,
  subtitle,
  points,
  date,
  className,
}) => {
  return (
    <div
      className={`px-md py-lg flex w-full items-center justify-between ${className || ""}`}
    >
      <div className="text-body-medium gap-xs flex w-312 shrink-0 flex-col items-start">
        <p className="text-body-large-medium w-full tracking-tight text-black">
          {title}
        </p>
        <p className="text-body-small-medium text-subtle w-full tracking-tight">
          {subtitle}
        </p>
      </div>
      <div className="gap-xs flex shrink-0 flex-col items-end">
        <Point value={points} showPrefix={true} prefix="-" />
        <p className="text-body-small-medium text-subtle w-min-content text-right tracking-tight">
          {date}
        </p>
      </div>
    </div>
  );
};
