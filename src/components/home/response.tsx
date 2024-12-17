import useCodegenStore from '@/store';
import { CodegenStore } from '@/store/types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import CodeBlock from './code-block';
import 'react-loading-skeleton/dist/skeleton.css';
import VanishingText from '../ui/vanishing-text.aceternity';

type TextVariant = 'normal' | 'bold' | 'bullet';

interface TextPart {
  text: string;
  variant: TextVariant;
}

interface CodeBlock {
  type: 'code';
  content: string;
  language: string;
}

interface TextBlock {
  type: 'text';
  content: TextPart[];
}

const Response = () => {
  const isFetchingResponse = useCodegenStore(
    (state: CodegenStore) => state.isFetchingResponse
  );

  const geminiResponse = useCodegenStore(
    (state: CodegenStore) => state.geminiResponse
  );

  const splitText = (text: string): TextPart[] => {
    return text
      .split('\n')
      .flatMap((line) => {
        if (line.trim() === '') {
          return [];
        }

        if (line.startsWith('*')) {
          const bulletText = line.slice(1).trim();
          const parts = bulletText.split(/\*\*(.*?)\*\*/);

          return parts
            .map((part) => ({
              text: part.trim(),
              variant: 'bullet',
            }))
            .filter((part) => part.text !== '') as TextPart[];
        }

        if (line.startsWith('**')) {
          return [{ text: line.slice(2, -2), variant: 'bold' as TextVariant }];
        }

        return [{ text: line, variant: 'normal' as TextVariant }];
      })
      .filter((part) => part.text !== '');
  };

  const extractCodeBlocks = (input: string): (CodeBlock | TextBlock)[] => {
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const result: (CodeBlock | TextBlock)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(input)) !== null) {
      if (match.index > lastIndex) {
        result.push({
          type: 'text',
          content: splitText(input.slice(lastIndex, match.index).trim()),
        });
      }

      result.push({
        type: 'code',
        content: match[1].split('\n').slice(1).join('\n').trim(),
        language: match[1].split(/[\n\s]/)[0],
      });
      lastIndex = codeBlockRegex.lastIndex;
    }

    if (lastIndex < input.length) {
      result.push({
        type: 'text',
        content: splitText(input.slice(lastIndex).trim()),
      });
    }

    return result;
  };

  const codeBlocks = extractCodeBlocks(geminiResponse);

  const TextBlock = ({ content }: { content: TextPart[] }) => (
    <div className="">
      {content.map((line, index) => (
        <p key={index} className="mt-1 text-white">
          {line.variant === 'bold' ? (
            <span className="font-bold">{line.text}</span>
          ) : line.variant === 'bullet' ? (
            <li className="list-inside list-disc">
              {line.text.split('**').map((part, i) =>
                i % 2 === 1 ? (
                  <span key={i} className="font-bold">
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </li>
          ) : (
            line.text
          )}
        </p>
      ))}
    </div>
  );

  const vanishingTexts = [
    'Doing our best... 💪',
    'Please wait while loading... ⏳',
    'Almost there... preparing... 🔧',
    'Hang tight, loading... 🚀',
    'Gathering information... 🧠',
    'This might take a moment... ⏱️',
    'Just a few more seconds... ⏳',
    'Hold on! Getting ready... ⚙️',
    'Working on it... 🛠️',
    'Syncing up... 🌐',
    'Almost done loading... 🕒',
    'Just a moment, on our way... 🛣️',
    'Almost ready to serve you... 🍽️',
    'One last step... nearly there... ⚡',
  ];

  return (
    <div className="h-full pb-5">
      <SkeletonTheme
        width={240}
        height={440}
        baseColor="#0d1117"
        highlightColor="rgba(255,255,255,0.1)"
        borderRadius={8}
      >
        {isFetchingResponse ? (
          <div className="relative h-full pr-10 leading-none">
            <Skeleton height="100%" width="100%" className="" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <VanishingText
                texts={vanishingTexts}
                animationTime={1500}
                className="text-sm"
              />
            </div>
          </div>
        ) : (
          <div className="custom-scrollbar mr-[26px] h-[53dvh] overflow-y-auto pr-2">
            {codeBlocks.map((block, index) => (
              <div key={index}>
                {block.type === 'code' ? (
                  <CodeBlock block={block} />
                ) : (
                  <TextBlock content={block.content as TextPart[]} />
                )}
              </div>
            ))}
          </div>
        )}
      </SkeletonTheme>
    </div>
  );
};

export default Response;
