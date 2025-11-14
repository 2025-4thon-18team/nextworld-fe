import { FC } from "react";
import { IconCross } from "@/assets/icons";
import { Point } from "@/components/Point/Point";
import Button from "@/components/Button/Button";

interface PaymentConfirmPopupProps {
  isOpen: boolean;
  price: number;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const PaymentConfirmPopup: FC<PaymentConfirmPopupProps> = ({
  isOpen,
  price,
  title,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="z-modal bg-grayscale-black bg-opacity-50 fixed inset-0"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="z-modal fixed top-1/2 left-1/2 w-400 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="border-default px-xl py-lg flex items-center justify-between border-b">
          <h2 className="text-headings-heading-3 text-black">결제 확인</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-xs hover:bg-background-muted flex items-center justify-center rounded-md"
          >
            <IconCross className="size-24 text-black" />
          </button>
        </div>

        {/* Content */}
        <div className="px-xl py-xl">
          <div className="gap-lg flex flex-col">
            <p className="text-body-medium text-black">
              {title}을(를) 구매하시겠습니까?
            </p>

            <div className="gap-sm flex items-center justify-between border-t border-default pt-lg">
              <p className="text-body-medium text-black">결제 금액</p>
              <div className="flex items-center gap-4">
                <Point value={price} showPrefix={false} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-default px-xl py-lg flex items-center justify-end gap-sm">
          <Button
            variant="subtle"
            onClick={onClose}
            disabled={isLoading}
            className="min-w-100"
          >
            취소
          </Button>
          <Button
            variant="default"
            onClick={onConfirm}
            disabled={isLoading}
            className="min-w-100"
          >
            {isLoading ? "처리 중..." : "결제 확인"}
          </Button>
        </div>
      </div>
    </>
  );
};

