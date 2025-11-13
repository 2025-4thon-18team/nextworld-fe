import { FC } from "react";
import { cn } from "@/utils";
import { LogoGNB } from "@/assets/logo";
import { Search } from "@/components/Search/Search";
import { ButtonSmall } from "@/components/ButtonSmall/ButtonSmall";
import { ProfileImg } from "@/components/ProfileImg/ProfileImg";
import { Link } from "react-router-dom";
import { useNavigation } from "@/hooks/useNavigation";

interface GnbProps {
  isAuthorized?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onLoginClick?: () => void;
  onWriteClick?: () => void;
  profileImageUrl?: string;
  className?: string;
}

export const Gnb: FC<GnbProps> = ({
  isAuthorized = false,
  searchValue = "",
  onSearchChange,
  onWriteClick,
  profileImageUrl,
  className,
}) => {
  return (
    <div
      className={cn(
        "border-b-sm border-grayscale-g2 flex w-full items-center justify-center border-t-0 border-r-0 border-l-0 border-solid bg-white",
        className,
      )}
    >
      <div className="py-sm relative box-border flex w-full max-w-1440 items-center justify-between pr-42 pl-60">
        {/* Logo */}
        <Link to="/">
          <div className="gap-sm relative flex shrink-0 items-center">
            <LogoGNB className="relative shrink-0" />
          </div>
        </Link>
        {/* Right Section */}
        <div className="gap-lg relative flex shrink-0 items-center justify-end">
          {/* Search */}
          <Search
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-370"
          />

          {/* Button */}
          {isAuthorized ? (
            <>
              <ButtonSmall variant="subtle" onClick={onWriteClick}>
                연재하기
              </ButtonSmall>
              {profileImageUrl && (
                <ProfileImg imageUrl={profileImageUrl} size="sm" />
              )}
            </>
          ) : (
            <Link to="/login">
              <ButtonSmall variant="subtle">로그인</ButtonSmall>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
