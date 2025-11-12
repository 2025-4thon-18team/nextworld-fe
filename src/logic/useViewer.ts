import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useViewer() {
  const navigate = useNavigate();

  const onPrevious = useCallback(() => {
    // TODO: 이전 화로 이동
  }, []);

  const onNext = useCallback(() => {
    // TODO: 다음 화로 이동
  }, []);

  const onOriginalSeriesClick = useCallback(() => {
    // TODO: 원작 작품으로 이동
  }, []);

  return {
    onPrevious,
    onNext,
    onOriginalSeriesClick,
  };
}

