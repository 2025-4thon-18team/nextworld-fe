import { FC } from "react";
import { HomeView } from "./HomeView";
import { useHome } from "@/logic/useHome";
import { createContentPort } from "@/services/content.service";

export const Home: FC = () => {
  const content = createContentPort();
  const {
    activeTab,
    onTabChange,
    universeOfWeek,
    popularSeries,
    popularPosts,
    onUniverseClick,
    onSeriesClick,
    onPostClick,
  } = useHome({ content });

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

