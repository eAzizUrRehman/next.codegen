import useCodegenStore from '@/store';
import { CodegenStore } from '@/store/types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Response = () => {
  const isFetchingResponse = useCodegenStore(
    (state: CodegenStore) => state.isFetchingResponse
  );

  const geminiResponse = useCodegenStore(
    (state: CodegenStore) => state.geminiResponse
  );

  const splitText = (text: string): { text: string; variant: string }[] => {
    return text
      .split('\n')
      .flatMap((line) => {
        if (line.trim() === '') {
          return [];
        }

        if (line.startsWith('*')) {
          const bulletText = line.slice(1).trim();
          const boldMatches = bulletText.match(/\*\*(.*?)\*\*/g) || [];
          const parts = bulletText.split(/\*\*(.*?)\*\*/);

          return parts
            .map((part, index) => ({
              text: part.trim(),
              variant: boldMatches.includes(`**${part}**`) ? 'bold' : 'bullet',
            }))
            .filter((part) => part.text !== '');
        }

        if (line.startsWith('**')) {
          return [{ text: line.slice(2, -2), variant: 'bold' }];
        }

        return [{ text: line, variant: 'normal' }];
      })
      .filter((part) => part.text !== '');
  };

  const extractCodeBlocks = (
    input: string
  ): {
    type: string;
    content: string | { text: string; variant: string }[];
  }[] => {
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const result: {
      type: string;
      content: string | { text: string; variant: string }[];
    }[] = [];
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
        content: match[1].trim(),
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

  const TextBlock = ({
    content,
  }: {
    content: { text: string; variant: string }[];
  }) => (
    <>
      {content.map((line, index) => (
        <p key={index} className={`10 mt-5 text-white ${line.variant}`}>
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
    </>
  );

  const CodeBlock = ({ content }: { content: string }) => (
    <pre className="my-10">{content}</pre>
  );

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
          <div className="h-full pr-10 leading-none">
            <Skeleton height="100%" width="100%" className="" />
          </div>
        ) : (
          <div className="custom-scrollbar mr-[26px] mt-2 h-[53dvh] overflow-y-auto pr-2">
            {codeBlocks.map((block, index) => (
              <div className="" key={index}>
                {block.type === 'code' ? (
                  <CodeBlock content={block.content as string} />
                ) : (
                  <TextBlock
                    content={
                      block.content as { text: string; variant: string }[]
                    }
                  />
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
