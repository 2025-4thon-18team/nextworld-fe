import { FC, useCallback } from "react";
import { SeriesCardSmall } from "@/components/SeriesCardSmall/SeriesCardSmall";
import { PostItem } from "@/components/article/PostItem/PostItem";
import { AddSeries } from "@/components/AddSeries/AddSeries";
import { RadioButton } from "@/components/RadioButton/RadioButton";
import { useNavigation } from "@/hooks/useNavigation";

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
            <div className="bg-grayscale-g2 relative flex size-120 shrink-0 items-center justify-center rounded-full">
              <span className="text-grayscale-g5">프로필</span>
            </div>
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
                    <p className="mb-0">안녕하세요 누구입니다 안녕</p>
                    <p>나 누구 좋아한다..</p>
                  </>
                )}
              </div>
              <p className="text-body-small-regular text-subtle w-full tracking-tight">
                {profile?.contact || "작가 개인 sns, 이메일"}
              </p>
            </div>
          </div>

          {/* 오른쪽 버튼들 */}
          <div className="flex items-center gap-10">
            <button
              onClick={onProfileEdit}
              className="bg-background-subtle flex h-38 items-center gap-10 rounded-sm px-26 py-9"
            >
              <span className="text-body-medium text-[#7b7978]">프로필 수정</span>
            </button>
            <button
              onClick={onLogout}
              className="bg-background-subtle flex h-38 items-center gap-10 rounded-sm px-26 py-9"
            >
              <span className="text-body-medium text-[#7b7978]">로그아웃</span>
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
                className="border-background-subtle h-230 min-h-230 w-403 shrink-0 rounded-xs border-t-2 bg-white"
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

            {postList.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-grayscale-g2 rounded-md p-12 w-380 h-200 flex flex-col gap-6"
              >
                <p className="text-body-medium text-black">{post.title}</p>
                <p className="text-body-small text-[#8A8A8A]">{post.date}</p>
                <p className="text-body-small text-[#8A8A8A]">
                  조회수 {post.views}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
