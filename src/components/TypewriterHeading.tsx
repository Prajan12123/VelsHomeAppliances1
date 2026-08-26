import React, { useEffect, useState } from 'react';

interface TypewriterHeadingProps {
  onComplete?: () => void;
}

export const TypewriterHeading: React.FC<TypewriterHeadingProps> = ({ onComplete }) => {
  const fullText = "Unlock Top Marketing Talent You Thought Was Out of Reach -- Now Just One Click Away!";
  const darkSegmentLength = 67; // Characters 0 to 67 in #000000, rest in #ffffff
  const [displayedCount, setDisplayedCount] = useState<number>(0);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);

  useEffect(() => {
    let index = 0;
    let intervalId: NodeJS.Timeout;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        setDisplayedCount(index);

        if (index >= fullText.length) {
          clearInterval(intervalId);
          setIsTypingComplete(true);
          onComplete?.();
        }
      }, 35);
    }, 400);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [fullText, onComplete]);

  const darkPart = fullText.slice(0, Math.min(displayedCount, darkSegmentLength));
  const lightPart = displayedCount > darkSegmentLength 
    ? fullText.slice(darkSegmentLength, displayedCount) 
    : '';

  return (
    <h1
      className="font-['Urbanist'] font-semibold text-[32px] sm:text-[42px] md:text-[50px] lg:text-[60px] xl:text-[64px] leading-[1.05] tracking-[-1.5px] select-none break-words"
      style={{ fontFamily: "'Urbanist', sans-serif" }}
    >
      <span className="text-[#000000]">{darkPart}</span>
      <span className="text-white">{lightPart}</span>
      {/* Blinking purple cursor */}
      <span
        className={`inline-block w-[3px] sm:w-[4px] h-[0.9em] ml-1 bg-[#A068FF] align-middle ${
          isTypingComplete ? 'cursor-blink' : 'opacity-100'
        }`}
        aria-hidden="true"
      />
    </h1>
  );
};
