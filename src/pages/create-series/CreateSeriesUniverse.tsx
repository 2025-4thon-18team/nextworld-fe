import { CreateSeriesUniverseView } from "./CreateSeriesUniverseView";
import { useCreateSeriesUniverse } from "@/logic/useCreateSeriesUniverse";

const CreateSeriesUniverse = () => {
  const {
    activeStep,
    originalSeriesSearch,
    originalSeriesList,
    selectedOriginalSeriesId,
    paidSeries,
    episodePrice,
    onStepChange,
    onOriginalSeriesSearchChange,
    onOriginalSeriesSelect,
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
      paidSeries={paidSeries}
      episodePrice={episodePrice}
      onStepChange={onStepChange}
      onOriginalSeriesSearchChange={onOriginalSeriesSearchChange}
      onOriginalSeriesSelect={onOriginalSeriesSelect}
      onPaidSeriesChange={onPaidSeriesChange}
      onEpisodePriceChange={onEpisodePriceChange}
      onPrevious={onPrevious}
      onNext={onNext}
    />
  );
};

export default CreateSeriesUniverse;
