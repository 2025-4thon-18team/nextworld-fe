import { useMemo, useCallback } from "react";
import { MyPageMainView } from "./MyPageMainView";
import { useGetMe } from "@/querys/useAuth";   // ⭐ 추가된 라인
import { useGetAllWorks } from "@/querys/useWorks";
import { useTab } from "@/hooks/useTab";
import { useSimpleWorkTransform } from "@/hooks/useWorkTransform";
import { useNavigation } from "@/hooks/useNavigation";

type TabType = "작품" | "포스트";

const MyPageMain = () => {
  const { activeTab, onTabChange } = useTab<TabType>("작품");
  const { navigateToLogin } = useNavigation();
  const { navigateToProfileEdit } = useNavigation();

  const { data: profileData } = useGetMe();      // ⭐ 이제 정상 동작
  const { data: worksData } = useGetAllWorks("ORIGINAL");

  const seriesList = useSimpleWorkTransform(worksData);

  const postList = [
    { id: 1, title: "포스트 제목 1", date: "2024-11-14", views: 123 },
    { id: 2, title: "포스트 제목 2", date: "2024-11-10", views: 56 },
  ];

  const profile = useMemo(() => {
    if (!profileData) return null;
    return {
      name: profileData.name,
      bio: [],
      contact: "",
      profileImageUrl: profileData.profileImageUrl,
    };
  }, [profileData]);

  // ⭐ 최소 변경으로 ProfileEdit 페이지 실행
  const onProfileEdit = useCallback(() => {
    navigateToProfileEdit();
  }, [navigateToProfileEdit]);

  const onLogout = useCallback(() => {
    navigateToLogin();
  }, [navigateToLogin]);

  return (
    <MyPageMainView
      profile={profile}
      seriesList={seriesList}
      postList={postList}
      activeTab={activeTab}
      onTabChange={onTabChange}
      onProfileEdit={onProfileEdit}
      onLogout={onLogout}
    />
  );
};

export default MyPageMain;
