import { useQuery } from "@tanstack/react-query";
import { mypageApi } from "../apis/mypage";

export const mypageKeys = {
  all: ["mypage"] as const,
  works: (params?: { page?: number; pageSize?: number }) =>
    [...mypageKeys.all, "works", params] as const,
  bookmarks: (params?: { page?: number; pageSize?: number }) =>
    [...mypageKeys.all, "bookmarks", params] as const,
  points: () => [...mypageKeys.all, "points"] as const,
  paylist: (params?: { page?: number; pageSize?: number }) =>
    [...mypageKeys.all, "paylist", params] as const,
  revenue: () => [...mypageKeys.all, "revenue"] as const,
};

// Query: 내 작품 리스트 조회
export const useGetMyWorks = (params?: {
  page?: number;
  pageSize?: number;
}) => {
  return useQuery({
    queryKey: ["useGetMyWorks", ...mypageKeys.works(params)],
    queryFn: async () => {
      const response = await mypageApi.getMyWorks(params);
      return response.data.data;
    },
  });
};

// Query: 내 북마크 작품 리스트 조회
export const useGetMyBookmarks = (params?: {
  page?: number;
  pageSize?: number;
}) => {
  return useQuery({
    queryKey: ["useGetMyBookmarks", ...mypageKeys.bookmarks(params)],
    queryFn: async () => {
      const response = await mypageApi.getMyBookmarks(params);
      return response.data.data;
    },
  });
};

// Query: 내 포인트
export const useGetMyPoints = () => {
  return useQuery({
    queryKey: ["useGetMyPoints", ...mypageKeys.points()],
    queryFn: async () => {
      const response = await mypageApi.getMyPoints();
      return response.data.data;
    },
  });
};

// Query: 포인트 결제 내역
export const useGetPaylist = (params?: {
  page?: number;
  pageSize?: number;
}) => {
  return useQuery({
    queryKey: ["useGetPaylist", ...mypageKeys.paylist(params)],
    queryFn: async () => {
      const response = await mypageApi.getPaylist(params);
      return response.data.data;
    },
  });
};

// Query: 내 수익
export const useGetRevenue = () => {
  return useQuery({
    queryKey: ["useGetRevenue", ...mypageKeys.revenue()],
    queryFn: async () => {
      const response = await mypageApi.getRevenue();
      return response.data.data;
    },
  });
};
