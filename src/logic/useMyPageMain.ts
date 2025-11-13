import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMyPoints } from "@/querys/useMypage";
import { useGetMe } from "@/querys/useAuth";
import { useGetAllWorks } from "@/querys/useWorks";

type TabType = "작품" | "포스트";

export function useMyPageMain() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("작품");
  
  // React Query hooks 직접 사용
  const { data: pointsData } = useGetMyPoints();
  const { data: profileData } = useGetMe();
  const { data: worksData } = useGetAllWorks("ORIGINAL");

  const points = useMemo(() => pointsData?.balance || 0, [pointsData]);

  const profile = useMemo(() => {
    if (!profileData) return null;
    return {
      name: profileData.name,
      bio: [], // TODO: bio 필드가 API에 없음
      contact: "", // TODO: contact 필드가 API에 없음
      profileImageUrl: profileData.profileImageUrl,
    };
  }, [profileData]);

  const seriesList = useMemo(() => {
    if (!worksData) return [];
    return worksData.map((work) => ({
      id: work.id,
      imageUrl: work.coverImageUrl,
      title: work.title,
    }));
  }, [worksData]);

  const onTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  const onProfileEdit = useCallback(() => {
    // TODO: 프로필 수정 페이지로 이동
    navigate("/my-page/profile/edit");
  }, [navigate]);

  const onLogout = useCallback(() => {
    // TODO: 로그아웃 로직
    navigate("/login");
  }, [navigate]);

  return {
    activeTab,
    seriesList,
    points,
    profile,
    onTabChange,
    onProfileEdit,
    onLogout,
  };
}
