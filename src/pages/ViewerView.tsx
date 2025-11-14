import { FC } from "react";
import { ViewerHeader } from "@/components/ViewerHeader/ViewerHeader";
import { ViewerEnd } from "@/components/ViewerEnd/ViewerEnd";
import { TagList } from "@/components/TagList/TagList";
import { OriginalSeriesBanner } from "@/components/OriginalSeriesBanner/OriginalSeriesBanner";

type Props = {
  seriesTitle: string;
  episodeTitle: string;
  tags: string[];
  authorName: string;
  authorId?: string | number;
  rating: number;
  originalSeriesImageUrl: string;
  originalSeriesLabel: string;
  originalSeriesTitle: string;
  originalSeriesId?: string | number;
  postType: "POST" | "EPISODE";
  onPrevious?: () => void;
  onNext?: () => void;
  onOriginalSeriesClick?: () => void;
};

export const ViewerView: FC<Props> = ({
  seriesTitle,
  episodeTitle,
  tags,
  authorName,
  authorId,
  rating,
  originalSeriesImageUrl,
  originalSeriesLabel,
  originalSeriesTitle,
  originalSeriesId,
  postType,
  onPrevious,
  onNext,
  onOriginalSeriesClick,
}) => {
  const isEpisode = postType === "EPISODE";

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <ViewerHeader
        seriesTitle={isEpisode ? seriesTitle : undefined}
        episodeTitle={episodeTitle}
        onPrevious={onPrevious}
        onNext={isEpisode ? onNext : undefined}
      />

      <div className="flex w-770 flex-col items-start gap-32 pt-0">
        {/* Content Area */}
        <div className="h-492 w-760 bg-neutral-300" />

        {/* Viewer End Section */}
        <div className="gap-xl flex w-full flex-col items-start">
          <TagList tags={tags} />
          <ViewerEnd
            authorName={authorName}
            authorId={authorId}
            rating={rating}
          />
        </div>

        {/* Original Series Banner - EPISODE이고 원작 작품이 있을 때만 표시 */}
        {isEpisode && originalSeriesTitle && (
          <OriginalSeriesBanner
            imageUrl={originalSeriesImageUrl}
            label={originalSeriesLabel}
            title={originalSeriesTitle}
            seriesId={originalSeriesId}
            onClick={onOriginalSeriesClick}
          />
        )}
      </div>
    </div>
  );
};
