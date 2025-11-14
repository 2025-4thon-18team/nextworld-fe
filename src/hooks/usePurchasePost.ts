import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUsePoints } from "@/querys/usePayment";
import { useDistributeRevenue } from "@/querys/useRevenue";
import { toast } from "sonner";
import type { PostResponseDto } from "@/querys/types";

/**
 * 포스트/회차 구매를 처리하는 훅
 * isPaid가 false일 때 결제를 수행하고, 2차 창작물이면 수익 분배도 처리합니다.
 */
export const usePurchasePost = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: executeUsePoints } = useUsePoints();
  const { mutateAsync: executeDistributeRevenue } = useDistributeRevenue();

  const purchasePost = useCallback(
    async (
      post: PostResponseDto,
      onSuccess?: () => void,
      onError?: (error: Error) => void,
    ) => {
      // 가격이 없는 경우 (무료)
      if (!post.price || post.price === 0) {
        onSuccess?.();
        return;
      }

      try {
        // 1. 포인트 사용 (결제)
        await executeUsePoints({
          amount: post.price!,
          postId: post.id,
        });

        // 결제 내역 갱신 및 최신 payId 조회
        await queryClient.invalidateQueries({
          queryKey: ["mypage", "paylist"],
        });

        // paylist 조회하여 최신 USE 타입 결제의 payId 가져오기
        const { mypageApi } = await import("@/querys/useMypage");
        const paylistResponse = await mypageApi.getPaylist();
        const paylist = paylistResponse.data;

        // 최신 USE 타입 결제 찾기 (방금 결제한 것)
        const latestPay = paylist
          ?.filter(
            (pay) =>
              pay.type === "USE" && pay.status === "COMPLETED" && pay.createdAt,
          )
          .sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA;
          })[0];

        // 2. 2차 창작물이면 수익 분배
        if (
          post.creationType === "DERIVATIVE" &&
          post.parentWorkId &&
          latestPay
        ) {
          await executeDistributeRevenue({
            payId: latestPay.payId,
            postId: post.id,
          });
        }

        toast.success("결제가 완료되었습니다.");
        onSuccess?.();
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "결제 처리 중 오류가 발생했습니다.";
        toast.error(errorMessage);
        onError?.(error instanceof Error ? error : new Error(errorMessage));
      }
    },
    [executeUsePoints, executeDistributeRevenue, queryClient],
  );

  return { purchasePost };
};
