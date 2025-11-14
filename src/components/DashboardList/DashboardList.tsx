import { FC } from "react";
import { IconPoint, IconChevron } from "@/assets/icons";
import { cn } from "@/utils";

interface DashboardListProps {
  points: number;
  activeMenu?: string;
  onMenuClick?: (menu: string) => void;
  className?: string;
}

const menuItems = [
  "선호 작품",
  "내 서재",
  "포인트",
  "내 작품 관리",
  "수익 현황",
];

export const DashboardList: FC<DashboardListProps> = ({
  points,
  activeMenu,
  onMenuClick,
  className,
}) => {
  return (
    <div className={cn("flex w-110 flex-col items-center gap-24", className)}>
      {/* Points Section */}
      <div className="flex w-96 shrink-0 flex-col items-center gap-5">
        <p className="text-headings-heading-4 text-right tracking-tight text-nowrap whitespace-pre text-black">
          보유 포인트
        </p>
        <div className="flex w-full shrink-0 items-center justify-center">
          <p className="text-headings-heading-1 tracking-tight text-nowrap whitespace-pre text-black">
            {points.toLocaleString()}
          </p>
          <IconPoint className="flex size-24 shrink-0 items-center justify-center gap-10" />
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex w-full shrink-0 flex-col items-start justify-center gap-20">
        {menuItems.map((menu) => (
          <button
            key={menu}
            type="button"
            onClick={() => onMenuClick?.(menu)}
            className={cn(
              "flex shrink-0 items-center justify-center",
              menu === activeMenu && "gap-10",
            )}
          >
            <p
              className={cn(
                "text-headings-heading-4 w-100 text-center",
                menu === activeMenu ? "text-foreground-default" : "text-black",
              )}
            >
              {menu}
            </p>
            {menu === activeMenu && (
              <div className="border-md border-border-default-second flex h-full w-0 shrink-0 items-center justify-center"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
