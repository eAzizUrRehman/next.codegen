'use client';

import React, { useState } from 'react';
import { BackgroundGradient } from '@/components/ui/background-gradient.aceternity';
import GradientDivider from '@/components/ui/gradient-divider.aceternity';
import Questionnaire from '@/components/home/questionnaire';
import MainTitle from '@/components/home/main-title';

const Home: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setCurrentStep(0);
    console.log('Form submitted');
  };

  return (
    <BackgroundGradient className="rounded-[22px] bg-white dark:bg-zinc-900">
      <div className="no-scrollbar relative mx-auto flex h-[90dvh] w-[600px] grow flex-col items-center justify-center rounded-[22px] px-10 shadow-input dark:bg-black dark:text-white">
        <MainTitle currentStep={currentStep} />
        <GradientDivider />

        <form
          className="mt-4 flex h-full w-full grow flex-col"
          onSubmit={handleSubmit}
        >
          <Questionnaire
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </form>
      </div>
    </BackgroundGradient>
  );
};

export default Home;
