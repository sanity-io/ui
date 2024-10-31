import {FONT_CODE_SIZE, FONT_HEADING_SIZE, FONT_LABEL_SIZE, FONT_TEXT_SIZE} from '@sanity/ui/theme'

import {responsiveRules} from '../../responsiveRules'
import {Rules} from '../../types'
import {vars} from '../../vars'

export const skeletonRules: Rules = {
  'skeleton': {
    '--color-skeleton-from': `color-mix(in srgb, transparent, ${vars.color.muted.fg} 5%)`,
    '--color-skeleton-to': `color-mix(in srgb, transparent, ${vars.color.muted.fg} 10%)`,

    'backgroundColor': vars.color.skeleton.from,
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
        backgroundImage: [
          `linear-gradient(to right`,
          vars.color.skeleton.from,
          vars.color.skeleton.to,
          vars.color.skeleton.from,
          vars.color.skeleton.from,
          vars.color.skeleton.from,
          `)`,
        ].join(', '),
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
        backgroundColor: vars.color.skeleton.from,
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
        '--font-skeleton-line-height': vars.font.code.sizes[size].lineHeight,
        '--font-skeleton-ascender-height': vars.font.code.sizes[size].ascenderHeight,
        '--font-skeleton-descender-height': vars.font.code.sizes[size].descenderHeight,
      }),
    }
  }, {}),

  ...FONT_HEADING_SIZE.reduce((acc, size) => {
    return {
      ...acc,
      ...responsiveRules(`heading-skeleton-${size}`, {
        '--font-skeleton-line-height': vars.font.heading.sizes[size].lineHeight,
        '--font-skeleton-ascender-height': vars.font.heading.sizes[size].ascenderHeight,
        '--font-skeleton-descender-height': vars.font.heading.sizes[size].descenderHeight,
      }),
    }
  }, {}),

  ...FONT_LABEL_SIZE.reduce((acc, size) => {
    return {
      ...acc,
      ...responsiveRules(`label-skeleton-${size}`, {
        '--font-skeleton-line-height': vars.font.label.sizes[size].lineHeight,
        '--font-skeleton-ascender-height': vars.font.label.sizes[size].ascenderHeight,
        '--font-skeleton-descender-height': vars.font.label.sizes[size].descenderHeight,
      }),
    }
  }, {}),

  ...FONT_TEXT_SIZE.reduce((acc, size) => {
    return {
      ...acc,
      ...responsiveRules(`text-skeleton-${size}`, {
        '--font-skeleton-line-height': vars.font.text.sizes[size].lineHeight,
        '--font-skeleton-ascender-height': vars.font.text.sizes[size].ascenderHeight,
        '--font-skeleton-descender-height': vars.font.text.sizes[size].descenderHeight,
      }),
    }
  }, {}),
}
