import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type MenuType = "홈" | "작품" | "포스트";

export function useLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const activeMenu: MenuType | undefined = (() => {
    if (!currentPath) return undefined;
    if (
      currentPath.startsWith("/my-page") ||
      currentPath.startsWith("/create-series")
    ) {
      return "작품";
    }
    if (currentPath.startsWith("/viewer")) {
      return "작품";
    }
    return undefined;
  })();

  const onMenuClick = useCallback(
    (menu: MenuType) => {
      switch (menu) {
        case "홈":
          navigate("/");
          break;
        case "작품":
          navigate("/my-page/main");
          break;
        case "포스트":
          // 포스트 페이지가 있으면 해당 경로로 이동
          break;
      }
    },
    [navigate],
  );

  return {
    activeMenu,
    onMenuClick,
  };
}
