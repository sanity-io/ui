import {keyframes, style} from '@vanilla-extract/css'

const shimmer = keyframes({
  from: {transform: 'translateX(-100%)'},
  to: {transform: 'translateX(100%)'},
})

export const skeleton = style({
  'transition': 'opacity 200ms ease-in',
  '@media': {
    'screen and (prefers-reduced-motion: reduce)': {
      backgroundColor: 'var(--card-skeleton-color-from)',
    },
  },
})

export const skeletonVisible = style({
  opacity: 1,
})

export const skeletonHidden = style({
  opacity: 0,
})

export const skeletonAnimated = style({
  '@media': {
    'screen and (prefers-reduced-motion: no-preference)': {
      backgroundColor: 'var(--card-skeleton-color-from)',
      contain: 'paint',
      WebkitMaskImage: 'linear-gradient(#fff, #fff)',
      maskImage: 'linear-gradient(#fff, #fff)',
      selectors: {
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(
            to right,
            transparent,
            var(--card-skeleton-color-to),
            transparent
          )`,
          pointerEvents: 'none',
          willChange: 'transform',
          animationName: shimmer,
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
          animationDuration: '2000ms',
        },
      },
    },
  },
})

export const skeletonStatic = style({
  '@media': {
    'screen and (prefers-reduced-motion: no-preference)': {
      backgroundColor: 'var(--card-skeleton-color-from)',
    },
  },
})
