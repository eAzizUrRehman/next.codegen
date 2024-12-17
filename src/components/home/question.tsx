'use client';

import { useEffect } from 'react';
import useCodegenStore from '@/store';
import { Input } from '../ui/input.aceternity';
import LabelInputContainer from '../ui/label-input-container.aceternity';
import { Label } from '../ui/label.aceternity';
import { CodegenStore } from '@/store/types';
import { Step } from '@/constants/questionnaire';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Question: React.FC<{ step: Step }> = ({ step }) => {
  const _isHydrated: boolean = useCodegenStore(
    (state: CodegenStore) => state._isHydrated
  );

  const data = useCodegenStore((state: CodegenStore) => state.data);

  const setWelcomeMessage = useCodegenStore(
    (state: CodegenStore) => state.setWelcomeMessage
  );

  const validateStep = useCodegenStore(
    (state: CodegenStore) => state.validateStep
  );

  const setQuestionValue = useCodegenStore(
    (state: CodegenStore) => state.setQuestionValue
  );

  const setErrorValue = useCodegenStore(
    (state: CodegenStore) => state.setErrorValue
  );

  useEffect(() => {
    const name = data[0].questions[0].trim();
    if (step.number === 0 && name !== '') setWelcomeMessage();
  });

  useEffect(() => {
    if (!_isHydrated) return;

    const errorAdded = validateStep(step.number, true);

    if (errorAdded) return;
  }, [_isHydrated, step.number, validateStep]);

  const setInputValueAndValidate = (
    e: React.ChangeEvent<HTMLInputElement>,
    stepNumber: number,
    questionNumber: number
  ) => {
    const value = e.target.value;

    setQuestionValue(stepNumber, questionNumber, value);

    setErrorValue(stepNumber, questionNumber);
  };

  return (
    <div className="custom-scrollbar mr-[26px] mt-2 overflow-y-auto pr-2">
      <ul className=" ">
        {step?.questions?.map((q, index) => (
          <li key={index} className="mb-2">
            <Label htmlFor={`${index}`}>
              {q?.label}

              {q.validation?.required && <span className="ml-1">*</span>}
            </Label>
            <LabelInputContainer className="mt-1">
              <SkeletonTheme
                width={240}
                height={440}
                baseColor="#0d1117"
                highlightColor="rgba(255,255,255,0.1)"
                borderRadius={8}
              >
                {_isHydrated ? (
                  <Input
                    type={q?.type || 'text'}
                    key={`${index}`}
                    id={`${index}`}
                    placeholder={q?.placeholder}
                    value={data[step.number]?.questions[index] || ''}
                    onChange={(e) =>
                      setInputValueAndValidate(e, step.number, index)
                    }
                    {...q.validation}
                  />
                ) : (
                  <div className="leading-none">
                    <Skeleton height={44} width="100%" />
                  </div>
                )}
                <div className="ml-3 mt-1 h-4 text-xs text-red-500">
                  {data[step.number]?.errors[index] && (
                    <>{data[step.number]?.errors[index] || ''}</>
                  )}
                </div>
              </SkeletonTheme>
            </LabelInputContainer>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
