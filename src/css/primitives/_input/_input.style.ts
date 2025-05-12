import {FONT_TEXT_SIZE, SPACE} from '@sanity/ui/theme'

import {Style, StyleRules} from '../../types'
import {varNames} from '../../varNames'
import {vars} from '../../vars'

const primitive: StyleRules = {
  '.input': {
    position: 'relative',
  },

  '.input-b': {
    '@nest': {
      '& .input-presentation': {
        boxShadow: `inset 0 0 0 1px ${vars.color.input.border}`,
      },
    },
  },

  '.input-element': {
    '--color-input-fg': vars.color.tinted.default.fg[2],
    '--color-input-placeholder': vars.color.tinted.default.border[4],

    'WebkitFontSmoothing': 'inherit',
    'appearance': 'none',
    'border': 0,
    'outline': 'none',
    'margin': 0,
    'fontFamily': vars.font.text.family,
    'fontSize': vars.input.fontSize,
    'lineHeight': vars.input.lineHeight,
    'letterSpacing': vars.input.letterSpacing,
    'backgroundColor': 'transparent',
    'color': vars.color.input.fg,
    'padding': [
      'calc(var(--input-padding) - var(--input-ascender-height))',
      'var(--input-padding)',
      'calc(var(--input-padding) - var(--input-descender-height))',
      'var(--input-padding)',
    ].join(' '),
    'borderRadius': 'inherit',
    'position': 'relative',
    'zIndex': 1,
    'display': 'block',
    'boxSizing': 'border-box',
    'resize': 'none',
    // @ts-expect-error - TODO: fix this
    'width': ['-moz-available', '-webkit-fill-available', 'stretch'],

    '@nest': {
      '.input[data-icon-left] &': {
        paddingLeft: `calc(var(--input-padding) + calc(var(--input-line-height) - var(--input-ascender-height) - var(--input-descender-height)) + var(--input-gap))`,
      },

      '.input[data-icon-right] &': {
        paddingRight: `calc(var(--input-padding) + calc(var(--input-line-height) - var(--input-ascender-height) - var(--input-descender-height)) + var(--input-gap))`,
      },

      '&::placeholder': {
        color: vars.color.input.placeholder,
      },

      '&:hover': {
        [varNames.color.input.fg]: vars.color.tinted.default.fg[0],
      },

      '&:focus': {
        [varNames.color.input.fg]: vars.color.tinted.default.fg[0],
      },

      '&:disabled': {
        [varNames.color.input.fg]: vars.color.tinted.default.border[3],
      },
    },
  },

  '.input-presentation': {
    [varNames.color.input.fg]: vars.color.tinted.default.fg[4],
    [varNames.color.input.bg]: vars.color.tinted.default.bg[0],
    [varNames.color.input.border]: vars.color.tinted.default.border[1],

    'borderRadius': 'inherit',
    'position': 'absolute',
    'top': 0,
    'left': 0,
    'right': 0,
    'bottom': 0,
    'display': 'block',
    'pointerEvents': 'none',
    'zIndex': 0,

    '@nest': {
      '.input[data-prefix] &': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },

      '.input[data-suffix] &': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },

      '.input-element:placeholder-shown + &': {
        [varNames.color.input.fg]: vars.color.tinted.default.border[4],
      },

      '.input-element:hover + &': {
        [varNames.color.input.border]: vars.color.tinted.default.border[2],
        [varNames.color.input.fg]: vars.color.tinted.default.fg[1],

        boxShadow: `inset 0 0 0 1px ${vars.color.input.border}`,
      },

      '.input-element:focus + &': {
        [varNames.color.input.border]: vars.color.tinted.default.border[2],
        [varNames.color.input.fg]: vars.color.tinted.default.fg[1],

        boxShadow: `inset 0 0 0 1px ${vars.color.input.border}`,
        outlineWidth: vars.input.text.focusRing.width,
        outlineStyle: 'solid',
        outlineColor: vars.color.focusRing,
        outlineOffset: vars.input.text.focusRing.offset,
      },

      '.input-element:disabled + &': {
        [varNames.color.input.bg]: vars.color.tinted.default.bg[1],
        [varNames.color.input.border]: vars.color.tinted.default.border[0],

        opacity: 1,
      },
    },
  },
}

// todo: make responsive
for (const textSize of FONT_TEXT_SIZE) {
  const source = vars.font.text.sizes[textSize]

  primitive[`.input-${textSize}`] = {
    [varNames.input.fontSize]: source.fontSize,
    [varNames.input.lineHeight]: source.lineHeight,
    [varNames.input.letterSpacing]: source.letterSpacing,
    [varNames.input.ascenderHeight]: source.ascenderHeight,
    [varNames.input.descenderHeight]: source.descenderHeight,
  }
}

// todo: make responsive
for (const space of SPACE) {
  primitive[`.input-p-${space}`] = {
    [varNames.input.padding]: vars.space[space],
  }
}

// todo: make responsive
for (const space of SPACE) {
  primitive[`.input-g-${space}`] = {
    [varNames.input.gap]: vars.space[space],
  }
}

export const _inputStyle: Style = {layers: {primitive}}
