import { client } from "./client";

export interface OriginalWorkRequest {
  title: string;
  content: string;
  category?: string;
  tags?: string[];
  thumbnailUrl?: string;
  isPublic?: boolean;
}

export interface OriginalWorkResponse {
  workId: string;
  title: string;
  content: string;
  authorId: string;
  category?: string;
  tags?: string[];
  thumbnailUrl?: string;
  isPublic: boolean;
  createdAt: string;
}

export interface UpdateOriginalWorkRequest {
  workId: string;
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
  thumbnailUrl?: string;
  isPublic?: boolean;
}

export interface DerivativeWorkRequest {
  originalWorkId: string;
  title: string;
  content: string;
  category?: string;
  tags?: string[];
  thumbnailUrl?: string;
  isPublic?: boolean;
}

export interface DerivativeWorkResponse {
  workId: string;
  originalWorkId: string;
  title: string;
  content: string;
  authorId: string;
  category?: string;
  tags?: string[];
  thumbnailUrl?: string;
  isPublic: boolean;
  createdAt: string;
}

export interface UpdateDerivativeWorkRequest {
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
  thumbnailUrl?: string;
  isPublic?: boolean;
}

export interface SaveDraftRequest {
  originalWorkId?: string;
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
}

export interface SaveDraftResponse {
  draftId: string;
  originalWorkId?: string;
  title?: string;
  content?: string;
  savedAt: string;
}

export interface DraftResponse {
  draftId: string;
  originalWorkId?: string;
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
  savedAt: string;
  updatedAt: string;
}

export interface ContinueWritingRequest {
  content: string;
}

export interface AICheckRequest {
  content: string;
  workId?: string;
}

export interface AICheckResponse {
  isViolation: boolean;
  violations: {
    type: string;
    description: string;
    severity: "low" | "medium" | "high";
  }[];
  suggestions?: string[];
}

export interface LikeResponse {
  workId: string;
  liked: boolean;
  likesCount: number;
}

export interface BookmarkResponse {
  workId: string;
  bookmarked: boolean;
}

export interface Comment {
  commentId: string;
  workId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CommentsResponse {
  comments: Comment[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface CreateCommentRequest {
  content: string;
}

export interface CreateCommentResponse {
  comment: Comment;
}

export const worksApi = {
  // 1차 작품
  createOriginalWork: (data: OriginalWorkRequest) =>
    client.post<{ data: OriginalWorkResponse }>("/api/works/original", data),

  updateOriginalWork: (data: UpdateOriginalWorkRequest) =>
    client.patch<{ data: OriginalWorkResponse }>("/api/works/original", data),

  // 2차 작품
  createDerivativeWork: (data: DerivativeWorkRequest) =>
    client.post<{ data: DerivativeWorkResponse }>(
      "/api/works/derivative",
      data,
    ),

  updateDerivativeWork: (workId: string, data: UpdateDerivativeWorkRequest) =>
    client.patch<{ data: DerivativeWorkResponse }>(
      `/api/works/derivative/${workId}`,
      data,
    ),

  // 임시저장
  saveDraft: (data: SaveDraftRequest) =>
    client.post<{ data: SaveDraftResponse }>(
      "/api/works/derivative/save",
      data,
    ),

  getDraft: (draftId: string) =>
    client.get<{ data: DraftResponse }>(
      `/api/works/derivative/drafts/${draftId}`,
    ),

  deleteDraft: (draftId: string) =>
    client.delete<{ message: string }>(
      `/api/works/derivative/drafts/${draftId}`,
    ),

  continueWriting: (draftId: string, data: ContinueWritingRequest) =>
    client.patch<{ data: DerivativeWorkResponse }>(
      `/api/works/derivative/continue/${draftId}`,
      data,
    ),

  // AI 검토
  checkAI: (data: AICheckRequest) =>
    client.post<{ data: AICheckResponse }>(
      "/api/works/derivative/api/ai/check",
      data,
    ),

  // 좋아요
  likeWork: (workId: string) =>
    client.post<{ data: LikeResponse }>(`/api/works/${workId}/like`),

  getLikes: (workId: string) =>
    client.get<{ data: LikeResponse }>(`/api/works/${workId}/like`),

  // 북마크
  bookmarkWork: (workId: string) =>
    client.post<{ data: BookmarkResponse }>(`/api/works/${workId}/bookmark`),

  // 댓글
  getComments: (
    workId: string,
    params?: { page?: number; pageSize?: number },
  ) =>
    client.get<{ data: CommentsResponse }>(`/api/works/${workId}/comments`, {
      params,
    }),

  createComment: (workId: string, data: CreateCommentRequest) =>
    client.post<{ data: CreateCommentResponse }>(
      `/api/works/${workId}/comments`,
      data,
    ),
};
