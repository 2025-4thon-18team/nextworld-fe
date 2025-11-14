import { FC } from "react";
import { ViewerHeader } from "@/components/ViewerHeader/ViewerHeader";
import { ViewerEnd } from "@/components/ViewerEnd/ViewerEnd";
import { TagList } from "@/components/TagList/TagList";
import { OriginalSeriesBanner } from "@/components/OriginalSeriesBanner/OriginalSeriesBanner";

type Props = {
  seriesTitle: string;
  episodeTitle: string;
  content: string;
  tags: string[];
  authorName: string;
  authorId?: string | number;
  rating: number;
  myRating?: number | null;
  postId?: number;
  originalSeriesImageUrl: string;
  originalSeriesLabel: string;
  originalSeriesTitle: string;
  originalSeriesId?: string | number;
  postType: "POST" | "EPISODE";
  onBack?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  onOriginalSeriesClick?: () => void;
  onRatingSubmit?: (rating: number) => void;
};

export const ViewerView: FC<Props> = ({
  seriesTitle,
  episodeTitle,
  content,
  tags,
  authorName,
  authorId,
  rating,
  myRating,
  postId,
  originalSeriesImageUrl,
  originalSeriesLabel,
  originalSeriesTitle,
  originalSeriesId,
  postType,
  onBack,
  onPrevious,
  onNext,
  onOriginalSeriesClick,
  onRatingSubmit,
}) => {
  const isEpisode = postType === "EPISODE";

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <ViewerHeader
        seriesTitle={isEpisode ? seriesTitle : undefined}
        episodeTitle={episodeTitle}
        onBack={onBack}
        onPrevious={onPrevious}
        onNext={isEpisode ? onNext : undefined}
      />

      <div className="flex w-770 flex-col items-start gap-32 pt-0">
        {/* Content Area */}
        <div className="gap-lg flex w-full flex-col">
          <h1 className="text-headings-heading-1 text-black">{episodeTitle}</h1>
          <div
            className="text-body-regular whitespace-pre-wrap text-black"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Viewer End Section */}
        <div className="gap-xl flex w-full flex-col items-start">
          <TagList tags={tags} />
          <ViewerEnd
            authorName={authorName}
            authorId={authorId}
            rating={rating}
            myRating={myRating}
            postId={postId}
            onRatingSubmit={onRatingSubmit}
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
