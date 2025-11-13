import { useState, useCallback } from "react";

/**
 * 탭 상태 관리를 위한 공통 훅
 * @param initialTab 초기 탭 값
 * @returns 탭 상태와 변경 핸들러
 */
export function useTab<T extends string>(initialTab: T) {
  const [activeTab, setActiveTab] = useState<T>(initialTab);

  const onTabChange = useCallback((tab: T) => {
    setActiveTab(tab);
  }, []);

  return {
    activeTab,
    onTabChange,
  };
}

