'use client';

import { Highlight, themes } from 'prism-react-renderer';
import { Fira_Code } from 'next/font/google';
import { checkIcon, copyIcon } from '@/assets';
import Image from 'next/image';
import { useState } from 'react';

const firaCode = Fira_Code({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

interface CodeBlockProps {
  block: {
    type: string;
    content: string;
    language: string;
  };
}

const CodeBlock = ({ block }: CodeBlockProps) => {
  const [isCopyLoading, setIsCopyLoading] = useState(false);

  if (block.type !== 'code')
    return <span className="my-5 bg-orange-600">Error in rendering code</span>;

  const handleCopyToClipboard = () => {
    if (isCopyLoading) return;

    setIsCopyLoading(true);
    navigator.clipboard.writeText(block.content);

    setTimeout(() => {
      setIsCopyLoading(false);
    }, 1000);
  };

  return (
    <div className="relative my-5 overflow-hidden rounded-xl">
      <span className="absolute left-2 top-1.5 italic text-white/50">
        {block.language}
      </span>
      {isCopyLoading && (
        <span className="absolute left-1/2 top-5 -translate-x-1/2 -translate-y-1/2 text-white transition-transform duration-300 ease-in-out">
          Code copied...
        </span>
      )}
      <button
        className="absolute right-2 top-2 italic"
        disabled={isCopyLoading}
        onClick={handleCopyToClipboard}
      >
        {isCopyLoading ? (
          <Image
            src={checkIcon}
            alt=""
            height={18}
            className="-translate-x-0.5 transition-transform duration-300 ease-in-out"
          />
        ) : (
          <Image
            src={copyIcon}
            alt=""
            height={20}
            className="transition-transform duration-300 ease-in-out"
          />
        )}
      </button>
      <Highlight
        theme={themes.nightOwl}
        code={block.content}
        language={block.language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} ${firaCode.className} text-wrap break-all pb-5 pt-10 text-sm`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line })}
                className={`${getLineProps({ line }).className} flex`}
              >
                <span className="ml-2 mr-5 text-white/50">{i + 1}</span>
                <span>
                  {line.map((token, key) => (
                    <span
                      id={`${i}-${key}`}
                      key={key}
                      {...getTokenProps({ token })}
                    />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};
export default CodeBlock;
