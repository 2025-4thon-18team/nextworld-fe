// ⭐ SeriesListHorizontal.tsx — grid-friendly로 수정
import { FC, useCallback } from "react";
import { cn } from "@/utils";
import { SeriesCard } from "@/components/SeriesCard/SeriesCard";
import { useNavigation } from "@/hooks";

type SeriesItem = {
  id: string;
  imageUrl: string;
  title: string;
  tags: string[];
};

type Props = {
  className?: string;
  items: SeriesItem[];
};

export const SeriesListHorizontal: FC<Props> = ({ className, items }) => {
  const { navigateToSeries } = useNavigation();

  const handleSeriesClick = useCallback(
    (id: string) => navigateToSeries(id),
    [navigateToSeries],
  );

  return (
    <div
      className={cn(
        "gap-4",   // ⭐ flex 제거 → HomeView의 grid가 정상 적용됨
        className,
      )}
    >
      {items.map((item) => (
        <SeriesCard
          key={item.id}
          imageUrl={item.imageUrl}
          title={item.title}
          tags={item.tags}
          seriesId={item.id}
          onClick={() => handleSeriesClick(item.id)}
          className="hover:shadow-md transition rounded-md"
        />
      ))}
    </div>
  );
};
