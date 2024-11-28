import steps from '@/constants/questionnaire';

export const convertToSentenceCase = (str: string): string => {
  if (!str) return 'This field';

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const findError = (
  stepNumber: number,
  questionNumber: number,
  value: string,
  isMounting?: boolean
) => {
  let fieldLabel = steps[stepNumber].questions[questionNumber]?.label;

  fieldLabel = convertToSentenceCase(fieldLabel);

  const type = steps[stepNumber].questions[questionNumber]?.type;

  const validation = steps[stepNumber].questions[questionNumber]?.validation;

  if (!validation) return '';

  if (!isMounting && validation.required && value.length === 0)
    return `${fieldLabel} is required`;

  if (validation?.max && value.length > validation.max)
    return `This field must be less than ${validation.max} characters`;

  if (validation.maxLength && value.length > validation.maxLength)
    return `This field must be less than ${validation.maxLength} characters`;

  if (validation.min && value.length < validation.min)
    return `This field must be more than ${validation.min} characters`;

  if (validation.minLength && value.length < validation.minLength)
    return `This field must be more than ${validation.minLength} characters`;

  if (!isMounting && type === 'email') {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;

    if (value.trim() !== '' && !emailPattern.test(value))
      return 'Please enter a valid email address';
  }

  return '';
};
