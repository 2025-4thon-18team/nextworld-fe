import { useQuery } from "@tanstack/react-query";
import { feedApi, SearchParams } from "../apis/feed";

export const feedKeys = {
  all: ["feed"] as const,
  list: (params?: { page?: number; pageSize?: number; sortBy?: string }) =>
    [...feedKeys.all, "list", params] as const,
  search: (params: SearchParams) =>
    [...feedKeys.all, "search", params] as const,
  author: (authorId: string, params?: { page?: number; pageSize?: number }) =>
    [...feedKeys.all, "author", authorId, params] as const,
};

// Query: 메인 피드 조회
export const useGetFeed = (params?: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
}) => {
  return useQuery({
    queryKey: ["useGetFeed", ...feedKeys.list(params)],
    queryFn: async () => {
      const response = await feedApi.getFeed(params);
      return response.data.data;
    },
  });
};

// Query: 작품 검색
export const useSearchWorks = (params: SearchParams) => {
  return useQuery({
    queryKey: ["useSearchWorks", ...feedKeys.search(params)],
    queryFn: async () => {
      const response = await feedApi.searchWorks(params);
      return response.data.data;
    },
    enabled: !!params.query || !!params.category || !!params.tags,
  });
};

// Query: 작가 피드 조회
export const useGetAuthorFeed = (
  authorId: string,
  params?: { page?: number; pageSize?: number },
) => {
  return useQuery({
    queryKey: ["useGetAuthorFeed", ...feedKeys.author(authorId, params)],
    queryFn: async () => {
      const response = await feedApi.getAuthorFeed(authorId, params);
      return response.data.data;
    },
    enabled: !!authorId,
  });
};
