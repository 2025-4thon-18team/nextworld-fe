import { FC } from "react";
import { HomeView } from "./HomeView";
import { useHome } from "@/logic/useHome";

export const Home: FC = () => {
  const {
    activeTab,
    onTabChange,
    universeOfWeek,
    popularSeries,
    popularPosts,
    onUniverseClick,
    onSeriesClick,
    onPostClick,
  } = useHome();

  return (
    <HomeView
      activeTab={activeTab}
      onTabChange={onTabChange}
      universeOfWeek={universeOfWeek}
      popularSeries={popularSeries}
      popularPosts={popularPosts}
      onUniverseClick={onUniverseClick}
      onSeriesClick={onSeriesClick}
      onPostClick={onPostClick}
    />
  );
};

export default Home;
