import { FC, useState, useEffect } from "react";
import { IconStar, IconCross } from "@/assets/icons";
import { cn } from "@/utils";

interface RatingPopupProps {
  currentRating?: number;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (rating: number) => void;
}

export const RatingPopup: FC<RatingPopupProps> = ({
  currentRating,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedRating, setSelectedRating] = useState<number>(
    currentRating || 0,
  );
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  // 팝업이 열릴 때마다 currentRating을 초기값으로 설정
  useEffect(() => {
    if (isOpen) {
      setSelectedRating(currentRating || 0);
      setHoveredRating(0);
    }
  }, [isOpen, currentRating]);

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleStarHover = (rating: number) => {
    setHoveredRating(rating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = () => {
    if (selectedRating > 0 && onSubmit) {
      onSubmit(selectedRating);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-modal bg-grayscale-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-modal w-500 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="border-b border-default px-xl flex items-center justify-between py-lg">
          <div className="gap-xs flex items-center">
            <IconStar className="size-24 text-black" />
            <h2 className="text-headings-heading-3 text-black">별점 평가</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center rounded-md p-xs hover:bg-background-muted"
          >
            <IconCross className="size-24 text-black" />
          </button>
        </div>

        {/* Content */}
        <div className="px-xl py-xl">
          <div className="gap-lg flex flex-col items-center">
            {/* Stars */}
            <div className="gap-xs flex items-center">
              {[1, 2, 3, 4, 5].map((rating) => {
                const isActive =
                  hoveredRating >= rating || selectedRating >= rating;
                return (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleStarClick(rating)}
                    onMouseEnter={() => handleStarHover(rating)}
                    onMouseLeave={handleStarLeave}
                    className="flex items-center justify-center p-xs transition-transform hover:scale-110"
                  >
                    <IconStar
                      className={cn(
                        "size-48 transition-colors",
                        isActive
                          ? "fill-primary-main text-primary-main"
                          : "text-grayscale-g3",
                      )}
                    />
                  </button>
                );
              })}
            </div>

            {/* Rating Text */}
            <p className="text-body-medium text-black">
              {selectedRating > 0
                ? `${selectedRating}점을 선택하셨습니다`
                : "별점을 선택해주세요"}
            </p>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={selectedRating === 0}
              className={cn(
                "w-full rounded-md px-lg py-md text-body-medium transition-colors",
                selectedRating > 0
                  ? "bg-primary-main text-white hover:bg-primary-700"
                  : "bg-grayscale-g2 text-muted cursor-not-allowed",
              )}
            >
              평가하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

