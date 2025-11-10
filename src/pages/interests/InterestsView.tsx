import { FC } from "react";
import { cn } from "@/utils";
import { Gnb } from "@/components/Gnb/Gnb";
import { HomeCategory } from "@/components/HomeCategory/HomeCategory";
import { PostListHorizontal } from "@/components/PostListHorizontal/PostListHorizontal";
import { SeriesCard } from "@/components/SeriesCard/SeriesCard";
import { ContentItem } from "@/components/article/ContentItem/ContentItem";

type HomeCategoryTab = "홈" | "신규" | "관심";

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
  activeTab: HomeCategoryTab;
  onTabChange: (tab: HomeCategoryTab) => void;
  favoriteSeries: SeriesItem[];
  latestUpdates: ContentItemData[];
  newPosts: PostItem[];
  newUniverseSeries: SeriesItem[];
  onSeriesClick?: (id: string) => void;
  onPostClick?: (id: string) => void;
  onContentClick?: (id: string) => void;
};

export const InterestsView: FC<Props> = ({
  className,
  activeTab,
  onTabChange,
  favoriteSeries,
  latestUpdates,
  newPosts,
  newUniverseSeries,
  onSeriesClick,
  onPostClick,
  onContentClick,
}) => {
  return (
    <div className={cn("bg-white relative size-full", className)}>
      {/* GNB */}
      <Gnb className="absolute bg-white border-b-sm border-grayscale-g2 left-0 top-0 w-full" />

      {/* Home Category */}
      <HomeCategory
        activeTab={activeTab}
        onTabChange={onTabChange}
        className="absolute flex h-48 items-center left-[calc(8.333%+67px)] top-96"
      />

      {/* Main Content */}
      <div className="absolute flex gap-lg items-start left-[calc(8.333%+68px)] top-176">
        {/* Left Sidebar - Favorite Series */}
        <div className="flex flex-col gap-md items-start justify-center relative shrink-0">
          <h2 className="text-headings-heading-2 text-black text-nowrap tracking-tight">
            관심 작품
          </h2>
          <div className="flex flex-col gap-lg h-1138 items-start overflow-hidden relative shrink-0">
            {/* Featured Series Card (Selected) */}
            {favoriteSeries.length > 0 && (
              <SeriesCard
                imageUrl={favoriteSeries[0].imageUrl}
                title={favoriteSeries[0].title}
                tags={favoriteSeries[0].tags}
                selected={true}
                className="flex flex-col gap-sm items-start rounded-md p-sm shrink-0 w-203"
              />
            )}

            {/* Other Series Cards */}
            {favoriteSeries.slice(1).map((series) => (
              <SeriesCard
                key={series.id}
                imageUrl={series.imageUrl}
                title={series.title}
                tags={series.tags}
                selected={false}
                className="flex flex-col gap-sm items-start rounded-md p-sm shrink-0 w-203"
              />
            ))}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="flex items-center justify-center relative self-stretch shrink-0 w-1">
          <div className="flex-none h-full rotate-90">
            <div className="h-full relative w-full">
              <div className="absolute bottom-0 left-0 right-0 top-[-2px] border-t border-grayscale-g2" />
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex flex-col gap-44 items-start relative shrink-0 w-1661">
          {/* Latest Updates Section */}
          <div className="flex flex-col gap-md items-start relative shrink-0 w-872">
            <h2 className="text-headings-heading-2 text-black tracking-tight w-full">
              최신화
            </h2>
            <div className="flex flex-col items-start relative shrink-0 w-full">
              {latestUpdates.map((item) => (
                <ContentItem
                  key={item.id}
                  title={item.title}
                  points={item.points}
                  rating={item.rating}
                  views={item.views}
                  comments={item.comments}
                  date={item.date}
                  className="border-t-2 border-background-subtle h-84 relative shrink-0 w-872"
                />
              ))}
            </div>
          </div>

          {/* New Posts Section */}
          <div className="flex flex-col gap-md items-start relative shrink-0 w-full">
            <h2 className="text-headings-heading-2 text-black tracking-tight w-full">
              신규 포스트
            </h2>
            <PostListHorizontal
              items={newPosts}
              onItemClick={onPostClick}
              className="flex gap-lg items-center relative shrink-0 w-full"
            />
          </div>

          {/* New Universe Series Section */}
          <div className="flex flex-col gap-md h-403 items-start relative shrink-0 w-1298">
            <h2 className="text-headings-heading-2 text-black tracking-tight w-full">
              신규 유니버스 작품
            </h2>
            <div className="flex flex-col gap-md items-start relative shrink-0 w-full">
              <div className="flex gap-lg items-center relative shrink-0 w-full">
                {newUniverseSeries.map((series) => (
                  <SeriesCard
                    key={series.id}
                    imageUrl={series.imageUrl}
                    title={series.title}
                    tags={series.tags}
                    selected={false}
                    className="flex flex-col gap-sm items-start rounded-md p-sm shrink-0 w-203"
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

