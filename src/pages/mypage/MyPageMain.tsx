import { MyPageMainView } from "./MyPageMainView";
import { useMyPageMain } from "@/logic/useMyPageMain";
import { createUserPort } from "@/services/user.service";
import { createSeriesPort } from "@/services/series.service";

const MyPageMain = () => {
  const user = createUserPort();
  const series = createSeriesPort();
  const {
    activeTab,
    seriesList,
    points,
    profile,
    onTabChange,
    onProfileEdit,
    onLogout,
  } = useMyPageMain({ user, series });

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
