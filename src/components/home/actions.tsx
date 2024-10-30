import React from 'react';

const actions = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="mb-4 flex gap-x-5">
      {currentStep !== 0 && (
        <button
          className="group/btn relative mt-4 flex h-10 w-full items-center justify-center gap-x-2 rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          onClick={handlePrevious}
        >
          <Image src={ArrowIcon} alt="aaa" width={10} className="-rotate-180" />
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
  );
};

export default actions;
