import { FC, useMemo } from "react";
import { useGetMyWorkScraps, useGetMyPostScraps } from "@/querys/useScrap";
import { useWorkTransform } from "@/hooks/useWorkTransform";

const Favorites: FC = () => {
  // 스크랩한 작품 및 포스트 조회
  const { data: scrappedWorks } = useGetMyWorkScraps();
  const { data: scrappedPosts } = useGetMyPostScraps();

  const workList = useWorkTransform(scrappedWorks);

  // 포스트 리스트 변환 (authorName, workTitle 포함)
  const postList = useMemo(() => {
    if (!scrappedPosts) return [];
    return scrappedPosts.map((post) => ({
      id: String(post.id),
      title: post.title,
      authorName: post.authorName,
      workTitle: post.workTitle || "",
    }));
  }, [scrappedPosts]);

  return (
    <div className="flex flex-col gap-24 p-24">
      <h1 className="text-headings-heading-1 text-black">선호 작품</h1>

      {/* 스크랩한 작품 목록 */}
      <div className="flex flex-col gap-16">
        <h2 className="text-headings-heading-3 text-black">스크랩한 작품</h2>
        {workList && workList.length > 0 ? (
          <div className="grid grid-cols-4 gap-16">
            {workList.map((work) => (
              <div key={work.id} className="flex flex-col gap-8">
                <img
                  src={work.imageUrl}
                  alt={work.title}
                  className="h-253 w-162 object-cover"
                />
                <p className="text-body-medium text-black">{work.title}</p>
              </div>
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
          <div className="flex flex-col gap-12">
            {postList.map((post) => (
              <div
                key={post.id}
                className="border-grayscale-g2 flex flex-col gap-8 border-b pb-12"
              >
                <p className="text-body-medium text-black">{post.title}</p>
                <p className="text-body-small-regular text-text-muted">
                  {post.authorName} · {post.workTitle}
                </p>
              </div>
            ))}
          </div>
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
