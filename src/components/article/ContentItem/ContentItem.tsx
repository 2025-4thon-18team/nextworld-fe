import { FC, useState } from "react";
import { cn } from "@/utils";
import { IconPoint, IconPicture } from "@/assets/icons";
import { ArticleInfo } from "@/components/article/ArticleInfo/ArticleInfo";
import { PaymentConfirmPopup } from "@/components/PaymentConfirmPopup/PaymentConfirmPopup";
import { DropdownMenu } from "@/components/DropdownMenu/DropdownMenu";
import { IconMore } from "@/components/IconMore/IconMore";
import { usePurchasePost } from "@/hooks/usePurchasePost";
import { useGetMe } from "@/querys/useAuth";
import { useDeletePost } from "@/querys/usePosts";
import { useNavigation } from "@/hooks/useNavigation";
import type { PostResponseDto } from "@/querys/types";
import { toast } from "sonner";

interface ContentItemProps {
  title: string;
  points: number;
  rating: number;
  views: number;
  comments: number;
  date: string;
  onClick?: () => void;
  className?: string;
  // 결제 관련 props
  isPaid?: boolean;
  price?: number | null;
  postId?: number;
  postData?: PostResponseDto;
}

export const ContentItem: FC<ContentItemProps> = ({
  title,
  points,
  rating,
  views,
  comments,
  date,
  onClick,
  className,
  isPaid = false, // 현재 사용하지 않음 (향후 사용 가능)
  price = null,
  postData,
}) => {
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { purchasePost } = usePurchasePost();
  const { data: currentUser } = useGetMe();
  const { mutate: deletePost } = useDeletePost();
  const { navigate } = useNavigation();

  // 현재 사용자가 작가인지 확인
  const isAuthor = currentUser && postData?.authorName === currentUser.nickname;

  // 포인트 표시 여부: price가 0이 아니고 null이 아니면 표시 (isPaid와 관계없이)
  const shouldShowPoint = price !== null && price > 0;

  // isPaid는 현재 사용하지 않지만 props로 유지 (향후 사용 가능)
  void isPaid;

  const handleClick = () => {
    // 이미 구매했거나 무료인 경우 바로 이동
    if (postData?.hasPurchased || price === null || price === 0) {
      onClick?.();
      return;
    }
    // 가격이 있고 구매하지 않은 경우 결제 팝업 표시
    if (price > 0 && postData) {
      setIsPaymentPopupOpen(true);
    } else {
      onClick?.();
    }
  };

  const handlePaymentConfirm = async () => {
    if (!postData) return;

    setIsProcessing(true);
    try {
      await purchasePost(
        postData,
        () => {
          setIsPaymentPopupOpen(false);
          setIsProcessing(false);
          // 결제 성공 후 원래 onClick 실행
          onClick?.();
        },
        (error) => {
          setIsProcessing(false);
          console.error("결제 실패:", error);
        },
      );
    } catch (error) {
      setIsProcessing(false);
      console.error("결제 처리 중 오류:", error);
    }
  };

  const handleEdit = () => {
    if (!postData?.id) return;
    navigate(`/editor?postId=${postData.id}`);
  };

  const handleDelete = () => {
    if (!postData?.id) return;
    if (!confirm("정말 삭제하시겠습니까?")) return;

    deletePost(postData.id, {
      onSuccess: () => {
        toast.success("포스트가 삭제되었습니다.");
      },
      onError: () => {
        toast.error("포스트 삭제에 실패했습니다.");
      },
    });
  };

  return (
    <>
      <div
        className={cn(
          "h-84 w-full cursor-pointer border-t-2 border-[#f8f8f8] select-none",
          className,
        )}
        onClick={handleClick}
      >
        <div className="py-lg px-md flex h-84 w-full items-center justify-between">
          {/* Left section: Title and Article Info */}
          <div className="gap-sm flex flex-col items-start">
            {/* Title with icon */}
            <div className="flex items-center gap-4">
              <IconPicture className="flex size-24 items-center justify-center gap-10" />
              <h3 className="text-headings-heading-3 whitespace-nowrap text-black">
                {title}
              </h3>
              {isAuthor && (
                <DropdownMenu
                  items={[
                    {
                      label: "수정",
                      onClick: handleEdit,
                    },
                    {
                      label: "삭제",
                      onClick: handleDelete,
                      className: "text-red-600",
                    },
                  ]}
                >
                  <IconMore className="text-text-muted" size={20} />
                </DropdownMenu>
              )}
            </div>

            {/* Article Info */}
            <div className="flex items-center gap-91">
              <ArticleInfo
                rating={rating}
                views={views}
                comments={comments}
                date={date}
              />
            </div>
          </div>

          {/* Right section: Points */}
          {shouldShowPoint && (
            <div className="flex items-center">
              <span className="text-body-large-medium whitespace-nowrap text-black">
                {points}
              </span>
              <IconPoint className="flex size-24 items-center justify-center gap-10" />
            </div>
          )}
        </div>
      </div>

      {/* 결제 확인 팝업 */}
      {postData && price !== null && price > 0 && (
        <PaymentConfirmPopup
          isOpen={isPaymentPopupOpen}
          price={price}
          title={title}
          onClose={() => setIsPaymentPopupOpen(false)}
          onConfirm={handlePaymentConfirm}
          isLoading={isProcessing}
        />
      )}
    </>
  );
};
