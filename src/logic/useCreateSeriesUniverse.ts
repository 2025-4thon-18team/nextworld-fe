import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { SeriesPort } from "@/services/types";

type StepType = "기본 설정" | "유니버스 설정" | "2차 창작 설정";

export function useCreateSeriesUniverse(params: { series?: SeriesPort }) {
  const { series } = params;
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<StepType>("유니버스 설정");
  const [originalSeriesSearch, setOriginalSeriesSearch] = useState("");
  const [originalSeriesList, setOriginalSeriesList] = useState<
    Array<{ id: string; imageUrl: string; title: string }>
  >([]);
  const [selectedOriginalSeriesId, setSelectedOriginalSeriesId] = useState<
    string | undefined
  >(undefined);
  const [paidSeries, setPaidSeries] = useState(false);
  const [episodePrice, setEpisodePrice] = useState("");

  useEffect(() => {
    if (!series || !originalSeriesSearch) {
      setOriginalSeriesList([]);
      return;
    }
    let alive = true;
    series.searchOriginalSeries(originalSeriesSearch).then((data) => {
      if (alive) setOriginalSeriesList(data);
    });
    return () => {
      alive = false;
    };
  }, [series, originalSeriesSearch]);

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

  return {
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
  };
}
