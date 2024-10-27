import { Input } from '../ui/input.aceternity';
import LabelInputContainer from '../ui/label-input-container.aceternity';
import { Label } from '../ui/label.aceternity';

interface QuestionProps {
  step: {
    title?: string;
    number?: number;
    description: string[];
    questions: {
      label: string;
      placeholder: string;
    }[];
  };
}

const Question: React.FC<QuestionProps> = ({ step }) => {
  return (
    <div className="flex h-full grow flex-col">
      <h3 className="font-bold">{step?.title || `Step ${step?.number}`}</h3>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        <span className="block font-semibold">{step?.description[0]}</span>
        <span>{step?.description[1]}</span>
      </p>

      <ul className="flex grow flex-col justify-center space-y-5">
        {step?.questions.map((q, index) => (
          <li key={index} className="space-y-2">
            <Label htmlFor={`${index}`}>{q?.label}</Label>
            <LabelInputContainer>
              <Input id={`${index}`} placeholder={q?.placeholder} type="text" />
            </LabelInputContainer>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
