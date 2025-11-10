import { FC } from "react";
import { cn } from "@/utils";
import { Gnb } from "@/components/Gnb/Gnb";
import { HomeCategory } from "@/components/HomeCategory/HomeCategory";
import { PostListVertical } from "@/components/PostListVertical/PostListVertical";
import { SeriesCard } from "@/components/SeriesCard/SeriesCard";

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

type Props = {
  className?: string;
  activeTab: HomeCategoryTab;
  onTabChange: (tab: HomeCategoryTab) => void;
  newSeries: SeriesItem[];
  newPosts: PostItem[];
  onSeriesClick?: (id: string) => void;
  onPostClick?: (id: string) => void;
};

export const NewView: FC<Props> = ({
  className,
  activeTab,
  onTabChange,
  newSeries,
  newPosts,
  onSeriesClick,
  onPostClick,
}) => {
  return (
    <div className={cn("bg-white relative size-full", className)}>
      {/* GNB */}
      <Gnb className="absolute bg-white border-b-sm border-grayscale-g2 left-0 top-0 w-full" />

      {/* Home Category */}
      <HomeCategory
        activeTab={activeTab}
        onTabChange={onTabChange}
        className="absolute flex h-48 items-center left-[calc(8.333%+68px)] top-96"
      />

      {/* Main Content */}
      <div className="absolute flex gap-37 items-start left-[calc(8.333%+68px)] top-176">
        {/* Left Sidebar - New Series Grid */}
        <div className="flex flex-col gap-md items-start relative shrink-0">
          <h2 className="text-headings-heading-2 text-black text-nowrap tracking-tight">
            신규 작품
          </h2>
          <div className="content-center flex flex-wrap gap-0 items-center relative shrink-0 w-609">
            {newSeries.map((series) => (
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

        {/* Right Content Area - New Posts */}
        <div className="flex flex-col gap-md items-start relative shrink-0">
          <h2 className="text-headings-heading-2 text-black tracking-tight w-min-content min-w-full">
            신규 포스트
          </h2>
          <PostListVertical
            items={newPosts}
            onItemClick={onPostClick}
            className="content-start flex flex-wrap gap-lg items-start relative shrink-0 w-403"
          />
        </div>
      </div>
    </div>
  );
};

