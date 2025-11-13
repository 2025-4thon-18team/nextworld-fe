import { useMemo } from "react";
import type { WorkResponseDto } from "@/querys/types";

export type SeriesItem = {
  id: string;
  imageUrl: string;
  title: string;
  tags: string[];
};

/**
 * WorkResponseDto를 SeriesItem으로 변환하는 훅
 */
export function useWorkTransform(works: WorkResponseDto[] | undefined) {
  const seriesList = useMemo(() => {
    if (!works) return [];
    return works.map((work) => ({
      id: String(work.id),
      imageUrl: work.coverImageUrl,
      title: work.title,
      tags: work.tags,
    }));
  }, [works]);

  return seriesList;
}

/**
 * WorkResponseDto를 간단한 SeriesItem으로 변환 (tags 제외)
 */
export function useSimpleWorkTransform(works: WorkResponseDto[] | undefined) {
  const seriesList = useMemo(() => {
    if (!works) return [];
    return works.map((work) => ({
      id: work.id,
      imageUrl: work.coverImageUrl,
      title: work.title,
    }));
  }, [works]);

  return seriesList;
}

