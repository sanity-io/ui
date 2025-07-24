import {FONT_CODE_SIZE, type FontCodeSize} from '@sanity/ui/theme'
import {globalStyle} from '@vanilla-extract/css'

import {_fromEntries} from '../../_fromEntries'
import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars.css'

export const root: string = _style(layers.primitives, {
  vars: {
    [vars.font.family]: vars.font.code.family,
    [vars.font.featureSettings]: vars.font.code.featureSettings,

    [vars.font.weight.regular]: vars.font.code.weight.regular,
    [vars.font.weight.medium]: vars.font.code.weight.medium,
    [vars.font.weight.semibold]: vars.font.code.weight.semibold,
    [vars.font.weight.bold]: vars.font.code.weight.bold,
  },

  color: vars.color.code.fg,
})

globalStyle(`${root} a`, {
  '@layer': {
    [layers.primitives]: {
      color: vars.color.link.fg,
      textDecoration: 'none',
    },
  },
})

globalStyle(`${root} a:hover`, {
  '@layer': {
    [layers.primitives]: {
      color: vars.color.fg,
    },
  },
})

globalStyle(`${root} svg`, {
  '@layer': {
    [layers.primitives]: {
      color: vars.color.muted.fg,
    },
  },
})

globalStyle(`${root} code`, {
  '@layer': {
    [layers.primitives]: {
      fontFamily: 'inherit',
    },
  },
})

// globalStyle(`${root} .token`, {
//   '@layer': {
//     [layers.primitives]: {},
//   },
// })
globalStyle(`${root} .token.atrule`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.atrule},
  },
})
globalStyle(`${root} .token.attr-name`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.attrName},
  },
})
globalStyle(`${root} .token.attr-value`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.attrValue},
  },
})
globalStyle(`${root} .token.attribute`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.attribute},
  },
})
globalStyle(`${root} .token.boolean`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.boolean},
  },
})
globalStyle(`${root} .token.builtin`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.builtin},
  },
})
globalStyle(`${root} .token.cdata`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.cdata},
  },
})
globalStyle(`${root} .token.char`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.char},
  },
})
globalStyle(`${root} .token.class`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.class},
  },
})
globalStyle(`${root} .token.class-name`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.className},
  },
})
globalStyle(`${root} .token.comment`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.comment},
  },
})
globalStyle(`${root} .token.constant`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.constant},
  },
})
globalStyle(`${root} .token.deleted`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.deleted},
  },
})
globalStyle(`${root} .token.doctype`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.doctype},
  },
})
globalStyle(`${root} .token.entity`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.entity},
  },
})
globalStyle(`${root} .token.function`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.function},
  },
})
globalStyle(`${root} .token.hexcode`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.hexcode},
  },
})
globalStyle(`${root} .token.id`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.id},
  },
})
globalStyle(`${root} .token.important`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.important},
  },
})
globalStyle(`${root} .token.inserted`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.inserted},
  },
})
globalStyle(`${root} .token.keyword`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.keyword},
  },
})
globalStyle(`${root} .token.number`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.number},
  },
})
globalStyle(`${root} .token.operator`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.operator},
  },
})
globalStyle(`${root} .token.prolog`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.prolog},
  },
})
globalStyle(`${root} .token.property`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.property},
  },
})
globalStyle(`${root} .token.pseudo-class`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.pseudoClass},
  },
})
globalStyle(`${root} .token.pseudo-element`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.pseudoElement},
  },
})
globalStyle(`${root} .token.punctuation`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.punctuation},
  },
})

globalStyle(`${root} .token.attr-value:not(.attr-equals).punctuation`, {
  '@layer': {
    [layers.primitives]: {color: 'inherit'},
  },
})

globalStyle(`${root} .token.regex`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.regex},
  },
})
globalStyle(`${root} .token.selector`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.selector},
  },
})
globalStyle(`${root} .token.string`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.string},
  },
})
globalStyle(`${root} .token.symbol`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.symbol},
  },
})
globalStyle(`${root} .token.tag`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.tag},
  },
})
globalStyle(`${root} .token.unit`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.unit},
  },
})
globalStyle(`${root} .token.url`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.url},
  },
})
globalStyle(`${root} .token.variable`, {
  '@layer': {
    [layers.primitives]: {color: vars.color.code.token.variable},
  },
})

export const scale: ResponsiveRuleOptions<FontCodeSize> = {
  ..._fromEntries(
    FONT_CODE_SIZE.map((s) => {
      const v = vars.font.code.scale[s]

      return [
        s,
        _responsiveStyle(layers.primitives, {
          vars: {
            [vars.font.fontSize]: v.fontSize,
            [vars.font.lineHeight]: v.lineHeight,
            [vars.font.letterSpacing]: v.letterSpacing,
            [vars.font.iconSize]: v.iconSize,
            [vars.font.ascenderHeight]: v.ascenderHeight,
            [vars.font.descenderHeight]: v.descenderHeight,
            [vars.font.customIconSize]: v.customIconSize,
          },
        }),
      ]
    }),
  ),
}
