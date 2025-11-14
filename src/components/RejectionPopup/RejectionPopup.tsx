import { FC } from "react";
import { IconCross } from "@/assets/icons";
import Button from "@/components/Button/Button";

interface RejectionPopupProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export const RejectionPopup: FC<RejectionPopupProps> = ({
  isOpen,
  message,
  onClose,
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
          <h2 className="text-headings-heading-3 text-black">발행 반려</h2>
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
          <p className="text-body-medium text-black whitespace-pre-wrap">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-default px-xl py-lg flex items-center justify-end gap-sm">
          <Button variant="default" onClick={onClose} className="min-w-100">
            확인
          </Button>
        </div>
      </div>
    </>
  );
};

