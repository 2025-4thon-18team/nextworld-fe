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
  rating: number;
  originalSeriesImageUrl: string;
  originalSeriesLabel: string;
  originalSeriesTitle: string;
  onPrevious: () => void;
  onNext: () => void;
  onOriginalSeriesClick: () => void;
};

export const ViewerView: FC<Props> = ({
  seriesTitle,
  episodeTitle,
  tags,
  authorName,
  rating,
  originalSeriesImageUrl,
  originalSeriesLabel,
  originalSeriesTitle,
  onPrevious,
  onNext,
  onOriginalSeriesClick,
}) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <ViewerHeader
        seriesTitle={seriesTitle}
        episodeTitle={episodeTitle}
        onPrevious={onPrevious}
        onNext={onNext}
      />

      <div className="flex w-770 flex-col items-start gap-32 pt-0">
        {/* Content Area */}
        <div className="h-492 w-760 bg-neutral-300" />

        {/* Viewer End Section */}
        <div className="gap-xl flex w-full flex-col items-start">
          <TagList tags={tags} />
          <ViewerEnd authorName={authorName} rating={rating} />
        </div>

        {/* Original Series Banner */}
        <OriginalSeriesBanner
          imageUrl={originalSeriesImageUrl}
          label={originalSeriesLabel}
          title={originalSeriesTitle}
          onClick={onOriginalSeriesClick}
        />
      </div>
    </div>
  );
};

