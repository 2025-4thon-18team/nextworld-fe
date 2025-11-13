import { useMemo } from "react";

/**
 * 포인트 데이터를 포맷팅하는 훅
 * @param balance 포인트 잔액 (number | undefined)
 * @returns 포맷팅된 포인트 값 (기본값: 0)
 */
export function usePoints(balance: number | undefined) {
  const points = useMemo(() => balance || 0, [balance]);

  const formattedPoints = useMemo(() => points.toLocaleString(), [points]);

  return {
    points,
    formattedPoints,
  };
}

