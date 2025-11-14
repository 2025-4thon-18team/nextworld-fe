import { FC } from "react";
import { cn } from "@/utils";
import { CategoryTabs } from "@/components/CategoryTabs/CategoryTabs";
import { PostListHorizontal } from "@/components/PostListHorizontal/PostListHorizontal";
import { SeriesListHorizontal } from "@/components/SeriesListHorizontal/SeriesListHorizontal";
import PresetImage from "@/assets/presets/preset-2.png";
import { SeriesCard } from "@/components/SeriesCard/SeriesCard";

type CategoryTabsTab = "홈" | "신규" | "관심";

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
  activeTab: CategoryTabsTab;
  onTabChange: (tab: CategoryTabsTab) => void;
  universeOfWeek: UniverseItem | null;
  popularSeries: SeriesItem[];
  popularPosts: PostItem[];
};

export const HomeView: FC<Props> = ({
  className,
  activeTab,
  onTabChange,
  universeOfWeek,
  popularSeries,
  popularPosts,
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
      <div className="flex flex-col gap-44 px-[calc(8.333%+68px)]">
        {/* Universe of the Week Section */}
        <div className="gap-md flex flex-col items-start">
          <h2 className="text-headings-heading-2 w-full tracking-tight text-black">
            금주의 유니버스
          </h2>
          <div className="gap-lg flex w-full items-start">
            {/* Featured Universe Card */}
            {universeOfWeek && (
              <div className="gap-sm relative flex w-310 shrink-0 flex-col overflow-hidden">
                <div className="relative h-476 w-310 overflow-hidden rounded-sm blur-sm">
                  <picture
                    className="pointer-events-none absolute inset-0 size-full max-w-none rounded-sm object-cover object-center"
                    draggable={false}
                    aria-label={universeOfWeek.title}
                  >
                    <source srcSet={universeOfWeek.imageUrl} type="image/png" />
                    <img
                      src={PresetImage}
                      className="size-full rounded-sm object-cover object-center"
                      draggable={false}
                      alt={universeOfWeek.title}
                    />
                  </picture>
                </div>
                <div className="bg-background-subtle absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm">
                  <SeriesCard
                    seriesId={universeOfWeek.id}
                    imageUrl={universeOfWeek.imageUrl}
                    title={universeOfWeek.title}
                    tags={universeOfWeek.tags}
                    className="size-full rounded-sm object-cover object-center"
                  />
                </div>
              </div>
            )}
            {/* Post Lists */}
            <div className="gap-lg flex flex-1 shrink-0 flex-col">
              <PostListHorizontal
                items={popularPosts.slice(0, 4)}
                className="flex w-full items-center"
              />
              <PostListHorizontal
                items={popularPosts.slice(4, 8)}
                className="flex w-full items-center"
              />
            </div>
          </div>
        </div>

        {/* Popular Series Section */}
        <div className="gap-md flex flex-col items-start">
          <h2 className="text-headings-heading-2 w-full tracking-tight text-black">
            인기 작품
          </h2>
          <SeriesListHorizontal
            items={popularSeries}
            className="flex w-full items-center"
          />
        </div>

        {/* Popular Posts Section */}
        <div className="gap-md flex flex-col items-start">
          <h2 className="text-headings-heading-2 w-full tracking-tight text-black">
            인기 포스트
          </h2>
          <div className="flex w-full flex-col items-start">
            <PostListHorizontal
              items={popularPosts.slice(0, 4)}
              className="flex w-full items-center"
            />
            <PostListHorizontal
              items={popularPosts.slice(4, 8)}
              className="flex w-full items-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
