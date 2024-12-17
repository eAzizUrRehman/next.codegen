import { Highlight, themes } from 'prism-react-renderer';
import { Fira_Code } from 'next/font/google';
import { copyIcon } from '@/assets';
import Image from 'next/image';

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
  if (block.type !== 'code')
    return <span className="my-5 bg-orange-600">Error in rendering code</span>;

  return (
    <div className="relative my-5 overflow-hidden rounded-xl">
      <span className="absolute left-2 top-1.5 italic text-white/50">
        {block.language}
      </span>
      <button className="absolute right-2 top-2 italic">
        <Image src={copyIcon} alt="" width={20} />
      </button>
      <Highlight
        theme={themes.nightOwl}
        code={block.content}
        language={block.language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} ${firaCode.className} text-wrap pb-5 pt-10 text-sm`}
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
