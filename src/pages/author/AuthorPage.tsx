import { useParams } from "react-router-dom";
import { AuthorPageView } from "./AuthorPageView";
import {
  useGetAuthorProfile,
  useGetAuthorWorks,
  useGetAuthorPosts,
} from "@/querys/useUsers";
import { useTab } from "@/hooks/useTab";
import { usePostTransform, useWorkTransform } from "@/hooks";
import type { PostResponseDto, WorkResponseDto } from "@/querys/types";

const AuthorPage = () => {
  const { activeTab, onTabChange } = useTab<"작품" | "포스트">("작품");
  const { authorId } = useParams<{ authorId: string }>();
  const authorIdNum = authorId ? Number(authorId) : 0;

  // React Query hooks 직접 사용
  const { data: authorProfile } = useGetAuthorProfile(authorIdNum);
  const { data: authorWorks } = useGetAuthorWorks(authorIdNum);
  const { data: authorPosts } = useGetAuthorPosts(authorIdNum);

  const seriesList = useWorkTransform(authorWorks as unknown as WorkResponseDto[]);
  const postList = usePostTransform(authorPosts as unknown as PostResponseDto[]);
  if (!authorProfile) return <div>작가 정보를 찾을 수 없습니다.</div>;

  return (
    <AuthorPageView
      authorProfile={authorProfile}
      activeTab={activeTab}
      seriesList={seriesList || []}
      postList={postList || []}
      onTabChange={onTabChange}
    />
  );
};

export default AuthorPage;
