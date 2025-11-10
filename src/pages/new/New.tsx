import { FC } from "react";
import { NewView } from "./NewView";
import { useNew } from "@/logic/useNew";

export const New: FC = () => {
  const {
    activeTab,
    onTabChange,
    newSeries,
    newPosts,
    onSeriesClick,
    onPostClick,
  } = useNew();

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

