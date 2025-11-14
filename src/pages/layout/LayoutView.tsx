import { FC, useCallback, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Gnb } from "@/components/Gnb/Gnb";
import { useIsAuthenticated, useGetMe } from "@/querys/useAuth";
import { Toaster } from "@/components/ui/sonner";

type Props = {
  activeMenu?: "홈" | "작품" | "포스트";
  onMenuClick: (menu: "홈" | "작품" | "포스트") => void;
};

export const LayoutView: FC<Props> = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const { data: profileData } = useGetMe({ enabled: isAuthenticated });
  const [searchValue, setSearchValue] = useState("");

  const onWriteClick = useCallback(() => {
    navigate("/editor");
  }, [navigate]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <Gnb
        isAuthorized={isAuthenticated}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onWriteClick={onWriteClick}
        profileImageUrl={(profileData as any)?.profileImageUrl}
      />
      <Toaster />
      <main className="mx-auto w-full max-w-1280 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};
