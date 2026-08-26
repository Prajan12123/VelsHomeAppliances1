import React from 'react';
import { useCountUp } from '../hooks/useCountUp';

interface AvatarConfig {
  id: string;
  url: string;
  orbitIndex: number; // 1, 2, 3, 4
  angle: number; // degrees
  radius: number; // px from center
  size: number; // width/height px
  borderRadius: string; // e.g. 'rounded-full', 'rounded-[20px]', 'rounded-[24px]'
  glowClass: string;
  borderClass: string;
  delay: number; // animation-delay in seconds
  counterClass: string;
}

const AVATARS: AvatarConfig[] = [
  // Orbit 1: 270deg, 177px, 58px square (border-radius 20px), purple glow, delay 0.6s
  {
    id: 'avatar-1',
    url: 'https://polo-pecan-73837341.figma.site/_assets/v11/aa51718fb3af3637e6d666b6543fc27a175fada6.png',
    orbitIndex: 1,
    angle: 270,
    radius: 176.5,
    size: 58,
    borderRadius: 'rounded-[20px]',
    glowClass: 'glow-purple',
    borderClass: 'border-2 border-[#A068FF]',
    delay: 0.6,
    counterClass: 'counter-orbit-1',
  },
  // Orbit 2: 60deg, 251px, 58px round, yellow glow, delay 0.8s
  {
    id: 'avatar-2',
    url: 'https://polo-pecan-73837341.figma.site/_assets/v11/ca755f7f93c1126fb8bdbf99ab364a33aa9ab272.png',
    orbitIndex: 2,
    angle: 60,
    radius: 250.5,
    size: 58,
    borderRadius: 'rounded-full',
    glowClass: 'glow-yellow',
    borderClass: 'border-2 border-yellow-400',
    delay: 0.8,
    counterClass: 'counter-orbit-2',
  },
  // Orbit 2: 180deg, 251px, 78px round, pink glow, delay 1.0s
  {
    id: 'avatar-3',
    url: 'https://polo-pecan-73837341.figma.site/_assets/v11/dc01064c7093dcc32674876ee3cf5e41c4a485c6.png',
    orbitIndex: 2,
    angle: 180,
    radius: 250.5,
    size: 78,
    borderRadius: 'rounded-full',
    glowClass: 'glow-pink',
    borderClass: 'border-2 border-pink-400',
    delay: 1.0,
    counterClass: 'counter-orbit-2',
  },
  // Orbit 2: 300deg, 251px, 58px square (20px), blue glow, delay 1.2s
  {
    id: 'avatar-4',
    url: 'https://polo-pecan-73837341.figma.site/_assets/v11/d5470a58b02388336141575048720f19a50de832.png',
    orbitIndex: 2,
    angle: 300,
    radius: 250.5,
    size: 58,
    borderRadius: 'rounded-[20px]',
    glowClass: 'glow-blue',
    borderClass: 'border-2 border-blue-400',
    delay: 1.2,
    counterClass: 'counter-orbit-2',
  },
  // Orbit 3: 130deg, 325px, 88px round, pink glow, delay 1.4s
  {
    id: 'avatar-5',
    url: 'https://polo-pecan-73837341.figma.site/_assets/v11/018736aa5d0275c4ce56cfebaf2ae3007d81ca1e.png',
    orbitIndex: 3,
    angle: 130,
    radius: 324.5,
    size: 88,
    borderRadius: 'rounded-full',
    glowClass: 'glow-pink',
    borderClass: 'border-2 border-pink-500',
    delay: 1.4,
    counterClass: 'counter-orbit-3',
  },
  // Orbit 4: 30deg, 399px, 58px round, purple glow, delay 1.7s
  {
    id: 'avatar-6',
    url: 'https://polo-pecan-73837341.figma.site/_assets/v11/c76d8a0b99676de31c014344bfaf75bad090758d.png',
    orbitIndex: 4,
    angle: 30,
    radius: 398.5,
    size: 58,
    borderRadius: 'rounded-full',
    glowClass: 'glow-purple',
    borderClass: 'border-2 border-purple-400',
    delay: 1.7,
    counterClass: 'counter-orbit-4',
  },
  // Orbit 4: 95deg, 399px, 88px square (24px), orange glow, delay 1.9s
  {
    id: 'avatar-7',
    url: 'https://polo-pecan-73837341.figma.site/_assets/v11/7b1b5f039de7b54cc9913e96c1923c3b15a157fa.png',
    orbitIndex: 4,
    angle: 95,
    radius: 398.5,
    size: 88,
    borderRadius: 'rounded-[24px]',
    glowClass: 'glow-orange',
    borderClass: 'border-2 border-orange-400',
    delay: 1.9,
    counterClass: 'counter-orbit-4',
  },
  // Orbit 4: 220deg, 399px, 88px square (24px), pink glow, delay 2.1s
  {
    id: 'avatar-8',
    url: 'https://polo-pecan-73837341.figma.site/_assets/v11/9ae171d8895199349755c43fbff00e122221a027.png',
    orbitIndex: 4,
    angle: 220,
    radius: 398.5,
    size: 88,
    borderRadius: 'rounded-[24px]',
    glowClass: 'glow-pink',
    borderClass: 'border-2 border-pink-400',
    delay: 2.1,
    counterClass: 'counter-orbit-4',
  },
  // Orbit 4: 320deg, 399px, 58px round, purple glow, delay 2.3s
  {
    id: 'avatar-9',
    url: 'https://polo-pecan-73837341.figma.site/_assets/v11/926c9eb7b4bc1df846fa0e39f0b0dc3fefd80671.png',
    orbitIndex: 4,
    angle: 320,
    radius: 398.5,
    size: 58,
    borderRadius: 'rounded-full',
    glowClass: 'glow-purple',
    borderClass: 'border-2 border-[#A068FF]',
    delay: 2.3,
    counterClass: 'counter-orbit-4',
  },
];

export const CirclesVisualization: React.FC = () => {
  const count = useCountUp(20, 2000, 1200);

  return (
    <div className="flex-1 flex items-center justify-center relative w-full min-h-[440px] sm:min-h-[580px] lg:min-h-[720px] animate-circles-in select-none">
      {/* Scaled container */}
      <div className="relative w-[720px] h-[720px] scale-[0.44] xs:scale-[0.52] sm:scale-[0.68] md:scale-[0.78] lg:scale-[0.85] xl:scale-[0.95] 2xl:scale-100 origin-center flex items-center justify-center pointer-events-none">
        
        {/* Orbit 4: 797px diameter, CCW 60s */}
        <div
          className="orbit-ring orbit-4-spin"
          style={{ width: '797px', height: '797px' }}
        >
          <div className="orbit-ring-border" />
          {AVATARS.filter((a) => a.orbitIndex === 4).map((avatar) => (
            <div
              key={avatar.id}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `rotate(${avatar.angle}deg) translate(${avatar.radius}px) rotate(-${avatar.angle}deg)`,
              }}
            >
              <div
                className="avatar-entrance"
                style={{ animationDelay: `${avatar.delay}s` }}
              >
                <div className={avatar.counterClass}>
                  <div
                    className={`${avatar.borderRadius} ${avatar.glowClass} ${avatar.borderClass} overflow-hidden`}
                    style={{
                      width: `${avatar.size}px`,
                      height: `${avatar.size}px`,
                    }}
                  >
                    <img
                      src={avatar.url}
                      alt="Specialist avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Orbit 3: 649px diameter, CW 50s */}
        <div
          className="orbit-ring orbit-3-spin"
          style={{ width: '649px', height: '649px' }}
        >
          <div className="orbit-ring-border" />
          {AVATARS.filter((a) => a.orbitIndex === 3).map((avatar) => (
            <div
              key={avatar.id}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `rotate(${avatar.angle}deg) translate(${avatar.radius}px) rotate(-${avatar.angle}deg)`,
              }}
            >
              <div
                className="avatar-entrance"
                style={{ animationDelay: `${avatar.delay}s` }}
              >
                <div className={avatar.counterClass}>
                  <div
                    className={`${avatar.borderRadius} ${avatar.glowClass} ${avatar.borderClass} overflow-hidden`}
                    style={{
                      width: `${avatar.size}px`,
                      height: `${avatar.size}px`,
                    }}
                  >
                    <img
                      src={avatar.url}
                      alt="Specialist avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Orbit 2: 501px diameter, CW 40s */}
        <div
          className="orbit-ring orbit-2-spin"
          style={{ width: '501px', height: '501px' }}
        >
          <div className="orbit-ring-border" />
          {AVATARS.filter((a) => a.orbitIndex === 2).map((avatar) => (
            <div
              key={avatar.id}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `rotate(${avatar.angle}deg) translate(${avatar.radius}px) rotate(-${avatar.angle}deg)`,
              }}
            >
              <div
                className="avatar-entrance"
                style={{ animationDelay: `${avatar.delay}s` }}
              >
                <div className={avatar.counterClass}>
                  <div
                    className={`${avatar.borderRadius} ${avatar.glowClass} ${avatar.borderClass} overflow-hidden`}
                    style={{
                      width: `${avatar.size}px`,
                      height: `${avatar.size}px`,
                    }}
                  >
                    <img
                      src={avatar.url}
                      alt="Specialist avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Orbit 1: 353px diameter, CCW 30s */}
        <div
          className="orbit-ring orbit-1-spin"
          style={{ width: '353px', height: '353px' }}
        >
          <div className="orbit-ring-border" />
          {AVATARS.filter((a) => a.orbitIndex === 1).map((avatar) => (
            <div
              key={avatar.id}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `rotate(${avatar.angle}deg) translate(${avatar.radius}px) rotate(-${avatar.angle}deg)`,
              }}
            >
              <div
                className="avatar-entrance"
                style={{ animationDelay: `${avatar.delay}s` }}
              >
                <div className={avatar.counterClass}>
                  <div
                    className={`${avatar.borderRadius} ${avatar.glowClass} ${avatar.borderClass} overflow-hidden`}
                    style={{
                      width: `${avatar.size}px`,
                      height: `${avatar.size}px`,
                    }}
                  >
                    <img
                      src={avatar.url}
                      alt="Specialist avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center Static Badge (Fixed upright in center) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center z-10 pointer-events-auto select-none">
          <span
            className="font-['Urbanist'] font-medium text-[58px] sm:text-[64px] leading-tight text-white tracking-tight"
            style={{ fontFamily: "'Urbanist', sans-serif" }}
          >
            {count}k+
          </span>
          <span
            className="font-['Urbanist'] font-semibold text-[15px] sm:text-[16px] text-white uppercase tracking-widest opacity-60 mt-1"
            style={{ fontFamily: "'Urbanist', sans-serif" }}
          >
            Specialists
          </span>
        </div>

      </div>
    </div>
  );
};
