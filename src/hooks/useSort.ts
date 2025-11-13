import { useMemo } from "react";

export type SortOrder = "latest" | "oldest";

/**
 * 배열을 정렬하는 훅
 * @param items 정렬할 배열
 * @param sortOrder 정렬 순서
 * @returns 정렬된 배열
 */
export function useSort<T>(items: T[], sortOrder: SortOrder) {
  const sortedItems = useMemo(() => {
    const sorted = [...items];
    if (sortOrder === "oldest") {
      return sorted.reverse();
    }
    return sorted;
  }, [items, sortOrder]);

  return sortedItems;
}

/**
 * 정렬 라벨을 생성하는 훅
 * @param sortOrder 정렬 순서
 * @returns 메인 라벨과 서브 라벨
 */
export function useSortLabels(sortOrder: SortOrder) {
  const labels = useMemo(() => {
    return {
      main: sortOrder === "latest" ? "최신순" : "1화부터",
      sub: sortOrder === "latest" ? "| 1화부터" : "| 최신순",
    };
  }, [sortOrder]);

  return labels;
}

