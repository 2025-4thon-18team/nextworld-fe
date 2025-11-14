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
  name: string; // 한글 2-10자 (정규식: ^[가-힣]{2,10}$)
  nickname: string; // 영문+숫자 조합 8자 이상 (정규식: ^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$)
  email: string;
  password: string; // 8자 이상
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
  name: string;
  profileImageUrl: string;
  pointsBalance: number;
}

// ============================================
// 작품 관련 (Work/Series)
// ============================================

export type WorkTypeEnum = "ORIGINAL" | "DERIVATIVE";
export type PostType = "POST" | "EPISODE";
export type CreationType = "ORIGINAL" | "DERIVATIVE";
export type WorkStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface WorkRequestDto {
  workType: WorkTypeEnum; // 필수: ORIGINAL, DERIVATIVE
  parentWorkId?: number; // 원작 작품 ID (DERIVATIVE인 경우 필수)
  title?: string;
  description?: string;
  coverImageUrl?: string;
  category?: string;
  serializationSchedule?: string; // 연재 일정
  allowDerivative?: boolean;
  guidelineRelation?: string;
  guidelineContent?: string;
  guidelineBackground?: string;
  bannedWords?: string; // 금지어 (문자열)
  tags?: string[]; // 태그 이름 리스트
}

export interface WorkResponseDto {
  id: number;
  workType: WorkTypeEnum;
  title: string;
  description: string;
  coverImageUrl: string;
  category: string;
  serializationSchedule: string;
  allowDerivative: boolean;
  tags: string[]; // 태그 (WorkTag에서 가져옴)
  totalLikesCount: number; // 통계 (WorkStatistics에서 가져옴)
  totalViewsCount: number;
  totalRating: number; // BigDecimal
  authorName: string;
  parentWorkId: number | null;
  parentWorkTitle: string | null;
}

// ============================================
// 포스트 관련 (Post)
// ============================================

export interface PostRequestDto {
  title?: string;
  content?: string;
  hasImage?: boolean; // 이미지 포함 여부
  workId?: number; // 작품 회차인 경우 소속 작품 ID
  postType?: PostType; // POST, EPISODE
  episodeNumber?: number; // 회차 번호
  parentWorkId?: number; // 원작 참조 (원작 작품 지정)
  creationType?: CreationType; // ORIGINAL, DERIVATIVE (NULL 가능)
  isPaid?: boolean;
  price?: number;
  tags?: string[]; // 태그 이름 리스트
  status?: WorkStatus;
}

export interface PostResponseDto {
  id: number;
  title: string;
  content: string;
  hasImage: boolean; // 이미지 포함 여부
  workId: number | null; // 소속 작품 ID
  workTitle: string | null; // 소속 작품 제목
  postType: PostType;
  episodeNumber: number | null;
  parentWorkId: number | null; // 원작 작품 ID
  parentWorkTitle: string | null; // 원작 작품 제목
  authorName: string;
  creationType: CreationType;
  isPaid: boolean;
  price: number | null;
  tags: string[]; // 태그 (PostTag에서 가져옴)
  viewsCount: number; // 통계 (PostStatistics에서 가져옴)
  commentsCount: number;
  rating: number; // BigDecimal
  status: WorkStatus;
  aiCheck: string;
  createdAt: string; // ISO 8601 date-time
  updatedAt: string; // ISO 8601 date-time
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

export type TransactionType = "CHARGE" | "USE" | "REFUND";

export type PayStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "REFUND_REQUESTED"
  | "REFUNDED";

export interface PayItemResponse {
  payId: number;
  amount: number;
  type: TransactionType;
  status: PayStatus;
  impUid: string;
  createdAt: string; // ISO 8601 date-time
}

// ============================================
// 수익 관련 (Revenue)
// ============================================

export interface RevenueDashboardResponse {
  totalSalesCount: number | null;
  totalRevenue: number | null;
  originalAuthorFee: number | null;
  platformFee: number | null;
  netIncome: number | null;
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
  postId?: number; // 결제할 Post ID
  derivativeWorkId?: number; // 파생 작품 ID
  authorId?: number; // 작가 ID
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
  postId: number; // 수익 분배할 Post ID
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
  content: string; // 댓글 내용
  parentCommentId?: number | null; // 부모 댓글 ID (대댓글 작성 시 전달, 일반 댓글은 null)
}

export interface UpdateCommentRequest {
  content: string; // 수정할 댓글 내용
}

export interface CommentResponse {
  id: number;
  postId: number;
  parentCommentId: number | null;
  authorId: number;
  authorName: string;
  authorImageUrl: string;
  content: string;
  createdAt: string; // ISO 8601 date-time
  updatedAt: string; // ISO 8601 date-time
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

// ============================================
// 작품 가이드라인 관련
// ============================================

export interface WorkGuidelineResponseDto {
  workId: number;
  workTitle: string;
  guidelineRelation: string;
  guidelineContent: string;
  guidelineBackground: string;
  bannedWords: string; // 금지어
}

// ============================================
// 작가 관련 (Author)
// ============================================

export interface AuthorProfileResponse {
  authorId: number;
  nickname: string;
  bio: string;
  contactEmail: string;
  twitter: string;
  profileImageUrl: string;
}

export interface AuthorWorkResponse {
  workId: number;
  title: string;
  coverImageUrl: string;
  category: string;
  workType: string;
  tags: string[];
}

export interface AuthorPostResponse {
  postId: number;
  workId: number | null;
  title: string;
  thumbnailUrl: string | null;
  tags: string[];
}

// ============================================
// 구매한 작품 관련
// ============================================

export interface PurchasedWorkResponse {
  postId: number;
  workId: number;
  title: string;
  amount: number;
  purchasedAt: string; // ISO 8601 date-time
  coverImageUrl: string;
  workType: string;
  parentWorkId: number | null;
}

// ============================================
// 별점 관련 (Rating)
// ============================================

export interface PostRatingRequest {
  score: number; // 0.00 ~ 5.00 (BigDecimal)
}

export interface PostRatingResponse {
  postId: number;
  myScore: number | null; // 내가 준 점수(null 가능)
  averageScore: number; // 평균 점수 (BigDecimal)
  ratingCount: number; // 평가한 사람 수
}
