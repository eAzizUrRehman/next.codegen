'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from '@tabler/icons-react'
import { Label } from '@/components/ui/label.aceternity'
import { Input } from '@/components/ui/input.aceternity'
import BottomGradient from '@/components/ui/bottom-gradient.aceternity'
import steps from '@/data/questionnaire'

const Home = () => {
  const [step, setStep] = useState(1)

  const handleButtonClick = () => {
    setStep((prev) => prev + 1)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted')
  }
  return (
    <div className='  w-screen min-h-dvh no-scrollbar flex flex-col justify-center items-center dark:text-white dark:bg-black '>
      <div className='grow h-full w-full max-w-md px-10 shadow-input flex flex-col my-10'>
        <GradientDivider />
        <h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
          Welcome to CodeGen™
        </h2>

        <form
          className='h-full grow  flex flex-col'
          onSubmit={handleSubmit}
        >
          <Questionnaire />
          <GradientDivider />
        </form>
      </div>
    </div>
  )
}

interface GradientDividerProps {
  direction?: 'horizontal' | 'vertical'
}

const GradientDivider: React.FC<GradientDividerProps> = ({
  direction = 'horizontal',
}) => {
  const isHorizontal = direction === 'horizontal'
  return (
    <div
      className={`bg-gradient-to-${
        isHorizontal ? 'r' : 'b'
      } from-transparent via-neutral-300 dark:via-neutral-700 to-transparent ${
        isHorizontal ? 'h-[1px] w-full' : 'w-[1px] h-full'
      } my-5`}
    />
  )
}

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className=' grow h-full flex flex-col justify-between '>
      <Question step={steps[currentStep]} />
      <div className='flex gap-x-5'>
        <button
          className='mt-4 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
          onClick={handlePrevious}
        >
          &larr; Previous
          <BottomGradient />
        </button>
        <button
          className='mt-4 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
          onClick={handleNext}
        >
          Next &rarr;
          <BottomGradient />
        </button>
      </div>
    </div>
  )
}

const Question = ({ step }) => {
  return (
    <div className='grow flex flex-col  h-full'>
      <h3 className=''>
          {step?.title || `Step ${step?.number}`}
        </h3>
      <p className='text-neutral-600  text-sm max-w-sm mt-2 dark:text-neutral-300 '>
        <span className='font-semibold block'>{step?.description[0]}</span>
        <span>{step.description[1]}</span>
      </p>
      
        
        <ul className='space-y-5  grow flex flex-col justify-center'>
          {step.questions.map((q, index) => (
            <li
              key={index}
              className='space-y-2'
            >
              <Label htmlFor='first-name'>{q?.label}</Label>
              <LabelInputContainer>
                <Input
                  id='first-name'
                  placeholder={q?.placeholder}
                  type='text'
                />
              </LabelInputContainer>
            </li>
          ))}
        </ul>
   
    </div>
  )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  )
}

export default Home
