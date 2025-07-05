'use client';

import Lenis from 'lenis';

let lenis: Lenis | null = null;

if (typeof window !== 'undefined') {
  lenis = new Lenis();

  function raf(time: number) {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

export default lenis;
