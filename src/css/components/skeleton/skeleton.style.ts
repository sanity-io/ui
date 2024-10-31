import {FONT_CODE_SIZE, FONT_HEADING_SIZE, FONT_LABEL_SIZE, FONT_TEXT_SIZE} from '@sanity/ui/theme'

import {_responsiveRule} from '../../_responsiveRule'
import {varNames, vars} from '../../theme'
import type {Style, StyleKeyframes, StyleRules} from '../../types'

// TODO: should keyframes be prefixed?
const KEYFRAMES_PULSE = 'skeleton-pulse'

const keyframes: StyleKeyframes = {
  [KEYFRAMES_PULSE]: {
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
    'backgroundColor': vars.color.skeleton.from,
    'backgroundPosition': '100%',
    'backgroundSize': '200% 100%',
    'backgroundAttachment': 'fixed',
    'opacity': 0,
    'transition': 'opacity 200ms ease-in',

    'nest': {
      '&[data-animated]': {
        backgroundImage: [
          `linear-gradient(to right,`,
          `${vars.color.skeleton.from},`,
          `${vars.color.skeleton.to},`,
          `${vars.color.skeleton.from},`,
          `${vars.color.skeleton.from},`,
          `${vars.color.skeleton.from}`,
          `)`,
        ].join(''),
        animationName: KEYFRAMES_PULSE,
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
    height: `calc(${vars.font.skeleton.lineHeight} - ${vars.font.skeleton.ascenderHeight} - ${vars.font.skeleton.descenderHeight})`,
  },
}

for (const size of FONT_CODE_SIZE) {
  _responsiveRule(component, `code-skeleton-${size}`, {
    vars: {
      [varNames.font.skeleton.lineHeight]: vars.font.code.sizes[size].lineHeight,
      [varNames.font.skeleton.ascenderHeight]: vars.font.code.sizes[size].ascenderHeight,
      [varNames.font.skeleton.descenderHeight]: vars.font.code.sizes[size].descenderHeight,
    },
  })
}

for (const size of FONT_HEADING_SIZE) {
  _responsiveRule(component, `heading-skeleton-${size}`, {
    vars: {
      [varNames.font.skeleton.lineHeight]: vars.font.heading.sizes[size].lineHeight,
      [varNames.font.skeleton.ascenderHeight]: vars.font.heading.sizes[size].ascenderHeight,
      [varNames.font.skeleton.descenderHeight]: vars.font.heading.sizes[size].descenderHeight,
    },
  })
}

for (const size of FONT_LABEL_SIZE) {
  _responsiveRule(component, `label-skeleton-${size}`, {
    vars: {
      [varNames.font.skeleton.lineHeight]: vars.font.label.sizes[size].lineHeight,
      [varNames.font.skeleton.ascenderHeight]: vars.font.label.sizes[size].ascenderHeight,
      [varNames.font.skeleton.descenderHeight]: vars.font.label.sizes[size].descenderHeight,
    },
  })
}

for (const size of FONT_TEXT_SIZE) {
  _responsiveRule(component, `text-skeleton-${size}`, {
    vars: {
      [varNames.font.skeleton.lineHeight]: vars.font.text.sizes[size].lineHeight,
      [varNames.font.skeleton.ascenderHeight]: vars.font.text.sizes[size].ascenderHeight,
      [varNames.font.skeleton.descenderHeight]: vars.font.text.sizes[size].descenderHeight,
    },
  })
}

export const skeletonStyle: Style = {keyframes, layers: {component}}
