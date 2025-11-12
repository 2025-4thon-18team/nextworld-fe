import { CreateSeriesSecondaryView } from "./CreateSeriesSecondaryView";
import { useCreateSeriesSecondary } from "@/logic/useCreateSeriesSecondary";

const CreateSeriesSecondary = () => {
  const {
    activeStep,
    allowSecondaryCreation,
    allowSecondaryRevenue,
    relationshipTextAreas,
    contentTextAreas,
    backgroundTextAreas,
    prohibitedWords,
    agreement1,
    agreement2,
    onStepChange,
    onAllowSecondaryCreationChange,
    onAllowSecondaryRevenueChange,
    onRelationshipTextAreasChange,
    onContentTextAreasChange,
    onBackgroundTextAreasChange,
    onProhibitedWordsChange,
    onAgreement1Change,
    onAgreement2Change,
    onPrevious,
    onComplete,
  } = useCreateSeriesSecondary();

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

