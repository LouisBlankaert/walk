"use client"

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let start = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / 15; // Diviser par 20 pour une durée de ~2 secondes

      setProgress(Math.min(100, progress));

      if (progress < 100) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setTimeout(() => setIsVisible(false), 500);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-white z-50 transition-opacity duration-500 ${progress === 100 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="h-full flex flex-col items-center justify-center">
        <div className="relative">
          {/* Cercle de progression */}
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              className="text-gray-200"
              strokeWidth="1"
              stroke="currentColor"
              fill="transparent"
              r="60"
              cx="64"
              cy="64"
            />
            <circle
              className="text-black"
              strokeWidth="1"
              stroke="currentColor"
              fill="transparent"
              r="60"
              cx="64"
              cy="64"
              strokeDasharray={`${2 * Math.PI * 60}`}
              strokeDashoffset={`${2 * Math.PI * 60 * (1 - progress / 100)}`}
            />
          </svg>

          {/* Logo ou texte */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-light">
            WALK
          </div>
        </div>
      </div>
    </div>
  );
}
