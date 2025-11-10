import { FC } from "react";
import { cn } from "@/utils";
import { Gnb } from "@/components/Gnb/Gnb";
import { HomeCategory } from "@/components/HomeCategory/HomeCategory";
import { PostListHorizontal } from "@/components/PostListHorizontal/PostListHorizontal";
import { SeriesListHorizontal } from "@/components/SeriesListHorizontal/SeriesListHorizontal";
import { SeriesCard } from "@/components/SeriesCard/SeriesCard";

type HomeCategoryTab = "홈" | "신규" | "관심";

type UniverseItem = {
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

type SeriesItem = {
  id: string;
  imageUrl: string;
  title: string;
  tags: string[];
};

type Props = {
  className?: string;
  activeTab: HomeCategoryTab;
  onTabChange: (tab: HomeCategoryTab) => void;
  universeOfWeek: UniverseItem | null;
  popularSeries: SeriesItem[];
  popularPosts: PostItem[];
  onUniverseClick?: (id: string) => void;
  onSeriesClick?: (id: string) => void;
  onPostClick?: (id: string) => void;
};

export const HomeView: FC<Props> = ({
  className,
  activeTab,
  onTabChange,
  universeOfWeek,
  popularSeries,
  popularPosts,
  onUniverseClick,
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
      <div className="absolute flex gap-lg items-start left-[calc(8.333%+68px)] top-176">
        {/* Universe of the Week Section */}
        <div className="flex flex-col gap-md items-start relative shrink-0 w-full">
          <h2 className="text-headings-heading-2 text-black tracking-tight w-full">
            금주의 유니버스
          </h2>
          <div className="flex gap-lg items-start relative shrink-0 w-full">
            {/* Featured Universe Card */}
            {universeOfWeek && (
              <div className="flex flex-col gap-sm items-start relative shrink-0 w-310">
                <div className="relative w-310 h-476 rounded-sm overflow-hidden">
                  <img
                    alt={universeOfWeek.title}
                    src={universeOfWeek.imageUrl}
                    className="absolute inset-0 max-w-none object-cover object-center pointer-events-none rounded-sm size-full"
                  />
                </div>
              </div>
            )}

            {/* Post Lists */}
            <div className="flex flex-col gap-lg items-start relative shrink-0 w-1660">
              <PostListHorizontal
                items={popularPosts.slice(0, 4)}
                onItemClick={onPostClick}
                className="flex gap-lg items-center relative shrink-0 w-full"
              />
              <PostListHorizontal
                items={popularPosts.slice(4, 8)}
                onItemClick={onPostClick}
                className="flex gap-lg items-center relative shrink-0 w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Popular Series Section */}
      <div className="absolute flex flex-col gap-md items-start left-[calc(8.333%+68px)] top-560">
        <h2 className="text-headings-heading-2 text-black tracking-tight w-1298">
          인기 작품
        </h2>
        <SeriesListHorizontal
          items={popularSeries}
          onItemClick={onSeriesClick}
          className="flex gap-lg items-center relative shrink-0 w-1298"
        />
      </div>

      {/* Popular Posts Section */}
      <div className="absolute flex flex-col gap-md items-start left-[calc(8.333%+68px)] top-1016">
        <h2 className="text-headings-heading-2 text-black tracking-tight w-1660">
          인기 포스트
        </h2>
        <div className="flex flex-col items-start relative shrink-0 w-full">
          <PostListHorizontal
            items={popularPosts.slice(0, 4)}
            onItemClick={onPostClick}
            className="flex gap-lg items-center relative shrink-0 w-full"
          />
          <PostListHorizontal
            items={popularPosts.slice(4, 8)}
            onItemClick={onPostClick}
            className="flex gap-lg items-center relative shrink-0 w-full"
          />
        </div>
      </div>
    </div>
  );
};

