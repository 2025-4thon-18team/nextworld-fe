import { useLocation, useNavigate } from "react-router-dom";
import type { RouterPort } from "./types";

export function useRouterPort(): RouterPort {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    getPath: () => location.pathname,
    goTo: (path: string) => navigate(path),
  };
}
