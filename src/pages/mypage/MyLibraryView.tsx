import { FC, useCallback } from "react";
import { SeriesCardSmall } from "@/components/SeriesCardSmall/SeriesCardSmall";
import { PostItem } from "@/components/article/PostItem/PostItem";
import { RadioButton } from "@/components/RadioButton/RadioButton";
import { useNavigation } from "@/hooks/useNavigation";
import type { PostResponseDto } from "@/querys/types";

type TabType = "구매한 작품" | "구매한 포스트";

type PostItemData = {
  id: string;
  title: string;
  content: string;
  points: number;
  tags: string[];
  rating: number;
  views: number;
  comments: number;
  date: string;
  isPaid?: boolean;
  price?: number | null;
  postData?: PostResponseDto;
};

type Props = {
  worksList: Array<{ id: number; imageUrl: string; title: string }>;
  postsList: PostItemData[];
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

export const MyLibraryView: FC<Props> = ({
  worksList,
  postsList,
  activeTab,
  onTabChange,
}) => {
  const { navigateToSeries, navigateToPost } = useNavigation();

  const handleWorkClick = useCallback(
    (id: number) => {
      navigateToSeries(id);
    },
    [navigateToSeries],
  );

  const handlePostClick = useCallback(
    (id: string) => {
      navigateToPost(id);
    },
    [navigateToPost],
  );

  return (
    <div className="flex flex-col gap-24">
      <p className="text-headings-heading-2 w-full tracking-tight text-black">
        내 서재
      </p>

      <div className="gap-lg flex flex-col items-center">
        {/* Tab Buttons */}
        <div className="flex w-full items-center gap-2">
          <RadioButton
            selected={activeTab === "구매한 작품"}
            onClick={() => onTabChange("구매한 작품")}
          >
            구매한 작품
          </RadioButton>
          <RadioButton
            selected={activeTab === "구매한 포스트"}
            onClick={() => onTabChange("구매한 포스트")}
          >
            구매한 포스트
          </RadioButton>
        </div>

        {/* Works or Posts List */}
        {activeTab === "구매한 작품" ? (
          <div className="gap-lg px-md flex w-full flex-wrap items-center py-0">
            {worksList.length > 0 ? (
              worksList.map((work) => (
                <SeriesCardSmall
                  key={work.id}
                  imageUrl={work.imageUrl}
                  title={work.title}
                  onClick={() => handleWorkClick(work.id)}
                />
              ))
            ) : (
              <p className="text-body-regular text-text-muted">
                구매한 작품이 없습니다.
              </p>
            )}
          </div>
        ) : (
          <div className="gap-lg px-md flex w-full flex-wrap items-start py-0">
            {postsList.length > 0 ? (
              postsList.map((post) => (
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
                  onClick={() => handlePostClick(post.id)}
                  className="border-background-subtle h-230 min-h-230 shrink-0 grow rounded-xs border-t-2 bg-white"
                  isPaid={post.isPaid}
                  price={post.price}
                  postData={post.postData}
                />
              ))
            ) : (
              <p className="text-body-regular text-text-muted">
                구매한 포스트가 없습니다.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
