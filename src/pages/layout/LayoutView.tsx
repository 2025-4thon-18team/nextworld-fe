import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Gnb } from "@/components/Gnb/Gnb";
import { Toaster } from "@/components/ui/sonner";

type Props = {
  isAuthorized?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onWriteClick?: () => void;
  profileImageUrl?: string;
  onProfileClick?: () => void;
};

export const LayoutView: FC<Props> = ({
  isAuthorized = false,
  searchValue = "",
  onSearchChange,
  onWriteClick,
  profileImageUrl,
  onProfileClick,
}) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <Gnb
        isAuthorized={isAuthorized}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        onWriteClick={onWriteClick}
        profileImageUrl={profileImageUrl}
        onProfileClick={onProfileClick}
      />
      <Toaster position="top-center" />
      <main className="mx-auto w-full max-w-1280 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};
