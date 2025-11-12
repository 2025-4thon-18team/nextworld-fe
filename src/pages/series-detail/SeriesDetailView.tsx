import { FC } from "react";
import { cn } from "@/utils";
import { Gnb } from "@/components/Gnb/Gnb";
import { SeriesDetailHeroView } from "@/components/SeriesDetailHero/SeriesDetailHeroView";
import { ContentInfo } from "@/components/ContentInfo/ContentInfo";
import { SeriesDetailContentView } from "@/components/SeriesDetailContent/SeriesDetailContentView";

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
    <div className={cn("bg-white relative size-full", className)}>
      {/* GNB */}
      <Gnb className="absolute bg-white border-b border-grayscale-g2 left-[-3px] top-px w-1440" />

      {/* Hero Section */}
      <div className="absolute left-82 top-101">
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
      <div className="absolute left-118 top-600">
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
      <div className="absolute left-[calc(33.333%+35px)] top-572">
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

