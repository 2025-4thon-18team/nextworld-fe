import { useMemo, useCallback } from "react";
import { MyPageMainView } from "./MyPageMainView";
import { useGetMyPoints } from "@/querys/useMypage";
import { useGetMe } from "@/querys/useAuth";
import { useGetAllWorks } from "@/querys/useWorks";
import { useTab } from "@/hooks/useTab";
import { usePoints } from "@/hooks/usePoints";
import { useSimpleWorkTransform } from "@/hooks/useWorkTransform";
import { useNavigation } from "@/hooks/useNavigation";

type TabType = "작품" | "포스트";

const MyPageMain = () => {
  const { activeTab, onTabChange } = useTab<TabType>("작품");
  const { navigateToProfileEdit, navigateToLogin } = useNavigation();
  
  // React Query hooks 직접 사용
  const { data: pointsData } = useGetMyPoints();
  const { data: profileData } = useGetMe();
  const { data: worksData } = useGetAllWorks("ORIGINAL");

  const { points } = usePoints(pointsData?.balance);
  const seriesList = useSimpleWorkTransform(worksData);

  const profile = useMemo(() => {
    if (!profileData) return null;
    return {
      name: profileData.name,
      bio: [], // TODO: bio 필드가 API에 없음
      contact: "", // TODO: contact 필드가 API에 없음
      profileImageUrl: profileData.profileImageUrl,
    };
  }, [profileData]);

  const onProfileEdit = useCallback(() => {
    // TODO: 프로필 수정 페이지로 이동
    navigateToProfileEdit();
  }, [navigateToProfileEdit]);

  const onLogout = useCallback(() => {
    // TODO: 로그아웃 로직
    navigateToLogin();
  }, [navigateToLogin]);

  return (
    <MyPageMainView
      points={points}
      profile={profile}
      seriesList={seriesList}
      activeTab={activeTab}
      onTabChange={onTabChange}
      onProfileEdit={onProfileEdit}
      onLogout={onLogout}
    />
  );
};

export default MyPageMain;
