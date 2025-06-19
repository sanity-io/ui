import {black, hues, white} from '@sanity/color'
import {
  _parseColorToken,
  AVATAR_COLORS,
  AVATAR_SIZE,
  buildTheme,
  CARD_TONES,
  type CardColorTokens,
  type CardTone,
  COLOR_VARIANTS,
  type ColorScheme,
  type ColorValue,
  type ColorVariant,
  CONTAINER_SCALE,
  ELEMENT_TONES,
  type ElementTone,
  FONT_CODE_SIZE,
  FONT_HEADING_SIZE,
  FONT_LABEL_SIZE,
  FONT_TEXT_SIZE,
  type Hue,
  HUES,
  RADIUS,
  SHADOW,
  SPACE,
  TINTS,
} from '@sanity/ui/theme'
import {createTheme, globalFontFace} from '@vanilla-extract/css'

import {_fromEntries} from './_fromEntries'
import {layers} from './layers.css'
import type {
  CSSCardColorTokens,
  ElementColorTokens,
  RootThemeTokens,
  SchemeColorTokens,
  VariantColorTokens,
} from './types'
import {px, toBoxShadow} from './util'
import {paletteVars, themeVars} from './vars.css'

const fontDisplay: FontDisplay = 'swap'

globalFontFace('Inter', [
  {
    src: `url('https://studio-static.sanity.io/Inter-Regular.woff2') format('woff2')`,
    fontDisplay,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  {
    src: `url('https://studio-static.sanity.io/Inter-Italic.woff2') format('woff2')`,
    fontDisplay,
    fontStyle: 'italic',
    fontWeight: '400',
  },
  {
    src: `url('https://studio-static.sanity.io/Inter-Medium.woff2') format('woff2')`,
    fontDisplay,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  {
    src: `url('https://studio-static.sanity.io/Inter-MediumItalic.woff2') format('woff2')`,
    fontDisplay,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  {
    src: `url('https://studio-static.sanity.io/Inter-SemiBold.woff2') format('woff2')`,
    fontDisplay,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  {
    src: `url('https://studio-static.sanity.io/Inter-SemiBoldItalic.woff2') format('woff2')`,
    fontDisplay,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  {
    src: `url('https://studio-static.sanity.io/Inter-Bold.woff2') format('woff2')`,
    fontDisplay,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  {
    src: `url('https://studio-static.sanity.io/Inter-BoldItalic.woff2') format('woff2')`,
    fontDisplay,
    fontStyle: 'italic',
    fontWeight: '700',
  },
])

const theme = buildTheme()

const themeValue: RootThemeTokens = {
  avatar: {
    focusRing: {
      offset: px(theme.avatar.focusRing.offset),
      width: px(theme.avatar.focusRing.width),
    },
    scale: {
      ..._fromEntries(
        AVATAR_SIZE.map((s) => [
          s,
          {
            distance: px(theme.avatar.sizes[s].distance),
            size: px(theme.avatar.sizes[s].size),
          },
        ]),
      ),
    },
  },
  button: {
    border: {
      width: px(theme.button.border.width),
    },
    focusRing: {
      offset: px(theme.button.focusRing.offset),
      width: px(theme.button.focusRing.width),
    },
  },
  card: {
    shadow: {
      outline: px(theme.card.shadow.outline),
    },
  },
  container: {
    ..._fromEntries(CONTAINER_SCALE.map((s) => [s, rem(theme.container[s])])),
  },
  color: {
    palette: {
      black: black.hex,
      white: white.hex,
      ..._fromEntries(
        HUES.map((h) => [h, {..._fromEntries(TINTS.map((t) => [t, hues[h][t].hex]))}]),
      ),
    },

    light: renderColorScheme({scheme: 'light'}),
    dark: renderColorScheme({scheme: 'dark'}),
  },
  font: {
    code: {
      family: theme.font.code.family,
      featureSettings: theme.font.code.featureSettings || 'normal',
      weight: {
        regular: theme.font.code.weight.regular.toString(),
        medium: theme.font.code.weight.medium.toString(),
        semibold: theme.font.code.weight.semibold.toString(),
        bold: theme.font.code.weight.bold.toString(),
      },
      scale: {
        ..._fromEntries(
          FONT_CODE_SIZE.map((s) => [
            s,
            {
              fontSize: rem(theme.font.code.scale[s].fontSize),
              lineHeight: rem(theme.font.code.scale[s].lineHeight),
              letterSpacing: rem(theme.font.code.scale[s].letterSpacing),
              ascenderHeight: rem(theme.font.code.scale[s].ascenderHeight),
              descenderHeight: rem(theme.font.code.scale[s].descenderHeight),
              iconSize: rem(theme.font.code.scale[s].iconSize),
              customIconSize: rem(theme.font.code.scale[s].customIconSize),
            },
          ]),
        ),
      },
    },

    heading: {
      family: theme.font.heading.family,
      featureSettings: theme.font.heading.featureSettings || 'normal',
      weight: {
        regular: theme.font.heading.weight.regular.toString(),
        medium: theme.font.heading.weight.medium.toString(),
        semibold: theme.font.heading.weight.semibold.toString(),
        bold: theme.font.heading.weight.bold.toString(),
      },
      scale: {
        ..._fromEntries(
          FONT_HEADING_SIZE.map((s) => [
            s,
            {
              fontSize: rem(theme.font.heading.scale[s].fontSize),
              lineHeight: rem(theme.font.heading.scale[s].lineHeight),
              letterSpacing: rem(theme.font.heading.scale[s].letterSpacing),
              ascenderHeight: rem(theme.font.heading.scale[s].ascenderHeight),
              descenderHeight: rem(theme.font.heading.scale[s].descenderHeight),
              iconSize: rem(theme.font.heading.scale[s].iconSize),
              customIconSize: rem(theme.font.heading.scale[s].customIconSize),
            },
          ]),
        ),
      },
    },

    label: {
      family: theme.font.label.family,
      featureSettings: theme.font.label.featureSettings || 'normal',
      weight: {
        regular: theme.font.label.weight.regular.toString(),
        medium: theme.font.label.weight.medium.toString(),
        semibold: theme.font.label.weight.semibold.toString(),
        bold: theme.font.label.weight.bold.toString(),
      },
      scale: {
        ..._fromEntries(
          FONT_LABEL_SIZE.map((s) => [
            s,
            {
              fontSize: rem(theme.font.label.scale[s].fontSize),
              lineHeight: rem(theme.font.label.scale[s].lineHeight),
              letterSpacing: rem(theme.font.label.scale[s].letterSpacing),
              ascenderHeight: rem(theme.font.label.scale[s].ascenderHeight),
              descenderHeight: rem(theme.font.label.scale[s].descenderHeight),
              iconSize: rem(theme.font.label.scale[s].iconSize),
              customIconSize: rem(theme.font.label.scale[s].customIconSize),
            },
          ]),
        ),
      },
    },

    text: {
      family: theme.font.text.family,
      featureSettings: theme.font.text.featureSettings || 'normal',
      weight: {
        regular: theme.font.text.weight.regular.toString(),
        medium: theme.font.text.weight.medium.toString(),
        semibold: theme.font.text.weight.semibold.toString(),
        bold: theme.font.text.weight.bold.toString(),
      },
      scale: {
        ..._fromEntries(
          FONT_TEXT_SIZE.map((s) => [
            s,
            {
              fontSize: rem(theme.font.text.scale[s].fontSize),
              lineHeight: rem(theme.font.text.scale[s].lineHeight),
              letterSpacing: rem(theme.font.text.scale[s].letterSpacing),
              ascenderHeight: rem(theme.font.text.scale[s].ascenderHeight),
              descenderHeight: rem(theme.font.text.scale[s].descenderHeight),
              iconSize: rem(theme.font.text.scale[s].iconSize),
              customIconSize: rem(theme.font.text.scale[s].customIconSize),
            },
          ]),
        ),
      },
    },
  },
  input: {
    border: {
      width: px(theme.input.border.width),
    },
    checkbox: {
      size: rem(theme.input.checkbox.size),
      focusRing: {
        offset: px(theme.input.checkbox.focusRing.offset),
        width: px(theme.input.checkbox.focusRing.width),
      },
    },
    radio: {
      size: rem(theme.input.radio.size),
      markSize: rem(theme.input.radio.markSize),
      focusRing: {
        offset: px(theme.input.radio.focusRing.offset),
        width: px(theme.input.radio.focusRing.width),
      },
    },
    select: {
      focusRing: {
        offset: px(theme.input.select.focusRing.offset),
        width: px(theme.input.select.focusRing.width),
      },
    },
    switch: {
      width: rem(theme.input.switch.width),
      height: rem(theme.input.switch.height),
      focusRing: {
        offset: px(theme.input.switch.focusRing.offset),
        width: px(theme.input.switch.focusRing.width),
      },
      padding: rem(theme.input.switch.padding),
      transitionDurationMs: `${theme.input.switch.transitionDurationMs}ms`,
      transitionTimingFunction: theme.input.switch.transitionTimingFunction,
    },
    text: {
      focusRing: {
        offset: px(theme.input.text.focusRing.offset),
        width: px(theme.input.text.focusRing.width),
      },
    },
  },
  radius: _fromEntries(RADIUS.map((key) => [key, `${theme.radius[key]}px`])),
  shadow: _fromEntries(
    SHADOW.map((s) => [
      s,
      {
        umbra: toBoxShadow(theme.shadow[s]?.umbra),
        penumbra: toBoxShadow(theme.shadow[s]?.penumbra),
        ambient: toBoxShadow(theme.shadow[s]?.ambient),
      },
    ]),
  ),
  space: _fromEntries(SPACE.map((key) => [key, `${theme.space[key]}px`])),
} as const

/** @public */
export const themeClassName: string = createTheme(themeVars, {
  '@layer': layers.theme,
  ...themeValue,
})

function renderColorScheme(options: {scheme: ColorScheme}): SchemeColorTokens {
  const {scheme} = options

  const defaultCardColor = renderCardColor({
    tone: 'default',
    scheme,
  })

  return {
    ..._fromEntries(
      CARD_TONES.map((key) => {
        if (key === 'default') {
          return [key, defaultCardColor]
        }

        return [
          key,
          renderCardColor({
            bgValue: defaultCardColor.tinted.default.bg[0],
            tone: key,
            scheme,
          }),
        ]
      }),
    ),
  }
}

function renderCardColor(options: {
  bgValue?: string
  tone: CardTone
  scheme: 'light' | 'dark'
}): CSSCardColorTokens {
  const {bgValue, tone: t, scheme} = options

  const tokens = theme.color[t]

  const tintedDefaultVariant = renderColorElement(tokens, {
    bgValue,
    variant: 'tinted',
    scheme,
    tone: 'default',
  })

  const colorOptions = {
    bgValue: tintedDefaultVariant.bg[0],
    defaultHue: tokens._hue ?? 'gray',
    scheme,
  } as const

  return {
    avatar: {
      ..._fromEntries(
        AVATAR_COLORS.map((c) => [
          c,
          {
            bg: renderColor(tokens.avatar[c].bg, {...colorOptions, defaultHue: c}),
            fg: renderColor(tokens.avatar[c].fg, {...colorOptions, defaultHue: c}),
          },
        ]),
      ),
    },
    backdrop: renderColor(tokens.backdrop, colorOptions),
    code: {
      bg: renderColor(tokens.code.bg, colorOptions),
      fg: renderColor(tokens.code.fg, colorOptions),

      token: {
        atrule: renderColor(tokens.code.token.atrule, colorOptions),
        attrName: renderColor(tokens.code.token.attrName, colorOptions),
        attrValue: renderColor(tokens.code.token.attrValue, colorOptions),
        attribute: renderColor(tokens.code.token.attribute, colorOptions),
        boolean: renderColor(tokens.code.token.boolean, colorOptions),
        builtin: renderColor(tokens.code.token.builtin, colorOptions),
        cdata: renderColor(tokens.code.token.cdata, colorOptions),
        char: renderColor(tokens.code.token.char, colorOptions),
        class: renderColor(tokens.code.token.class, colorOptions),
        className: renderColor(tokens.code.token.className, colorOptions),
        comment: renderColor(tokens.code.token.comment, colorOptions),
        constant: renderColor(tokens.code.token.constant, colorOptions),
        deleted: renderColor(tokens.code.token.deleted, colorOptions),
        doctype: renderColor(tokens.code.token.doctype, colorOptions),
        entity: renderColor(tokens.code.token.entity, colorOptions),
        function: renderColor(tokens.code.token.function, colorOptions),
        hexcode: renderColor(tokens.code.token.hexcode, colorOptions),
        id: renderColor(tokens.code.token.id, colorOptions),
        important: renderColor(tokens.code.token.important, colorOptions),
        inserted: renderColor(tokens.code.token.inserted, colorOptions),
        keyword: renderColor(tokens.code.token.keyword, colorOptions),
        number: renderColor(tokens.code.token.number, colorOptions),
        operator: renderColor(tokens.code.token.operator, colorOptions),
        prolog: renderColor(tokens.code.token.prolog, colorOptions),
        property: renderColor(tokens.code.token.property, colorOptions),
        pseudoClass: renderColor(tokens.code.token.pseudoClass, colorOptions),
        pseudoElement: renderColor(tokens.code.token.pseudoElement, colorOptions),
        punctuation: renderColor(tokens.code.token.punctuation, colorOptions),
        regex: renderColor(tokens.code.token.regex, colorOptions),
        selector: renderColor(tokens.code.token.selector, colorOptions),
        string: renderColor(tokens.code.token.string, colorOptions),
        symbol: renderColor(tokens.code.token.symbol, colorOptions),
        tag: renderColor(tokens.code.token.tag, colorOptions),
        unit: renderColor(tokens.code.token.unit, colorOptions),
        url: renderColor(tokens.code.token.url, colorOptions),
        variable: renderColor(tokens.code.token.variable, colorOptions),
      },
    },
    focusRing: renderColor(tokens.focusRing, colorOptions),
    link: {
      fg: renderColor(tokens.link.fg, colorOptions),
    },
    shadow: {
      outline: renderColor(tokens.shadow.outline, colorOptions),
      umbra: renderColor(tokens.shadow.umbra, colorOptions),
      penumbra: renderColor(tokens.shadow.penumbra, colorOptions),
      ambient: renderColor(tokens.shadow.ambient, colorOptions),
    },
    skeleton: {
      from: renderColor(tokens.skeleton.from, colorOptions),
      to: renderColor(tokens.skeleton.to, colorOptions),
    },
    // variants
    ..._fromEntries(
      COLOR_VARIANTS.map((v) => [
        v,
        {
          ..._fromEntries(
            ELEMENT_TONES.map((t) => {
              if (v === 'tinted' && t === 'default') {
                return [t, tintedDefaultVariant]
              }

              return [t, renderColorElement(tokens, {scheme, variant: v, tone: t})]
            }),
          ),
        } satisfies VariantColorTokens,
      ]),
    ),
  }
}

function renderColorElement(
  tokens: CardColorTokens,
  options: {
    bgValue?: string
    scheme: ColorScheme
    variant: ColorVariant
    tone: ElementTone
  },
): ElementColorTokens {
  const {bgValue, scheme, variant: v, tone: t} = options

  const elementColorOptions = {bgValue, defaultHue: tokens.variant[v][t]._hue, scheme}

  return {
    bg: {
      0: renderColor(tokens.variant[v][t].bg[0], elementColorOptions),
      4: renderColor(tokens.variant[v][t].bg[4], elementColorOptions),
    },
    border: {
      0: renderColor(tokens.variant[v][t].border[0], elementColorOptions),
      4: renderColor(tokens.variant[v][t].border[4], elementColorOptions),
    },
    fg: {
      0: renderColor(tokens.variant[v][t].fg[0], elementColorOptions),
      4: renderColor(tokens.variant[v][t].fg[4], elementColorOptions),
    },
  }
}

function renderColor(
  value: ColorValue,
  context: {bgValue?: string; defaultHue: Hue; scheme: 'light' | 'dark'},
): string {
  const {bgValue = 'transparent', defaultHue, scheme} = context

  const expr = _parseColorToken(value[scheme === 'light' ? 0 : 1], {defaultHue})

  if (expr.type === 'inherit') {
    return bgValue
  }

  let v = bgValue

  if (expr.type === 'color') {
    v = paletteVars[expr.name]
  }

  if (expr.type === 'tint') {
    v = paletteVars[expr.hue][expr.tint]
  }

  if (expr.mix < 1) {
    v = `color-mix(in srgb, ${bgValue}, ${v} ${expr.mix * 100}%)`
  }

  if (expr.opacity < 1) {
    v = `color-mix(in srgb, transparent, ${v} ${expr.opacity * 100}%)`
  }

  return v
}

function rem(value: number) {
  return `${value / 16}rem`
}
