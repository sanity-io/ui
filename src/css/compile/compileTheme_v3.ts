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

import {Properties} from '../types'
import {px, rem, toBoxShadow} from '../util'
import {compileRule} from './compileRule'

export function compileTheme_v3(theme: Theme_v3): string {
  return compileRule(':root', compileThemeProperties(theme), {keyframes: {}, media: {}})
}

function compileThemeProperties(theme: Theme_v3): Properties {
  // const palette = defaultPalette

  return {
    ...buildAvatarThemeProperties(theme),
    ...buildButtonThemeProperties(theme),
    ...buildContainerThemeProperties(theme),
    ...buildFontCodeThemeProperties(theme),
    ...buildFontHeadingThemeProperties(theme),
    ...buildFontLabelThemeProperties(theme),
    ...buildFontTextThemeProperties(theme),
    ...buildInputThemeProperties(theme),
    ...buildRadiusThemeProperties(theme),
    ...buildShadowThemeProperties(theme),
    ...buildSpaceThemeProperties(theme),
    // ...buildColorPaletteProperties(palette),
    ...buildColorThemeProperties(theme),
  }
}

// function buildColorPaletteProperties(palette: Color): Properties {
//   const props: Properties = {
//     '--black': palette.black.hex,
//     '--white': palette.white.hex,
//   }

//   for (const hue of COLOR_HUES) {
//     for (const tint of COLOR_TINTS) {
//       props[`--${hue}-${tint}`] = palette[hue][tint].hex
//     }
//   }

//   return props
// }

function buildAvatarThemeProperties(theme: Theme_v3): Properties {
  return {
    [`--avatar-focus-ring-offset`]: px(theme.avatar.focusRing.offset),
    [`--avatar-focus-ring-width`]: px(theme.avatar.focusRing.width),
    [`--avatar-0-distance`]: px(theme.avatar.sizes[0].distance),
    [`--avatar-0-size`]: px(theme.avatar.sizes[0].size),
    [`--avatar-1-distance`]: px(theme.avatar.sizes[1].distance),
    [`--avatar-1-size`]: px(theme.avatar.sizes[1].size),
    [`--avatar-2-distance`]: px(theme.avatar.sizes[2].distance),
    [`--avatar-2-size`]: px(theme.avatar.sizes[2].size),
    [`--avatar-3-distance`]: px(theme.avatar.sizes[3].distance),
    [`--avatar-3-size`]: px(theme.avatar.sizes[3].size),
  }
}

function buildButtonThemeProperties(theme: Theme_v3): Properties {
  return {
    [`--button-border-width`]: px(theme.button.border.width),
    [`--button-focus-ring-offset`]: px(theme.button.focusRing.offset),
    [`--button-focus-ring-width`]: px(theme.button.focusRing.width),
    // [`--button-text-weight`]: theme.button.textWeight,
  }
}

function buildContainerThemeProperties(theme: Theme_v3): Properties {
  return {
    [`--container-0`]: px(theme.container[0]),
    [`--container-1`]: px(theme.container[1]),
    [`--container-2`]: px(theme.container[2]),
    [`--container-3`]: px(theme.container[3]),
    [`--container-4`]: px(theme.container[4]),
    [`--container-5`]: px(theme.container[5]),
  }
}

function buildFontCodeThemeProperties(theme: Theme_v3): Properties {
  const props: Properties = {
    '--font-code-family': theme.font.code.family,
    '--font-code-feature-settings': theme.font.code.featureSettings,
    '--font-code-weight-regular': `${theme.font.code.weights.regular}`,
    '--font-code-weight-medium': `${theme.font.code.weights.medium}`,
    '--font-code-weight-semibold': `${theme.font.code.weights.semibold}`,
    '--font-code-weight-bold': `${theme.font.code.weights.bold}`,
  }

  for (const size of FONT_CODE_SIZE) {
    props[`--font-code-${size}-size`] = rem(theme.font.code.sizes[size].fontSize)
    props[`--font-code-${size}-line-height`] = rem(theme.font.code.sizes[size].lineHeight)
    props[`--font-code-${size}-ascender-height`] = px(theme.font.code.sizes[size].ascenderHeight)
    props[`--font-code-${size}-descender-height`] = px(theme.font.code.sizes[size].descenderHeight)
    // props[`--font-code-${size}-cap-height`] =
    //   `calc(var(--font-code-${size}-line-height) - var(--font-code-${size}-ascender-height) - var(--font-code-${size}-descender-height))`
    props[`--font-code-${size}-letter-spacing`] = px(theme.font.code.sizes[size].letterSpacing)
    props[`--font-code-${size}-icon-size`] = px(theme.font.code.sizes[size].iconSize)
  }

  return props
}

function buildFontHeadingThemeProperties(theme: Theme_v3): Properties {
  const props: Properties = {
    '--font-heading-family': theme.font.heading.family,
    '--font-heading-feature-settings': theme.font.heading.featureSettings,
    '--font-heading-weight-regular': `${theme.font.heading.weights.regular}`,
    '--font-heading-weight-medium': `${theme.font.heading.weights.medium}`,
    '--font-heading-weight-semibold': `${theme.font.heading.weights.semibold}`,
    '--font-heading-weight-bold': `${theme.font.heading.weights.bold}`,
  }

  for (const size of FONT_HEADING_SIZE) {
    props[`--font-heading-${size}-size`] = rem(theme.font.heading.sizes[size].fontSize)
    props[`--font-heading-${size}-line-height`] = rem(theme.font.heading.sizes[size].lineHeight)
    props[`--font-heading-${size}-ascender-height`] = px(
      theme.font.heading.sizes[size].ascenderHeight,
    )
    props[`--font-heading-${size}-descender-height`] = px(
      theme.font.heading.sizes[size].descenderHeight,
    )
    props[`--font-heading-${size}-letter-spacing`] = px(
      theme.font.heading.sizes[size].letterSpacing,
    )
    // props[`--font-heading-${size}-cap-height`] =
    //   `calc(var(--font-heading-${size}-line-height) - var(--font-heading-${size}-ascender-height) - var(--font-heading-${size}-descender-height))`
    props[`--font-heading-${size}-icon-size`] = px(theme.font.heading.sizes[size].iconSize)
  }

  return props
}

function buildFontLabelThemeProperties(theme: Theme_v3): Properties {
  const props: Properties = {
    '--font-label-family': theme.font.label.family,
    '--font-label-feature-settings': theme.font.label.featureSettings,
    '--font-label-weight-regular': `${theme.font.label.weights.regular}`,
    '--font-label-weight-medium': `${theme.font.label.weights.medium}`,
    '--font-label-weight-semibold': `${theme.font.label.weights.semibold}`,
    '--font-label-weight-bold': `${theme.font.label.weights.bold}`,
  }

  for (const size of FONT_LABEL_SIZE) {
    props[`--font-label-${size}-size`] = rem(theme.font.label.sizes[size].fontSize)
    props[`--font-label-${size}-line-height`] = rem(theme.font.label.sizes[size].lineHeight)
    props[`--font-label-${size}-ascender-height`] = px(theme.font.label.sizes[size].ascenderHeight)
    props[`--font-label-${size}-descender-height`] = px(
      theme.font.label.sizes[size].descenderHeight,
    )
    // props[`--font-label-${size}-cap-height`] =
    //   `calc(var(--font-label-${size}-line-height) - var(--font-label-${size}-ascender-height) - var(--font-label-${size}-descender-height))`
    props[`--font-label-${size}-letter-spacing`] = px(theme.font.label.sizes[size].letterSpacing)
    props[`--font-label-${size}-icon-size`] = px(theme.font.label.sizes[size].iconSize)
  }

  return props
}

function buildFontTextThemeProperties(theme: Theme_v3): Properties {
  const props: Properties = {
    '--font-text-family': theme.font.text.family,
    '--font-text-feature-settings': theme.font.text.featureSettings,
    '--font-text-weight-regular': `${theme.font.text.weights.regular}`,
    '--font-text-weight-medium': `${theme.font.text.weights.medium}`,
    '--font-text-weight-semibold': `${theme.font.text.weights.semibold}`,
    '--font-text-weight-bold': `${theme.font.text.weights.bold}`,
  }

  for (const size of FONT_TEXT_SIZE) {
    props[`--font-text-${size}-size`] = rem(theme.font.text.sizes[size].fontSize)
    props[`--font-text-${size}-line-height`] = rem(theme.font.text.sizes[size].lineHeight)
    props[`--font-text-${size}-ascender-height`] = px(theme.font.text.sizes[size].ascenderHeight)
    props[`--font-text-${size}-descender-height`] = px(theme.font.text.sizes[size].descenderHeight)
    // props[`--font-text-${size}-cap-height`] =
    //   `calc(var(--font-text-${size}-line-height) - var(--font-text-${size}-ascender-height) - var(--font-text-${size}-descender-height))`
    props[`--font-text-${size}-letter-spacing`] = px(theme.font.text.sizes[size].letterSpacing)
    props[`--font-text-${size}-icon-size`] = px(theme.font.text.sizes[size].iconSize)
  }

  return props
}

function buildInputThemeProperties(theme: Theme_v3): Properties {
  return {
    [`--input-border-width`]: px(theme.input.border.width),
    [`--input-checkbox-focus-ring-offset`]: px(theme.input.checkbox.focusRing.offset),
    [`--input-checkbox-focus-ring-width`]: px(theme.input.checkbox.focusRing.width),
    [`--input-checkbox-size`]: px(theme.input.checkbox.size),
    [`--input-radio-focus-ring-offset`]: px(theme.input.radio.focusRing.offset),
    [`--input-radio-focus-ring-width`]: px(theme.input.radio.focusRing.width),
    [`--input-radio-mark-size`]: px(theme.input.radio.markSize),
    [`--input-radio-size`]: px(theme.input.radio.size),
    [`--input-select-focus-ring-offset`]: px(theme.input.select.focusRing.offset),
    [`--input-select-focus-ring-width`]: px(theme.input.select.focusRing.width),
    [`--input-switch-focus-ring-offset`]: px(theme.input.switch.focusRing.offset),
    [`--input-switch-focus-ring-width`]: px(theme.input.switch.focusRing.width),
    [`--input-switch-height`]: px(theme.input.switch.height),
    [`--input-switch-padding`]: px(theme.input.switch.padding),
    [`--input-switch-transition-duration-ms`]: `${theme.input.switch.transitionDurationMs}ms`,
    [`--input-switch-transition-timing-function`]: theme.input.switch.transitionTimingFunction,
    [`--input-switch-width`]: px(theme.input.switch.width),
    [`--input-text-focus-ring-offset`]: px(theme.input.text.focusRing.offset),
    [`--input-text-focus-ring-width`]: px(theme.input.text.focusRing.width),
  }
}

function buildRadiusThemeProperties(theme: Theme_v3): Properties {
  return {
    [`--radius-0`]: rem(theme.radius[0]),
    [`--radius-1`]: rem(theme.radius[1]),
    [`--radius-2`]: rem(theme.radius[2]),
    [`--radius-3`]: rem(theme.radius[3]),
    [`--radius-4`]: rem(theme.radius[4]),
    [`--radius-5`]: rem(theme.radius[5]),
    [`--radius-6`]: rem(theme.radius[6]),
  }
}

function buildShadowThemeProperties(theme: Theme_v3): Properties {
  return {
    [`--shadow-outline`]: `0 0 0 ${theme.card.shadow.outline}px`,
    [`--shadow-0-umbra`]: toBoxShadow(theme.shadow[0]?.umbra),
    [`--shadow-0-penumbra`]: toBoxShadow(theme.shadow[0]?.penumbra),
    [`--shadow-0-ambient`]: toBoxShadow(theme.shadow[0]?.ambient),
    [`--shadow-1-umbra`]: toBoxShadow(theme.shadow[1]?.umbra),
    [`--shadow-1-penumbra`]: toBoxShadow(theme.shadow[1]?.penumbra),
    [`--shadow-1-ambient`]: toBoxShadow(theme.shadow[1]?.ambient),
    [`--shadow-2-umbra`]: toBoxShadow(theme.shadow[2]?.umbra),
    [`--shadow-2-penumbra`]: toBoxShadow(theme.shadow[2]?.penumbra),
    [`--shadow-2-ambient`]: toBoxShadow(theme.shadow[2]?.ambient),
    [`--shadow-3-umbra`]: toBoxShadow(theme.shadow[3]?.umbra),
    [`--shadow-3-penumbra`]: toBoxShadow(theme.shadow[3]?.penumbra),
    [`--shadow-3-ambient`]: toBoxShadow(theme.shadow[3]?.ambient),
    [`--shadow-4-umbra`]: toBoxShadow(theme.shadow[4]?.umbra),
    [`--shadow-4-penumbra`]: toBoxShadow(theme.shadow[4]?.penumbra),
    [`--shadow-4-ambient`]: toBoxShadow(theme.shadow[4]?.ambient),
    [`--shadow-5-umbra`]: toBoxShadow(theme.shadow[5]?.umbra),
    [`--shadow-5-penumbra`]: toBoxShadow(theme.shadow[5]?.penumbra),
    [`--shadow-5-ambient`]: toBoxShadow(theme.shadow[5]?.ambient),
  }
}

function buildSpaceThemeProperties(theme: Theme_v3): Properties {
  return {
    [`--space-0`]: rem(theme.space[0]),
    [`--space-0_5`]: rem(theme.space[1] / 2),
    [`--space-1`]: rem(theme.space[1]),
    [`--space-2`]: rem(theme.space[2]),
    [`--space-3`]: rem(theme.space[3]),
    [`--space-4`]: rem(theme.space[4]),
    [`--space-5`]: rem(theme.space[5]),
    [`--space-6`]: rem(theme.space[6]),
    [`--space-7`]: rem(theme.space[7]),
    [`--space-8`]: rem(theme.space[8]),
    [`--space-9`]: rem(theme.space[9]),
  }
}

const THEME_COLOR_SCHEMES = ['dark', 'light'] as const
const THEME_COLOR_VARIANTS = ['tinted', 'solid'] as const

function buildColorThemeProperties(theme: Theme_v3): Properties {
  const props: Properties = {}

  for (const scheme of THEME_COLOR_SCHEMES) {
    for (const cardTone of THEME_COLOR_CARD_TONES) {
      Object.assign(props, buildColorAvatarThemeProperties(theme, {scheme, cardTone}))
      Object.assign(props, buildColorCardThemeProperties(theme, {scheme, cardTone}))

      // card variants: tinted, solid
      for (const colorVariant of THEME_COLOR_VARIANTS) {
        for (const elementTone of THEME_COLOR_STATE_TONES) {
          const tokens = theme._tokens.color[cardTone].variant[colorVariant][elementTone]
          const prefix = `--color-${scheme}-${cardTone}-${colorVariant}-${elementTone}` as const

          const context: RenderColorContext = {
            bgVar: `${prefix}-bg-0`,
            hue: tokens._hue,
            scheme,
          }

          Object.assign(props, {
            [`${prefix}-bg-0`]: renderColor(tokens.bg[0], context),
            [`${prefix}-bg-1`]: `color-mix(in srgb, var(${prefix}-bg-0), var(${prefix}-bg-4) 25%)`,
            [`${prefix}-bg-2`]: `color-mix(in srgb, var(${prefix}-bg-0), var(${prefix}-bg-4) 50%)`,
            [`${prefix}-bg-3`]: `color-mix(in srgb, var(${prefix}-bg-0), var(${prefix}-bg-4) 75%)`,
            [`${prefix}-bg-4`]: renderColor(tokens.bg[4], context),

            [`${prefix}-border-0`]: renderColor(tokens.border[0], context),
            [`${prefix}-border-1`]: `color-mix(in srgb, var(${prefix}-border-0), var(${prefix}-border-4) 25%)`,
            [`${prefix}-border-2`]: `color-mix(in srgb, var(${prefix}-border-0), var(${prefix}-border-4) 50%)`,
            [`${prefix}-border-3`]: `color-mix(in srgb, var(${prefix}-border-0), var(${prefix}-border-4) 75%)`,
            [`${prefix}-border-4`]: renderColor(tokens.border[4], context),

            [`${prefix}-fg-0`]: renderColor(tokens.fg[0], context),
            [`${prefix}-fg-1`]: `color-mix(in srgb, var(${prefix}-fg-0), var(${prefix}-fg-4) 25%)`,
            [`${prefix}-fg-2`]: `color-mix(in srgb, var(${prefix}-fg-0), var(${prefix}-fg-4) 50%)`,
            [`${prefix}-fg-3`]: `color-mix(in srgb, var(${prefix}-fg-0), var(${prefix}-fg-4) 75%)`,
            [`${prefix}-fg-4`]: renderColor(tokens.fg[4], context),
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
  const tokens = theme._tokens.color[cardTone]
  const prefix = `--color-${scheme}-${cardTone}` as const

  const props: Properties = {}

  for (const hue of HUES) {
    const context: RenderColorContext = {
      bgVar: `${prefix}-bg-0`,
      hue: tokens.avatar[hue]._hue ?? hue,
      scheme,
    }

    Object.assign(props, {
      [`${prefix}-avatar-${hue}-bg`]: renderColor(tokens.avatar[hue].bg, context),
      [`${prefix}-avatar-${hue}-fg`]: renderColor(tokens.avatar[hue].fg, context),
    } satisfies Properties)
  }

  return props
}

function buildColorCardThemeProperties(
  theme: Theme_v3,
  options: {scheme: ThemeColorSchemeKey; cardTone: ThemeColorCardToneKey},
): Properties {
  const {scheme, cardTone} = options
  const tokens = theme._tokens.color[cardTone]
  const prefix = `--color-${scheme}-${cardTone}` as const
  const context: RenderColorContext = {bgVar: `${prefix}-bg-0`, hue: tokens._hue, scheme}

  const props: Properties = {
    [`${prefix}-backdrop`]: renderColor(tokens.backdrop, context),

    [`${prefix}-focus-ring`]: renderColor(tokens.focusRing, context),

    [`${prefix}-link-fg`]: renderColor(tokens.link.fg, context),

    [`${prefix}-shadow-outline`]: renderColor(tokens.shadow.outline, context),
    [`${prefix}-shadow-umbra`]: renderColor(tokens.shadow.umbra, context),
    [`${prefix}-shadow-penumbra`]: renderColor(tokens.shadow.penumbra, context),
    [`${prefix}-shadow-ambient`]: renderColor(tokens.shadow.ambient, context),

    [`${prefix}-token-atrule`]: renderColor(tokens.token.atrule, context),
    [`${prefix}-token-attr-name`]: renderColor(tokens.token.attrName, context),
    [`${prefix}-token-attr-value`]: renderColor(tokens.token.attrValue, context),
    [`${prefix}-token-attribute`]: renderColor(tokens.token.attribute, context),
    [`${prefix}-token-boolean`]: renderColor(tokens.token.boolean, context),
    [`${prefix}-token-builtin`]: renderColor(tokens.token.builtin, context),
    [`${prefix}-token-cdata`]: renderColor(tokens.token.cdata, context),
    [`${prefix}-token-char`]: renderColor(tokens.token.char, context),
    [`${prefix}-token-class-name`]: renderColor(tokens.token.className, context),
    [`${prefix}-token-class`]: renderColor(tokens.token.class, context),
    [`${prefix}-token-comment`]: renderColor(tokens.token.comment, context),
    [`${prefix}-token-constant`]: renderColor(tokens.token.constant, context),
    [`${prefix}-token-deleted`]: renderColor(tokens.token.deleted, context),
    [`${prefix}-token-doctype`]: renderColor(tokens.token.doctype, context),
    [`${prefix}-token-entity`]: renderColor(tokens.token.entity, context),
    [`${prefix}-token-function`]: renderColor(tokens.token.function, context),
    [`${prefix}-token-hexcode`]: renderColor(tokens.token.hexcode, context),
    [`${prefix}-token-id`]: renderColor(tokens.token.id, context),
    [`${prefix}-token-important`]: renderColor(tokens.token.important, context),
    [`${prefix}-token-inserted`]: renderColor(tokens.token.inserted, context),
    [`${prefix}-token-keyword`]: renderColor(tokens.token.keyword, context),
    [`${prefix}-token-number`]: renderColor(tokens.token.number, context),
    [`${prefix}-token-operator`]: renderColor(tokens.token.operator, context),
    [`${prefix}-token-prolog`]: renderColor(tokens.token.prolog, context),
    [`${prefix}-token-property`]: renderColor(tokens.token.property, context),
    [`${prefix}-token-pseudo-class`]: renderColor(tokens.token.pseudoClass, context),
    [`${prefix}-token-pseudo-eelement`]: renderColor(tokens.token.pseudoElement, context),
    [`${prefix}-token-punctuation`]: renderColor(tokens.token.punctuation, context),
    [`${prefix}-token-regex`]: renderColor(tokens.token.regex, context),
    [`${prefix}-token-selector`]: renderColor(tokens.token.selector, context),
    [`${prefix}-token-string`]: renderColor(tokens.token.string, context),
    [`${prefix}-token-symbol`]: renderColor(tokens.token.symbol, context),
    [`${prefix}-token-tag`]: renderColor(tokens.token.tag, context),
    [`${prefix}-token-unit`]: renderColor(tokens.token.unit, context),
    [`${prefix}-token-url`]: renderColor(tokens.token.url, context),
    [`${prefix}-token-variable`]: renderColor(tokens.token.variable, context),
  }

  return props
}
