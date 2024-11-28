import React from 'react';
import VanishingText from '../ui/vanishing-text.aceternity';
import useCodegenStore from '@/store';
import { CodegenStore } from '@/store/types';

const MainTitle = ({ currentStep }: { currentStep: number }) => {
  const textClasses =
    ' h-fit text-center align-center text-xl font-bold text-neutral-800 dark:text-neutral-200';

  const vanishingTexts = useCodegenStore(
    (state: CodegenStore) => state.vanishingTexts
  );

  if (currentStep === 0) {
    return <p className={textClasses}>CodeGen™ - AI-Powered Code Generator</p>;
  }

  return <VanishingText texts={vanishingTexts} className={textClasses} />;
};

export default MainTitle;
