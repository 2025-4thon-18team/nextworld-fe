import { useState, useCallback } from "react";
import { CreateSeriesBasicView } from "./CreateSeriesBasicView";
import { useNavigate } from "react-router-dom";
import { useUploadWorkImage } from "@/querys/useWorks";

type StepType = "기본 설정" | "유니버스 설정" | "2차 창작 설정";

const CreateSeriesBasic = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<StepType>("기본 설정");
  const [coverImageUrl, setCoverImageUrl] = useState<string | undefined>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [serialDays, setSerialDays] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  // API Hooks
  const { mutate: uploadImage, isPending: isUploading } = useUploadWorkImage();

  const onStepChange = useCallback((step: StepType) => {
    setActiveStep(step);
  }, []);

  const onCoverImageClick = useCallback(() => {
    // 파일 입력 요소 생성
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        uploadImage(file, {
          onSuccess: (imageUrl) => {
            setCoverImageUrl(imageUrl);
            alert("이미지가 업로드되었습니다.");
          },
          onError: () => {
            alert("이미지 업로드에 실패했습니다.");
          },
        });
      }
    };
    input.click();
  }, [uploadImage]);

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
      title={title}
      description={description}
      serialDays={serialDays}
      genres={genres}
      tags={tags}
      onStepChange={onStepChange}
      onCoverImageClick={onCoverImageClick}
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
