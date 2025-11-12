import { client } from "./client";

export interface Work {
  workId: string;
  title: string;
  content: string;
  type: "original" | "derivative";
  authorId: string;
  authorName: string;
  authorProfileImage?: string;
  likesCount: number;
  commentsCount: number;
  bookmarksCount: number;
  createdAt: string;
  updatedAt?: string;
  thumbnailUrl?: string;
  tags?: string[];
  category?: string;
}

export interface FeedResponse {
  works: Work[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface SearchParams {
  query?: string;
  category?: string;
  tags?: string[];
  type?: "original" | "derivative" | "all";
  sortBy?: "latest" | "popular" | "trending";
  page?: number;
  pageSize?: number;
}

export interface SearchResponse {
  works: Work[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface AuthorFeedResponse {
  author: {
    userId: string;
    nickname: string;
    profileImage?: string;
    bio?: string;
    followersCount: number;
    worksCount: number;
  };
  works: Work[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export const feedApi = {
  getFeed: (params?: { page?: number; pageSize?: number; sortBy?: string }) =>
    client.get<{ data: FeedResponse }>("/api/feed", { params }),

  searchWorks: (params: SearchParams) =>
    client.get<{ data: SearchResponse }>("/api/feed/search", { params }),

  getAuthorFeed: (
    authorId: string,
    params?: { page?: number; pageSize?: number },
  ) =>
    client.get<{ data: AuthorFeedResponse }>(`/api/feed/${authorId}`, {
      params,
    }),
};
