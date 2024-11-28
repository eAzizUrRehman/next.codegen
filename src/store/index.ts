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
      vanishingTexts: [
        null,
        "AI won't replace you, person using it will.",
        'Mastering AI is mastering the future.',
        'Embrace AI, or get left behind.',
        'Those who adapt to AI thrive.',
        'AI amplifies potential, not just tasks.',
        'Future leaders are AI collaborators.',
        'AI is a tool; mastery is the advantage.',
        'The future favors those who embrace AI.',
        'With AI, adapt or be outpaced.',
        'AI: empower or be outdone.',
        'AI mastery is future-proofing.',
        'AI users shape tomorrow.',
        'The edge belongs to AI users.',
        'AI competence is the new skillset.',
        'Learn AI to lead the future.',
        'Smart work embraces AI tools.',
        'AI fluency defines the future.',
        'In AI, opportunity meets readiness.',
        'AI-driven minds shape success.',
        'The AI advantage belongs to learners.',
      ],
      data: [
        {
          number: 0,
          questions: [''],
          errors: [''],
        },
      ],
      setHydrated: () => set({ _isHydrated: true }),
      setWelcomeMessage: () => {
        set((state) => {
          const newState = produce(state, (draft) => {
            draft.vanishingTexts[0] = `${draft.data[0].questions[0]}!! 👋 Welcome! Let's get started.`;
          });
          return newState;
        });
      },
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

              if (error && error.trim() !== '') errorAdded = true;

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
