type Step = {
  number: number;
  questions: string[];
  errors: string[];
};

export type CodegenStore = {
  _isHydrated: boolean;
  vanishingTexts: (string | null)[];
  data: Step[];
  finalPrompt: string;
  isFetchingResponse: boolean;
  geminiResponse: string;

  setHydrated: () => void;
  setQuestionValue: (
    stepNumber: number,
    questionNumber: number,
    value: string
  ) => void;
  setWelcomeMessage: () => void;
  setErrorValue: (stepNumber: number, questionNumber: number) => void;
  validateStep: (stepNumber: number, isMounting?: boolean) => boolean;
  setFinalPrompt: () => void;
  fetchGeminiResponse: () => void;
};
