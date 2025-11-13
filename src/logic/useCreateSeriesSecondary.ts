import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type StepType = "기본 설정" | "유니버스 설정" | "2차 창작 설정";

export function useCreateSeriesSecondary() {
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
  const [prohibitedWords, setProhibitedWords] = useState<string[]>([
    "현대로맨스",
    "현대로맨스",
  ]);
  const [agreement1, setAgreement1] = useState(false);
  const [agreement2, setAgreement2] = useState(false);

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
    // TODO: Complete creation
    console.log("Complete creation");
  }, []);

  return {
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
  };
}
