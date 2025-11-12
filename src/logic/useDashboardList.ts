import { useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItemModel = {
  id: string;
  label: string;
  path: string;
};

export function useDashboardList(params: {
  points: number;
  menu: MenuItemModel[];
}) {
  const { points, menu } = params;
  const location = useLocation();
  const navigate = useNavigate();

  const formattedPoints = useMemo(() => points.toLocaleString(), [points]);

  const menuItems = useMemo(
    () =>
      menu.map((item) => ({
        id: item.id,
        label: item.label,
        path: item.path,
      })),
    [menu],
  );

  const activeMenuId = useMemo(() => {
    const currentPath = location.pathname;
    return menu.find((item) => item.path === currentPath)?.id;
  }, [location.pathname, menu]);

  const onMenuClick = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate],
  );

  return {
    formattedPoints,
    menuItems,
    activeMenuId,
    onMenuClick,
  };
}
