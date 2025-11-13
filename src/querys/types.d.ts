/**
 * 백엔드 API DTO 타입 정의
 * 백엔드 컨트롤러와 DTO에 맞게 업데이트됨
 */

// ============================================
// 공통 응답 형식
// ============================================

export interface BaseResponse<T = unknown> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

// ============================================
// 인증 관련 (Auth)
// ============================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
  nickname: string;
}

export interface SignupRequest {
  name: string;                    // 한글 2-10자 (정규식: ^[가-힣]{2,10}$)
  nickname: string;                // 영문+숫자 조합 8자 이상 (정규식: ^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$)
  email: string;
  password: string;                 // 8자 이상
  passwordConfirm: string;
}

export interface SignupResponse {
  userId: number;
  email: string;
  nickname: string;
}

// ============================================
// 사용자 관련 (User)
// ============================================

export interface UserProfileResponse {
  userId: number;
  email: string;
  nickname: string;
  pointsBalance: number;
  totalEarned: number;
  guideline: string;
}


// ============================================
// 작품 관련 (Work/Series)
// ============================================

export type Genre = "ROMANCE" | "FANTASY" | "THRILLER" | "MARTIAL_ARTS" | "DRAMA" | "SF" | "COMEDY";
export type WorkType = "SHORT" | "SERIALIZED";
export type CreationType = "ORIGINAL" | "DERIVATIVE";
export type PostStatus = "DRAFT" | "PUBLISHED";

export interface WorkRequestDto {
  title?: string;
  description?: string;
  coverImageUrl?: string;
  tags?: string[];
  genre?: Genre;
  universeDescription?: string;
  allowDerivative?: boolean;
  guidelineRelation?: string;
  guidelineContent?: string;
  guidelineBackground?: string;
  bannedWords?: string[];
  isPaid?: boolean;
  price?: number;
  allowDerivativeProfit?: boolean;
}

export interface WorkResponseDto {
  id: number;
  title: string;
  description: string;
  coverImageUrl: string;
  tags: string[];
  universeDescription: string;
  allowDerivative: boolean;
  guidelineRelation: string;
  guidelineContent: string;
  guidelineBackground: string;
  bannedWords: string[];
  isPaid: boolean;
  price: number;
  allowDerivativeProfit: boolean;
  authorName: string;
}

// ============================================
// 포스트 관련 (Post)
// ============================================

export interface PostRequestDto {
  title?: string;
  content?: string;
  workType?: WorkType;
  creationType?: CreationType;
  workId?: number;
  status?: PostStatus;
  parentId?: number;
}

export interface PostResponseDto {
  id: number;
  title: string;
  content: string;
  authorName: string;
  workTitle: string;
  status: PostStatus;
  workType: WorkType;
  creationType: CreationType;
  createdAt: string;               // ISO 8601 date-time
  updatedAt: string;                // ISO 8601 date-time
}

// ============================================
// 피드 및 검색 관련 (Feed & Search)
// ============================================

export interface ListResponse {
  works: WorkResponseDto[];
  posts: PostResponseDto[];
}

// ============================================
// 포인트 관련 (Point)
// ============================================

export interface PointsResponse {
  balance: number;
}

export interface ChargeOption {
  chargePoint: number;
  price: number;
  expectedBalance: number;
}

export interface ChargeOptionsResponse {
  currentPoints: number;
  chargeOptions: ChargeOption[];
  paymentMethods: string[];
}

export interface PaymentHistoryResponse {
  title: string; // 충전이면 "포인트 충전", 사용이면 게시글 제목
  opponentName: string | null; // 충전은 null, 사용은 구매자 닉네임
  amount: number; // 금액 (+ 충전, - 사용)
  date: string; // ISO 8601 date-time
}

export type PayItemType = "CHARGE" | "USE" | "REFUND";

export type PayItemStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "REFUND_REQUESTED"
  | "REFUNDED";

export interface PayItemResponse {
  payId: number;
  amount: number;
  type: PayItemType;
  status: PayItemStatus;
  impUid: string;
  createdAt: string; // ISO 8601 date-time
}

// ============================================
// 수익 관련 (Revenue)
// ============================================

export interface RevenueDashboardResponse {
  totalSalesCount: number;
  totalRevenue: number;
  originalAuthorFee: number;
  platformFee: number;
  netIncome: number;
}

export interface RevenueSaleItemResponse {
  postTitle: string;
  buyerNickname: string;
  amount: number;
  date: string; // date-time
}

export interface RevenueSettleHistoryResponse {
  settledAmount: number;
  previousBalance: number;
  newBalance: number;
  settledAt: string; // ISO 8601 date-time
}

export interface RevenueSettleResponse {
  totalSettledAmount: number;
  remainingUnsettled: number;
  newPointsBalance: number;
}

// ============================================
// 요청 DTO (Request)
// ============================================

export interface ChargeRequest {
  impUid: string;
  amount: number;
}

export interface UseRequest {
  amount: number;
  derivativeWorkId: number;
  authorId: number;
}

export interface RefundRequest {
  impUid: string;
  amount: number;
  reason: string;
}

export interface VerifyRequest {
  impUid: string;
}

export interface DistributeRequest {
  payId: number;
  derivativeWorkId: number; // 수익 분배할 2차 창작 작품 ID
}

// ============================================
// 좋아요 관련 (Like)
// ============================================

export interface LikeResponse {
  id: number;
  workId: number;
  workName: string;
  createdAt: string; // ISO 8601 date-time
}

// ============================================
// 스크랩 관련 (Scrap)
// ============================================

export interface ScrapResponse {
  id: number;
  targetType: string; // "WORK" | "POST"
  targetId: number;
  title: string;
  createdAt: string; // ISO 8601 date-time
}

// ============================================
// 댓글 관련 (Comment)
// ============================================

export interface CreateCommentRequest {
  content: string;                   // 댓글 내용
  parentCommentId?: number | null;  // 부모 댓글 ID (대댓글 작성 시 전달, 일반 댓글은 null)
}

export interface UpdateCommentRequest {
  content: string;                   // 수정할 댓글 내용
}

export interface CommentResponse {
  id: number;
  postId: number;
  parentCommentId: number | null;
  authorId: number;
  authorName: string;
  authorImageUrl: string;
  content: string;
  createdAt: string;                // ISO 8601 date-time
  updatedAt: string;                // ISO 8601 date-time
}

// ============================================
// 마이페이지 프로필 업데이트
// ============================================

export interface ProfileUpdateRequest {
  name?: string;
  bio?: string;
  contactEmail?: string;
  twitter?: string;
  profileImage?: File; // multipart/form-data
}
