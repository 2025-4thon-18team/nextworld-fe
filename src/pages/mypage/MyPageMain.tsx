import { MyPageMainView } from "./MyPageMainView";
import { useMyPageMain } from "@/logic/useMyPageMain";

const MyPageMain = () => {
  const {
    activeTab,
    seriesList,
    points,
    profile,
    onTabChange,
    onProfileEdit,
    onLogout,
  } = useMyPageMain();

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
