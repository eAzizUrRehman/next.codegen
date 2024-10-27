'use client';

import React, { useState } from 'react';
import { BackgroundGradient } from '@/components/ui/background-gradient.aceternity';
import GradientDivider from '@/components/ui/gradient-divider.aceternity';
import VanishingText from '@/components/ui/vanishing-text.aceternity';
import { vanishingTexts } from '@/constants/vanishing-texts';
import Questionnaire from '@/components/home/questionnaire';

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

export default Home;
