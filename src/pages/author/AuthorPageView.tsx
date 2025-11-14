import { FC } from "react";
import { ProfileImg } from "@/components/ProfileImg/ProfileImg";
import { RadioButton } from "@/components/RadioButton/RadioButton";
import { SeriesCard } from "@/components/SeriesCard/SeriesCard";
import { PostItem } from "@/components/article/PostItem/PostItem";
import { useNavigation } from "@/hooks/useNavigation";
import type { AuthorProfileResponse } from "@/querys/types";
import { SeriesItem } from "@/hooks/useWorkTransform";
import { PostItem as PostItemType } from "@/hooks/usePostTransform";

type TabType = "작품" | "포스트";

type Props = {
  authorProfile: AuthorProfileResponse;
  activeTab: TabType;
  seriesList: SeriesItem[];
  postList: PostItemType[];
  onTabChange: (tab: TabType) => void;
};

export const AuthorPageView: FC<Props> = ({
  authorProfile,
  activeTab,
  seriesList,
  postList,
  onTabChange,
}) => {
  const { navigateToPost } = useNavigation();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center gap-32 bg-white">
      {/* Profile Section */}
      <div className="flex w-1062 flex-col items-start gap-10">
        <div className="flex w-full flex-col items-start gap-47">
          <div className="flex items-center gap-38">
            <ProfileImg imageUrl={authorProfile.profileImageUrl} size="lg" />
            <div className="flex w-233 flex-col items-start gap-9 text-black">
              <p className="text-headings-heading-4 w-full tracking-tight text-black">
                {authorProfile.nickname}
              </p>
              <div className="text-body-regular w-full tracking-tight text-black">
                {authorProfile.bio ? (
                  authorProfile.bio
                    .split("\n")
                    .map((line: string, idx: number) => (
                      <p key={idx} className={idx === 0 ? "mb-0" : ""}>
                        {line}
                      </p>
                    ))
                ) : (
                  <p className="mb-0">자기소개가 없습니다.</p>
                )}
              </div>
              <p className="text-body-small-regular text-subtle w-full tracking-tight">
                {authorProfile.contactEmail
                  ? authorProfile.contactEmail
                  : "연락용 이메일이 없습니다."}
              </p>
            </div>
          </div>
          <div className="h-0 w-full border-t border-black" />
        </div>

        {/* Tab Buttons */}
        <div className="flex w-full flex-col items-start gap-40">
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

          {/* Content Grid */}
          {activeTab === "작품" ? (
            <div className="px-md flex flex-wrap items-start gap-12 py-0">
              {seriesList &&
                seriesList.length > 0 &&
                seriesList.map((series) => (
                  <SeriesCard
                    key={series.id}
                    imageUrl={series.imageUrl}
                    title={series.title}
                    tags={series.tags}
                    seriesId={series.id}
                  />
                ))}
            </div>
          ) : (
            <div className="px-md flex flex-wrap items-start gap-12 py-0">
              {postList &&
                postList.length > 0 &&
                postList.map((post) => (
                  <PostItem
                    key={post.id}
                    title={post.title}
                    content={post.content}
                    points={post.points}
                    tags={post.tags}
                    rating={post.rating}
                    views={post.views}
                    comments={post.comments}
                    date={post.date}
                  onClick={() => navigateToPost(post.id)}
                  className="w-403 shrink-0"
                  isPaid={post.isPaid}
                  price={post.price}
                  postData={post.postData}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
