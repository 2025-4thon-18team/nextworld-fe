import { CreateSeriesUniverseView } from "./CreateSeriesUniverseView";
import { useCreateSeriesUniverse } from "@/logic/useCreateSeriesUniverse";

const CreateSeriesUniverse = () => {
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
  } = useCreateSeriesUniverse();

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
