import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { CodegenStore } from './types';
import { produce } from 'immer';

const useCodegenStore = create<CodegenStore>()(
  persist(
    immer((set) => ({
      _isHydrated: false,
      data: [
        {
          number: 0,
          questions: [''],
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
              draft.data[stepNumber] = { number: stepNumber, questions: [] };

            if (!draft.data[stepNumber].questions[questionNumber])
              draft.data[stepNumber].questions[questionNumber] = '';

            draft.data[stepNumber].questions[questionNumber] = value;
          });
          return newState;
        });
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
