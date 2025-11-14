import { useMemo } from "react";
import type { PostResponseDto } from "@/querys/types";

export type PostItem = {
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

export type ContentItemData = {
  id: string;
  title: string;
  points: number;
  rating: number;
  views: number;
  comments: number;
  date: string;
};

export type EpisodeItem = {
  id: string;
  title: string;
  points: number;
  rating: number;
  views: number;
  comments: number;
  date: string;
};

/**
 * PostResponseDto를 PostItem으로 변환하는 훅
 * @param posts 포스트 데이터
 * @param maxLength 최대 길이 (기본값: 전체)
 * @param contentPreviewLength 콘텐츠 미리보기 길이 (기본값: 100)
 */

export function usePostTransform(
  posts: PostResponseDto[] | undefined,
  maxLength?: number,
  contentPreviewLength: number = 100,
) {
  const postList = useMemo(() => {
    if (!posts || !Array.isArray(posts)) return [];
    const sliced = maxLength ? posts.slice(0, maxLength) : posts;
    return sliced.map((post) => ({
      id: String(post.id),
      title: post.title,
      content:
        post.content && post.content.length > contentPreviewLength
          ? post.content.substring(0, contentPreviewLength) + "..."
          : post.content,
      points: post.price || 0,
      tags: post.tags,
      rating: post.rating,
      views: post.viewsCount,
      comments: post.commentsCount,
      date: post.createdAt,
    }));
  }, [posts, maxLength, contentPreviewLength]);

  return postList;
}

/**
 * PostResponseDto를 ContentItemData로 변환하는 훅 (content 제외)
 */
export function useContentItemTransform(
  posts: PostResponseDto[] | undefined,
  maxLength?: number,
) {
  const contentList = useMemo(() => {
    if (!posts || !Array.isArray(posts)) return [];
    const sliced = maxLength ? posts.slice(0, maxLength) : posts;
    return sliced.map((post) => ({
      id: String(post.id),
      title: post.title,
      points: post.price || 0,
      rating: post.rating,
      views: post.viewsCount,
      comments: post.commentsCount,
      date: post.createdAt,
    }));
  }, [posts, maxLength]);

  return contentList;
}

/**
 * PostResponseDto를 EpisodeItem으로 변환하는 훅
 */
export function useEpisodeTransform(posts: PostResponseDto[] | undefined) {
  const episodeList = useMemo(() => {
    if (!posts || !Array.isArray(posts)) return [];
    return posts.map((post) => ({
      id: String(post.id),
      title: post.title,
      points: post.price || 0,
      rating: post.rating,
      views: post.viewsCount,
      comments: post.commentsCount,
      date: post.createdAt,
    }));
  }, [posts]);

  return episodeList;
}
