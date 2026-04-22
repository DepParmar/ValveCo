import { useEffect, useState } from 'react';

export default function NeonFooter() {
  const [isNeonGlow, setIsNeonGlow] = useState(false);
  const [isNeonFlicker, setIsNeonFlicker] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let pulseTimeout: number | undefined;
    let glowTimeout: number | undefined;
    let flickerInterval: number | undefined;

    const runPulse = () => {
      if (!isMounted) return;

      setIsNeonGlow(true);

      const flickerCount = Math.floor(Math.random() * 3) + 2;
      let currentFlicker = 0;

      flickerInterval = window.setInterval(() => {
        if (!isMounted) return;
        setIsNeonFlicker((prev) => !prev);
        currentFlicker += 1;

        if (currentFlicker >= flickerCount) {
          if (flickerInterval !== undefined) {
            window.clearInterval(flickerInterval);
          }
          setIsNeonFlicker(false);
        }
      }, 70 + Math.random() * 80);

      glowTimeout = window.setTimeout(() => {
        if (!isMounted) return;
        setIsNeonGlow(false);
      }, 400 + Math.random() * 300);

      pulseTimeout = window.setTimeout(runPulse, 2500 + Math.random() * 1000);
    };

    runPulse();

    return () => {
      isMounted = false;
      if (pulseTimeout !== undefined) window.clearTimeout(pulseTimeout);
      if (glowTimeout !== undefined) window.clearTimeout(glowTimeout);
      if (flickerInterval !== undefined) window.clearInterval(flickerInterval);
    };
  }, []);

  return (
    <footer className="w-full bg-black px-6 py-12 text-center text-white md:py-14">
      <p
        className="mb-1 text-[clamp(1.25rem,3vw,2rem)] tracking-[0.05em]"
        style={{ fontFamily: 'Sedgwick Ave Display, cursive' }}
      >
        With love from
        <span
          id="dapNeon"
          className={`block select-none text-[clamp(3rem,10vw,5.5rem)] font-normal leading-[1.1] transition-[color,text-shadow,opacity] duration-200 ${isNeonFlicker ? 'opacity-60' : 'opacity-100'}`}
          style={{
            fontFamily: 'Sedgwick Ave Display, cursive',
            color: isNeonGlow ? '#ff1e1e' : '#5a0f14',
            textShadow: isNeonGlow
              ? '0 0 4px rgba(255, 30, 30, 0.7), 0 0 10px rgba(255, 0, 0, 0.55), 0 0 18px rgba(180, 0, 0, 0.45)'
              : 'none',
          }}
        >
          DAP Tech Sol
        </span>
      </p>
      <span className="mt-10 block text-[0.65rem] font-bold uppercase tracking-[0.3em] opacity-30">
        © 2024 Thalichamchi Industries. All rights reserved.
      </span>
    </footer>
  );
}
