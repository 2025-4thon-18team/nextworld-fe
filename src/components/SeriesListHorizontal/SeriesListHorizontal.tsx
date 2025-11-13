import { FC } from "react";
import { SeriesListHorizontalView } from "./SeriesListHorizontalView";

type SeriesItem = {
  id: string;
  imageUrl: string;
  title: string;
  tags: string[];
};

type Props = {
  className?: string;
  items: SeriesItem[];
  onItemClick?: (id: string) => void;
};

export const SeriesListHorizontal: FC<Props> = ({
  className,
  items,
  onItemClick,
}) => {
  return (
    <SeriesListHorizontalView
      className={className}
      items={items}
      onItemClick={onItemClick}
    />
  );
};

