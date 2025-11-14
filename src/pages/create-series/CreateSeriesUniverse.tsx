import { useState, useMemo, useCallback } from "react";
import { CreateSeriesUniverseView } from "./CreateSeriesUniverseView";
import { useNavigate } from "react-router-dom";
import { useSearch } from "@/querys/useFeed";
import { toast } from "sonner";

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
  // 검색어가 있을 때만 검색 API 호출
  const { data: searchData } = useSearch(originalSeriesSearch);

  const originalSeriesList = useMemo(() => {
    if (!searchData?.works || !originalSeriesSearch.trim()) return [];
    return searchData.works.slice(0, 10).map((work) => ({
      id: String(work.id),
      imageUrl: work.coverImageUrl,
      title: work.title,
    }));
  }, [searchData, originalSeriesSearch]);

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
    // 필수 필드 검증 (유료 연재가 켜져있을 때만 가격 필수)
    if (paidSeries && !episodePrice.trim()) {
      toast.error("회차 가격을 입력해주세요.");
      return;
    }
    if (paidSeries && isNaN(Number(episodePrice))) {
      toast.error("올바른 가격을 입력해주세요.");
      return;
    }

    // 유니버스 설정 데이터를 localStorage에 저장
    const universeData = {
      selectedOriginalSeriesId,
      paidSeries,
      episodePrice,
    };
    const existingData = localStorage.getItem("createWorkData");
    const workData = existingData ? JSON.parse(existingData) : {};
    localStorage.setItem(
      "createWorkData",
      JSON.stringify({ ...workData, ...universeData }),
    );
    navigate("/create-series/secondary");
  }, [navigate, selectedOriginalSeriesId, paidSeries, episodePrice]);

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
