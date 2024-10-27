import { ArrowIcon, CheckIcon } from '@/assets';
import steps from '@/constants/questionnaire';
import Image from 'next/image';
import BottomGradient from '../ui/bottom-gradient.aceternity';
import Question from './question';

interface QuestionnaireProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({
  currentStep,
  setCurrentStep,
}) => {
  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex h-full grow flex-col justify-between">
      <Question step={steps[currentStep]} />
      <div className="flex gap-x-5">
        {currentStep !== 0 && (
          <button
            className="group/btn relative mt-4 flex h-10 w-full items-center justify-center gap-x-2 rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            onClick={handlePrevious}
          >
            <Image
              src={ArrowIcon}
              alt="aaa"
              width={10}
              className="-rotate-180"
            />
            Previous
            <BottomGradient />
          </button>
        )}
        {currentStep !== steps.length - 1 ? (
          <button
            className="group/btn relative mt-4 flex h-10 w-full items-center justify-center gap-x-2 rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            onClick={handleNext}
          >
            Next
            <Image src={ArrowIcon} alt="aaa" width={10} className="" />
            <BottomGradient />
          </button>
        ) : (
          <button
            type="submit"
            className="group/btn relative mt-4 flex h-10 w-full items-center justify-center gap-x-2 rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            Submit
            <Image src={CheckIcon} alt="aaa" width={16} className="" />
            <BottomGradient />
          </button>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
