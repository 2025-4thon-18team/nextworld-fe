import { useMemo, useCallback } from "react";
import { MyPageMainView } from "./MyPageMainView";
import { useGetMe, useLogout } from "@/querys/useAuth";
import { useTab } from "@/hooks/useTab";
import { useSimpleWorkTransform } from "@/hooks/useWorkTransform";
import { usePostTransform } from "@/hooks/usePostTransform";
import { useNavigation } from "@/hooks/useNavigation";
import { toast } from "sonner";
import { useGetMyWorks, useGetMyPosts } from "@/querys/useMypage";

type TabType = "작품" | "포스트";

const MyPageMain = () => {
  const { activeTab, onTabChange } = useTab<TabType>("작품");
  const { navigateToProfileEdit, navigateToLogin } = useNavigation();

  // React Query hooks 직접 사용
  const { data: profileData } = useGetMe();
  const { data: worksData } = useGetMyWorks();
  const { data: postsData } = useGetMyPosts();
  const { mutate: logout } = useLogout();

  const worksList = useSimpleWorkTransform(worksData);
  const postsList = usePostTransform(postsData);

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
      worksList={worksList}
      postsList={postsList}
      activeTab={activeTab}
      onTabChange={onTabChange}
      onProfileEdit={onProfileEdit}
      onLogout={onLogout}
    />
  );
};

export default MyPageMain;
