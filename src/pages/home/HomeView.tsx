// ⭐ HomeView.tsx — 스크린샷 레이아웃 반영
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
    <div className={cn("flex flex-col bg-white", className)}>
      {/* Home Category */}
      <div className="flex justify-center">
        <CategoryTabs
          activeTab={activeTab as "홈" | "신규" | "관심"}
          onTabChange={(tab) => onTabChange(tab as CategoryTabsTab)}
          className="flex h-20 items-center"
        />
      </div>

      {/* ⭐ 메인 컨텐츠 전체 패딩 */}
      <div className="mt-10 flex flex-col gap-20 px-20">
        {/* ⭐ 금주의 유니버스 */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black">금주의 유니버스</h2>

          <div className="flex w-full items-stretch gap-6">
            {/* 왼쪽 대표 카드 */}
            {universeOfWeek && (
              <div className={cn("flex h-453 items-center", className)}>
                {/* Left: Blurred background + clear image */}
                <div className="bg-background-subtle relative h-full w-411 shrink-0 overflow-hidden rounded-tl-md">
                  {/* Blurred background */}
                  <div className="absolute inset-0 h-450 w-424 blur filter">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                    >
                      <img
                        alt=""
                        className="absolute size-full max-w-none object-cover object-center"
                        src={universeOfWeek.imageUrl}
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-[rgba(122,122,122,0.4)]" />
                    </div>
                  </div>

                  {/* Clear image */}
                  <div className="absolute top-1/2 left-1/2 h-300 w-200 -translate-x-1/2 -translate-y-1/2 rounded-xs">
                    <img
                      alt={universeOfWeek.title}
                      className="pointer-events-none absolute inset-0 size-full max-w-none rounded-xs object-cover object-center"
                      draggable={false}
                      src={universeOfWeek.imageUrl}
                    />
                  </div>
                </div>
              </div> // ⭐ 여기 닫힘 추가
            )}

            {/* 오른쪽 포스트 리스트 2x2 */}
            <div className="flex flex-1 flex-col gap-4">
              <PostListHorizontal
                items={popularPosts.slice(0, 4)}
                className="grid grid-cols-2 gap-4 overflow-visible"
              />
            </div>
          </div>
        </div>

        {/* ⭐ 인기 작품 */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black">인기 작품</h2>
          <SeriesListHorizontal
            items={popularSeries}
            className="grid grid-cols-6 gap-6"
          />
        </div>

        {/* ⭐ 인기 포스트 */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black">인기 포스트</h2>
          <PostListHorizontal
            items={popularPosts.slice(0, 6)}
            className="grid grid-cols-3 gap-6 overflow-visible"
          />
        </div>
      </div>
    </div>
  );
};
