import { FC } from "react";
import { cn } from "@/utils";
import { RadioButton } from "@/components/RadioButton/RadioButton";
import { FilterToggleButton } from "@/components/FilterToggleButton/FilterToggleButton";
import { ContentItem } from "@/components/article/ContentItem/ContentItem";
import { SeriesCard } from "@/components/SeriesCard/SeriesCard";
import { PostItem } from "@/components/article/PostItem/PostItem";

import type { PostResponseDto } from "@/querys/types";

interface Episode {
  id: string;
  title: string;
  points: number;
  rating: number;
  views: number;
  comments: number;
  date: string;
  // 결제 관련
  isPaid?: boolean;
  price?: number | null;
  postData?: PostResponseDto;
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
  // 결제 관련
  isPaid?: boolean;
  price?: number | null;
  postData?: PostResponseDto;
}

interface SeriesDetailContentViewProps {
  activeTab: "episodes" | "universe";
  totalEpisodes: number;
  episodes: Episode[];
  universeWorks: UniverseWork[];
  popularPosts: Post[];
  filterLabel: string;
  filterSubLabel?: string;
  onTabChange: (tab: "episodes" | "universe") => void;
  onEpisodeClick?: (id: string) => void;
  onPostClick?: (id: string) => void;
  onFilterToggle?: () => void;
  className?: string;
}

export const SeriesDetailContentView: FC<SeriesDetailContentViewProps> = ({
  activeTab,
  totalEpisodes,
  episodes,
  universeWorks,
  popularPosts,
  filterLabel,
  filterSubLabel,
  onTabChange,
  onEpisodeClick,
  onPostClick,
  onFilterToggle,
  className,
}) => {
  return (
    <div className={cn("flex w-full flex-col items-start", className)}>
      {/* Radio buttons */}
      <div className="relative flex w-full items-center">
        <RadioButton
          selected={activeTab === "episodes"}
          onClick={() => onTabChange("episodes")}
          className="min-w-120 grow basis-0"
        >
          회차
        </RadioButton>
        <RadioButton
          selected={activeTab === "universe"}
          onClick={() => onTabChange("universe")}
          className="min-w-120 grow basis-0"
        >
          유니버스
        </RadioButton>
      </div>

      {/* Content area */}
      {activeTab === "episodes" ? (
        <>
          {/* Header with filter */}
          <div className="border-grayscale-g2 px-md py-lg relative flex w-full items-center justify-between border-b">
            <p className="text-body-regular tracking-tight text-nowrap whitespace-pre text-black">
              총 {totalEpisodes}화
            </p>
            <FilterToggleButton
              label={filterLabel}
              subLabel={filterSubLabel}
              onClick={onFilterToggle}
            />
          </div>

          {/* Episodes list */}
          <div className="relative flex w-full flex-col items-start">
            {episodes.map((episode, index) => (
              <ContentItem
                key={episode.id}
                title={episode.title}
                points={episode.points}
                rating={episode.rating}
                views={episode.views}
                comments={episode.comments}
                date={episode.date}
                onClick={() => onEpisodeClick?.(episode.id)}
                className={
                  index > 0 ? "border-background-subtle border-t-2" : ""
                }
                isPaid={episode.isPaid}
                price={episode.price}
                postData={episode.postData}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="relative flex w-full flex-col items-start gap-36">
          {/* Popular Universe Works */}
          <div className="gap-md relative flex w-full flex-col items-start">
            <p className="text-headings-heading-2 w-full tracking-tight text-black">
              인기 유니버스 작품
            </p>
            <div className="gap-lg relative flex w-full items-center overflow-x-auto">
              {universeWorks.map((work) => (
                <SeriesCard
                  key={work.id}
                  imageUrl={work.imageUrl}
                  title={work.title}
                  tags={work.tags}
                  seriesId={work.id}
                  className="w-203 shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Popular Posts */}
          <div className="relative flex min-h-px w-full basis-0 flex-col gap-12">
            <p className="text-headings-heading-2 tracking-tight text-nowrap whitespace-pre text-black">
              인기 포스트
            </p>
            <div className="gap-lg relative flex w-full shrink-0 flex-wrap items-start">
              {popularPosts.map((post) => (
                <PostItem
                  key={post.id}
                  title={post.title}
                  points={post.points}
                  content={post.content}
                  tags={post.tags}
                  rating={post.rating}
                  views={post.views}
                  comments={post.comments}
                  date={post.date}
                  onClick={() => onPostClick?.(post.id)}
                  className="w-403 shrink-0"
                  isPaid={post.isPaid}
                  price={post.price}
                  postData={post.postData}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
