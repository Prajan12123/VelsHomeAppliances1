import React from 'react';

const UNIQUE_LOGOS = [
  { id: 'logo-1', src: 'https://polo-pecan-73837341.figma.site/_assets/v11/1e7b0e6fcc016cd28aec5c68990118b8c54c35a5.svg', alt: 'Partner logo 1' },
  { id: 'logo-2', src: 'https://polo-pecan-73837341.figma.site/_assets/v11/3eac03c183db2ae080d910159211c14843398b61.svg', alt: 'Partner logo 2' },
  { id: 'logo-3', src: 'https://polo-pecan-73837341.figma.site/_assets/v11/17705a4c0023a0e5a99154dfb10582adbbf4260b.svg', alt: 'Partner logo 3' },
  { id: 'logo-4', src: 'https://polo-pecan-73837341.figma.site/_assets/v11/0e5f442b09dc5c248e3e60d40a65505fb1887228.svg', alt: 'Partner logo 4' },
  { id: 'logo-5', src: 'https://polo-pecan-73837341.figma.site/_assets/v11/63f99030ceb459e3c9ab9e429cfa2353491d3816.svg', alt: 'Partner logo 5' },
];

export const LogoTicker: React.FC = () => {
  // Repeating the set 4 times for seamless infinite loop scroll
  const repeatCounts = [0, 1, 2, 3];

  return (
    <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 py-6 sm:py-8 animate-logos-up relative z-20">
      <div className="ticker-mask overflow-hidden w-full relative">
        <div className="ticker-track flex items-center gap-16 py-2">
          {repeatCounts.map((repeatIdx) => (
            <React.Fragment key={repeatIdx}>
              {UNIQUE_LOGOS.map((logo, idx) => (
                <div
                  key={`${repeatIdx}-${logo.id}-${idx}`}
                  className="flex-shrink-0 flex items-center justify-center"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-[137px] h-[40px] object-contain opacity-50 hover:opacity-100 transition-opacity duration-300 select-none grayscale invert brightness-0 hover:filter-none"
                    loading="lazy"
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
