type Step = {
  number: number;
  questions: string[];
  errors: string[];
};

export type CodegenStore = {
  _isHydrated: boolean;
  data: Step[];

  setHydrated: () => void;
  setQuestionValue: (
    stepNumber: number,
    questionNumber: number,
    value: string
  ) => void;
  setErrorValue: (stepNumber: number, questionNumber: number) => void;
  validateStep: (stepNumber: number, isMounting?: boolean) => boolean;
};
