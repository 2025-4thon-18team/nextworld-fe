import { FC } from "react";
import { cn } from "@/utils";
import { Gnb } from "@/components/Gnb/Gnb";
import { SeriesDetailHeroView } from "./components/SeriesDetailHeroView";
import { ContentInfo } from "@/components/ContentInfo/ContentInfo";
import { SeriesDetailContentView } from "./components/SeriesDetailContentView";

interface Episode {
  id: string;
  title: string;
  points: number;
  rating: number;
  views: number;
  comments: number;
  date: string;
}

interface UniverseWork {
  id: string;
  imageUrl: string;
  title: string;
  tags: string[];
}

interface Post {
  id: string;
  title: string;
  points: number;
  content: string;
  tags: string[];
  rating: number;
  views: number;
  comments: number;
  date: string;
}

interface SeriesDetailViewProps {
  // Hero section
  imageUrl: string;
  universeName: string;
  seriesName: string;
  authorName: string;
  description: string;
  onViewFirstEpisode: () => void;

  // Content info sidebar
  category: string;
  rating: number;
  views: number;
  isSerializing: boolean;
  tags: string[];
  likes: number;
  onLike: () => void;
  onInterest: () => void;
  onShare: () => void;

  // Content section
  activeTab: "episodes" | "universe";
  totalEpisodes: number;
  episodes: Episode[];
  universeWorks: UniverseWork[];
  popularPosts: Post[];
  filterLabel: string;
  filterSubLabel?: string;
  onTabChange: (tab: "episodes" | "universe") => void;
  onEpisodeClick: (id: string) => void;
  onUniverseWorkClick: (id: string) => void;
  onPostClick: (id: string) => void;
  onFilterToggle?: () => void;

  className?: string;
}

export const SeriesDetailView: FC<SeriesDetailViewProps> = ({
  imageUrl,
  universeName,
  seriesName,
  authorName,
  description,
  onViewFirstEpisode,
  category,
  rating,
  views,
  isSerializing,
  tags,
  likes,
  onLike,
  onInterest,
  onShare,
  activeTab,
  totalEpisodes,
  episodes,
  universeWorks,
  popularPosts,
  filterLabel,
  filterSubLabel,
  onTabChange,
  onEpisodeClick,
  onUniverseWorkClick,
  onPostClick,
  onFilterToggle,
  className,
}) => {
  return (
    <div className={cn("relative size-full bg-white", className)}>
      {/* GNB */}
      <Gnb className="border-grayscale-g2 absolute top-px left-[-3px] w-1440 border-b bg-white" />

      {/* Hero Section */}
      <div className="absolute top-101 left-82">
        <SeriesDetailHeroView
          imageUrl={imageUrl}
          universeName={universeName}
          seriesName={seriesName}
          authorName={authorName}
          description={description}
          onViewFirstEpisode={onViewFirstEpisode}
        />
      </div>

      {/* Content Info Sidebar */}
      <div className="absolute top-600 left-118">
        <ContentInfo
          category={category}
          rating={rating}
          views={views}
          isSerializing={isSerializing}
          tags={tags}
          likes={likes}
          onLike={onLike}
          onInterest={onInterest}
          onShare={onShare}
        />
      </div>

      {/* Content Section */}
      <div className="absolute top-572 left-[calc(33.333%+35px)]">
        <SeriesDetailContentView
          activeTab={activeTab}
          totalEpisodes={totalEpisodes}
          episodes={episodes}
          universeWorks={universeWorks}
          popularPosts={popularPosts}
          filterLabel={filterLabel}
          filterSubLabel={filterSubLabel}
          onTabChange={onTabChange}
          onEpisodeClick={onEpisodeClick}
          onUniverseWorkClick={onUniverseWorkClick}
          onPostClick={onPostClick}
          onFilterToggle={onFilterToggle}
          className="w-833"
        />
      </div>
    </div>
  );
};
