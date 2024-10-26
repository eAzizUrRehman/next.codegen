'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from '@tabler/icons-react';
import { Label } from '@/components/ui/label.aceternity';
import { Input } from '@/components/ui/input.aceternity';
import BottomGradient from '@/components/ui/bottom-gradient.aceternity';
import steps from '@/constants/questionnaire';

const Home = () => {
  const [step, setStep] = useState(1);

  const handleButtonClick = () => {
    setStep((prev) => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
  };
  return (
    <div className="no-scrollbar flex min-h-dvh w-screen flex-col items-center justify-center dark:bg-black dark:text-white">
      <div className="my-10 flex h-full w-full max-w-md grow flex-col px-10 shadow-input">
        <GradientDivider />
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to CodeGen™
        </h2>

        <form className="flex h-full grow flex-col" onSubmit={handleSubmit}>
          <Questionnaire />
          <GradientDivider />
        </form>
      </div>
    </div>
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

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex h-full grow flex-col justify-between">
      <Question step={steps[currentStep]} />
      <div className="flex gap-x-5">
        <button
          className="group/btn relative mt-4 block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          onClick={handlePrevious}
        >
          &larr; Previous
          <BottomGradient />
        </button>
        <button
          className="group/btn relative mt-4 block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          onClick={handleNext}
        >
          Next &rarr;
          <BottomGradient />
        </button>
      </div>
    </div>
  );
};

const Question = ({ step }) => {
  return (
    <div className="flex h-full grow flex-col">
      <h3 className="">{step?.title || `Step ${step?.number}`}</h3>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        <span className="block font-semibold">{step?.description[0]}</span>
        <span>{step.description[1]}</span>
      </p>

      <ul className="flex grow flex-col justify-center space-y-5">
        {step.questions.map((q, index) => (
          <li key={index} className="space-y-2">
            <Label htmlFor="first-name">{q?.label}</Label>
            <LabelInputContainer>
              <Input id="first-name" placeholder={q?.placeholder} type="text" />
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
