import { FC, useCallback } from "react";
import { SeriesCardSmall } from "@/components/SeriesCardSmall/SeriesCardSmall";
import { PostItem } from "@/components/article/PostItem/PostItem";
import { AddSeries } from "@/components/AddSeries/AddSeries";
import { RadioButton } from "@/components/RadioButton/RadioButton";
import { useNavigation } from "@/hooks/useNavigation";
import type { PostResponseDto } from "@/querys/types";
import { ProfileImg } from "@/components/ProfileImg/ProfileImg";

type TabType = "작품" | "포스트";

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
  profile: {
    name: string;
    bio: string[];
    contact: string;
    profileImageUrl?: string;
  } | null;
  worksList: Array<{ id: number; imageUrl: string; title: string }>;
  postsList: PostItemData[];
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onProfileEdit: () => void;
  onLogout: () => void;
};

export const MyPageMainView: FC<Props> = ({
  profile,
  worksList,
  postsList,
  activeTab,
  onTabChange,
  onProfileEdit,
  onLogout,
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
    <div className="flex flex-col gap-10">
      {/* Profile Section */}
      <div className="flex flex-col gap-47">
        <div className="flex w-full items-center justify-between">
          {/* 왼쪽 프로필 */}
          <div className="flex items-center gap-38">
            <ProfileImg
              imageUrl={profile?.profileImageUrl}
              size="lg"
              className="ml-20 shrink-0"
            />

            <div className="flex w-233 flex-col items-start gap-9 text-black">
              <p className="text-headings-heading-4 w-full tracking-tight text-black">
                {profile?.name || "[작가명]"}
              </p>
              <div className="text-body-regular w-full tracking-tight text-black">
                {profile?.bio.map((line, idx) => (
                  <p key={idx} className={idx === 0 ? "mb-0" : ""}>
                    {line}
                  </p>
                )) || (
                  <>
                    <p className="mb-0">자기소개가 없습니다.</p>
                  </>
                )}
              </div>
              <p className="text-body-small-regular text-subtle w-full tracking-tight">
                {profile?.contact || ""}
              </p>
            </div>
          </div>

          {/* 오른쪽 버튼들 */}
          <div className="flex items-center gap-10">
            <button
              onClick={onProfileEdit}
              className="bg-background-subtle flex h-38 items-center gap-10 rounded-sm px-26 py-9"
            >
              <span className="text-body-medium text-text-muted">
                프로필 수정
              </span>
            </button>
            <button
              onClick={onLogout}
              className="bg-background-subtle flex h-38 items-center gap-10 rounded-sm px-26 py-9"
            >
              <span className="text-body-medium text-text-muted">로그아웃</span>
            </button>
          </div>
        </div>

        <div className="border-grayscale-g2 h-0 w-full border-t" />
      </div>

      {/* Tab Buttons */}
      <div className="flex items-center gap-2">
        <RadioButton
          selected={activeTab === "작품"}
          onClick={() => onTabChange("작품")}
        >
          작품
        </RadioButton>
        <RadioButton
          selected={activeTab === "포스트"}
          onClick={() => onTabChange("포스트")}
        >
          포스트
        </RadioButton>
      </div>

      {/* Works or Posts List */}
      {activeTab === "작품" ? (
        <div className="px-md flex flex-wrap items-center gap-12 py-0">
          <AddSeries />
          {worksList.map((work) => (
            <SeriesCardSmall
              key={work.id}
              imageUrl={work.imageUrl}
              title={work.title}
              onClick={() => handleWorkClick(work.id)}
            />
          ))}
        </div>
      ) : (
        <div className="px-md flex flex-wrap items-start gap-12 py-0">
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
                className="border-background-subtle ㄴshrink-0 h-230 min-h-230 grow rounded-xs border-t-2 bg-white"
                isPaid={post.isPaid}
                price={post.price}
                postData={post.postData}
              />
            ))
          ) : (
            <p className="text-body-regular text-text-muted">
              작성한 포스트가 없습니다.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
