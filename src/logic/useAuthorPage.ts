import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import type { SeriesPort } from "@/services/types";

export function useAuthorPage(params: { series?: SeriesPort }) {
  const { series } = params;
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"작품" | "포스트">("작품");
  const [seriesList, setSeriesList] = useState<
    Array<{
      id: number;
      imageUrl: string;
      title: string;
      tags: string[];
    }>
  >([]);
  const [authorName, setAuthorName] = useState("[작가명]");
  const [authorBio, setAuthorBio] = useState<string[]>([
    "안녕하세요 누구입니다 안녕",
    "나 누구 좋아한다..",
  ]);
  const [authorContact, setAuthorContact] = useState("작가 개인 sns, 이메일");
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>();

  useEffect(() => {
    if (!series) return;
    let alive = true;
    // TODO: URL에서 작가 ID 추출하여 작가 정보 및 작품 목록 가져오기
    series.getMySeries().then((list) => {
      if (alive) {
        setSeriesList(
          list.map((item) => ({
            ...item,
            tags: ["현대로맨스", "능력여주"],
          })),
        );
      }
    });
    return () => {
      alive = false;
    };
  }, [series, location]);

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

