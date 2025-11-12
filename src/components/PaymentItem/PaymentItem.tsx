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
  type,
  title,
  subtitle,
  points,
  date,
  className,
}) => {
  return (
    <div
      className={`px-md py-lg flex items-center justify-between w-797 ${className || ""}`}
    >
      <div className="flex flex-col gap-xs items-start w-312 shrink-0 text-body-medium">
        <p className="text-body-large-medium text-black tracking-tight w-full">{title}</p>
        <p className="text-body-small-medium text-subtle tracking-tight w-full">
          {subtitle}
        </p>
      </div>
      <div className="flex flex-col gap-xs items-end w-77 shrink-0">
        <Point value={points} showPrefix={true} prefix="-" />
        <p className="text-body-small-medium text-subtle text-right tracking-tight w-min-content">
          {date}
        </p>
      </div>
    </div>
  );
};

