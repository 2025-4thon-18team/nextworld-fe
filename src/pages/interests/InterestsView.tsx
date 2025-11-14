import { FC } from "react";
import { cn } from "@/utils";
import { CategoryTabs } from "@/components/CategoryTabs/CategoryTabs";
import { PostListHorizontal } from "@/components/PostListHorizontal/PostListHorizontal";
import { SeriesCard } from "@/components/SeriesCard/SeriesCard";
import { ContentItem } from "@/components/article/ContentItem/ContentItem";

type CategoryTabsTab = "홈" | "신규" | "관심";

type SeriesItem = {
  id: string;
  imageUrl: string;
  title: string;
  tags: string[];
};

type PostItem = {
  id: string;
  title: string;
  content: string;
  points: number;
  tags: string[];
  rating: number;
  views: number;
  comments: number;
  date: string;
};

type ContentItemData = {
  id: string;
  title: string;
  points: number;
  rating: number;
  views: number;
  comments: number;
  date: string;
};

type Props = {
  className?: string;
  activeTab: CategoryTabsTab;
  onTabChange: (tab: CategoryTabsTab) => void;
  favoriteSeries: SeriesItem[];
  latestUpdates: ContentItemData[];
  newPosts: PostItem[];
  newUniverseSeries: SeriesItem[];
  selectedWorkId: number | null;
  onContentClick?: (id: string) => void;
  onSeriesClick?: (seriesId: string) => void;
};

export const InterestsView: FC<Props> = ({
  className,
  activeTab,
  onTabChange,
  favoriteSeries,
  latestUpdates,
  newPosts,
  newUniverseSeries,
  selectedWorkId,
  onContentClick,
  onSeriesClick,
}) => {
  return (
    <div className={cn("flex size-full flex-col bg-white", className)}>
      {/* Home Category */}
      <div className="flex justify-center">
        <CategoryTabs
          activeTab={activeTab as "홈" | "신규" | "관심"}
          onTabChange={(tab) => onTabChange(tab as CategoryTabsTab)}
          className="flex h-48 items-center"
        />
      </div>

      {/* Main Content */}
      <div className="gap-lg flex items-start px-[calc(8.333%+68px)] pt-20">
        {/* Left Sidebar - Favorite Series */}
        <div className="gap-md flex shrink-0 flex-col items-start justify-center">
          <h2 className="text-headings-heading-2 tracking-tight text-nowrap text-black">
            관심 작품
          </h2>
          <div className="gap-lg flex h-1138 shrink-0 flex-col items-start overflow-hidden">
            {/* Series Cards */}
            {favoriteSeries.map((series) => {
              const isSelected =
                selectedWorkId !== null && Number(series.id) === selectedWorkId;
              return (
                <SeriesCard
                  key={series.id}
                  imageUrl={series.imageUrl}
                  title={series.title}
                  tags={series.tags}
                  seriesId={series.id}
                  selected={isSelected}
                  onClick={() => onSeriesClick?.(series.id)}
                  className="gap-sm p-sm flex w-203 shrink-0 flex-col items-start rounded-md"
                />
              );
            })}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="flex w-1 shrink-0 items-center justify-center self-stretch">
          <div className="h-full flex-none rotate-90">
            <div className="h-full w-full">
              <div className="border-grayscale-g2 top-[-2px] right-0 bottom-0 left-0 border-t" />
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex flex-1 shrink-0 flex-col items-start gap-44">
          {/* Latest Updates Section */}
          <div className="gap-md flex w-full shrink-0 flex-col items-start">
            <h2 className="text-headings-heading-2 w-full tracking-tight text-black">
              최신화
            </h2>
            <div className="flex w-full shrink-0 flex-col items-start">
              {latestUpdates.map((item) => (
                <ContentItem
                  key={item.id}
                  title={item.title}
                  points={item.points}
                  rating={item.rating}
                  views={item.views}
                  comments={item.comments}
                  date={item.date}
                  onClick={() => onContentClick?.(item.id)}
                />
              ))}
            </div>
          </div>

          {/* New Posts Section */}
          <div className="gap-md flex w-full shrink-0 flex-col items-start">
            <h2 className="text-headings-heading-2 w-full tracking-tight text-black">
              신규 포스트
            </h2>
            <PostListHorizontal
              items={newPosts}
              className="flex w-full items-center"
            />
          </div>

          {/* New Universe Series Section */}
          <div className="gap-md flex shrink-0 flex-col items-start">
            <h2 className="text-headings-heading-2 w-full tracking-tight text-black">
              신규 유니버스 작품
            </h2>
            <div className="gap-md flex w-full shrink-0 flex-col items-start">
              <div className="gap-lg flex w-full shrink-0 items-center">
                {newUniverseSeries.map((series) => (
                  <SeriesCard
                    key={series.id}
                    imageUrl={series.imageUrl}
                    title={series.title}
                    tags={series.tags}
                    seriesId={series.id}
                    selected={false}
                    className="gap-sm p-sm flex w-203 shrink-0 flex-col items-start rounded-md"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
