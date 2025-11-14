import { useMemo, useCallback } from "react";
import { MyPageMainView } from "./MyPageMainView";
import { useGetMe, useLogout } from "@/querys/useAuth";
import { useTab } from "@/hooks/useTab";
import { useSimpleWorkTransform } from "@/hooks/useWorkTransform";
import { useNavigation } from "@/hooks/useNavigation";
import { toast } from "sonner";

type TabType = "작품" | "포스트";

const MyPageMain = () => {
  const { activeTab, onTabChange } = useTab<TabType>("작품");
  const { navigateToProfileEdit, navigateToLogin } = useNavigation();

  // React Query hooks 직접 사용
  const { data: profileData } = useGetMe();
  // TODO: /api/mypage/works 엔드포인트가 backend-rule.mdc에 없음
  // 임시로 빈 배열 사용
  const worksData = undefined;
  const { mutate: logout } = useLogout();

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
    logout(undefined, {
      onSuccess: () => {
        navigateToLogin();
      },
      onError: () => {
        toast("로그아웃에 실패했습니다.");
      },
    });
  }, [logout, navigateToLogin]);

  return (
    <MyPageMainView
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
