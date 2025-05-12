import {FONT_CODE_SIZE, FONT_HEADING_SIZE, FONT_LABEL_SIZE, FONT_TEXT_SIZE} from '@sanity/ui/theme'

import {_responsiveRule} from '../../_responsiveRule'
import {Style, StyleKeyframes, StyleRules} from '../../types'
import {vars} from '../../vars'

const keyframes: StyleKeyframes = {
  'skeleton-pulse': {
    '0%': {
      backgroundPosition: '100%',
    },
    '100%': {
      backgroundPosition: '-100%',
    },
  },
}

const component: StyleRules = {
  '.skeleton': {
    '--color-skeleton-from': `color-mix(in srgb, transparent, ${vars.color.muted.fg} 5%)`,
    '--color-skeleton-to': `color-mix(in srgb, transparent, ${vars.color.muted.fg} 10%)`,

    'backgroundColor': vars.color.skeleton.from,
    'backgroundPosition': '100%',
    'backgroundSize': '200% 100%',
    'backgroundAttachment': 'fixed',
    'opacity': 0,
    'transition': 'opacity 200ms ease-in',

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

  '.font-skeleton': {
    height: `calc(var(--font-skeleton-line-height) - var(--font-skeleton-ascender-height) - var(--font-skeleton-descender-height))`,
  },
}

for (const size of FONT_CODE_SIZE) {
  _responsiveRule(component, `code-skeleton-${size}`, {
    '--font-skeleton-line-height': vars.font.code.sizes[size].lineHeight,
    '--font-skeleton-ascender-height': vars.font.code.sizes[size].ascenderHeight,
    '--font-skeleton-descender-height': vars.font.code.sizes[size].descenderHeight,
  })
}

for (const size of FONT_HEADING_SIZE) {
  _responsiveRule(component, `heading-skeleton-${size}`, {
    '--font-skeleton-line-height': vars.font.heading.sizes[size].lineHeight,
    '--font-skeleton-ascender-height': vars.font.heading.sizes[size].ascenderHeight,
    '--font-skeleton-descender-height': vars.font.heading.sizes[size].descenderHeight,
  })
}

for (const size of FONT_LABEL_SIZE) {
  _responsiveRule(component, `label-skeleton-${size}`, {
    '--font-skeleton-line-height': vars.font.label.sizes[size].lineHeight,
    '--font-skeleton-ascender-height': vars.font.label.sizes[size].ascenderHeight,
    '--font-skeleton-descender-height': vars.font.label.sizes[size].descenderHeight,
  })
}

for (const size of FONT_TEXT_SIZE) {
  _responsiveRule(component, `text-skeleton-${size}`, {
    '--font-skeleton-line-height': vars.font.text.sizes[size].lineHeight,
    '--font-skeleton-ascender-height': vars.font.text.sizes[size].ascenderHeight,
    '--font-skeleton-descender-height': vars.font.text.sizes[size].descenderHeight,
  })
}

export const skeletonStyle: Style = {keyframes, layers: {component}}
