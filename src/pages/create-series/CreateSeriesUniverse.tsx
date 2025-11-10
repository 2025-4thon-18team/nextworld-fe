import { CreateSeriesUniverseView } from "./CreateSeriesUniverseView";
import { useCreateSeriesUniverse } from "@/logic/useCreateSeriesUniverse";
import { createSeriesPort } from "@/services/series.service";

const CreateSeriesUniverse = () => {
  const series = createSeriesPort();
  const {
    activeStep,
    originalSeriesSearch,
    originalSeriesList,
    selectedOriginalSeriesId,
    worldviewTextAreas,
    paidSeries,
    episodePrice,
    onStepChange,
    onOriginalSeriesSearchChange,
    onOriginalSeriesSelect,
    onWorldviewTextAreasChange,
    onPaidSeriesChange,
    onEpisodePriceChange,
    onPrevious,
    onNext,
  } = useCreateSeriesUniverse({ series });

  return (
    <CreateSeriesUniverseView
      activeStep={activeStep}
      originalSeriesSearch={originalSeriesSearch}
      originalSeriesList={originalSeriesList}
      selectedOriginalSeriesId={selectedOriginalSeriesId}
      worldviewTextAreas={worldviewTextAreas}
      paidSeries={paidSeries}
      episodePrice={episodePrice}
      onStepChange={onStepChange}
      onOriginalSeriesSearchChange={onOriginalSeriesSearchChange}
      onOriginalSeriesSelect={onOriginalSeriesSelect}
      onWorldviewTextAreasChange={onWorldviewTextAreasChange}
      onPaidSeriesChange={onPaidSeriesChange}
      onEpisodePriceChange={onEpisodePriceChange}
      onPrevious={onPrevious}
      onNext={onNext}
    />
  );
};

export default CreateSeriesUniverse;
