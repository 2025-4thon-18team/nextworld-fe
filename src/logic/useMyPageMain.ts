import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { UserPort, SeriesPort } from "@/services/types";

type TabType = "작품" | "포스트";

export function useMyPageMain(params: {
  user?: UserPort;
  series?: SeriesPort;
}) {
  const { user, series } = params;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("작품");
  const [seriesList, setSeriesList] = useState<
    Array<{ id: number; imageUrl: string; title: string }>
  >([]);
  const [points, setPoints] = useState<number>(0);
  const [profile, setProfile] = useState<{
    name: string;
    bio: string[];
    contact: string;
    profileImageUrl?: string;
  } | null>(null);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    user.getPoints().then((p) => alive && setPoints(p));
    user.getProfile().then((p) => alive && setProfile(p));
    return () => {
      alive = false;
    };
  }, [user]);

  useEffect(() => {
    if (!series) return;
    let alive = true;
    series.getMySeries().then((list) => alive && setSeriesList(list));
    return () => {
      alive = false;
    };
  }, [series]);

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
