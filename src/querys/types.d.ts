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
  email: string;
  password: string;
  nickname: string;
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
  profileImageUrl?: string;
  pointsBalance: number;
}

export interface UserProfileUpdateRequest {
  nickname: string;
}

// ============================================
// 작품 관련 (Work/Series)
// ============================================

export type WorkType = "SHORT" | "SERIALIZED";
export type WorkTypeEnum = "ORIGINAL" | "DERIVATIVE";
export type WorkStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface WorkRequestDto {
  workType: WorkTypeEnum; // ORIGINAL, DERIVATIVE
  title: string;
  description: string;
  coverImageUrl: string;
  tags: string; // 구분자로 구분된 태그 (예: "태그1|태그2|태그3")
  category: string; // 장르 카테고리
  serializationSchedule?: string; // 구분자로 구분된 연재 일정 (예: "월|화|수")
  allowDerivative?: boolean; // 2차 창작 허용 여부 (1차 창작인 경우만)
  guidelineRelation?: string; // 가이드라인: 관계
  guidelineContent?: string; // 가이드라인: 내용
  guidelineBackground?: string; // 가이드라인: 배경
  bannedWords?: string; // 구분자로 구분된 금지어 (예: "금지어1|금지어2|금지어3")
}

export interface WorkResponseDto {
  id: number;
  workType: WorkTypeEnum;
  title: string;
  description: string;
  coverImageUrl: string;
  tags: string[]; // 배열로 변경 (백엔드에서 List<String>)
  category: string; // 장르 카테고리
  serializationSchedule?: string; // 구분자로 구분된 연재 일정
  allowDerivative?: boolean;
  // 통계 (작품의 모든 포스트 집계)
  totalLikesCount: number; // 작품의 모든 포스트 좋아요 합계
  totalViewsCount: number; // 작품의 모든 포스트 조회수 합계
  totalRating: number; // 작품의 모든 포스트 평점 평균
  authorName: string;
  parentWorkId?: number;
  parentWorkTitle?: string;
}

export interface WorkGuidelineResponseDto {
  workId: number;
  workTitle: string;
  guidelineRelation?: string;
  guidelineContent?: string;
  guidelineBackground?: string;
  bannedWords?: string; // 구분자로 구분된 금지어
}

// ============================================
// 포스트 관련 (Post)
// ============================================

export type PostType = "POST" | "EPISODE"; // 포스트/회차
export type CreationType = "ORIGINAL" | "DERIVATIVE"; // 1차/2차 창작

export interface PostRequestDto {
  workId?: number; // 작품 회차인 경우 소속 작품 ID
  title: string;
  content: string; // 마크다운 형식 (이미지 포함)
  hasImage: boolean; // 이미지 포함 여부
  postType: PostType; // POST, EPISODE
  episodeNumber?: number; // 회차 번호
  parentWorkId?: number; // 원작 참조 (원작 작품 지정)
  creationType?: CreationType; // ORIGINAL, DERIVATIVE (NULL 가능)
  isPaid: boolean;
  price?: number; // 포인트 가격 (유료인 경우)
  tags?: string; // 구분자로 구분된 태그 (예: "태그1|태그2|태그3")
  status: WorkStatus;
}

export interface PostResponseDto {
  id: number;
  workId?: number; // 소속 작품 ID
  workTitle?: string; // 소속 작품 제목
  postType: PostType;
  episodeNumber?: number; // 회차 번호
  parentWorkId?: number; // 원작 작품 ID
  parentWorkTitle?: string; // 원작 작품 제목
  authorName: string;
  creationType?: CreationType;
  title: string;
  content: string; // 마크다운 형식 (이미지 포함)
  hasImage: boolean; // 이미지 포함 여부
  isPaid: boolean;
  price?: number;
  tags: string[]; // 배열로 변경 (백엔드에서 List<String>)
  // 통계
  viewsCount: number; // 백엔드: viewsCount
  commentsCount: number; // 백엔드: commentsCount
  rating: number; // 백엔드: rating (BigDecimal)
  // 상태
  status: WorkStatus;
  aiCheck?: string; // AI 검수 결과
  createdAt: string; // ISO 8601 date-time
  updatedAt: string; // ISO 8601 date-time
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
  postId?: number; // 결제할 Post ID
  derivativeWorkId?: number;
  authorId?: number;
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
// 마이페이지 프로필 업데이트
// ============================================

export interface ProfileUpdateRequest {
  name: string;
  bio: string;
  contactEmail: string;
  twitter: string;
  profileImage?: File; // multipart/form-data
}
