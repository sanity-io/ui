import {
  FONT_CODE_SIZE,
  FONT_HEADING_SIZE,
  FONT_LABEL_SIZE,
  FONT_TEXT_SIZE,
  type FontCodeSize,
  type FontHeadingSize,
  type FontLabelSize,
  type FontTextSize,
} from '@sanity/ui/theme'
import {keyframes} from '@vanilla-extract/css'

import {_fromEntries} from '../../_fromEntries'
import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars.css'

const pulse = keyframes({
  '0%': {
    backgroundPosition: '100%',
  },
  '100%': {
    backgroundPosition: '-100%',
  },
})

export const root: string = _style(layers.components, {
  'backgroundColor': vars.color.skeleton.from,
  'backgroundPosition': '100%',
  'backgroundSize': '200% 100%',
  'backgroundAttachment': 'fixed',
  'opacity': 0,
  'transition': 'opacity 200ms ease-in',

  'selectors': {
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
      animationName: pulse,
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
})

export const font: string = _style(layers.components, {
  height: `calc(${vars.font.skeleton.lineHeight} - ${vars.font.skeleton.ascenderHeight} - ${vars.font.skeleton.descenderHeight})`,
})

export const codeScale: ResponsiveRuleOptions<FontCodeSize> = {
  ..._fromEntries(
    FONT_CODE_SIZE.map((s) => [
      s,
      _responsiveStyle(layers.components, {
        vars: {
          [vars.font.skeleton.lineHeight]: vars.font.code.scale[s].lineHeight,
          [vars.font.skeleton.ascenderHeight]: vars.font.code.scale[s].ascenderHeight,
          [vars.font.skeleton.descenderHeight]: vars.font.code.scale[s].descenderHeight,
        },
      }),
    ]),
  ),
}

export const headingScale: ResponsiveRuleOptions<FontHeadingSize> = {
  ..._fromEntries(
    FONT_HEADING_SIZE.map((s) => [
      s,
      _responsiveStyle(layers.components, {
        vars: {
          [vars.font.skeleton.lineHeight]: vars.font.heading.scale[s].lineHeight,
          [vars.font.skeleton.ascenderHeight]: vars.font.heading.scale[s].ascenderHeight,
          [vars.font.skeleton.descenderHeight]: vars.font.heading.scale[s].descenderHeight,
        },
      }),
    ]),
  ),
}

export const labelScale: ResponsiveRuleOptions<FontLabelSize> = {
  ..._fromEntries(
    FONT_LABEL_SIZE.map((s) => [
      s,
      _responsiveStyle(layers.components, {
        vars: {
          [vars.font.skeleton.lineHeight]: vars.font.label.scale[s].lineHeight,
          [vars.font.skeleton.ascenderHeight]: vars.font.label.scale[s].ascenderHeight,
          [vars.font.skeleton.descenderHeight]: vars.font.label.scale[s].descenderHeight,
        },
      }),
    ]),
  ),
}

export const textScale: ResponsiveRuleOptions<FontTextSize> = {
  ..._fromEntries(
    FONT_TEXT_SIZE.map((s) => [
      s,
      _responsiveStyle(layers.components, {
        vars: {
          [vars.font.skeleton.lineHeight]: vars.font.text.scale[s].lineHeight,
          [vars.font.skeleton.ascenderHeight]: vars.font.text.scale[s].ascenderHeight,
          [vars.font.skeleton.descenderHeight]: vars.font.text.scale[s].descenderHeight,
        },
      }),
    ]),
  ),
}
