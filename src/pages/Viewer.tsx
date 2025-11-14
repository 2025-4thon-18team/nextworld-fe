import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ViewerView } from "./ViewerView";
import { useGetComments, useCreateComment } from "@/querys/useComments";
import { useGetPostById } from "@/querys/usePosts";
import { useGetWorkEpisodes } from "@/querys/useWorks";
import { useNavigation } from "@/hooks/useNavigation";
import type { CreateCommentRequest } from "@/querys/types";

const Viewer = ({ type }: { type: "EPISODE" | "POST" }) => {
  const { postId, contentId } = useParams<{
    postId?: string;
    contentId?: string;
  }>();
  const { navigateToSeries, navigateToSeriesContent } = useNavigation();

  // 포스트 ID (EPISODE는 contentId, POST는 postId)
  const currentPostId = type === "POST" ? postId : contentId;
  const postIdNum = currentPostId ? Number(currentPostId) : 0;

  // 포스트 데이터 조회
  const { data: postData } = useGetPostById(postIdNum);

  // 실제 포스트 타입 확인 (postData에서 가져온 postType 사용)
  const actualPostType = postData?.postType || type;

  // EPISODE일 때 회차 목록 조회 (다음화/이전화를 위해)
  const { data: episodesData } = useGetWorkEpisodes(postData?.workId ?? 0);

  // 현재 회차의 다음/이전 회차 찾기
  const { prevEpisodeId, nextEpisodeId } = useMemo(() => {
    if (!episodesData || !postIdNum || actualPostType !== "EPISODE") {
      return { prevEpisodeId: null, nextEpisodeId: null };
    }

    const currentIndex = episodesData.findIndex((ep) => ep.id === postIdNum);
    if (currentIndex === -1) {
      return { prevEpisodeId: null, nextEpisodeId: null };
    }

    const prevEpisode =
      currentIndex > 0 ? episodesData[currentIndex - 1] : null;
    const nextEpisode =
      currentIndex < episodesData.length - 1
        ? episodesData[currentIndex + 1]
        : null;

    return {
      prevEpisodeId: prevEpisode?.id ?? null,
      nextEpisodeId: nextEpisode?.id ?? null,
    };
  }, [episodesData, postIdNum, actualPostType]);

  // 댓글 조회 및 생성 (ViewerView에 props 추가 후 사용)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: comments } = useGetComments(postIdNum);
  const { mutate: createComment } = useCreateComment();

  const onPrevious = useCallback(() => {
    if (prevEpisodeId) {
      navigateToSeriesContent(
        String(postData?.workId ?? 0),
        String(prevEpisodeId),
      );
    }
  }, [prevEpisodeId, navigateToSeriesContent]);

  const onNext = useCallback(() => {
    if (nextEpisodeId) {
      navigateToSeriesContent(
        String(postData?.workId ?? 0),
        String(nextEpisodeId),
      );
    }
  }, [nextEpisodeId, navigateToSeriesContent]);

  const onOriginalSeriesClick = useCallback(() => {
    // 작품 상세 페이지로 이동
    if (postData?.workId) {
      navigateToSeries(postData.workId);
    } else if (postData?.parentWorkId) {
      // 원작 작품이 있는 경우 원작 작품 상세 페이지로 이동
      navigateToSeries(postData.parentWorkId);
    }
  }, [postData, navigateToSeries]);

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
            alert("댓글 작성에 실패했습니다.");
          },
        },
      );
    },
    [postIdNum, createComment],
  );

  // EPISODE일 때만 작품명과 다음화/이전화 표시
  const isEpisode = actualPostType === "EPISODE";

  return (
    <ViewerView
      seriesTitle={isEpisode ? (postData?.workTitle ?? "") : ""}
      episodeTitle={postData?.title || ""}
      tags={postData?.tags || []}
      authorName={postData?.authorName || ""}
      authorId={postData?.authorName ? undefined : undefined}
      rating={postData?.rating ?? 0}
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
      onPrevious={isEpisode && prevEpisodeId ? onPrevious : undefined}
      onNext={isEpisode && nextEpisodeId ? onNext : undefined}
      onOriginalSeriesClick={
        postData?.parentWorkId ? onOriginalSeriesClick : undefined
      }
      // TODO: ViewerView에 comments, onCommentSubmit props 추가 필요
    />
  );
};

export default Viewer;
