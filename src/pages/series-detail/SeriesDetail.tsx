import { SeriesDetailView } from "./SeriesDetailView";
import { useSeriesDetail } from "@/logic/useSeriesDetail";

const SeriesDetail = () => {
  const props = useSeriesDetail();

  return <SeriesDetailView {...props} />;
};

export default SeriesDetail;
