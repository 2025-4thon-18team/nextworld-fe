import { CreateSeriesBasicView } from "./CreateSeriesBasicView";
import { useCreateSeriesBasic } from "@/logic/useCreateSeriesBasic";

const CreateSeriesBasic = () => {
  const {
    activeStep,
    coverImageUrl,
    title,
    description,
    serialDays,
    genres,
    tags,
    onStepChange,
    onCoverImageClick,
    onTitleChange,
    onDescriptionChange,
    onSerialDayToggle,
    onGenreToggle,
    onNext,
  } = useCreateSeriesBasic();

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
      onNext={onNext}
    />
  );
};

export default CreateSeriesBasic;
