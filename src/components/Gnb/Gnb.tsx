import { FC } from "react";
import { cn } from "@/utils";
import { LogoGNB } from "@/assets/logo";

interface GnbProps {
  activeMenu?: "홈" | "작품" | "포스트";
  onMenuClick?: (menu: "홈" | "작품" | "포스트") => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  userImages?: string[];
  className?: string;
}

const menuItems: Array<"홈" | "작품" | "포스트"> = ["홈", "작품", "포스트"];

export const Gnb: FC<GnbProps> = ({
  activeMenu,
  onMenuClick,
  searchValue = "",
  onSearchChange,
  userImages = [],
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-white border-b-sm border-grayscale-g2 border-l-0 border-r-0 border-solid border-t-0 h-68 w-1440",
        className,
      )}
    >
      <div className="h-68 relative w-1440">
        {/* User Profile Images */}
        {userImages.length > 0 && (
          <>
            <div className="absolute h-50 left-[calc(91.667%+18.067px)] top-9 w-59">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  alt="User profile"
                  src={userImages[0]}
                  className="absolute h-101 left-[-282%] max-w-none top-[-0.36%] w-382"
                />
              </div>
            </div>
            {userImages.length > 1 && (
              <div className="absolute h-50 left-[calc(91.667%-46.381px)] top-9 w-59">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    alt="User profile"
                    src={userImages[1]}
                    className="absolute h-101 left-[-2.46%] max-w-none top-[-0.36%] w-382"
                  />
                </div>
              </div>
            )}
          </>
        )}

        {/* Search Bar */}
        <div className="absolute bg-[#d9d9d9] h-51 left-[calc(58.333%+57px)] rounded-13 top-8 w-351" />

        {/* Logo and Navigation */}
        <div className="absolute flex gap-12 items-center left-80 top-14">
          <div className="flex gap-8 items-center relative shrink-0">
            <LogoGNB className="h-30 relative shrink-0 w-25" />
            <p className="font-['Paperlogy:8_ExtraBold',sans-serif] leading-normal not-italic relative shrink-0 text-28 text-grayscale-g7 text-nowrap whitespace-pre">
              차세계
            </p>
          </div>
          <div className="flex items-center relative shrink-0">
            {menuItems.map((menu) => (
              <button
                key={menu}
                type="button"
                onClick={() => onMenuClick?.(menu)}
                className={cn(
                  "flex flex-col gap-10 items-center justify-center min-h-40 px-lg py-0 relative shrink-0",
                  menu === "홈" ? "min-w-50 w-50" : "min-w-50",
                )}
              >
                <p
                  className={cn(
                    "text-headings-heading-3 text-center tracking-tight w-full",
                    menu === "홈" ? "w-full" : "basis-0 grow min-h-px min-w-px shrink-0",
                    activeMenu === menu ? "text-black" : "text-black",
                  )}
                >
                  {menu}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

