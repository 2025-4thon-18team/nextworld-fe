/**
 * 백엔드 API DTO 타입 정의
 * 잘 준비된 부분 + 수정 필요 사항 반영
 */

// ============================================
// 공통 응답 형식
// ============================================

export interface BaseResponseDTO<T = unknown> {
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
  name: string; // ✅ 추가 필요
  bio: string[]; // ✅ 추가 필요
  contact: string; // ✅ 추가 필요
  profileImageUrl?: string; // ✅ 추가 필요
  pointsBalance: number;
  totalEarned: number;
  guideline: string;
}

export interface UserProfileUpdateRequest {
  nickname: string;
  guideline: string;
}

// ============================================
// 작품 관련 (Work/Series)
// ============================================

export type WorkType = "SHORT" | "SERIALIZED";

export interface WorkRequestDto {
  title: string;
  description: string;
  coverImageUrl: string;
  tags: string[];
  genre: string;
  universeDescription: string;
  allowDerivative: boolean;
  guidelineRelation: string;
  guidelineContent: string;
  guidelineBackground: string;
  bannedWords: string[];
  isPaid: boolean;
  allowDerivativeProfit: boolean;
}

export interface WorkResponseDto {
  id: number;
  title: string;
  description: string;
  coverImageUrl: string;
  tags: string[];
  universeDescription: string;
  universeName: string; // ✅ 추가 필요
  category: string; // ✅ 추가 필요
  rating: number; // ✅ 추가 필요
  views: number; // ✅ 추가 필요
  isSerializing: boolean; // ✅ 추가 필요
  likes: number; // ✅ 추가 필요
  allowDerivative: boolean;
  guidelineRelation: string;
  guidelineContent: string;
  guidelineBackground: string;
  bannedWords: string[];
  isPaid: boolean;
  allowDerivativeProfit: boolean;
  authorName: string;
}

// ============================================
// 포스트 관련 (Post)
// ============================================

export type PostWorkType = "SHORT" | "SERIALIZED";
export type PostCreationType = "ORIGINAL" | "DERIVATIVE";
export type PostStatus = "DRAFT" | "PUBLISHED";

export interface PostRequestDto {
  title: string;
  content: string;
  workType: PostWorkType;
  creationType: PostCreationType;
  workId: number;
  status: PostStatus;
  parentId?: number;
}

export interface PostResponseDto {
  id: number;
  title: string;
  content: string;
  authorName: string;
  workTitle: string;
  status: PostStatus;
  workType: PostWorkType;
  creationType: PostCreationType;
  points: number; // ✅ 추가 필요
  tags: string[]; // ✅ 추가 필요
  rating: number; // ✅ 추가 필요
  views: number; // ✅ 추가 필요
  comments: number; // ✅ 추가 필요
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
  id: number; // ✅ 추가 필요
  type: PayItemType; // ✅ 추가 필요
  title: string;
  subtitle: string; // ✅ 추가 필요
  opponentName: string;
  amount: number;
  date: string;
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
  derivativeWorkId: number;
}
