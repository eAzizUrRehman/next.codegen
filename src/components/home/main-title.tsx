import React from 'react';
import VanishingText from '../ui/vanishing-text.aceternity';
import { vanishingTexts } from '@/constants/vanishing-texts';

const MainTitle = ({ currentStep }: { currentStep: number }) => {
  const textClasses =
    'my-4 text-center text-xl font-bold text-neutral-800 dark:text-neutral-200';

  // if (currentStep === -1) {
  //   return <p className={textClasses}>CodeGen™</p>;
  // }

  if (currentStep === 0) {
    return <p className={textClasses}>Welcome to CodeGen™</p>;
  }

  return (
    <VanishingText
      texts={vanishingTexts}
      className="my-4 text-xl font-bold text-neutral-800 dark:text-neutral-200"
    />
  );
};

export default MainTitle;
