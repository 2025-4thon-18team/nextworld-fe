import { useState, useCallback } from "react";
import { CreateSeriesBasicView } from "./CreateSeriesBasicView";
import { useNavigate } from "react-router-dom";

type StepType = "기본 설정" | "유니버스 설정" | "2차 창작 설정";

const CreateSeriesBasic = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<StepType>("기본 설정");
  const [coverImageUrl] = useState<string | undefined>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [serialDays, setSerialDays] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const onStepChange = useCallback((step: StepType) => {
    setActiveStep(step);
  }, []);

  const onCoverImageClick = useCallback(() => {
    // TODO: 이미지 업로드 로직
    console.log("Cover image upload");
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
    navigate("/create-series/universe");
  }, [navigate]);

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
