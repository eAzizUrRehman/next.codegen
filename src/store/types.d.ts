type Step = {
  number: number;
  questions: string[];
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
};
