import { FC, useState } from "react";
import { cn } from "@/utils";
import { IconPicture } from "@/assets/icons";
import { ArticleInfo } from "@/components/article/ArticleInfo/ArticleInfo";
import { Tag } from "@/components/Tag/Tag";
import { Point } from "@/components/Point/Point";
import { PaymentConfirmPopup } from "@/components/PaymentConfirmPopup/PaymentConfirmPopup";
import { DropdownMenu } from "@/components/DropdownMenu/DropdownMenu";
import { IconMore } from "@/components/IconMore/IconMore";
import { usePurchasePost } from "@/hooks/usePurchasePost";
import { useGetMe } from "@/querys/useAuth";
import { useDeletePost } from "@/querys/usePosts";
import { useNavigation } from "@/hooks/useNavigation";
import type { PostResponseDto } from "@/querys/types";
import { toast } from "sonner";

// HTML 태그 제거 및 텍스트만 추출하는 함수
const stripHtmlTags = (html: string): string => {
  // 임시 div 요소 생성
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  
  // img 태그 제거
  const images = tmp.getElementsByTagName("img");
  Array.from(images).forEach((img) => img.remove());
  
  // 텍스트만 추출 (p 태그의 내용만 가져옴)
  return tmp.textContent || tmp.innerText || "";
};

interface PostItemProps {
  title: string;
  points: number;
  content: string;
  tags: string[];
  rating: number;
  views: number;
  comments: number;
  date: string;
  showIconPicture?: boolean;
  showPoint?: boolean;
  onClick?: () => void;
  className?: string;
  // 결제 관련 props
  isPaid?: boolean;
  price?: number | null;
  postId?: number;
  postData?: PostResponseDto;
}

export const PostItem: FC<PostItemProps> = ({
  title,
  points,
  content,
  tags,
  rating,
  views,
  comments,
  date,
  showIconPicture = true,
  showPoint = true,
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

  // 포인트 표시 여부: price가 0이 아니고 null이 아니면 표시 (작가가 아닐 때만)
  const shouldShowPoint = showPoint && price !== null && price > 0 && !isAuthor;

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
          "border-t-md border-grayscale-g1 h-230 min-h-230 w-401 cursor-pointer rounded-xs border-r-0 border-b-0 border-l-0 border-solid bg-white drop-shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]",
          className,
        )}
        onClick={handleClick}
      >
        <div className="min-h-inherit px-md py-lg relative box-border flex h-230 w-full flex-col items-start justify-between overflow-hidden rounded-[inherit]">
          {/* Title and Content Section */}
          <div className="gap-md relative flex w-full shrink-0 flex-col items-start">
            {/* Title and Points */}
            <div className="relative flex w-full shrink-0 items-start justify-between">
              <div className="relative flex shrink-0 items-center gap-4">
                {showIconPicture && (
                  <IconPicture className="relative flex size-24 shrink-0 items-center justify-center gap-10" />
                )}
                <p className="text-headings-heading-2 tracking-tight text-nowrap whitespace-pre text-black">
                  {title}
                </p>
              </div>
              <div className="gap-sm relative flex shrink-0 items-center">
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
                {shouldShowPoint && (
                  <div className="relative flex shrink-0 flex-col items-start gap-10">
                    <Point
                      value={points}
                      showPrefix={false}
                      className="relative flex w-full shrink-0 items-end justify-end"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <p className="text-body-medium w-379 tracking-tight text-black">
              {stripHtmlTags(content)}
            </p>
          </div>

          {/* Tags and ArticleInfo */}
          <div className="gap-sm relative flex shrink-0 flex-col items-start">
            <div className="gap-xs relative flex shrink-0 items-center">
              {tags.map((tag, index) => (
                <Tag key={index} type="muted">
                  {tag}
                </Tag>
              ))}
            </div>
            <ArticleInfo
              rating={rating}
              views={views}
              comments={comments}
              date={date}
            />
          </div>
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
