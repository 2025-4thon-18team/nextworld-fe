import { FC } from "react";
import { NewView } from "./NewView";
import { useNew } from "@/logic/useNew";
import { createContentPort } from "@/services/content.service";

export const New: FC = () => {
  const content = createContentPort();
  const {
    activeTab,
    onTabChange,
    newSeries,
    newPosts,
    onSeriesClick,
    onPostClick,
  } = useNew({ content });

  return (
    <NewView
      activeTab={activeTab}
      onTabChange={onTabChange}
      newSeries={newSeries}
      newPosts={newPosts}
      onSeriesClick={onSeriesClick}
      onPostClick={onPostClick}
    />
  );
};

export default New;

