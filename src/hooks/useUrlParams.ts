import { useMemo } from "react";
import { useLocation } from "react-router-dom";

/**
 * URL에서 시리즈 ID를 추출하는 훅
 * @param pattern URL 패턴 (기본값: /series/:id)
 * @returns 시리즈 ID (number, 없으면 0)
 */
export function useSeriesId(pattern: RegExp = /\/series\/([^/]+)/) {
  const location = useLocation();

  const seriesId = useMemo(() => {
    const match = location.pathname.match(pattern);
    return match ? parseInt(match[1]) : 0;
  }, [location.pathname, pattern]);

  return seriesId;
}

/**
 * URL에서 파라미터를 추출하는 훅
 * @param paramName 파라미터 이름
 * @returns 파라미터 값 (string | null)
 */
export function useUrlParam(paramName: string) {
  const location = useLocation();

  const paramValue = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(paramName);
  }, [location.search, paramName]);

  return paramValue;
}

