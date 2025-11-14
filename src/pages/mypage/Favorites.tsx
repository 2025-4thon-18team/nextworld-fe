import { FC } from "react";
import { useGetMyWorkScraps, useGetMyPostScraps } from "@/querys/useScrap";
import { useSimpleWorkTransform } from "@/hooks/useWorkTransform";
import { usePostTransform } from "@/hooks/usePostTransform";
import { SeriesCardSmall } from "@/components/SeriesCardSmall/SeriesCardSmall";
import { PostListVertical } from "@/components/PostListVertical/PostListVertical";

const Favorites: FC = () => {
  // 스크랩한 작품 및 포스트 조회
  const { data: scrappedWorks } = useGetMyWorkScraps();
  const { data: scrappedPosts } = useGetMyPostScraps();

  const workList = useSimpleWorkTransform(scrappedWorks);
  const postList = usePostTransform(scrappedPosts);

  return (
    <div className="flex flex-col gap-24 p-24">
      <h1 className="text-headings-heading-1 text-black">선호 작품</h1>

      {/* 스크랩한 작품 목록 */}
      <div className="flex flex-col gap-16">
        <h2 className="text-headings-heading-3 text-black">스크랩한 작품</h2>
        {workList && workList.length > 0 ? (
          <div className="px-md flex flex-wrap items-center gap-12 py-0">
            {workList.map((work) => (
              <SeriesCardSmall
                key={work.id}
                imageUrl={work.imageUrl}
                title={work.title}
              />
            ))}
          </div>
        ) : (
          <p className="text-body-regular text-text-muted">
            스크랩한 작품이 없습니다.
          </p>
        )}
      </div>

      {/* 스크랩한 포스트 목록 */}
      <div className="flex flex-col gap-16">
        <h2 className="text-headings-heading-3 text-black">스크랩한 포스트</h2>
        {postList && postList.length > 0 ? (
          <PostListVertical items={postList} />
        ) : (
          <p className="text-body-regular text-text-muted">
            스크랩한 포스트가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
