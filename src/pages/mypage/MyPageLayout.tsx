import { FC, useCallback, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DashboardList } from "@/components/DashboardList/DashboardList";
import { useGetMyPoints } from "@/querys/useMypage";
import { usePoints } from "@/hooks/usePoints";
import { Gnb } from "@/components/Gnb/Gnb";
import { useIsAuthenticated, useGetMe } from "@/querys/useAuth";
import { Toaster } from "@/components/ui/sonner";
import type { UserProfileResponse } from "@/querys/types";

const menuMap: Record<string, string> = {
  "/my-page/favorites": "선호 작품",
  "/my-page/library": "내 서재",
  "/my-page/point": "포인트",
  "/my-page/main": "내 작품 관리",
  "/my-page/revenue": "수익 현황",
};

const pathMap: Record<string, string> = {
  "선호 작품": "/my-page/favorites",
  "내 서재": "/my-page/library",
  포인트: "/my-page/point",
  "내 작품 관리": "/my-page/main",
  "수익 현황": "/my-page/revenue",
};

export const MyPageLayout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const { data: profileData } = useGetMe({ enabled: isAuthenticated });
  const [searchValue, setSearchValue] = useState("");

  const { data: pointsData } = useGetMyPoints();
  const { points } = usePoints(pointsData?.balance);

  const activeMenu = useMemo(() => {
    return menuMap[location.pathname] || "내 작품 관리";
  }, [location.pathname]);

  const handleMenuClick = useCallback(
    (menu: string) => {
      const path = pathMap[menu];
      if (path) {
        navigate(path);
      }
    },
    [navigate],
  );

  const onWriteClick = useCallback(() => {
    navigate("/editor");
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-white">
      <Gnb
        isAuthorized={isAuthenticated}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onWriteClick={onWriteClick}
        profileImageUrl={
          (profileData as UserProfileResponse | undefined)?.profileImageUrl
        }
      />
      <Toaster position="top-center" />
      <div className="flex items-start gap-38 px-80 pt-48">
        {/* Dashboard Sidebar */}
        <div className="shrink-0">
          <DashboardList
            points={points}
            activeMenu={activeMenu}
            onMenuClick={handleMenuClick}
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
