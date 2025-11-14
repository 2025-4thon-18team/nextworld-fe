import { useState, useCallback, useEffect } from "react";
import { CreateSeriesBasicView } from "./CreateSeriesBasicView";
import { useNavigate } from "react-router-dom";
import { useUploadWorkImage } from "@/querys/useWorks";
import { toast } from "sonner";
import preset1 from "@/assets/presets/preset-1.png";
import preset2 from "@/assets/presets/preset-2.png";
import preset3 from "@/assets/presets/preset-3.png";
import preset4 from "@/assets/presets/preset-4.png";

type StepType = "기본 설정" | "유니버스 설정" | "2차 창작 설정";

const presets = [preset1, preset2, preset3, preset4];

const CreateSeriesBasic = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<StepType>("기본 설정");

  // 작품 생성 시작 시 이전 위치 저장 (작품 생성 페이지가 아닐 때만)
  useEffect(() => {
    const currentPath = window.location.pathname;
    const isCreateSeriesPath = currentPath.startsWith("/create-series");

    // 작품 생성 페이지가 아니고, 아직 저장된 경로가 없을 때만 저장
    if (
      !isCreateSeriesPath &&
      !sessionStorage.getItem("createWorkReturnPath")
    ) {
      sessionStorage.setItem("createWorkReturnPath", currentPath);
    }
  }, []);
  const [coverImageUrl, setCoverImageUrl] = useState<string | undefined>();
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number | null>(
    null,
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [serialDays, setSerialDays] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  // API Hooks
  const { mutate: uploadImage } = useUploadWorkImage();

  const onStepChange = useCallback((step: StepType) => {
    setActiveStep(step);
  }, []);

  const handleFileUpload = useCallback(
    (file: File) => {
      uploadImage(file, {
        onSuccess: (imageUrl) => {
          setCoverImageUrl(imageUrl);
          setSelectedPresetIndex(null); // 파일 업로드 시 프리셋 선택 해제
          toast("이미지가 업로드되었습니다.");
        },
        onError: () => {
          toast("이미지 업로드에 실패했습니다.");
        },
      });
    },
    [uploadImage],
  );

  const onCoverImageClick = useCallback(() => {
    // 파일 입력 요소 생성
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileUpload(file);
      }
    };
    input.click();
  }, [handleFileUpload]);

  const onFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileUpload(file);
      }
    },
    [handleFileUpload],
  );

  const onPresetClick = useCallback((index: number) => {
    setSelectedPresetIndex(index);
    setCoverImageUrl(presets[index]);
  }, []);

  const onTitleChange = useCallback((value: string) => {
    setTitle(value);
  }, []);

  const onDescriptionChange = useCallback((value: string) => {
    setDescription(value);
  }, []);

  const onSerialDayToggle = useCallback((day: string) => {
    setSerialDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  }, []);

  const onGenreToggle = useCallback((genre: string) => {
    setGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  }, []);

  const onNext = useCallback(() => {
    // 필수 필드 검증
    if (!coverImageUrl) {
      toast.error("표지 이미지를 선택해주세요.");
      return;
    }
    if (!title.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }
    if (!description.trim()) {
      toast.error("작품 설명을 입력해주세요.");
      return;
    }
    if (serialDays.length === 0) {
      toast.error("연재일을 선택해주세요.");
      return;
    }
    if (genres.length === 0) {
      toast.error("장르 카테고리를 선택해주세요.");
      return;
    }

    // 다음 단계로 데이터 전달 (localStorage 사용)
    const workData = {
      coverImageUrl,
      title,
      description,
      serialDays,
      genres,
      tags,
    };
    localStorage.setItem("createWorkData", JSON.stringify(workData));
    navigate("/create-series/universe");
  }, [navigate, coverImageUrl, title, description, serialDays, genres, tags]);

  return (
    <CreateSeriesBasicView
      activeStep={activeStep}
      coverImageUrl={coverImageUrl}
      selectedPresetIndex={selectedPresetIndex}
      presets={presets}
      title={title}
      description={description}
      serialDays={serialDays}
      genres={genres}
      tags={tags}
      onStepChange={onStepChange}
      onCoverImageClick={onCoverImageClick}
      onFileInputChange={onFileInputChange}
      onPresetClick={onPresetClick}
      onTitleChange={onTitleChange}
      onDescriptionChange={onDescriptionChange}
      onSerialDayToggle={onSerialDayToggle}
      onGenreToggle={onGenreToggle}
      onTagsChange={setTags}
      onNext={onNext}
    />
  );
};

export default CreateSeriesBasic;
