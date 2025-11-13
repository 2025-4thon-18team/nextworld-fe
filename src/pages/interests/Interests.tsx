import { FC } from "react";
import { InterestsView } from "./InterestsView";
import { useInterests } from "@/logic/useInterests";

export const Interests: FC = () => {
  const {
    activeTab,
    onTabChange,
    favoriteSeries,
    latestUpdates,
    newPosts,
    newUniverseSeries,
    onSeriesClick,
    onPostClick,
    onContentClick,
  } = useInterests();

  return (
    <InterestsView
      activeTab={activeTab}
      onTabChange={onTabChange}
      favoriteSeries={favoriteSeries}
      latestUpdates={latestUpdates}
      newPosts={newPosts}
      newUniverseSeries={newUniverseSeries}
      onSeriesClick={onSeriesClick}
      onPostClick={onPostClick}
      onContentClick={onContentClick}
    />
  );
};

export default Interests;

