import { useState, useCallback, useEffect } from "react";
import { CreateSeriesSecondaryView } from "./CreateSeriesSecondaryView";
import { useNavigate } from "react-router-dom";
import { useCreateWork } from "@/querys/useWorks";
import type { WorkRequestDto, WorkTypeEnum } from "@/querys/types";
import { toast } from "sonner";

type StepType = "기본 설정" | "유니버스 설정" | "2차 창작 설정";

const CreateSeriesSecondary = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<StepType>("2차 창작 설정");
  const [allowSecondaryCreation, setAllowSecondaryCreation] = useState(true);
  const [allowSecondaryRevenue, setAllowSecondaryRevenue] = useState(true);
  const [relationshipTextAreas, setRelationshipTextAreas] = useState<string[]>([
    "",
  ]);
  const [contentTextAreas, setContentTextAreas] = useState<string[]>([""]);
  const [backgroundTextAreas, setBackgroundTextAreas] = useState<string[]>([
    "",
  ]);
  const [prohibitedWords, setProhibitedWords] = useState<string[]>([]);
  const [agreement1, setAgreement1] = useState(false);
  const [agreement2, setAgreement2] = useState(false);

  // API Hooks
  const { mutate: createWork } = useCreateWork();

  // localStorage에서 이전 단계 데이터 로드
  useEffect(() => {
    const savedData = localStorage.getItem("createWorkData");
    if (savedData) {
      // 필요시 데이터 복원
      // const workData = JSON.parse(savedData);
    }
  }, []);

  const onStepChange = useCallback((step: StepType) => {
    setActiveStep(step);
  }, []);

  const onAllowSecondaryCreationChange = useCallback((checked: boolean) => {
    setAllowSecondaryCreation(checked);
  }, []);

  const onAllowSecondaryRevenueChange = useCallback((checked: boolean) => {
    setAllowSecondaryRevenue(checked);
  }, []);

  const onRelationshipTextAreasChange = useCallback((textAreas: string[]) => {
    setRelationshipTextAreas(textAreas);
  }, []);

  const onContentTextAreasChange = useCallback((textAreas: string[]) => {
    setContentTextAreas(textAreas);
  }, []);

  const onBackgroundTextAreasChange = useCallback((textAreas: string[]) => {
    setBackgroundTextAreas(textAreas);
  }, []);

  const onProhibitedWordsChange = useCallback((words: string[]) => {
    setProhibitedWords(words);
  }, []);

  const onAgreement1Change = useCallback((checked: boolean) => {
    setAgreement1(checked);
  }, []);

  const onAgreement2Change = useCallback((checked: boolean) => {
    setAgreement2(checked);
  }, []);

  const onPrevious = useCallback(() => {
    navigate("/create-series/universe");
  }, [navigate]);

  const onComplete = useCallback(() => {
    // 필수 필드 검증
    const savedData = localStorage.getItem("createWorkData");
    if (!savedData) {
      toast.error("작품 데이터를 찾을 수 없습니다. 처음부터 다시 시작해주세요.");
      return;
    }

    const workData = JSON.parse(savedData);
    
    // 기본 설정 필수 필드 검증
    if (!workData.coverImageUrl) {
      toast.error("표지 이미지를 선택해주세요.");
      navigate("/create-series/basic");
      return;
    }
    if (!workData.title?.trim()) {
      toast.error("제목을 입력해주세요.");
      navigate("/create-series/basic");
      return;
    }
    if (!workData.description?.trim()) {
      toast.error("작품 설명을 입력해주세요.");
      navigate("/create-series/basic");
      return;
    }
    if (!workData.serialDays || workData.serialDays.length === 0) {
      toast.error("연재일을 선택해주세요.");
      navigate("/create-series/basic");
      return;
    }
    if (!workData.genres || workData.genres.length === 0) {
      toast.error("장르 카테고리를 선택해주세요.");
      navigate("/create-series/basic");
      return;
    }

    // 유니버스 설정 필수 필드 검증 (유료 연재가 켜져있을 때만)
    if (workData.paidSeries && !workData.episodePrice?.trim()) {
      toast.error("회차 가격을 입력해주세요.");
      navigate("/create-series/universe");
      return;
    }
    if (workData.paidSeries && isNaN(Number(workData.episodePrice))) {
      toast.error("올바른 가격을 입력해주세요.");
      navigate("/create-series/universe");
      return;
    }

    // 약관 동의 검증
    if (!agreement1 || !agreement2) {
      toast.error("약관에 동의해주세요.");
      return;
    }

    // Category 매핑 (genres 배열의 첫 번째 값을 사용)
    const categoryMap: Record<string, string> = {
      현대로맨스: "ROMANCE",
      스릴러: "THRILLER",
      판타지: "FANTASY",
      무협: "MARTIAL_ARTS",
      드라마: "DRAMA",
      SF: "SF",
      코미디: "COMEDY",
    };
    const category = workData.genres?.[0]
      ? categoryMap[workData.genres[0]] || "ROMANCE"
      : undefined;

    // workType 자동 설정: 원작이 있으면 DERIVATIVE, 없으면 ORIGINAL
    const parentWorkId = workData.selectedOriginalSeriesId
      ? Number(workData.selectedOriginalSeriesId)
      : undefined;
    const workTypeValue: WorkTypeEnum = parentWorkId
      ? "DERIVATIVE"
      : "ORIGINAL";

    // WorkRequestDto 생성
    const workRequest: WorkRequestDto = {
      workType: workTypeValue,
      parentWorkId,
      title: workData.title,
      description: workData.description,
      coverImageUrl: workData.coverImageUrl,
      category: category, // category 필드 사용
      serializationSchedule: workData.serialDays?.join(", ") || undefined,
      tags: workData.tags || [],
      allowDerivative: allowSecondaryCreation,
      guidelineRelation: relationshipTextAreas.join("\n"),
      guidelineContent: contentTextAreas.join("\n"),
      guidelineBackground: backgroundTextAreas.join("\n"),
      bannedWords:
        prohibitedWords.length > 0 ? prohibitedWords.join(", ") : undefined,
    };

    createWork(workRequest, {
      onSuccess: () => {
        toast("작품이 성공적으로 생성되었습니다.");
        localStorage.removeItem("createWorkData");
        // 작품 생성 시작 전 위치로 이동, 없으면 마이페이지로
        const returnPath = sessionStorage.getItem("createWorkReturnPath");
        sessionStorage.removeItem("createWorkReturnPath");
        navigate(returnPath || "/my-page/main");
      },
      onError: () => {
        toast("작품 생성에 실패했습니다.");
      },
    });
  }, [
    agreement1,
    agreement2,
    allowSecondaryCreation,
    allowSecondaryRevenue,
    relationshipTextAreas,
    contentTextAreas,
    backgroundTextAreas,
    prohibitedWords,
    createWork,
    navigate,
  ]);

  return (
    <CreateSeriesSecondaryView
      activeStep={activeStep}
      allowSecondaryCreation={allowSecondaryCreation}
      allowSecondaryRevenue={allowSecondaryRevenue}
      relationshipTextAreas={relationshipTextAreas}
      contentTextAreas={contentTextAreas}
      backgroundTextAreas={backgroundTextAreas}
      prohibitedWords={prohibitedWords}
      agreement1={agreement1}
      agreement2={agreement2}
      onStepChange={onStepChange}
      onAllowSecondaryCreationChange={onAllowSecondaryCreationChange}
      onAllowSecondaryRevenueChange={onAllowSecondaryRevenueChange}
      onRelationshipTextAreasChange={onRelationshipTextAreasChange}
      onContentTextAreasChange={onContentTextAreasChange}
      onBackgroundTextAreasChange={onBackgroundTextAreasChange}
      onProhibitedWordsChange={onProhibitedWordsChange}
      onAgreement1Change={onAgreement1Change}
      onAgreement2Change={onAgreement2Change}
      onPrevious={onPrevious}
      onComplete={onComplete}
    />
  );
};

export default CreateSeriesSecondary;
