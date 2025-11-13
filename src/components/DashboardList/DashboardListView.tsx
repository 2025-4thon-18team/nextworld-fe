import { FC } from "react";
import { IconPoint, IconChevron } from "@/assets/icons";
import { cn } from "@/utils";

type MenuItem = {
  id: string;
  label: string;
  path: string;
};

type Props = {
  className?: string;
  formattedPoints: string;
  menuItems: MenuItem[];
  activeMenuId?: string;
  onMenuClick: (path: string) => void;
};

export const DashboardListView: FC<Props> = ({
  className,
  formattedPoints,
  menuItems,
  activeMenuId,
  onMenuClick,
}) => {
  return (
    <div className={cn("h-333 w-140", className)}>
      <div className="absolute top-0 left-15 flex w-110 flex-col items-center gap-24">
        {/* Points Section */}
        <div className="relative flex w-96 shrink-0 flex-col items-center gap-5">
          <p className="text-headings-heading-4 text-right tracking-tight text-nowrap whitespace-pre text-black">
            보유 포인트
          </p>
          <div className="relative flex w-full shrink-0 items-center justify-center">
            <p className="text-headings-heading-1 tracking-tight text-nowrap whitespace-pre text-black">
              {formattedPoints}
            </p>
            <IconPoint className="relative flex size-24 shrink-0 items-center justify-center gap-10" />
          </div>
        </div>

        {/* Menu Items */}
        <div className="relative flex w-full shrink-0 flex-col items-start justify-center gap-20">
          {menuItems.map((menu) => {
            const isActive = menu.id === activeMenuId;
            return (
              <div
                key={menu.id}
                className="relative flex w-full shrink-0 items-center justify-center gap-10"
              >
                <button
                  type="button"
                  onClick={() => onMenuClick(menu.path)}
                  className="relative flex shrink-0 items-center justify-center"
                >
                  <p
                    className={cn(
                      "text-headings-heading-4 w-100 text-center",
                      isActive ? "text-foreground-default" : "text-black",
                    )}
                  >
                    {menu.label}
                  </p>
                </button>
                {isActive && (
                  <div className="relative flex h-0 w-30 shrink-0 items-center justify-center">
                    <div className="flex-none rotate-90">
                      <div className="relative h-0 w-30">
                        <div className="absolute top-[-3px] right-0 bottom-0 left-0">
                          <IconChevron className="size-24 shrink-0 overflow-hidden" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
