import { FC } from "react";
import { cn } from "@/utils";
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
};

export const NewView: FC<Props> = ({
  className,
  activeTab,
  onTabChange,
  newSeries,
  newPosts,
}) => {
  return (
    <div className={cn("flex size-full flex-col bg-white", className)}>
      {/* Home Category */}
      <div className="flex justify-center">
        <HomeCategory
          activeTab={activeTab as "홈" | "신규" | "관심"}
          onTabChange={(tab) => onTabChange(tab as HomeCategoryTab)}
          className="flex h-48 items-center"
        />
      </div>

      {/* Main Content */}
      <div className="flex items-start gap-37 px-[calc(8.333%+68px)] pt-20">
        {/* Left Sidebar - New Series Grid */}
        <div className="gap-md flex shrink-0 flex-col items-start">
          <h2 className="text-headings-heading-2 tracking-tight text-nowrap text-black">
            신규 작품
          </h2>
          <div className="flex w-609 shrink-0 flex-wrap items-center gap-0">
            {newSeries.map((series) => (
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

        {/* Vertical Divider */}
        <div className="flex w-1 shrink-0 items-center justify-center self-stretch">
          <div className="h-full flex-none rotate-90">
            <div className="h-full w-full">
              <div className="border-grayscale-g2 top-[-2px] right-0 bottom-0 left-0 border-t" />
            </div>
          </div>
        </div>

        {/* Right Content Area - New Posts */}
        <div className="gap-md flex shrink-0 flex-col items-start">
          <h2 className="text-headings-heading-2 w-min-content min-w-full tracking-tight text-black">
            신규 포스트
          </h2>
          <PostListVertical
            items={newPosts}
            className="gap-lg flex w-403 shrink-0 flex-wrap items-start"
          />
        </div>
      </div>
    </div>
  );
};
