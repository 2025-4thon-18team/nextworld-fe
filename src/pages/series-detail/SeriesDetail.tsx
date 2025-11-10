import { SeriesDetailView } from "./SeriesDetailView";
import { useSeriesDetail } from "@/logic/useSeriesDetail";
import { createSeriesPort } from "@/services/series.service";

const SeriesDetail = () => {
  const series = createSeriesPort();
  const props = useSeriesDetail({ series });

  return <SeriesDetailView {...props} />;
};

export default SeriesDetail;

