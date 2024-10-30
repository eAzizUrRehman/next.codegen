import useCodegenStore from '@/store';
import { Input } from '../ui/input.aceternity';
import LabelInputContainer from '../ui/label-input-container.aceternity';
import { Label } from '../ui/label.aceternity';
import { CodegenStore } from '@/store/types';

interface QuestionProps {
  step: {
    title: string;
    number: number;
    description: string[];
    questions: {
      label: string;
      placeholder: string;
    }[];
  };
}

const Question: React.FC<QuestionProps> = ({ step }) => {
  const data = useCodegenStore((state: CodegenStore) => state.data);
  const setQuestionValue = useCodegenStore(
    (state: CodegenStore) => state.setQuestionValue
  );

  const setInputValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    stepNumber: number,
    questionNumber: number
  ) => {
    const value = e.target.value;

    setQuestionValue(stepNumber, questionNumber, value);
  };

  return (
    <div className="flex h-full grow flex-col">
      <ul className="flex grow flex-col justify-center space-y-5">
        {step?.questions?.map((q, index) => (
          <li key={index} className="space-y-2">
            <Label htmlFor={`${index}`}>{q?.label}</Label>
            <LabelInputContainer>
              <Input
                type="text"
                key={`${index}`}
                id={`${index}`}
                placeholder={q?.placeholder}
                value={data[step.number]?.questions[index] || ''}
                onChange={(e) => setInputValue(e, step.number, index)}
              />
            </LabelInputContainer>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
