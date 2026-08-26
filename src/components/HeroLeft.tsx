import React from 'react';
import { TypewriterHeading } from './TypewriterHeading';

export const HeroLeft: React.FC = () => {
  return (
    <div className="flex-[0_1_600px] w-full max-w-[620px] pt-4 sm:pt-8 lg:pt-10 flex flex-col items-start animate-hero-up relative z-20">
      {/* Typewriter Heading */}
      <TypewriterHeading />

      {/* Action Row */}
      <div className="mt-8 sm:mt-10 flex flex-col items-start w-full">
        {/* Start Project button */}
        <div className="btn-border-wrap animate-pop-in-btn">
          <button
            type="button"
            className="btn-slide-right flex items-center gap-3 rounded-[50px] bg-[#060218] text-white px-7 py-3.5 text-[16px] font-medium tracking-tight cursor-pointer focus:outline-none shadow-lg transition-transform active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              Start Project
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </button>
        </div>

        {/* David Cursor Element */}
        <div className="animate-pop-in-cursor mt-6 sm:mt-10 ml-16 sm:ml-48 lg:ml-[290px] flex items-start gap-1.5 select-none pointer-events-none">
          {/* Purple pointer arrow icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="drop-shadow-[0_2px_8px_rgba(160,104,255,0.6)] transform -rotate-12 translate-y-1"
          >
            <path
              d="M3 3L10.07 20.97L13.58 13.58L20.97 10.07L3 3Z"
              fill="#A068FF"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>

          {/* David badge */}
          <div className="bg-[#A068FF] text-white text-[16px] font-medium px-4 py-2 rounded-[20px] shadow-[0_4px_16px_rgba(160,104,255,0.45)] whitespace-nowrap">
            David
          </div>
        </div>
      </div>
    </div>
  );
};
