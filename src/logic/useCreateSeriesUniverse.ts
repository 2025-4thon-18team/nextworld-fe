import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type StepType = "기본 설정" | "유니버스 설정" | "2차 창작 설정";

export function useCreateSeriesUniverse() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<StepType>("유니버스 설정");
  const [originalSeriesSearch, setOriginalSeriesSearch] = useState("");
  const [originalSeriesList, setOriginalSeriesList] = useState<
    Array<{ id: string; imageUrl: string; title: string }>
  >([
    {
      id: "1",
      imageUrl: "https://via.placeholder.com/134x201",
      title: "[작품 제목]",
    },
    {
      id: "2",
      imageUrl: "https://via.placeholder.com/134x201",
      title: "[작품 제목]",
    },
    {
      id: "3",
      imageUrl: "https://via.placeholder.com/134x201",
      title: "[작품 제목]",
    },
    {
      id: "4",
      imageUrl: "https://via.placeholder.com/134x201",
      title: "[작품 제목]",
    },
    {
      id: "5",
      imageUrl: "https://via.placeholder.com/134x201",
      title: "[작품 제목]",
    },
  ]);
  const [selectedOriginalSeriesId, setSelectedOriginalSeriesId] = useState<
    string | undefined
  >("2");
  const [worldviewTextAreas, setWorldviewTextAreas] = useState<string[]>([
    "",
    "",
  ]);
  const [paidSeries, setPaidSeries] = useState(false);
  const [episodePrice, setEpisodePrice] = useState("");

  const onStepChange = useCallback((step: StepType) => {
    setActiveStep(step);
  }, []);

  const onOriginalSeriesSearchChange = useCallback((value: string) => {
    setOriginalSeriesSearch(value);
  }, []);

  const onOriginalSeriesSelect = useCallback((id: string) => {
    setSelectedOriginalSeriesId(id);
  }, []);

  const onWorldviewTextAreasChange = useCallback((textAreas: string[]) => {
    setWorldviewTextAreas(textAreas);
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

  return {
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
  };
}

