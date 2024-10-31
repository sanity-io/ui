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
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_STATE_TONES,
  type ThemeColorCardToneKey as CardTone,
  ThemeColorCardToneKey,
  type ThemeColorSchemeKey as Scheme,
} from '@sanity/ui/theme'

import {
  type ColorCardVarNames,
  type ColorVariantVarNames,
  type FontSizeVarNames,
  type VarName,
  type VarNames,
} from './types'

/** @public */
export const varNames: VarNames = {
  avatar: {
    distance: `--avatar-distance`,
    focusRing: {
      offset: `--avatar-focus-ring-offset`,
      width: `--avatar-focus-ring-width`,
    },
    size: `--avatar-size`,
    sizes: AVATAR_SIZE.reduce(
      (acc, size) => {
        return {
          ...acc,
          [size]: {
            distance: `--avatar-${size}-distance`,
            size: `--avatar-${size}-size`,
          } satisfies {distance: VarName; size: VarName},
        }
      },
      {} as Record<AvatarSize, {distance: VarName; size: VarName}>,
    ),
  },
  button: {
    border: {
      width: `--button-border-width`,
    },
    focusRing: {
      offset: `--button-focus-ring-offset`,
      width: `--button-focus-ring-width`,
    },
  },
  card: {
    shadow: {
      outline: `--card-shadow-outline`,
    },
  },
  color: {
    // card scope
    avatar: {
      bg: `--color-avatar-bg`,
      fg: `--color-avatar-fg`,

      gray: {
        bg: `--color-avatar-gray-bg`,
        fg: `--color-avatar-gray-fg`,
      },
      blue: {
        bg: `--color-avatar-blue-bg`,
        fg: `--color-avatar-blue-fg`,
      },
      purple: {
        bg: `--color-avatar-purple-bg`,
        fg: `--color-avatar-purple-fg`,
      },
      magenta: {
        bg: `--color-avatar-magenta-bg`,
        fg: `--color-avatar-magenta-fg`,
      },
      red: {
        bg: `--color-avatar-red-bg`,
        fg: `--color-avatar-red-fg`,
      },
      orange: {
        bg: `--color-avatar-orange-bg`,
        fg: `--color-avatar-gray-fg`,
      },
      yellow: {
        bg: `--color-avatar-yellow-bg`,
        fg: `--color-avatar-yellow-fg`,
      },
      green: {
        bg: `--color-avatar-green-bg`,
        fg: `--color-avatar-green-fg`,
      },
      cyan: {
        bg: `--color-avatar-cyan-bg`,
        fg: `--color-avatar-yellow-fg`,
      },
    },
    backdrop: `--color-backdrop`,
    bg: `--color-bg`,
    border: `--color-border`,
    code: {
      bg: `--color-code-bg`,
      fg: `--color-code-fg`,

      token: {
        atrule: `--color-code-token-atrule`,
        attrName: `--color-code-token-attr-name`,
        attrValue: `--color-code-token-attr-value`,
        attribute: `--color-code-token-attribute`,
        boolean: `--color-code-token-boolean`,
        builtin: `--color-code-token-builtin`,
        cdata: `--color-code-token-cdata`,
        char: `--color-code-token-char`,
        class: `--color-code-token-class`,
        className: `--color-code-token-class-name`,
        comment: `--color-code-token-comment`,
        constant: `--color-code-token-constant`,
        deleted: `--color-code-token-deleted`,
        doctype: `--color-code-token-doctype`,
        entity: `--color-code-token-entity`,
        function: `--color-code-token-function`,
        hexcode: `--color-code-token-hexcode`,
        id: `--color-code-token-id`,
        important: `--color-code-token-important`,
        inserted: `--color-code-token-inserted`,
        keyword: `--color-code-token-keyword`,
        number: `--color-code-token-number`,
        operator: `--color-code-token-operator`,
        prolog: `--color-code-token-prolog`,
        property: `--color-code-token-property`,
        pseudoClass: `--color-code-token-pseudo-class`,
        pseudoElement: `--color-code-token-pseudo-element`,
        punctuation: `--color-code-token-punctuation`,
        regex: `--color-code-token-regex`,
        selector: `--color-code-token-selector`,
        string: `--color-code-token-string`,
        symbol: `--color-code-token-symbol`,
        tag: `--color-code-token-tag`,
        unit: `--color-code-token-unit`,
        url: `--color-code-token-url`,
        variable: `--color-code-token-variable`,
      },
    },
    fg: `--color-fg`,
    focusRing: `--color-focus-ring`,
    input: {
      bg: `--color-input-bg`,
      border: `--color-input-border`,
      fg: `--color-input-fg`,
      placeholder: `--color-input-placeholder`,
    },
    link: {
      fg: `--color-link-fg`,
    },
    muted: {
      bg: `--color-muted-bg`,
      fg: `--color-muted-fg`,
    },
    shadow: {
      outline: `--color-shadow-outline`,
      umbra: `--color-shadow-umbra`,
      penumbra: `--color-shadow-penumbra`,
      ambient: `--color-shadow-ambient`,
    },
    skeleton: {
      from: `--color-skeleton-from`,
      to: `--color-skeleton-to`,
    },

    solid: buildColorVariantVarNames({variant: 'solid'}),
    tinted: buildColorVariantVarNames({variant: 'tinted'}),

    // tone scopes
    ...THEME_COLOR_CARD_TONES.reduce(
      (acc, tone) => {
        acc[tone] = buildColorCardVarNames({tone})

        return acc
      },
      {} as Record<ThemeColorCardToneKey, ColorCardVarNames>,
    ),

    // scheme scopes
    dark: THEME_COLOR_CARD_TONES.reduce(
      (acc, tone) => {
        acc[tone] = buildColorCardVarNames({scheme: 'dark', tone})

        return acc
      },
      {} as Record<ThemeColorCardToneKey, ColorCardVarNames>,
    ),
    light: THEME_COLOR_CARD_TONES.reduce(
      (acc, tone) => {
        acc[tone] = buildColorCardVarNames({scheme: 'light', tone})

        return acc
      },
      {} as Record<ThemeColorCardToneKey, ColorCardVarNames>,
    ),
  },
  container: {
    0: `--container-0`,
    1: `--container-1`,
    2: `--container-2`,
    3: `--container-3`,
    4: `--container-4`,
    5: `--container-5`,
  },
  font: {
    code: {
      family: `--font-code-family`,
      featureSettings: `--font-code-feature-settings`,
      sizes: FONT_CODE_SIZE.reduce(
        (acc, size) => {
          return {
            ...acc,
            [size]: {
              fontSize: `--font-code-${size}-size`,
              ascenderHeight: `--font-code-${size}-ascender-height`,
              descenderHeight: `--font-code-${size}-descender-height`,
              lineHeight: `--font-code-${size}-line-height`,
              letterSpacing: `--font-code-${size}-letter-spacing`,
              iconSize: `--font-code-${size}-icon-size`,
            },
          }
        },
        {} as Record<FontCodeSize, FontSizeVarNames>,
      ),
      weights: {
        regular: `--font-code-weight-regular`,
        medium: `--font-code-weight-medium`,
        semibold: `--font-code-weight-semibold`,
        bold: `--font-code-weight-bold`,
      },
    },
    heading: {
      family: `--font-heading-family`,
      featureSettings: `--font-heading-feature-settings`,
      sizes: FONT_HEADING_SIZE.reduce(
        (acc, size) => {
          return {
            ...acc,
            [size]: {
              fontSize: `--font-heading-${size}-size`,
              ascenderHeight: `--font-heading-${size}-ascender-height`,
              descenderHeight: `--font-heading-${size}-descender-height`,
              lineHeight: `--font-heading-${size}-line-height`,
              letterSpacing: `--font-heading-${size}-letter-spacing`,
              iconSize: `--font-heading-${size}-icon-size`,
            },
          }
        },
        {} as Record<FontHeadingSize, FontSizeVarNames>,
      ),
      weights: {
        regular: `--font-heading-weight-regular`,
        medium: `--font-heading-weight-medium`,
        semibold: `--font-heading-weight-semibold`,
        bold: `--font-heading-weight-bold`,
      },
    },
    label: {
      family: `--font-label-family`,
      featureSettings: `--font-label-feature-settings`,
      sizes: FONT_LABEL_SIZE.reduce(
        (acc, size) => {
          return {
            ...acc,
            [size]: {
              fontSize: `--font-label-${size}-size`,
              ascenderHeight: `--font-label-${size}-ascender-height`,
              descenderHeight: `--font-label-${size}-descender-height`,
              lineHeight: `--font-label-${size}-line-height`,
              letterSpacing: `--font-label-${size}-letter-spacing`,
              iconSize: `--font-label-${size}-icon-size`,
            },
          }
        },
        {} as Record<FontLabelSize, FontSizeVarNames>,
      ),
      weights: {
        regular: `--font-label-weight-regular`,
        medium: `--font-label-weight-medium`,
        semibold: `--font-label-weight-semibold`,
        bold: `--font-label-weight-bold`,
      },
    },
    text: {
      family: `--font-text-family`,
      featureSettings: `--font-text-feature-settings`,
      sizes: FONT_TEXT_SIZE.reduce(
        (acc, size) => {
          return {
            ...acc,
            [size]: {
              fontSize: `--font-text-${size}-size`,
              ascenderHeight: `--font-text-${size}-ascender-height`,
              descenderHeight: `--font-text-${size}-descender-height`,
              lineHeight: `--font-text-${size}-line-height`,
              letterSpacing: `--font-text-${size}-letter-spacing`,
              iconSize: `--font-text-${size}-icon-size`,
            },
          }
        },
        {} as Record<FontTextSize, FontSizeVarNames>,
      ),
      weights: {
        regular: `--font-text-weight-regular`,
        medium: `--font-text-weight-medium`,
        semibold: `--font-text-weight-semibold`,
        bold: `--font-text-weight-bold`,
      },
    },
  },
  input: {
    border: {
      width: `--input-border-width`,
    },

    checkbox: {
      focusRing: {
        offset: `--input-checkbox-focus-ring-offset`,
        width: `--input-checkbox-focus-ring-width`,
      },
      size: `--input-checkbox-size`,
    },

    radio: {
      focusRing: {
        offset: `--input-radio-focus-ring-offset`,
        width: `--input-radio-focus-ring-width`,
      },
      markSize: `--input-radio-mark-size`,
      size: `--input-radio-size`,
    },

    select: {
      focusRing: {
        offset: `--input-select-focus-ring-offset`,
        width: `--input-select-focus-ring-width`,
      },
    },

    switch: {
      focusRing: {
        offset: `--input-switch-focus-ring-offset`,
        width: `--input-switch-focus-ring-width`,
      },
      height: `--input-switch-height`,
      padding: `--input-switch-padding`,
      transitionDurationMs: `--input-switch-transition-duration-ms`,
      transitionTimingFunction: `--input-switch-transition-timing-function`,
      width: `--input-switch-width`,
    },

    text: {
      focusRing: {
        offset: `--input-text-focus-ring-offset`,
        width: `--input-text-focus-ring-width`,
      },
    },

    fontSize: `--input-font-size`,

    lineHeight: `--input-line-height`,
    letterSpacing: `--input-letter-spacing`,
    ascenderHeight: `--input-ascender-height`,
    descenderHeight: `--input-descender-height`,

    gap: `--input-gap`,
    padding: `--input-padding`,
  },
  radius: Object.fromEntries(
    RADIUS.map((radius) => [radius, `--radius-${radius}` as VarName]),
  ) as Record<Radius, VarName>,
  shadow: Object.fromEntries(
    SHADOW.map((shadow) => [
      shadow,
      {
        umbra: `--shadow-${shadow}-umbra`,
        penumbra: `--shadow-${shadow}-penumbra`,
        ambient: `--shadow-${shadow}-ambient`,
      },
    ]),
  ) as Record<Shadow, {umbra: VarName; penumbra: VarName; ambient: VarName}>,
  space: Object.fromEntries(
    SPACE.map((space) => [space, `--space-${String(space).replace('.', '_')}` as VarName]),
  ) as Record<Space, VarName>,

  // color
  black: `--black`,
  white: `--white`,
  ...COLOR_HUES.reduce(
    (acc, hue) => {
      const tints = {} as Record<ColorTintKey, VarName>

      for (const tint of COLOR_TINTS) {
        tints[tint] = `--${hue}-${tint}`
      }

      acc[hue] = tints

      return acc
    },
    {} as Record<ColorHueKey, Record<ColorTintKey, VarName>>,
  ),
} as const

function buildColorCardVarNames(props: {scheme?: Scheme; tone: CardTone}): ColorCardVarNames {
  const {scheme, tone} = props

  const prefix = scheme ? (`--color-${scheme}-${tone}` as const) : (`--color-${tone}` as const)

  return {
    avatar: {
      gray: {
        bg: `${prefix}-avatar-gray-bg`,
        fg: `${prefix}-avatar-gray-fg`,
      },
      blue: {
        bg: `${prefix}-avatar-blue-bg`,
        fg: `${prefix}-avatar-blue-fg`,
      },
      purple: {
        bg: `${prefix}-avatar-purple-bg`,
        fg: `${prefix}-avatar-purple-fg`,
      },
      magenta: {
        bg: `${prefix}-avatar-magenta-bg`,
        fg: `${prefix}-avatar-magenta-fg`,
      },
      red: {
        bg: `${prefix}-avatar-red-bg`,
        fg: `${prefix}-avatar-red-fg`,
      },
      orange: {
        bg: `${prefix}-avatar-orange-bg`,
        fg: `${prefix}-avatar-gray-fg`,
      },
      yellow: {
        bg: `${prefix}-avatar-yellow-bg`,
        fg: `${prefix}-avatar-yellow-fg`,
      },
      green: {
        bg: `${prefix}-avatar-green-bg`,
        fg: `${prefix}-avatar-green-fg`,
      },
      cyan: {
        bg: `${prefix}-avatar-cyan-bg`,
        fg: `${prefix}-avatar-yellow-fg`,
      },
    },
    backdrop: `${prefix}-backdrop`,
    code: {
      bg: `${prefix}-code-bg`,
      fg: `${prefix}-code-fg`,
      token: {
        atrule: `${prefix}-code-token-atrule`,
        attrName: `${prefix}-code-token-attr-name`,
        attrValue: `${prefix}-code-token-attr-value`,
        attribute: `${prefix}-code-token-attribute`,
        boolean: `${prefix}-code-token-boolean`,
        builtin: `${prefix}-code-token-builtin`,
        cdata: `${prefix}-code-token-cdata`,
        char: `${prefix}-code-token-char`,
        class: `${prefix}-code-token-class`,
        className: `${prefix}-code-token-class-name`,
        comment: `${prefix}-code-token-comment`,
        constant: `${prefix}-code-token-constant`,
        deleted: `${prefix}-code-token-deleted`,
        doctype: `${prefix}-code-token-doctype`,
        entity: `${prefix}-code-token-entity`,
        function: `${prefix}-code-token-function`,
        hexcode: `${prefix}-code-token-hexcode`,
        id: `${prefix}-code-token-id`,
        important: `${prefix}-code-token-important`,
        inserted: `${prefix}-code-token-inserted`,
        keyword: `${prefix}-code-token-keyword`,
        number: `${prefix}-code-token-number`,
        operator: `${prefix}-code-token-operator`,
        prolog: `${prefix}-code-token-prolog`,
        property: `${prefix}-code-token-property`,
        pseudoClass: `${prefix}-code-token-pseudo-class`,
        pseudoElement: `${prefix}-code-token-pseudo-element`,
        punctuation: `${prefix}-code-token-punctuation`,
        regex: `${prefix}-code-token-regex`,
        selector: `${prefix}-code-token-selector`,
        string: `${prefix}-code-token-string`,
        symbol: `${prefix}-code-token-symbol`,
        tag: `${prefix}-code-token-tag`,
        unit: `${prefix}-code-token-unit`,
        url: `${prefix}-code-token-url`,
        variable: `${prefix}-code-token-variable`,
      },
    },
    focusRing: `${prefix}-focus-ring`,
    link: {
      fg: `${prefix}-link-fg`,
    },
    muted: {
      bg: `${prefix}-muted-bg`,
      fg: `${prefix}-muted-fg`,
    },
    shadow: {
      outline: `${prefix}-shadow-outline`,
      umbra: `${prefix}-shadow-umbra`,
      penumbra: `${prefix}-shadow-penumbra`,
      ambient: `${prefix}-shadow-ambient`,
    },
    skeleton: {
      from: `${prefix}-skeleton-from`,
      to: `${prefix}-skeleton-to`,
    },

    solid: buildColorVariantVarNames({scheme, tone, variant: 'solid'}),
    tinted: buildColorVariantVarNames({scheme, tone, variant: 'tinted'}),
  }
}

function buildColorVariantVarNames(options: {
  scheme?: Scheme
  tone?: CardTone
  variant: 'solid' | 'tinted'
}): ColorVariantVarNames {
  const {scheme, tone, variant} = options

  const prefix =
    scheme && tone
      ? (`--color-${scheme}-${tone}-${variant}` as const)
      : tone
        ? (`--color-${tone}-${variant}` as const)
        : (`--color-${variant}` as const)

  const vars = {
    bg: {
      0: `${prefix}-bg-0`,
      1: `${prefix}-bg-1`,
      2: `${prefix}-bg-2`,
      3: `${prefix}-bg-3`,
      4: `${prefix}-bg-4`,
    },
    border: {
      0: `${prefix}-border-0`,
      1: `${prefix}-border-1`,
      2: `${prefix}-border-2`,
      3: `${prefix}-border-3`,
      4: `${prefix}-border-4`,
    },
    fg: {
      0: `${prefix}-fg-0`,
      1: `${prefix}-fg-1`,
      2: `${prefix}-fg-2`,
      3: `${prefix}-fg-3`,
      4: `${prefix}-fg-4`,
    },
  } as ColorVariantVarNames

  for (const elementTone of THEME_COLOR_STATE_TONES) {
    const _prefix =
      scheme && tone
        ? (`--color-${scheme}-${tone}-${variant}-${elementTone}` as const)
        : tone
          ? (`--color-${tone}-${variant}-${elementTone}` as const)
          : (`--color-${variant}-${elementTone}` as const)

    vars[elementTone] = {
      bg: {
        0: `${_prefix}-bg-0`,
        1: `${_prefix}-bg-1`,
        2: `${_prefix}-bg-2`,
        3: `${_prefix}-bg-3`,
        4: `${_prefix}-bg-4`,
      },
      border: {
        0: `${_prefix}-border-0`,
        1: `${_prefix}-border-1`,
        2: `${_prefix}-border-2`,
        3: `${_prefix}-border-3`,
        4: `${_prefix}-border-4`,
      },
      fg: {
        0: `${_prefix}-fg-0`,
        1: `${_prefix}-fg-1`,
        2: `${_prefix}-fg-2`,
        3: `${_prefix}-fg-3`,
        4: `${_prefix}-fg-4`,
      },
    }
  }

  return vars
}
