import { ArrowIcon, CheckIcon } from '@/assets';
import steps from '@/constants/questionnaire';
import Image from 'next/image';
import BottomGradient from '../ui/bottom-gradient.aceternity';
import Question from './question';
import Preview from './preview';
import Response from './response';
import GradientDivider from '../ui/gradient-divider.aceternity';
import useCodegenStore from '@/store';
import { CodegenStore } from '@/store/types';
import axios from 'axios';

interface QuestionnaireProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({
  currentStep,
  setCurrentStep,
}) => {
  const validateStep = useCodegenStore(
    (state: CodegenStore) => state.validateStep
  );
  const fetchGeminiAnswer = useCodegenStore(
    (state: CodegenStore) => state.fetchGeminiAnswer
  );

  const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const errorAdded = validateStep(currentStep);

    if (errorAdded) return;

    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    fetchGeminiAnswer();
  };

  return (
    <div className="flex h-full grow flex-col justify-between">
      <div className="mr-4 xxs:mr-5 xs:mr-10">
        <h3 className="text-center font-bold">
          {steps[currentStep]?.title || `Step ${steps[currentStep]?.number}`}
        </h3>
        <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-300">
          <span className="block text-center font-semibold">
            {steps[currentStep]?.description[0]}
          </span>
          <span>{steps[currentStep]?.description[1]}</span>
        </p>
        <GradientDivider className="mr-4 mt-5 xxs:mr-5 xs:mr-10" />
      </div>
      <div className="h-fit">
        {currentStep !== 98 && currentStep !== 99 && (
          <Question step={steps[currentStep]} />
        )}

        {currentStep === steps.length - 2 && <Preview />}
        {currentStep === steps.length - 1 && <Response />}
      </div>

      <div className="">
        <GradientDivider className="mr-4 xxs:mr-5 xs:mr-10" />
        <div className="mb-4 mr-4 flex gap-x-5 xxs:mr-5 xs:mr-10">
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
              onClick={handleSubmit}
            >
              Submit
              <Image src={CheckIcon} alt="aaa" width={16} className="" />
              <BottomGradient />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
