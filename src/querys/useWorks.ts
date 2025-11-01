import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  worksApi,
  OriginalWorkRequest,
  UpdateOriginalWorkRequest,
  DerivativeWorkRequest,
  UpdateDerivativeWorkRequest,
  SaveDraftRequest,
  ContinueWritingRequest,
  AICheckRequest,
  CreateCommentRequest,
} from "../apis/works";
import { mypageKeys } from "./useMypage";

export const worksKeys = {
  all: ["works"] as const,
  detail: (workId: string) => [...worksKeys.all, "detail", workId] as const,
  likes: (workId: string) => [...worksKeys.all, "likes", workId] as const,
  comments: (workId: string, params?: { page?: number; pageSize?: number }) =>
    [...worksKeys.all, "comments", workId, params] as const,
  drafts: () => [...worksKeys.all, "drafts"] as const,
  draft: (draftId: string) => [...worksKeys.drafts(), draftId] as const,
};

// Mutation: 1차 작품 등록
export const useCreateOriginalWork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useCreateOriginalWork"],
    mutationFn: async (data: OriginalWorkRequest) => {
      const response = await worksApi.createOriginalWork(data);
      return response.data.data;
    },
    onSuccess: () => {
      // 작품 생성 후 내 작품 리스트 무효화
      queryClient.invalidateQueries({ queryKey: mypageKeys.works() });
    },
  });
};

// Mutation: 1차 작품 수정
export const useUpdateOriginalWork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useUpdateOriginalWork"],
    mutationFn: async (data: UpdateOriginalWorkRequest) => {
      const response = await worksApi.updateOriginalWork(data);
      return response.data.data;
    },
    onSuccess: (data) => {
      // 작품 수정 후 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: mypageKeys.works() });
      queryClient.invalidateQueries({
        queryKey: worksKeys.detail(data.workId),
      });
    },
  });
};

// Mutation: 2차 작품 등록
export const useCreateDerivativeWork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useCreateDerivativeWork"],
    mutationFn: async (data: DerivativeWorkRequest) => {
      const response = await worksApi.createDerivativeWork(data);
      return response.data.data;
    },
    onSuccess: () => {
      // 작품 생성 후 내 작품 리스트 무효화
      queryClient.invalidateQueries({ queryKey: mypageKeys.works() });
    },
  });
};

// Mutation: 2차 작품 수정
export const useUpdateDerivativeWork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useUpdateDerivativeWork"],
    mutationFn: async ({
      workId,
      data,
    }: {
      workId: string;
      data: UpdateDerivativeWorkRequest;
    }) => {
      const response = await worksApi.updateDerivativeWork(workId, data);
      return response.data.data;
    },
    onSuccess: (data) => {
      // 작품 수정 후 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: mypageKeys.works() });
      queryClient.invalidateQueries({
        queryKey: worksKeys.detail(data.workId),
      });
    },
  });
};

// Mutation: 2차 작품 임시저장
export const useSaveDraft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useSaveDraft"],
    mutationFn: async (data: SaveDraftRequest) => {
      const response = await worksApi.saveDraft(data);
      return response.data.data;
    },
    onSuccess: () => {
      // 임시저장 후 drafts 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: worksKeys.drafts() });
    },
  });
};

// Query: 임시저장 작품 조회
export const useGetDraft = (draftId: string) => {
  return useQuery({
    queryKey: ["useGetDraft", ...worksKeys.draft(draftId)],
    queryFn: async () => {
      const response = await worksApi.getDraft(draftId);
      return response.data.data;
    },
    enabled: !!draftId,
  });
};

// Mutation: 임시저장 작품 삭제
export const useDeleteDraft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useDeleteDraft"],
    mutationFn: async (draftId: string) => {
      const response = await worksApi.deleteDraft(draftId);
      return response.data;
    },
    onSuccess: () => {
      // 임시저장 삭제 후 drafts 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: worksKeys.drafts() });
    },
  });
};

// Mutation: 2차 작품 이어쓰기
export const useContinueWriting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useContinueWriting"],
    mutationFn: async ({
      draftId,
      data,
    }: {
      draftId: string;
      data: ContinueWritingRequest;
    }) => {
      const response = await worksApi.continueWriting(draftId, data);
      return response.data.data;
    },
    onSuccess: () => {
      // 이어쓰기 완료 후 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: mypageKeys.works() });
      queryClient.invalidateQueries({ queryKey: worksKeys.drafts() });
    },
  });
};

// Mutation: AI 가이드라인 검토
export const useCheckAI = () => {
  return useMutation({
    mutationKey: ["useCheckAI"],
    mutationFn: async (data: AICheckRequest) => {
      const response = await worksApi.checkAI(data);
      return response.data.data;
    },
  });
};

// Mutation: 작품 좋아요
export const useLikeWork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useLikeWork"],
    mutationFn: async (workId: string) => {
      const response = await worksApi.likeWork(workId);
      return response.data.data;
    },
    onSuccess: (data) => {
      // 좋아요 후 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: worksKeys.likes(data.workId) });
      queryClient.invalidateQueries({
        queryKey: worksKeys.detail(data.workId),
      });
    },
  });
};

// Query: 작품 좋아요 조회
export const useGetLikes = (workId: string) => {
  return useQuery({
    queryKey: ["useGetLikes", ...worksKeys.likes(workId)],
    queryFn: async () => {
      const response = await worksApi.getLikes(workId);
      return response.data.data;
    },
    enabled: !!workId,
  });
};

// Mutation: 작품 북마크
export const useBookmarkWork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useBookmarkWork"],
    mutationFn: async (workId: string) => {
      const response = await worksApi.bookmarkWork(workId);
      return response.data.data;
    },
    onSuccess: (data) => {
      // 북마크 후 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: worksKeys.detail(data.workId),
      });
      queryClient.invalidateQueries({ queryKey: mypageKeys.bookmarks() });
    },
  });
};

// Query: 댓글 목록 조회
export const useGetComments = (
  workId: string,
  params?: { page?: number; pageSize?: number },
) => {
  return useQuery({
    queryKey: ["useGetComments", ...worksKeys.comments(workId, params)],
    queryFn: async () => {
      const response = await worksApi.getComments(workId, params);
      return response.data.data;
    },
    enabled: !!workId,
  });
};

// Mutation: 댓글 작성
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useCreateComment"],
    mutationFn: async ({
      workId,
      data,
    }: {
      workId: string;
      data: CreateCommentRequest;
    }) => {
      const response = await worksApi.createComment(workId, data);
      return response.data.data;
    },
    onSuccess: (data) => {
      // 댓글 작성 후 댓글 리스트 무효화
      queryClient.invalidateQueries({
        queryKey: worksKeys.comments(data.comment.workId),
      });
    },
  });
};
