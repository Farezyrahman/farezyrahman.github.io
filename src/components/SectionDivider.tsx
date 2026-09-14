import type { CSSProperties } from 'react';
import AnimatedContent from '../blocks/Animations/AnimatedContent/AnimatedContent';

interface SectionDividerProps {
  color?: string;
}

// A thin gradient seam between sections, with a small glowing dot at the
// centre. Gives the page clear section breaks and, cycling through a wider
// palette than the single lime accent, a bit more colour throughout.
export default function SectionDivider({ color }: SectionDividerProps) {
  return (
    <div className="py-2" aria-hidden="true">
      <AnimatedContent distance={0} duration={1.2}>
        <div
          className="section-divider"
          style={color ? ({ ['--divider-color' as string]: color } as CSSProperties) : undefined}
        />
      </AnimatedContent>
    </div>
  );
}
