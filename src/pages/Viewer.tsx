import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { ViewerView } from "./ViewerView";
import { useGetComments, useCreateComment } from "@/querys/useComments";
import {
  useGetPostById,
  useGetPreviousEpisode,
  useGetNextEpisode,
} from "@/querys/usePosts";
import {
  useGetRatingSummary,
  useGetMyRating,
  useRatePost,
} from "@/querys/useRatings";
import { useNavigation } from "@/hooks/useNavigation";
import type { CreateCommentRequest } from "@/querys/types";
import { toast } from "sonner";

const Viewer = ({ type }: { type: "EPISODE" | "POST" }) => {
  const { postId, contentId } = useParams<{
    postId?: string;
    contentId?: string;
  }>();
  const { navigateToSeries, navigateToSeriesContent, navigateToHome } =
    useNavigation();

  // 포스트 ID (EPISODE는 contentId, POST는 postId)
  const currentPostId = type === "POST" ? postId : contentId;
  const postIdNum = currentPostId ? Number(currentPostId) : 0;

  // 포스트 데이터 조회
  const { data: postData } = useGetPostById(postIdNum);

  // 실제 포스트 타입 확인 (postData에서 가져온 postType 사용)
  const actualPostType = postData?.postType || type;

  // EPISODE일 때 이전/다음 회차 조회 (백엔드 API 사용)
  const { data: prevEpisode } = useGetPreviousEpisode(
    actualPostType === "EPISODE" && postIdNum > 0 ? postIdNum : 0,
  );
  const { data: nextEpisode } = useGetNextEpisode(
    actualPostType === "EPISODE" && postIdNum > 0 ? postIdNum : 0,
  );

  const prevEpisodeId = prevEpisode?.id ?? null;
  const nextEpisodeId = nextEpisode?.id ?? null;

  // 댓글 조회 및 생성 (ViewerView에 props 추가 후 사용)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: comments } = useGetComments(postIdNum);
  const { mutate: createComment } = useCreateComment();

  // 별점 조회 및 등록/수정
  const { data: ratingSummary } = useGetRatingSummary(postIdNum);
  const { data: myRating } = useGetMyRating(postIdNum);
  const { mutate: ratePost } = useRatePost();

  // 평균 별점 (별점 요약이 있으면 사용, 없으면 postData의 rating 사용)
  const averageRating = ratingSummary?.averageScore ?? postData?.rating ?? 0;
  // 내 별점
  const myRatingScore = myRating?.myScore ?? null;

  const onPrevious = useCallback(() => {
    if (prevEpisodeId && postData?.workId) {
      navigateToSeriesContent(String(postData.workId), String(prevEpisodeId));
    }
  }, [prevEpisodeId, postData?.workId, navigateToSeriesContent]);

  const onNext = useCallback(() => {
    if (nextEpisodeId && postData?.workId) {
      navigateToSeriesContent(String(postData.workId), String(nextEpisodeId));
    }
  }, [nextEpisodeId, postData?.workId, navigateToSeriesContent]);

  const onOriginalSeriesClick = useCallback(() => {
    // 작품 상세 페이지로 이동
    if (postData?.workId) {
      navigateToSeries(postData.workId);
    } else if (postData?.parentWorkId) {
      // 원작 작품이 있는 경우 원작 작품 상세 페이지로 이동
      navigateToSeries(postData.parentWorkId);
    }
  }, [postData, navigateToSeries]);

  const onBack = useCallback(() => {
    // 작품 상세 페이지로 이동
    if (postData?.workId) {
      navigateToSeries(postData.workId);
    } else {
      // 작품 ID가 없으면 홈으로 이동
      navigateToHome();
    }
  }, [postData, navigateToSeries, navigateToHome]);

  // 댓글 작성 (ViewerEnd 컴포넌트에서 사용 가능하도록, ViewerView에 props 추가 후 사용)
  // TODO: ViewerView에 props 추가 후 사용
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _handleCommentSubmit = useCallback(
    (content: string) => {
      if (!postIdNum) return;

      const commentData: CreateCommentRequest = {
        content,
        parentCommentId: null,
      };

      createComment(
        { postId: postIdNum, data: commentData },
        {
          onSuccess: () => {
            // 댓글 목록이 자동으로 갱신됨
          },
          onError: () => {
            toast("댓글 작성에 실패했습니다.");
          },
        },
      );
    },
    [postIdNum, createComment],
  );

  // 별점 등록/수정 핸들러
  const handleRatingSubmit = useCallback(
    (rating: number) => {
      if (!postIdNum) return;

      ratePost(
        {
          postId: postIdNum,
          data: { score: rating },
        },
        {
          onSuccess: () => {
            toast("별점이 등록되었습니다.");
          },
          onError: () => {
            toast("별점 등록에 실패했습니다.");
          },
        },
      );
    },
    [postIdNum, ratePost],
  );

  // EPISODE일 때만 작품명과 다음화/이전화 표시
  const isEpisode = actualPostType === "EPISODE";

  return (
    <ViewerView
      seriesTitle={isEpisode ? (postData?.workTitle ?? "") : ""}
      episodeTitle={postData?.title || ""}
      content={postData?.content || ""}
      tags={postData?.tags || []}
      authorName={postData?.authorName || ""}
      authorId={postData?.authorName ? undefined : undefined}
      rating={averageRating}
      myRating={myRatingScore}
      postId={postIdNum}
      onRatingSubmit={handleRatingSubmit}
      originalSeriesImageUrl={
        postData?.parentWorkTitle ? "https://placehold.co/50x75" : ""
      }
      originalSeriesLabel={
        postData?.parentWorkTitle ? "이 유니버스의 '원작' 보기" : ""
      }
      originalSeriesTitle={postData?.parentWorkTitle ?? ""}
      originalSeriesId={
        postData?.parentWorkId ? String(postData.parentWorkId) : undefined
      }
      postType={actualPostType}
      onBack={onBack}
      onPrevious={isEpisode && prevEpisodeId ? onPrevious : undefined}
      onNext={isEpisode && nextEpisodeId ? onNext : undefined}
      onOriginalSeriesClick={
        postData?.parentWorkId ? onOriginalSeriesClick : undefined
      }
    />
  );
};

export default Viewer;
