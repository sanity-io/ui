import {FONT_CODE_SIZE, FONT_HEADING_SIZE, FONT_LABEL_SIZE, FONT_TEXT_SIZE} from '@sanity/ui/theme'
import {responsiveRules} from '../../responsiveRules'
import {Rules} from '../../types'

export const skeletonRules: Rules = {
  'skeleton': {
    '--color-skeleton-from': `color-mix(in srgb, transparent, var(--color-muted-fg) 5%)`,
    '--color-skeleton-to': `color-mix(in srgb, transparent, var(--color-muted-fg) 10%)`,

    'backgroundColor': 'var(--color-skeleton-from)',
    'backgroundPosition': '100%',
    'backgroundSize': '200% 100%',
    'backgroundAttachment': 'fixed',
    'opacity': 0,
    'transition': 'opacity 200ms ease-in',

    '@keyframes': {
      'skeleton-pulse': {
        '0%': {
          backgroundPosition: '100%',
        },
        '100%': {
          backgroundPosition: '-100%',
        },
      },
    },

    '@nest': {
      '&[data-animated]': {
        backgroundImage: `linear-gradient(
          to right,
          var(--color-skeleton-from),
          var(--color-skeleton-to),
          var(--color-skeleton-from),
          var(--color-skeleton-from),
          var(--color-skeleton-from)
        )`,
        animationName: 'skeleton-pulse',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        animationDuration: '2000ms',
      },

      '&[data-visible]': {
        opacity: 1,
      },
    },

    '@media': {
      'screen and (prefers-reduced-motion: no-preference)': {
        backgroundColor: 'var(--color-skeleton-from)',
      },
    },
  },

  'font-skeleton': {
    height: `calc(var(--font-skeleton-line-height) - var(--font-skeleton-ascender-height) - var(--font-skeleton-descender-height))`,
  },

  // ...responsiveRules('text-skeleton-0', {
  //   '--font-skeleton-line-height': 'var(--font-text-0-line-height)',
  //   '--font-skeleton-ascender-height': 'var(--font-text-0-ascender-height)',
  //   '--font-skeleton-descender-height': 'var(--font-text-0-descender-height)',
  // }),

  ...FONT_CODE_SIZE.reduce((acc, size) => {
    return {
      ...acc,
      ...responsiveRules(`code-skeleton-${size}`, {
        '--font-skeleton-line-height': `var(--font-code-${size}-line-height)`,
        '--font-skeleton-ascender-height': `var(--font-code-${size}-ascender-height)`,
        '--font-skeleton-descender-height': `var(--font-code-${size}-descender-height)`,
      }),
    }
  }, {}),

  ...FONT_HEADING_SIZE.reduce((acc, size) => {
    return {
      ...acc,
      ...responsiveRules(`heading-skeleton-${size}`, {
        '--font-skeleton-line-height': `var(--font-heading-${size}-line-height)`,
        '--font-skeleton-ascender-height': `var(--font-heading-${size}-ascender-height)`,
        '--font-skeleton-descender-height': `var(--font-heading-${size}-descender-height)`,
      }),
    }
  }, {}),

  ...FONT_LABEL_SIZE.reduce((acc, size) => {
    return {
      ...acc,
      ...responsiveRules(`label-skeleton-${size}`, {
        '--font-skeleton-line-height': `var(--font-label-${size}-line-height)`,
        '--font-skeleton-ascender-height': `var(--font-label-${size}-ascender-height)`,
        '--font-skeleton-descender-height': `var(--font-label-${size}-descender-height)`,
      }),
    }
  }, {}),

  ...FONT_TEXT_SIZE.reduce((acc, size) => {
    return {
      ...acc,
      ...responsiveRules(`text-skeleton-${size}`, {
        '--font-skeleton-line-height': `var(--font-text-${size}-line-height)`,
        '--font-skeleton-ascender-height': `var(--font-text-${size}-ascender-height)`,
        '--font-skeleton-descender-height': `var(--font-text-${size}-descender-height)`,
      }),
    }
  }, {}),
}
