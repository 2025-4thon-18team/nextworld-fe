import { useState, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useGetAllWorks } from "@/querys/useWorks";

export function useAuthorPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"작품" | "포스트">("작품");
  
  // React Query hooks 직접 사용
  // TODO: URL에서 작가 ID 추출하여 해당 작가의 작품 목록만 조회
  const { data: worksData } = useGetAllWorks("ORIGINAL");

  const seriesList = useMemo(() => {
    if (!worksData) return [];
    return worksData.slice(0, 6).map((work) => ({
      id: work.id,
      imageUrl: work.coverImageUrl,
      title: work.title,
      tags: work.tags,
    }));
  }, [worksData]);

  // TODO: 작가 정보는 별도 API 필요
  const authorName = "[작가명]";
  const authorBio = ["안녕하세요 누구입니다 안녕", "나 누구 좋아한다.."];
  const authorContact = "작가 개인 sns, 이메일";
  const profileImageUrl: string | undefined = undefined;

  const onTabChange = useCallback((tab: "작품" | "포스트") => {
    setActiveTab(tab);
  }, []);

  return {
    authorName,
    authorBio,
    authorContact,
    profileImageUrl,
    activeTab,
    seriesList,
    onTabChange,
  };
}

