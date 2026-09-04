import {keyframes, style} from '@vanilla-extract/css'

const shimmer = keyframes({
  '0%': {backgroundPosition: '100%'},
  '100%': {backgroundPosition: '-100%'},
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
      backgroundImage: `linear-gradient(
        to right,
        var(--card-skeleton-color-from),
        var(--card-skeleton-color-to),
        var(--card-skeleton-color-from),
        var(--card-skeleton-color-from),
        var(--card-skeleton-color-from)
      )`,
      backgroundPosition: '100%',
      backgroundSize: '200% 100%',
      backgroundAttachment: 'fixed',
      animationName: shimmer,
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
      animationDuration: '2000ms',
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
