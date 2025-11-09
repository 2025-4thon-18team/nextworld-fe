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
  activeMenu = "내 작품 관리",
  onMenuClick,
  className,
}) => {
  return (
    <div className={cn("h-333 w-140", className)}>
      <div className="absolute flex flex-col gap-24 items-center left-15 top-0 w-110">
        {/* Points Section */}
        <div className="flex flex-col gap-5 items-center relative shrink-0 w-96">
          <p className="text-headings-heading-4 text-black text-nowrap text-right tracking-tight whitespace-pre">
            보유 포인트
          </p>
          <div className="flex items-center justify-center relative shrink-0 w-full">
            <p className="text-headings-heading-1 text-black text-nowrap tracking-tight whitespace-pre">
              {points.toLocaleString()}
            </p>
            <IconPoint className="flex size-24 items-center justify-center gap-10 relative shrink-0" />
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-20 items-start justify-center relative shrink-0 w-full">
          {menuItems.map((menu) => (
            <button
              key={menu}
              type="button"
              onClick={() => onMenuClick?.(menu)}
              className={cn(
                "flex items-center justify-center relative shrink-0",
                menu === activeMenu && "gap-10",
              )}
            >
              <p
                className={cn(
                  "text-headings-heading-4 text-center w-100",
                  menu === activeMenu
                    ? "text-foreground-default"
                    : "text-black",
                )}
              >
                {menu}
              </p>
              {menu === activeMenu && (
                <div className="flex size-24 items-center justify-center relative shrink-0">
                  <IconChevron className="size-24 rotate-90" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

