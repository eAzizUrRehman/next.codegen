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
    <div className='dark:bg-black w-screen min-h-dvh no-scrollbar flex justify-center items-center'>
      <div className='  w-full mx-auto max-w-md p-4 md:p-8 shadow-input bg-white dark:bg-black'>
        <h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
          Welcome to CodeGen™
        </h2>
        <p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 '>
          <span className='font-semibold block'>
            Before we proceed, let's have a quick introduction!
          </span>
          <span>
            I'd love to know a bit about you. Please fill out the form below.
          </span>
        </p>

        <form
          className='mt-4 mb-8'
          onSubmit={handleSubmit}
        >
          {step === 1 && (
            <>
              <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4'>
                <LabelInputContainer>
                  <Label htmlFor='first-name'>First name</Label>
                  <Input
                    id='first-name'
                    placeholder='Nayab'
                    type='text'
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor='last-name'>Last name</Label>
                  <Input
                    id='last-name'
                    placeholder='Noor'
                    type='text'
                  />
                </LabelInputContainer>
              </div>
              <LabelInputContainer>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  placeholder='hello@nayabnoor.com'
                  type='text'
                />
              </LabelInputContainer>
            </>
          )}
          <button
            type={step === 6 ? 'submit' : 'button'}
            className='mt-4 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
            onClick={handleButtonClick}
          >
            Next &rarr;
            <BottomGradient />
          </button>

          <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />
        </form>
      </div>
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
