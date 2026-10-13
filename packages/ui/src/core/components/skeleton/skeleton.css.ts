import * as stylex from '@stylexjs/stylex'

const shimmer = stylex.keyframes({
  from: {transform: 'translateX(-100%)'},
  to: {transform: 'translateX(100%)'},
})

const styles = stylex.create({
  root: {
    '@media screen and (prefers-reduced-motion: reduce)': {
      backgroundColor: 'var(--card-skeleton-color-from)',
    },
    'transition': 'opacity 200ms ease-in',
  },
  visible: {opacity: 1},
  hidden: {opacity: 0},
  animated: {
    '@media screen and (prefers-reduced-motion: no-preference)': {
      '::after': {
        animationDuration: '2000ms',
        animationIterationCount: 'infinite',
        animationName: shimmer,
        animationTimingFunction: 'ease-in-out',
        backgroundImage:
          'linear-gradient(to right, transparent, var(--card-skeleton-color-to), transparent)',
        content: '""',
        inset: 0,
        pointerEvents: 'none',
        position: 'absolute',
        willChange: 'transform',
      },
      'WebkitMaskImage': 'linear-gradient(#fff, #fff)',
      'backgroundColor': 'var(--card-skeleton-color-from)',
      'contain': 'paint',
      'maskImage': 'linear-gradient(#fff, #fff)',
    },
  },
  static: {
    '@media screen and (prefers-reduced-motion: no-preference)': {
      backgroundColor: 'var(--card-skeleton-color-from)',
    },
  },
})

export const skeleton = stylex.props(styles.root).className ?? ''
export const skeletonVisible = stylex.props(styles.visible).className ?? ''
export const skeletonHidden = stylex.props(styles.hidden).className ?? ''
export const skeletonAnimated = stylex.props(styles.animated).className ?? ''
export const skeletonStatic = stylex.props(styles.static).className ?? ''
