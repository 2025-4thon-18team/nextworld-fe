import { useState, useMemo, useCallback } from "react";
import { CreateSeriesUniverseView } from "./CreateSeriesUniverseView";
import { useNavigate } from "react-router-dom";
import { useGetAllWorks } from "@/querys/useWorks";

type StepType = "기본 설정" | "유니버스 설정" | "2차 창작 설정";

const CreateSeriesUniverse = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<StepType>("유니버스 설정");
  const [originalSeriesSearch, setOriginalSeriesSearch] = useState("");
  const [selectedOriginalSeriesId, setSelectedOriginalSeriesId] = useState<
    string | undefined
  >(undefined);
  const [paidSeries, setPaidSeries] = useState(false);
  const [episodePrice, setEpisodePrice] = useState("");

  // React Query hooks 직접 사용
  const { data: allWorks } = useGetAllWorks("ORIGINAL");

  const originalSeriesList = useMemo(() => {
    if (!allWorks || !originalSeriesSearch) return [];
    return allWorks
      .filter((work) =>
        work.title.toLowerCase().includes(originalSeriesSearch.toLowerCase()),
      )
      .slice(0, 10)
      .map((work) => ({
        id: String(work.id),
        imageUrl: work.coverImageUrl,
        title: work.title,
      }));
  }, [allWorks, originalSeriesSearch]);

  const onStepChange = useCallback((step: StepType) => {
    setActiveStep(step);
  }, []);

  const onOriginalSeriesSearchChange = useCallback((value: string) => {
    setOriginalSeriesSearch(value);
  }, []);

  const onOriginalSeriesSelect = useCallback((id: string) => {
    setSelectedOriginalSeriesId(id);
  }, []);

  const onPaidSeriesChange = useCallback((checked: boolean) => {
    setPaidSeries(checked);
  }, []);

  const onEpisodePriceChange = useCallback((value: string) => {
    setEpisodePrice(value);
  }, []);

  const onPrevious = useCallback(() => {
    navigate("/create-series/basic");
  }, [navigate]);

  const onNext = useCallback(() => {
    navigate("/create-series/secondary");
  }, [navigate]);

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
