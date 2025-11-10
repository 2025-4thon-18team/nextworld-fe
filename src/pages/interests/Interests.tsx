import { FC } from "react";
import { InterestsView } from "./InterestsView";
import { useInterests } from "@/logic/useInterests";
import { createContentPort } from "@/services/content.service";

export const Interests: FC = () => {
  const content = createContentPort();
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
  } = useInterests({ content });

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

