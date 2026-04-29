import type {FontCodeSize, FontHeadingSize, FontLabelSize, FontTextSize} from '@sanity/ui-tokens'
import {
  FONT_CODE_SIZE,
  FONT_HEADING_SIZE,
  FONT_LABEL_SIZE,
  FONT_TEXT_SIZE,
} from '@sanity/ui-tokens/constants'

import {pulse} from '../../keyframes/skeleton.css'
import {_layers} from '../../layers.css'
import {_fromEntries} from '../../lib/_fromEntries'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import {_style} from '../../lib/css/_style.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars'

export const root: string = _style(
  _layers.primitive,
  {
    'backgroundColor': vars.color.skeleton.from,
    'backgroundPosition': '100%',
    'backgroundSize': '200% 100%',
    'backgroundAttachment': 'fixed',
    'opacity': 0,
    'transition': 'opacity 200ms ease-in',

    '@media': {
      'screen and (prefers-reduced-motion: no-preference)': {
        backgroundColor: vars.color.skeleton.from,
      },
    },

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

      // // when inside element tone
      // [`${elementToneRoot} &`]: {
      //   vars: {
      //     [vars.color.skeleton.from]:
      //       `color-mix(in srgb, transparent, ${vars.color.muted.border} 50%)`,
      //     [vars.color.skeleton.to]:
      //       `color-mix(in srgb, transparent, ${vars.color.muted.border} 25%)`,
      //   },
      // },
    },
  },
  '',
)

export const font: string = _style(
  _layers.primitive,
  {
    height: `calc(${vars.skeleton.lineHeight} - ${vars.skeleton.ascenderHeight} - ${vars.skeleton.descenderHeight})`,
  },
  'font',
)

export const codeScale: ResponsiveRuleOptions<FontCodeSize> = {
  ..._fromEntries(
    FONT_CODE_SIZE.map((s) => [
      s,
      _responsiveStyle(
        _layers.primitive,
        {
          vars: {
            [vars.skeleton.lineHeight]: vars.font.code.scale[s].lineHeight,
            [vars.skeleton.ascenderHeight]: vars.font.code.scale[s].ascenderHeight,
            [vars.skeleton.descenderHeight]: vars.font.code.scale[s].descenderHeight,
          },
        },
        `code-${s}`,
      ),
    ]),
  ),
}

export const headingScale: ResponsiveRuleOptions<FontHeadingSize> = {
  ..._fromEntries(
    FONT_HEADING_SIZE.map((s) => [
      s,
      _responsiveStyle(
        _layers.primitive,
        {
          vars: {
            [vars.skeleton.lineHeight]: vars.font.heading.scale[s].lineHeight,
            [vars.skeleton.ascenderHeight]: vars.font.heading.scale[s].ascenderHeight,
            [vars.skeleton.descenderHeight]: vars.font.heading.scale[s].descenderHeight,
          },
        },
        `heading-${s}`,
      ),
    ]),
  ),
}

export const labelScale: ResponsiveRuleOptions<FontLabelSize> = {
  ..._fromEntries(
    FONT_LABEL_SIZE.map((s) => [
      s,
      _responsiveStyle(
        _layers.primitive,
        {
          vars: {
            [vars.skeleton.lineHeight]: vars.font.label.scale[s].lineHeight,
            [vars.skeleton.ascenderHeight]: vars.font.label.scale[s].ascenderHeight,
            [vars.skeleton.descenderHeight]: vars.font.label.scale[s].descenderHeight,
          },
        },
        `label-${s}`,
      ),
    ]),
  ),
}

export const textScale: ResponsiveRuleOptions<FontTextSize> = {
  ..._fromEntries(
    FONT_TEXT_SIZE.map((s) => [
      s,
      _responsiveStyle(
        _layers.primitive,
        {
          vars: {
            [vars.skeleton.lineHeight]: vars.font.text.scale[s].lineHeight,
            [vars.skeleton.ascenderHeight]: vars.font.text.scale[s].ascenderHeight,
            [vars.skeleton.descenderHeight]: vars.font.text.scale[s].descenderHeight,
          },
        },
        `text-${s}`,
      ),
    ]),
  ),
}
