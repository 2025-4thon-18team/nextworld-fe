import { FC } from "react";
import { cn } from "@/utils";
import { IconCross } from "@/assets/icons";
import { TagList } from "@/components/TagList/TagList";
import { StickerCard } from "@/components/StickerCard/StickerCard";
import { useGetWorkGuideline } from "@/querys/useWorks";

interface GuidelineSidebarProps {
  title: string;
  onClose?: () => void;
  className?: string;
  originalWorkId?: number;
}

export const GuidelineSidebar: FC<GuidelineSidebarProps> = ({
  title,
  onClose,
  className,
  originalWorkId,
}) => {
  // 항상 원작 가이드라인만 표시
  const currentWorkId = originalWorkId;

  // 가이드라인 조회
  const { data: guidelineData } = useGetWorkGuideline(currentWorkId || 0);

  // 가이드라인 데이터 파싱
  const forbiddenWords = guidelineData?.bannedWords
    ? guidelineData.bannedWords
        .split(",")
        .map((w) => w.trim())
        .filter(Boolean)
    : [];

  const sections = [];
  if (guidelineData?.guidelineRelation) {
    sections.push({
      title: "세계관 관계 규칙",
      content: guidelineData.guidelineRelation,
    });
  }
  if (guidelineData?.guidelineContent) {
    sections.push({
      title: "내용 규칙",
      content: guidelineData.guidelineContent,
    });
  }
  if (guidelineData?.guidelineBackground) {
    sections.push({
      title: "배경 설정",
      content: guidelineData.guidelineBackground,
    });
  }
  return (
    <div
      className={cn(
        "bg-background-subtle gap-lg flex h-full w-442 flex-col items-start shadow-[-2px_1px_4px_0px_rgba(0,0,0,0.25)]",
        className,
      )}
    >
      {/* Header Section */}
      <div className="gap-md pt-lg relative flex w-full shrink-0 flex-col items-start bg-white px-32 pb-0">
        {/* Header */}
        <div className="relative flex w-full shrink-0 items-center justify-between">
          <p className="text-body-medium tracking-tight text-nowrap whitespace-pre text-black">
            {title}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex size-24 items-center justify-center overflow-hidden"
          >
            <IconCross className="size-24 shrink-0 overflow-hidden" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="gap-md relative flex w-full shrink-0 grow flex-col items-start px-32 py-0">
        {/* 금지어 */}
        <div className="px-sm flex w-full shrink-0 flex-col items-start gap-10 rounded-sm bg-white py-4">
          <div className="flex items-center justify-center gap-3 px-4 py-0">
            <p className="text-body-medium tracking-tight text-nowrap whitespace-pre text-black">
              금지어
            </p>
          </div>
        </div>
        <TagList tags={forbiddenWords} />

        {/* 섹션들 */}
        {sections.map((section, index) => (
          <div key={index} className="gap-md flex w-full flex-col items-start">
            <div className="px-sm flex w-full shrink-0 flex-col items-start gap-10 rounded-sm bg-white py-4">
              <div className="flex items-center justify-center gap-3 px-4 py-0">
                <p className="text-body-medium tracking-tight text-nowrap whitespace-pre text-black">
                  {section.title}
                </p>
              </div>
            </div>
            <StickerCard variant="primary">{section.content}</StickerCard>
          </div>
        ))}
      </div>
    </div>
  );
};
