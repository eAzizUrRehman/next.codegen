'use client';

import { useState } from 'react';
import { BackgroundGradient } from '@/components/ui/background-gradient.aceternity';
import GradientDivider from '@/components/ui/gradient-divider.aceternity';
import Questionnaire from '@/components/home/questionnaire';
import MainTitle from '@/components/home/main-title';

const Home: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // setCurrentStep(0);

    // TODO: remove logs
  };

  return (
    <BackgroundGradient
      containerClassName="xs:mx-10 xxs:mx-5 mx-4"
      className="rounded-[22px] bg-white dark:bg-zinc-900"
    >
      <div className="no-scrollbar relative flex h-[90dvh] grow flex-col items-center justify-center rounded-[22px] pl-4 shadow-input dark:bg-black dark:text-white xxs:pl-5 xs:pl-10 sm:w-[600px]">
        <div className="flex min-h-[60px] w-full items-center justify-center pr-4 pt-2 xxs:pr-5 xs:pr-10">
          <MainTitle currentStep={currentStep} />
        </div>
        <GradientDivider className="mr-4 w-full shrink-0 xxs:mr-5 xs:mr-10" />
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
