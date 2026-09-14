import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export interface AnimatedContentProps extends React.PropsWithChildren {
  container?: string | HTMLElement | null;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  className?: string;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  container,
  distance = 60,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  className = '',
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      visibility: 'visible',
    });

    const tl = gsap.timeline({ paused: true, delay });

    tl.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease,
    });

    // IntersectionObserver (rather than a scroll-position-based trigger) so
    // content that's already on screen at mount time — e.g. the browser
    // restored scroll position on reload, or the user landed on a deep link
    // further down the page — reveals immediately instead of staying stuck
    // hidden forever waiting for a scroll event that may never come.
    const marginBottomPct = Math.max(0, Math.min(100, threshold * 100));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tl.play();
          observer.disconnect();
        }
      },
      {
        root: typeof container === 'string' ? document.querySelector(container) : container ?? null,
        rootMargin: `0px 0px -${marginBottomPct}% 0px`,
        threshold: 0,
      }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      tl.kill();
    };
  }, [container, distance, direction, reverse, duration, ease, initialOpacity, animateOpacity, scale, threshold, delay]);

  return (
    <div ref={ref} className={className} style={{ visibility: 'hidden' }} {...props}>
      {children}
    </div>
  );
};

export default AnimatedContent;
