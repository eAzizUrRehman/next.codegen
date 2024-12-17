import useCodegenStore from '@/store';
import { CodegenStore } from '@/store/types';

const Preview = () => {
  const finalPrompt = useCodegenStore(
    (state: CodegenStore) => state.finalPrompt
  );

  const promptArray = finalPrompt.split('\\n\\n');

  return (
    <div className="custom-scrollbar mb-5 mr-[26px] mt-2 h-[53dvh] overflow-y-auto pr-2">
      {promptArray.map((text, index) => {
        const [question, answer] = text.split('\\n');
        return (
          <div key={index} className="mt-5 text-sm">
            <p className="font-semibold">{question}</p>
            <p className="">{answer}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Preview;
