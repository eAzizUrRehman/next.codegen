import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { CodegenStore } from './types';
import { produce } from 'immer';
import { findError } from './helpers';

const useCodegenStore = create<CodegenStore>()(
  persist(
    immer((set) => ({
      _isHydrated: false,
      data: [
        {
          number: 0,
          questions: [''],
          errors: [''],
        },
      ],
      setHydrated: () => set({ _isHydrated: true }),
      setQuestionValue: (
        stepNumber: number,
        questionNumber: number,
        value: string
      ) => {
        set((state) => {
          const newState = produce(state, (draft) => {
            if (!draft.data[stepNumber])
              draft.data[stepNumber] = {
                number: stepNumber,
                questions: [],
                errors: [],
              };

            if (!draft.data[stepNumber].questions[questionNumber])
              draft.data[stepNumber].questions[questionNumber] = '';

            draft.data[stepNumber].questions[questionNumber] = value;
          });
          return newState;
        });
      },
      setErrorValue: (stepNumber: number, questionNumber: number) => {
        set((state) => {
          const newState = produce(state, (draft) => {
            if (!draft.data[stepNumber])
              draft.data[stepNumber] = {
                number: stepNumber,
                questions: [],
                errors: [],
              };

            const value = draft.data[stepNumber].questions[questionNumber];

            const error = findError(stepNumber, questionNumber, value);

            if (!draft.data[stepNumber].errors[questionNumber])
              draft.data[stepNumber].errors[questionNumber] = '';

            draft.data[stepNumber].errors[questionNumber] = error;
          });
          return newState;
        });
      },
      validateStep: (stepNumber: number, isMounting?: boolean): boolean => {
        let errorAdded = false;

        set((state) => {
          const newState = produce(state, (draft) => {
            draft?.data[stepNumber]?.questions.forEach((_, index) => {
              const value = draft.data[stepNumber].questions[index] || '';

              const error = findError(stepNumber, index, value, isMounting);

              if (error) errorAdded = true;

              draft.data[stepNumber].errors[index] = error;
            });
          });
          return newState;
        });

        return errorAdded;
      },
    })),
    {
      name: 'codegen-store',
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
          else console.log('Failed to rehydrate header-store');
        };
      },
    }
  )
);

export default useCodegenStore;
