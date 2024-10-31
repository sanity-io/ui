import {
  FONT_CODE_SIZE,
  FONT_HEADING_SIZE,
  FONT_LABEL_SIZE,
  FONT_TEXT_SIZE,
  HUES,
  renderColor,
  RenderColorContext,
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_STATE_TONES,
  type Theme_v3,
  ThemeColorCardToneKey,
  ThemeColorSchemeKey,
} from '@sanity/ui/theme'

import {_compileStyle} from './_compileStyle'
import {Properties} from './types'
import {px, rem, toBoxShadow} from './util'
import {varNames} from './varNames'

const THEME_COLOR_SCHEMES = ['dark', 'light'] as const
const THEME_COLOR_VARIANTS = ['tinted', 'solid'] as const

/** @internal */
export function _compileTheme_v3(theme: Theme_v3): string {
  return _compileStyle({
    layers: {
      theme: {
        ':root': compileThemeProperties(theme),
      },
    },
  })
}

function compileThemeProperties(theme: Theme_v3): Properties {
  return {
    ...buildAvatarThemeProperties(theme),
    ...buildButtonThemeProperties(theme),

    // card
    [varNames.card.shadow.outline]: px(theme.card.shadow.outline),

    ...buildColorThemeProperties(theme),
    ...buildContainerThemeProperties(theme),
    ...buildFontCodeThemeProperties(theme),
    ...buildFontHeadingThemeProperties(theme),
    ...buildFontLabelThemeProperties(theme),
    ...buildFontTextThemeProperties(theme),
    ...buildInputThemeProperties(theme),
    ...buildRadiusThemeProperties(theme),
    ...buildShadowThemeProperties(theme),
    ...buildSpaceThemeProperties(theme),
  }
}

function buildAvatarThemeProperties(theme: Theme_v3): Properties {
  return {
    [varNames.avatar.focusRing.offset]: px(theme.avatar.focusRing.offset),
    [varNames.avatar.focusRing.width]: px(theme.avatar.focusRing.width),

    [varNames.avatar.sizes[0].distance]: rem(theme.avatar.sizes[0].distance),
    [varNames.avatar.sizes[0].size]: rem(theme.avatar.sizes[0].size),

    [varNames.avatar.sizes[1].distance]: rem(theme.avatar.sizes[1].distance),
    [varNames.avatar.sizes[1].size]: rem(theme.avatar.sizes[1].size),

    [varNames.avatar.sizes[2].distance]: rem(theme.avatar.sizes[2].distance),
    [varNames.avatar.sizes[2].size]: rem(theme.avatar.sizes[2].size),

    [varNames.avatar.sizes[3].distance]: rem(theme.avatar.sizes[3].distance),
    [varNames.avatar.sizes[3].size]: rem(theme.avatar.sizes[3].size),
  }
}

function buildButtonThemeProperties(theme: Theme_v3): Properties {
  return {
    [varNames.button.border.width]: px(theme.button.border.width),
    [varNames.button.focusRing.offset]: px(theme.button.focusRing.offset),
    [varNames.button.focusRing.width]: px(theme.button.focusRing.width),
  }
}

function buildContainerThemeProperties(theme: Theme_v3): Properties {
  return {
    [varNames.container[0]]: rem(theme.container[0]),
    [varNames.container[1]]: rem(theme.container[1]),
    [varNames.container[2]]: rem(theme.container[2]),
    [varNames.container[3]]: rem(theme.container[3]),
    [varNames.container[4]]: rem(theme.container[4]),
    [varNames.container[5]]: rem(theme.container[5]),
  }
}

function buildFontCodeThemeProperties(theme: Theme_v3): Properties {
  const v = varNames.font.code
  const t = theme.font.code

  const props: Properties = {
    [v.family]: t.family,
    [v.featureSettings]: t.featureSettings || 'normal',
    [v.weights.regular]: t.weights.regular,
    [v.weights.medium]: t.weights.medium,
    [v.weights.semibold]: t.weights.semibold,
    [v.weights.bold]: t.weights.bold,
  }

  for (const size of FONT_CODE_SIZE) {
    const _v = varNames.font.code.sizes[size]
    const _t = theme.font.code.sizes[size]

    props[_v.fontSize] = rem(_t.fontSize)
    props[_v.lineHeight] = rem(_t.lineHeight)
    props[_v.ascenderHeight] = rem(_t.ascenderHeight)
    props[_v.descenderHeight] = rem(_t.descenderHeight)
    props[_v.letterSpacing] = rem(_t.letterSpacing)
    props[_v.iconSize] = rem(_t.iconSize)
  }

  return props
}

function buildFontHeadingThemeProperties(theme: Theme_v3): Properties {
  const v = varNames.font.heading
  const t = theme.font.heading

  const props: Properties = {
    [v.family]: t.family,
    [v.featureSettings]: t.featureSettings,
    [v.weights.regular]: t.weights.regular,
    [v.weights.medium]: t.weights.medium,
    [v.weights.semibold]: t.weights.semibold,
    [v.weights.bold]: t.weights.bold,
  }

  for (const size of FONT_HEADING_SIZE) {
    const _v = v.sizes[size]
    const _t = t.sizes[size]

    props[_v.fontSize] = rem(_t.fontSize)
    props[_v.lineHeight] = rem(_t.lineHeight)
    props[_v.ascenderHeight] = rem(_t.ascenderHeight)
    props[_v.descenderHeight] = rem(_t.descenderHeight)
    props[_v.letterSpacing] = rem(_t.letterSpacing)
    props[_v.iconSize] = rem(_t.iconSize)
  }

  return props
}

function buildFontLabelThemeProperties(theme: Theme_v3): Properties {
  const v = varNames.font.label
  const t = theme.font.label

  const props: Properties = {
    [v.family]: t.family,
    [v.featureSettings]: t.featureSettings,
    [v.weights.regular]: t.weights.regular,
    [v.weights.medium]: t.weights.medium,
    [v.weights.semibold]: t.weights.semibold,
    [v.weights.bold]: t.weights.bold,
  }

  for (const size of FONT_LABEL_SIZE) {
    const _v = v.sizes[size]
    const _t = t.sizes[size]

    props[_v.fontSize] = rem(_t.fontSize)
    props[_v.lineHeight] = rem(_t.lineHeight)
    props[_v.ascenderHeight] = rem(_t.ascenderHeight)
    props[_v.descenderHeight] = rem(_t.descenderHeight)
    props[_v.letterSpacing] = rem(_t.letterSpacing)
    props[_v.iconSize] = rem(_t.iconSize)
  }

  return props
}

function buildFontTextThemeProperties(theme: Theme_v3): Properties {
  const v = varNames.font.text
  const t = theme.font.text

  const props: Properties = {
    [v.family]: t.family,
    [v.featureSettings]: t.featureSettings,
    [v.weights.regular]: t.weights.regular,
    [v.weights.medium]: t.weights.medium,
    [v.weights.semibold]: t.weights.semibold,
    [v.weights.bold]: t.weights.bold,
  }

  for (const size of FONT_TEXT_SIZE) {
    const _v = v.sizes[size]
    const _t = t.sizes[size]

    props[_v.fontSize] = rem(_t.fontSize)
    props[_v.lineHeight] = rem(_t.lineHeight)
    props[_v.ascenderHeight] = rem(_t.ascenderHeight)
    props[_v.descenderHeight] = rem(_t.descenderHeight)
    props[_v.letterSpacing] = rem(_t.letterSpacing)
    props[_v.iconSize] = rem(_t.iconSize)
  }

  return props
}

function buildInputThemeProperties(theme: Theme_v3): Properties {
  return {
    [varNames.input.border.width]: px(theme.input.border.width),
    [varNames.input.checkbox.focusRing.offset]: px(theme.input.checkbox.focusRing.offset),
    [varNames.input.checkbox.focusRing.width]: px(theme.input.checkbox.focusRing.width),
    [varNames.input.checkbox.size]: rem(theme.input.checkbox.size),
    [varNames.input.radio.focusRing.offset]: px(theme.input.radio.focusRing.offset),
    [varNames.input.radio.focusRing.width]: px(theme.input.radio.focusRing.width),
    [varNames.input.radio.markSize]: rem(theme.input.radio.markSize),
    [varNames.input.radio.size]: rem(theme.input.radio.size),
    [varNames.input.select.focusRing.offset]: px(theme.input.select.focusRing.offset),
    [varNames.input.select.focusRing.width]: px(theme.input.select.focusRing.width),
    [varNames.input.switch.focusRing.offset]: px(theme.input.switch.focusRing.offset),
    [varNames.input.switch.focusRing.width]: px(theme.input.switch.focusRing.width),
    [varNames.input.switch.height]: rem(theme.input.switch.height),
    [varNames.input.switch.padding]: rem(theme.input.switch.padding),
    [varNames.input.switch.transitionDurationMs]: `${theme.input.switch.transitionDurationMs}ms`,
    [varNames.input.switch.transitionTimingFunction]: theme.input.switch.transitionTimingFunction,
    [varNames.input.switch.width]: rem(theme.input.switch.width),
    [varNames.input.text.focusRing.offset]: px(theme.input.text.focusRing.offset),
    [varNames.input.text.focusRing.width]: px(theme.input.text.focusRing.width),
  }
}

function buildRadiusThemeProperties(theme: Theme_v3): Properties {
  return {
    [varNames.radius[0]]: px(theme.radius[0]),
    [varNames.radius[1]]: px(theme.radius[1]),
    [varNames.radius[2]]: px(theme.radius[2]),
    [varNames.radius[3]]: px(theme.radius[3]),
    [varNames.radius[4]]: px(theme.radius[4]),
    [varNames.radius[5]]: px(theme.radius[5]),
    [varNames.radius[6]]: px(theme.radius[6]),
  }
}

function buildShadowThemeProperties(theme: Theme_v3): Properties {
  return {
    [varNames.shadow[0].umbra]: toBoxShadow(theme.shadow[0]?.umbra),
    [varNames.shadow[0].penumbra]: toBoxShadow(theme.shadow[0]?.penumbra),
    [varNames.shadow[0].ambient]: toBoxShadow(theme.shadow[0]?.ambient),

    [varNames.shadow[1].umbra]: toBoxShadow(theme.shadow[1]?.umbra),
    [varNames.shadow[1].penumbra]: toBoxShadow(theme.shadow[1]?.penumbra),
    [varNames.shadow[1].ambient]: toBoxShadow(theme.shadow[1]?.ambient),

    [varNames.shadow[2].umbra]: toBoxShadow(theme.shadow[2]?.umbra),
    [varNames.shadow[2].penumbra]: toBoxShadow(theme.shadow[2]?.penumbra),
    [varNames.shadow[2].ambient]: toBoxShadow(theme.shadow[2]?.ambient),

    [varNames.shadow[3].umbra]: toBoxShadow(theme.shadow[3]?.umbra),
    [varNames.shadow[3].penumbra]: toBoxShadow(theme.shadow[3]?.penumbra),
    [varNames.shadow[3].ambient]: toBoxShadow(theme.shadow[3]?.ambient),

    [varNames.shadow[4].umbra]: toBoxShadow(theme.shadow[4]?.umbra),
    [varNames.shadow[4].penumbra]: toBoxShadow(theme.shadow[4]?.penumbra),
    [varNames.shadow[4].ambient]: toBoxShadow(theme.shadow[4]?.ambient),

    [varNames.shadow[5].umbra]: toBoxShadow(theme.shadow[5]?.umbra),
    [varNames.shadow[5].penumbra]: toBoxShadow(theme.shadow[5]?.penumbra),
    [varNames.shadow[5].ambient]: toBoxShadow(theme.shadow[5]?.ambient),
  }
}

function buildSpaceThemeProperties(theme: Theme_v3): Properties {
  return {
    [varNames.space[0]]: px(theme.space[0]),
    [varNames.space[0.5]]: px(theme.space[1] / 2),
    [varNames.space[1]]: px(theme.space[1]),
    [varNames.space[2]]: px(theme.space[2]),
    [varNames.space[3]]: px(theme.space[3]),
    [varNames.space[4]]: px(theme.space[4]),
    [varNames.space[5]]: px(theme.space[5]),
    [varNames.space[6]]: px(theme.space[6]),
    [varNames.space[7]]: px(theme.space[7]),
    [varNames.space[8]]: px(theme.space[8]),
    [varNames.space[9]]: px(theme.space[9]),
  }
}

function buildColorThemeProperties(theme: Theme_v3): Properties {
  const props: Properties = {}

  for (const scheme of THEME_COLOR_SCHEMES) {
    for (const cardTone of THEME_COLOR_CARD_TONES) {
      Object.assign(props, buildColorAvatarThemeProperties(theme, {scheme, cardTone}))
      Object.assign(props, buildColorCardThemeProperties(theme, {scheme, cardTone}))

      for (const colorVariant of THEME_COLOR_VARIANTS) {
        for (const elementTone of THEME_COLOR_STATE_TONES) {
          // shorthand to variable names
          const v = varNames.color[scheme][cardTone][colorVariant][elementTone]

          // shorthand to values
          const t = theme._tokens.color[cardTone].variant[colorVariant][elementTone]

          const context: RenderColorContext = {
            bgValue: 'transparent',
            bgVar: v.bg[0],
            hue: t._hue,
            scheme,
          }

          Object.assign(props, {
            [v.bg[0]]: renderColor(t.bg[0], context),
            [v.bg[1]]: `color-mix(in srgb, var(${v.bg[0]}), var(${v.bg[4]}) 25%)`,
            [v.bg[2]]: `color-mix(in srgb, var(${v.bg[0]}), var(${v.bg[4]}) 50%)`,
            [v.bg[3]]: `color-mix(in srgb, var(${v.bg[0]}), var(${v.bg[4]}) 75%)`,
            [v.bg[4]]: renderColor(t.bg[4], context),

            [v.border[0]]: renderColor(t.border[0], context),
            [v.border[1]]: `color-mix(in srgb, var(${v.border[0]}), var(${v.border[4]}) 25%)`,
            [v.border[2]]: `color-mix(in srgb, var(${v.border[0]}), var(${v.border[4]}) 50%)`,
            [v.border[3]]: `color-mix(in srgb, var(${v.border[0]}), var(${v.border[4]}) 75%)`,
            [v.border[4]]: renderColor(t.border[4], context),

            [v.fg[0]]: renderColor(t.fg[0], context),
            [v.fg[1]]: `color-mix(in srgb, var(${v.fg[0]}), var(${v.fg[4]}) 25%)`,
            [v.fg[2]]: `color-mix(in srgb, var(${v.fg[0]}), var(${v.fg[4]}) 50%)`,
            [v.fg[3]]: `color-mix(in srgb, var(${v.fg[0]}), var(${v.fg[4]}) 75%)`,
            [v.fg[4]]: renderColor(t.fg[4], context),
          } satisfies Properties)
        }
      }
    }
  }

  return props as Properties
}

function buildColorAvatarThemeProperties(
  theme: Theme_v3,
  options: {scheme: ThemeColorSchemeKey; cardTone: ThemeColorCardToneKey},
): Properties {
  const {scheme, cardTone} = options

  const v = varNames.color[scheme][cardTone]
  const t = theme._tokens.color[cardTone]

  const props: Properties = {}

  for (const hue of HUES) {
    const context: RenderColorContext = {
      bgValue: 'transparent',
      bgVar: varNames.color.bg,
      hue: t.avatar[hue]._hue ?? hue,
      scheme,
    }

    Object.assign(props, {
      [v.avatar[hue].bg]: renderColor(t.avatar[hue].bg, context),
      [v.avatar[hue].fg]: renderColor(t.avatar[hue].fg, context),
    } satisfies Properties)
  }

  return props
}

function buildColorCardThemeProperties(
  theme: Theme_v3,
  options: {scheme: ThemeColorSchemeKey; cardTone: ThemeColorCardToneKey},
): Properties {
  const {scheme, cardTone} = options

  const v = varNames.color[scheme][cardTone]
  const t = theme._tokens.color[cardTone]

  const context: RenderColorContext = {
    bgValue: 'transparent',
    bgVar: varNames.color.bg,
    hue: t._hue,
    scheme,
  }

  const props: Properties = {
    // backdrop
    [v.backdrop]: renderColor(t.backdrop, context),

    // code
    [v.code.bg]: renderColor(t.code.bg, context),
    [v.code.fg]: renderColor(t.code.fg, context),

    // code / token
    [v.code.token.atrule]: renderColor(t.code.token.atrule, context),
    [v.code.token.attrName]: renderColor(t.code.token.attrName, context),
    [v.code.token.attrValue]: renderColor(t.code.token.attrValue, context),
    [v.code.token.attribute]: renderColor(t.code.token.attribute, context),
    [v.code.token.boolean]: renderColor(t.code.token.boolean, context),
    [v.code.token.builtin]: renderColor(t.code.token.builtin, context),
    [v.code.token.cdata]: renderColor(t.code.token.cdata, context),
    [v.code.token.char]: renderColor(t.code.token.char, context),
    [v.code.token.className]: renderColor(t.code.token.className, context),
    [v.code.token.class]: renderColor(t.code.token.class, context),
    [v.code.token.comment]: renderColor(t.code.token.comment, context),
    [v.code.token.constant]: renderColor(t.code.token.constant, context),
    [v.code.token.deleted]: renderColor(t.code.token.deleted, context),
    [v.code.token.doctype]: renderColor(t.code.token.doctype, context),
    [v.code.token.entity]: renderColor(t.code.token.entity, context),
    [v.code.token.function]: renderColor(t.code.token.function, context),
    [v.code.token.hexcode]: renderColor(t.code.token.hexcode, context),
    [v.code.token.id]: renderColor(t.code.token.id, context),
    [v.code.token.important]: renderColor(t.code.token.important, context),
    [v.code.token.inserted]: renderColor(t.code.token.inserted, context),
    [v.code.token.keyword]: renderColor(t.code.token.keyword, context),
    [v.code.token.number]: renderColor(t.code.token.number, context),
    [v.code.token.operator]: renderColor(t.code.token.operator, context),
    [v.code.token.prolog]: renderColor(t.code.token.prolog, context),
    [v.code.token.property]: renderColor(t.code.token.property, context),
    [v.code.token.pseudoClass]: renderColor(t.code.token.pseudoClass, context),
    [v.code.token.pseudoElement]: renderColor(t.code.token.pseudoElement, context),
    [v.code.token.punctuation]: renderColor(t.code.token.punctuation, context),
    [v.code.token.regex]: renderColor(t.code.token.regex, context),
    [v.code.token.selector]: renderColor(t.code.token.selector, context),
    [v.code.token.string]: renderColor(t.code.token.string, context),
    [v.code.token.symbol]: renderColor(t.code.token.symbol, context),
    [v.code.token.tag]: renderColor(t.code.token.tag, context),
    [v.code.token.unit]: renderColor(t.code.token.unit, context),
    [v.code.token.url]: renderColor(t.code.token.url, context),
    [v.code.token.variable]: renderColor(t.code.token.variable, context),

    // focus ring
    [v.focusRing]: renderColor(t.focusRing, context),

    // link
    [v.link.fg]: renderColor(t.link.fg, context),

    // shadow
    [v.shadow.outline]: renderColor(t.shadow.outline, context),
    [v.shadow.umbra]: renderColor(t.shadow.umbra, context),
    [v.shadow.penumbra]: renderColor(t.shadow.penumbra, context),
    [v.shadow.ambient]: renderColor(t.shadow.ambient, context),
  }

  return props
}
