'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label.aceternity';
import { Input } from '@/components/ui/input.aceternity';
import BottomGradient from '@/components/ui/bottom-gradient.aceternity';
import steps from '@/constants/questionnaire';
import { BackgroundGradient } from '@/components/ui/background-gradient.aceternity';
import Image from 'next/image';
import { ArrowIcon, CheckIcon } from '@/assets';
import VanishingText from '@/components/ui/vanishing-text.aceternity';
import { vanishingTexts } from '@/constants/vanishing-texts';

const Home: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <BackgroundGradient className="rounded-[22px] bg-white dark:bg-zinc-900">
      <div className="no-scrollbar mx-auto flex h-[90dvh] w-[500px] grow flex-col items-center justify-center rounded-[22px] px-10 shadow-input dark:bg-black dark:text-white">
        <GradientDivider />
        {currentStep === 0 ? (
          <p className="mb-4 text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Welcome to CodeGen™
          </p>
        ) : (
          <VanishingText
            texts={vanishingTexts}
            className="mb-4 text-xl font-bold text-neutral-800 dark:text-neutral-200"
          />
        )}

        <form
          className="flex h-full w-full grow flex-col"
          onSubmit={handleSubmit}
        >
          <Questionnaire
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
          <GradientDivider />
        </form>
      </div>
    </BackgroundGradient>
  );
};

interface GradientDividerProps {
  direction?: 'horizontal' | 'vertical';
}

const GradientDivider: React.FC<GradientDividerProps> = ({
  direction = 'horizontal',
}) => {
  const isHorizontal = direction === 'horizontal';
  return (
    <div
      className={`bg-gradient-to-${
        isHorizontal ? 'r' : 'b'
      } from-transparent via-neutral-300 to-transparent dark:via-neutral-700 ${
        isHorizontal ? 'h-[1px] w-full' : 'h-full w-[1px]'
      } my-5`}
    />
  );
};

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

interface QuestionProps {
  step: {
    title?: string;
    number?: number;
    description: string[];
    questions: {
      label: string;
      placeholder: string;
    }[];
  };
}

const Question: React.FC<QuestionProps> = ({ step }) => {
  return (
    <div className="flex h-full grow flex-col">
      <h3 className="">{step?.title || `Step ${step?.number}`}</h3>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        <span className="block font-semibold">{step?.description[0]}</span>
        <span>{step?.description[1]}</span>
      </p>

      <ul className="flex grow flex-col justify-center space-y-5">
        {step?.questions.map((q, index) => (
          <li key={index} className="space-y-2">
            <Label htmlFor={`${index}`}>{q?.label}</Label>
            <LabelInputContainer>
              <Input id={`${index}`} placeholder={q?.placeholder} type="text" />
            </LabelInputContainer>
          </li>
        ))}
      </ul>
    </div>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex w-full flex-col space-y-2', className)}>
      {children}
    </div>
  );
};

export default Home;
