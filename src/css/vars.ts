import {COLOR_HUES, COLOR_TINTS, ColorHueKey, ColorTintKey} from '@sanity/color'
import {
  AVATAR_SIZE,
  AvatarSize,
  FONT_CODE_SIZE,
  FONT_HEADING_SIZE,
  FONT_LABEL_SIZE,
  FONT_TEXT_SIZE,
  type FontCodeSize,
  type FontHeadingSize,
  type FontLabelSize,
  type FontTextSize,
  RADIUS,
  Radius,
  SHADOW,
  Shadow,
  SPACE,
  type Space,
  THEME_COLOR_AVATAR_COLORS,
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_STATE_TONES,
  type ThemeColorCardToneKey as CardTone,
  type ThemeColorSchemeKey as Scheme,
} from '@sanity/ui/theme'

import {
  type ColorAvatarVars,
  type ColorCardVars,
  type ColorSchemeVars,
  type ColorVariantVars,
  type CSSVar,
  type FontSizeVars,
  type Vars,
} from './types'
import {varNames} from './varNames'

const darkColorVars = {} as ColorSchemeVars

for (const tone of THEME_COLOR_CARD_TONES) {
  darkColorVars[tone] = buildColorCardVars({scheme: 'dark', tone})
}

const lightColorVars = {} as ColorSchemeVars

for (const tone of THEME_COLOR_CARD_TONES) {
  lightColorVars[tone] = buildColorCardVars({scheme: 'light', tone})
}

const colorVars: Vars['color'] = {
  avatar: {
    bg: `var(${varNames.color.avatar.bg})`,
    fg: `var(${varNames.color.avatar.fg})`,
    gray: {
      bg: `var(${varNames.color.avatar.gray.bg})`,
      fg: `var(${varNames.color.avatar.gray.fg})`,
    },
    blue: {
      bg: `var(${varNames.color.avatar.blue.bg})`,
      fg: `var(${varNames.color.avatar.blue.fg})`,
    },
    purple: {
      bg: `var(${varNames.color.avatar.purple.bg})`,
      fg: `var(${varNames.color.avatar.purple.fg})`,
    },
    magenta: {
      bg: `var(${varNames.color.avatar.magenta.bg})`,
      fg: `var(${varNames.color.avatar.magenta.fg})`,
    },
    red: {
      bg: `var(${varNames.color.avatar.red.bg})`,
      fg: `var(${varNames.color.avatar.red.fg})`,
    },
    orange: {
      bg: `var(${varNames.color.avatar.orange.bg})`,
      fg: `var(${varNames.color.avatar.orange.fg})`,
    },
    yellow: {
      bg: `var(${varNames.color.avatar.yellow.bg})`,
      fg: `var(${varNames.color.avatar.yellow.fg})`,
    },
    green: {
      bg: `var(${varNames.color.avatar.green.bg})`,
      fg: `var(${varNames.color.avatar.green.fg})`,
    },
    cyan: {
      bg: `var(${varNames.color.avatar.cyan.bg})`,
      fg: `var(${varNames.color.avatar.cyan.fg})`,
    },
  },
  backdrop: `var(${varNames.color.backdrop})`,
  bg: `var(${varNames.color.bg})`,
  border: `var(${varNames.color.border})`,
  code: {
    bg: `var(${varNames.color.code.bg})`,
    fg: `var(${varNames.color.code.fg})`,

    token: {
      atrule: `var(${varNames.color.code.token.atrule})`,
      attrName: `var(${varNames.color.code.token.attrName})`,
      attrValue: `var(${varNames.color.code.token.attrValue})`,
      attribute: `var(${varNames.color.code.token.attribute})`,
      boolean: `var(${varNames.color.code.token.boolean})`,
      builtin: `var(${varNames.color.code.token.builtin})`,
      cdata: `var(${varNames.color.code.token.cdata})`,
      char: `var(${varNames.color.code.token.char})`,
      class: `var(${varNames.color.code.token.class})`,
      className: `var(${varNames.color.code.token.className})`,
      comment: `var(${varNames.color.code.token.comment})`,
      constant: `var(${varNames.color.code.token.constant})`,
      deleted: `var(${varNames.color.code.token.deleted})`,
      doctype: `var(${varNames.color.code.token.doctype})`,
      entity: `var(${varNames.color.code.token.entity})`,
      function: `var(${varNames.color.code.token.function})`,
      hexcode: `var(${varNames.color.code.token.hexcode})`,
      id: `var(${varNames.color.code.token.id})`,
      important: `var(${varNames.color.code.token.important})`,
      inserted: `var(${varNames.color.code.token.inserted})`,
      keyword: `var(${varNames.color.code.token.keyword})`,
      number: `var(${varNames.color.code.token.number})`,
      operator: `var(${varNames.color.code.token.operator})`,
      prolog: `var(${varNames.color.code.token.prolog})`,
      property: `var(${varNames.color.code.token.property})`,
      pseudoClass: `var(${varNames.color.code.token.pseudoClass})`,
      pseudoElement: `var(${varNames.color.code.token.pseudoElement})`,
      punctuation: `var(${varNames.color.code.token.punctuation})`,
      regex: `var(${varNames.color.code.token.regex})`,
      selector: `var(${varNames.color.code.token.selector})`,
      string: `var(${varNames.color.code.token.string})`,
      symbol: `var(${varNames.color.code.token.symbol})`,
      tag: `var(${varNames.color.code.token.tag})`,
      unit: `var(${varNames.color.code.token.unit})`,
      url: `var(${varNames.color.code.token.url})`,
      variable: `var(${varNames.color.code.token.variable})`,
    },
  },
  fg: `var(${varNames.color.fg})`,
  focusRing: `var(${varNames.color.focusRing})`,
  input: {
    bg: `var(${varNames.color.input.bg})`,
    border: `var(${varNames.color.input.border})`,
    fg: `var(${varNames.color.input.fg})`,
    placeholder: `var(${varNames.color.input.placeholder})`,
  },
  link: {
    fg: `var(${varNames.color.link.fg})`,
  },
  muted: {
    bg: `var(${varNames.color.muted.bg})`,
    fg: `var(${varNames.color.muted.fg})`,
  },
  shadow: {
    outline: `var(${varNames.color.shadow.outline})`,
    umbra: `var(${varNames.color.shadow.umbra})`,
    penumbra: `var(${varNames.color.shadow.penumbra})`,
    ambient: `var(${varNames.color.shadow.ambient})`,
  },
  skeleton: {
    from: `var(${varNames.color.skeleton.from})`,
    to: `var(${varNames.color.skeleton.to})`,
  },

  solid: buildColorVariantVars({variant: 'solid'}),
  tinted: buildColorVariantVars({variant: 'tinted'}),

  ...THEME_COLOR_CARD_TONES.reduce((acc, tone) => {
    return {
      ...acc,
      [tone]: buildColorCardVars({tone}),
    }
  }, {} as ColorSchemeVars),

  dark: darkColorVars,
  light: lightColorVars,
}

/** @public */
export const vars: Vars = {
  avatar: {
    distance: `var(${varNames.avatar.distance})`,
    size: `var(${varNames.avatar.size})`,
    sizes: AVATAR_SIZE.reduce(
      (acc, size) => {
        return {
          ...acc,
          [size]: {
            size: `var(${varNames.avatar.sizes[size].size})`,
            distance: `var(${varNames.avatar.sizes[size].distance})`,
          },
        }
      },
      {} as Record<AvatarSize, {distance: CSSVar; size: CSSVar}>,
    ),
  },
  card: {
    shadow: {
      outline: `var(${varNames.card.shadow.outline})`,
    },
  },
  color: colorVars,
  container: {
    0: `var(${varNames.container[0]})`,
    1: `var(${varNames.container[1]})`,
    2: `var(${varNames.container[2]})`,
    3: `var(${varNames.container[3]})`,
    4: `var(${varNames.container[4]})`,
    5: `var(${varNames.container[5]})`,
  },
  font: {
    code: {
      family: `var(${varNames.font.code.family})`,
      sizes: FONT_CODE_SIZE.reduce(
        (acc, size) => {
          return {
            ...acc,
            [size]: {
              fontSize: `var(${varNames.font.code.sizes[size].fontSize})`,
              ascenderHeight: `var(${varNames.font.code.sizes[size].ascenderHeight})`,
              descenderHeight: `var(${varNames.font.code.sizes[size].descenderHeight})`,
              lineHeight: `var(${varNames.font.code.sizes[size].lineHeight})`,
              letterSpacing: `var(${varNames.font.code.sizes[size].letterSpacing})`,
              iconSize: `var(${varNames.font.code.sizes[size].iconSize})`,
            },
          }
        },
        {} as Record<FontCodeSize, FontSizeVars>,
      ),
      weight: {
        regular: `var(${varNames.font.code.weights.regular})`,
        medium: `var(${varNames.font.code.weights.medium})`,
        semibold: `var(${varNames.font.code.weights.semibold})`,
        bold: `var(${varNames.font.code.weights.bold})`,
      },
    },
    heading: {
      family: `var(${varNames.font.heading.family})`,
      sizes: FONT_HEADING_SIZE.reduce(
        (acc, size) => {
          return {
            ...acc,
            [size]: {
              fontSize: `var(${varNames.font.heading.sizes[size].fontSize})`,
              ascenderHeight: `var(${varNames.font.heading.sizes[size].ascenderHeight})`,
              descenderHeight: `var(${varNames.font.heading.sizes[size].descenderHeight})`,
              lineHeight: `var(${varNames.font.heading.sizes[size].lineHeight})`,
              letterSpacing: `var(${varNames.font.heading.sizes[size].letterSpacing})`,
              iconSize: `var(${varNames.font.heading.sizes[size].iconSize})`,
            },
          }
        },
        {} as Record<FontHeadingSize, FontSizeVars>,
      ),
      weight: {
        regular: `var(${varNames.font.heading.weights.regular})`,
        medium: `var(${varNames.font.heading.weights.medium})`,
        semibold: `var(${varNames.font.heading.weights.semibold})`,
        bold: `var(${varNames.font.heading.weights.bold})`,
      },
    },
    label: {
      family: `var(${varNames.font.label.family})`,
      sizes: FONT_LABEL_SIZE.reduce(
        (acc, size) => {
          return {
            ...acc,
            [size]: {
              fontSize: `var(${varNames.font.label.sizes[size].fontSize})`,
              ascenderHeight: `var(${varNames.font.label.sizes[size].ascenderHeight})`,
              descenderHeight: `var(${varNames.font.label.sizes[size].descenderHeight})`,
              lineHeight: `var(${varNames.font.label.sizes[size].lineHeight})`,
              letterSpacing: `var(${varNames.font.label.sizes[size].letterSpacing})`,
              iconSize: `var(${varNames.font.label.sizes[size].iconSize})`,
            },
          }
        },
        {} as Record<FontLabelSize, FontSizeVars>,
      ),
      weight: {
        regular: `var(${varNames.font.label.weights.regular})`,
        medium: `var(${varNames.font.label.weights.medium})`,
        semibold: `var(${varNames.font.label.weights.semibold})`,
        bold: `var(${varNames.font.label.weights.bold})`,
      },
    },
    text: {
      family: `var(${varNames.font.text.family})`,
      sizes: FONT_TEXT_SIZE.reduce(
        (acc, size) => {
          return {
            ...acc,
            [size]: {
              fontSize: `var(${varNames.font.text.sizes[size].fontSize})`,
              ascenderHeight: `var(${varNames.font.text.sizes[size].ascenderHeight})`,
              descenderHeight: `var(${varNames.font.text.sizes[size].descenderHeight})`,
              lineHeight: `var(${varNames.font.text.sizes[size].lineHeight})`,
              letterSpacing: `var(${varNames.font.text.sizes[size].letterSpacing})`,
              iconSize: `var(${varNames.font.text.sizes[size].iconSize})`,
            },
          }
        },
        {} as Record<FontTextSize, FontSizeVars>,
      ),
      weight: {
        regular: `var(${varNames.font.text.weights.regular})`,
        medium: `var(${varNames.font.text.weights.medium})`,
        semibold: `var(${varNames.font.text.weights.semibold})`,
        bold: `var(${varNames.font.text.weights.bold})`,
      },
    },
  },
  input: {
    fontSize: `var(--input-font-size)`,
    lineHeight: `var(--input-line-height)`,
    letterSpacing: `var(--input-letter-spacing)`,
    ascenderHeight: `var(--input-ascender-height)`,
    descenderHeight: `var(--input-descender-height)`,
    // capHeight: `var(--input-cap-height)`,

    gap: `var(--input-gap)`,
    padding: `var(--input-padding)`,

    text: {
      focusRing: {
        width: `var(--input-text-focus-ring-width)`,
        offset: `var(--input-text-focus-ring-offset)`,
      },
    },
  },
  radius: Object.fromEntries(
    RADIUS.map((radius) => [radius, `var(${varNames.radius[radius]})` as const]),
  ) as Record<Radius, CSSVar>,
  shadow: Object.fromEntries(
    SHADOW.map((shadow) => [
      shadow,
      {
        umbra: `var(${varNames.shadow[shadow].umbra})`,
        penumbra: `var(${varNames.shadow[shadow].penumbra})`,
        ambient: `var(${varNames.shadow[shadow].ambient})`,
      },
    ]),
  ) as Record<Shadow, {umbra: CSSVar; penumbra: CSSVar; ambient: CSSVar}>,
  space: Object.fromEntries(
    SPACE.map((space) => [space, `var(${varNames.space[space]})` as const]),
  ) as Record<Space, CSSVar>,

  // color
  black: `var(${varNames.black})`,
  white: `var(${varNames.white})`,
  ...COLOR_HUES.reduce(
    (acc, hue) => {
      const tints = {} as Record<ColorTintKey, CSSVar>

      for (const tint of COLOR_TINTS) {
        tints[tint] = `var(--${hue}-${tint})`
      }

      acc[hue] = tints

      return acc
    },
    {} as Record<ColorHueKey, Record<ColorTintKey, CSSVar>>,
  ),
} as const

function buildColorCardVars(props: {scheme?: Scheme; tone: CardTone}): ColorCardVars {
  const {scheme, tone} = props

  const prefix = scheme ? varNames.color[scheme][tone] : varNames.color[tone]

  return {
    avatar: {
      ...THEME_COLOR_AVATAR_COLORS.reduce((acc, color) => {
        return {
          ...acc,
          [color]: {
            bg: `var(${prefix.avatar[color].bg})`,
            fg: `var(${prefix.avatar[color].fg})`,
          },
        }
      }, {} as ColorAvatarVars),
    },
    backdrop: `var(${prefix.backdrop})`,
    code: {
      bg: `var(${prefix.code.bg})`,
      fg: `var(${prefix.code.fg})`,
      token: {
        atrule: `var(${prefix.code.token.atrule})`,
        attrName: `var(${prefix.code.token.attrName})`,
        attrValue: `var(${prefix.code.token.attrValue})`,
        attribute: `var(${prefix.code.token.attribute})`,
        boolean: `var(${prefix.code.token.boolean})`,
        builtin: `var(${prefix.code.token.builtin})`,
        cdata: `var(${prefix.code.token.cdata})`,
        char: `var(${prefix.code.token.char})`,
        class: `var(${prefix.code.token.class})`,
        className: `var(${prefix.code.token.className})`,
        comment: `var(${prefix.code.token.comment})`,
        constant: `var(${prefix.code.token.constant})`,
        deleted: `var(${prefix.code.token.deleted})`,
        doctype: `var(${prefix.code.token.doctype})`,
        entity: `var(${prefix.code.token.entity})`,
        function: `var(${prefix.code.token.function})`,
        hexcode: `var(${prefix.code.token.hexcode})`,
        id: `var(${prefix.code.token.id})`,
        important: `var(${prefix.code.token.important})`,
        inserted: `var(${prefix.code.token.inserted})`,
        keyword: `var(${prefix.code.token.keyword})`,
        number: `var(${prefix.code.token.number})`,
        operator: `var(${prefix.code.token.operator})`,
        prolog: `var(${prefix.code.token.prolog})`,
        property: `var(${prefix.code.token.property})`,
        pseudoClass: `var(${prefix.code.token.pseudoClass})`,
        pseudoElement: `var(${prefix.code.token.pseudoElement})`,
        punctuation: `var(${prefix.code.token.punctuation})`,
        regex: `var(${prefix.code.token.regex})`,
        selector: `var(${prefix.code.token.selector})`,
        string: `var(${prefix.code.token.string})`,
        symbol: `var(${prefix.code.token.symbol})`,
        tag: `var(${prefix.code.token.tag})`,
        unit: `var(${prefix.code.token.unit})`,
        url: `var(${prefix.code.token.url})`,
        variable: `var(${prefix.code.token.variable})`,
      },
    },
    focusRing: `var(${prefix.focusRing})`,
    link: {
      fg: `var(${prefix.link.fg})`,
    },
    muted: {
      bg: `var(${prefix.muted.bg})`,
      fg: `var(${prefix.muted.fg})`,
    },
    shadow: {
      outline: `var(${prefix.shadow.outline})`,
      umbra: `var(${prefix.shadow.umbra})`,
      penumbra: `var(${prefix.shadow.penumbra})`,
      ambient: `var(${prefix.shadow.ambient})`,
    },
    skeleton: {
      from: `var(${prefix.skeleton.from})`,
      to: `var(${prefix.skeleton.to})`,
    },

    solid: buildColorVariantVars({scheme, tone, variant: 'solid'}),
    tinted: buildColorVariantVars({scheme, tone, variant: 'tinted'}),
  }
}

function buildColorVariantVars(options: {
  scheme?: Scheme
  tone?: CardTone
  variant: 'solid' | 'tinted'
}): ColorVariantVars {
  const {scheme, tone, variant} = options

  const _prefix =
    scheme && tone
      ? (`--color-${scheme}-${tone}-${variant}` as const)
      : tone
        ? (`--color-${tone}-${variant}` as const)
        : (`--color-${variant}` as const)

  const vars = {
    bg: {
      0: `var(${_prefix}-bg-0)`,
      1: `var(${_prefix}-bg-1)`,
      2: `var(${_prefix}-bg-2)`,
      3: `var(${_prefix}-bg-3)`,
      4: `var(${_prefix}-bg-4)`,
    },
    border: {
      0: `var(${_prefix}-border-0)`,
      1: `var(${_prefix}-border-1)`,
      2: `var(${_prefix}-border-2)`,
      3: `var(${_prefix}-border-3)`,
      4: `var(${_prefix}-border-4)`,
    },
    fg: {
      0: `var(${_prefix}-fg-0)`,
      1: `var(${_prefix}-fg-1)`,
      2: `var(${_prefix}-fg-2)`,
      3: `var(${_prefix}-fg-3)`,
      4: `var(${_prefix}-fg-4)`,
    },
  } as ColorVariantVars

  for (const elementTone of THEME_COLOR_STATE_TONES) {
    const prefix =
      scheme && tone
        ? (`--color-${scheme}-${tone}-${variant}-${elementTone}` as const)
        : tone
          ? (`--color-${tone}-${variant}-${elementTone}` as const)
          : (`--color-${variant}-${elementTone}` as const)

    vars[elementTone] = {
      bg: {
        0: `var(${prefix}-bg-0)`,
        1: `var(${prefix}-bg-1)`,
        2: `var(${prefix}-bg-2)`,
        3: `var(${prefix}-bg-3)`,
        4: `var(${prefix}-bg-4)`,
      },
      border: {
        0: `var(${prefix}-border-0)`,
        1: `var(${prefix}-border-1)`,
        2: `var(${prefix}-border-2)`,
        3: `var(${prefix}-border-3)`,
        4: `var(${prefix}-border-4)`,
      },
      fg: {
        0: `var(${prefix}-fg-0)`,
        1: `var(${prefix}-fg-1)`,
        2: `var(${prefix}-fg-2)`,
        3: `var(${prefix}-fg-3)`,
        4: `var(${prefix}-fg-4)`,
      },
    }
  }

  return vars
}
