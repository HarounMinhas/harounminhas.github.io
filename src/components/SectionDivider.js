import React from 'react';

/**
 * Decorative section divider using an inline SVG wave.
 *
 * The divider color is controlled via CSS by passing a color value (e.g. var(--surface)).
 * The SVG uses `currentColor`, so no hardcoded fill colors are required.
 */
const SectionDivider = ({ position = 'bottom', color = 'var(--surface)' }) => {
  const isTop = position === 'top';

  return (
    <div
      className={`section-divider ${isTop ? 'section-divider--top' : 'section-divider--bottom'}`}
      aria-hidden="true"
      style={{ color }}
    >
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" focusable="false">
        <path
          fill="currentColor"
          d="M0,40L80,53.3C160,67,320,93,480,98.7C640,104,800,88,960,77.3C1120,67,1280,61,1360,58.7L1440,56L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
        />
      </svg>
    </div>
  );
};

export default SectionDivider;
