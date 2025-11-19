'use client';

import Image from 'next/image';

/**
 * BackgroundImage Component
 * 
 * Client component for background image with error handling.
 * Falls back to CSS gradient if image fails to load.
 */
export function BackgroundImage() {
  return (
    <>
      {/* Fallback CSS gradient - shows immediately */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-60" />
      {/* Background Image */}
      <div className="absolute inset-0 opacity-60">
        <Image
          src="/images/BG.webp"
          alt=""
          fill
          className="object-cover"
          priority={false}
          quality={75}
          sizes="100vw"
          onError={(e) => {
            // Hide image on error, fallback to CSS gradient
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
    </>
  );
}

