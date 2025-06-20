import type {
  AvatarColor,
  AvatarSize,
  CardTone,
  ColorScheme,
  ColorVariant,
  ContainerScale,
  ElementTone,
  FontCodeSize,
  FontHeadingSize,
  FontLabelSize,
  FontTextSize,
  Hue,
  Radius,
  Shadow,
  Space,
  Tint,
} from '@sanity/ui/theme'
import type {createThemeContract} from '@vanilla-extract/css'

import type {BREAKPOINTS} from './constants'

/** @public */
export type Breakpoint = keyof typeof BREAKPOINTS

/** @public */
export type ResponsiveProp<T> = T | Partial<Record<Breakpoint, T>>

/** @public */
export type ResponsiveRules = Record<Breakpoint, string>

/** @public */
export type ResponsiveRuleOptions<K extends string | number> = Record<K, ResponsiveRules>

/** @public */
export type CSSVarFunction = `var(--${string})`

/** @public */
export type ElementColorTokens = {
  bg: {
    0: string
    4: string
  }
  border: {
    0: string
    4: string
  }
  fg: {
    0: string
    4: string
  }
}

/** @public */
export type VariantColorTokens = Record<ElementTone, ElementColorTokens>

/** @public */
export type CSSCardColorTokens = {
  avatar: Record<AvatarColor, {bg: string; fg: string}>
  backdrop: string
  code: {
    bg: string
    fg: string
    token: {
      atrule: string
      attrName: string
      attrValue: string
      attribute: string
      boolean: string
      builtin: string
      cdata: string
      char: string
      class: string
      className: string
      comment: string
      constant: string
      deleted: string
      doctype: string
      entity: string
      function: string
      hexcode: string
      id: string
      important: string
      inserted: string
      keyword: string
      number: string
      operator: string
      prolog: string
      property: string
      pseudoClass: string
      pseudoElement: string
      punctuation: string
      regex: string
      selector: string
      string: string
      symbol: string
      tag: string
      unit: string
      url: string
      variable: string
    }
  }
  focusRing: string
  link: {
    fg: string
  }
  shadow: {
    outline: string
    umbra: string
    penumbra: string
    ambient: string
  }
  skeleton: {
    from: string
    to: string
  }
} & Record<ColorVariant, VariantColorTokens>

/** @public */
export type SchemeColorTokens = Record<CardTone, CSSCardColorTokens>

/** @public */
export type ColorPaletteTokens = {
  black: string
  white: string
} & Record<Hue, Record<Tint, string>>

/** @public */
export type ColorTokens = Record<ColorScheme, SchemeColorTokens>

/** @public */
export type FontTokens<FontScaleIndex extends number> = {
  family: string
  featureSettings: string
  weight: {
    regular: string
    medium: string
    semibold: string
    bold: string
  }
  scale: Record<
    FontScaleIndex,
    {
      fontSize: string
      lineHeight: string
      letterSpacing: string
      ascenderHeight: string
      descenderHeight: string
      iconSize: string
      customIconSize: string
    }
  >
}

/** @public */
export type CoreThemeTokens = {
  avatar: {
    focusRing: {
      offset: string
      width: string
    }
    scale: Record<
      AvatarSize,
      {
        distance: string
        size: string
      }
    >
  }
  button: {
    border: {
      width: string
    }
    focusRing: {
      offset: string
      width: string
    }
  }
  card: {
    shadow: {
      outline: string
    }
  }
  color: ColorTokens
  container: Record<ContainerScale, string>
  font: {
    code: FontTokens<FontCodeSize>
    heading: FontTokens<FontHeadingSize>
    label: FontTokens<FontLabelSize>
    text: FontTokens<FontTextSize>
  }
  input: {
    border: {
      width: string
    }
    checkbox: {
      size: string
      focusRing: {
        offset: string
        width: string
      }
    }
    radio: {
      size: string
      markSize: string
      focusRing: {
        offset: string
        width: string
      }
    }
    select: {
      focusRing: {
        offset: string
        width: string
      }
    }
    switch: {
      focusRing: {
        width: string
        offset: string
      }
      height: string
      width: string
      padding: string
      transitionDurationMs: string
      transitionTimingFunction: string
    }
    text: {
      focusRing: {
        offset: string
        width: string
      }
    }
  }
  radius: Record<Radius, string>
  shadow: Record<
    Shadow,
    {
      umbra: string
      penumbra: string
      ambient: string
    }
  >
  space: Record<Space, string>
}

/** @public */
export type ThemeTokens = CoreThemeTokens & {
  color: {palette: ColorPaletteTokens}
}

/** @public */
export type ScopedTokens = {
  arrow: {
    size: string
  }
  avatar: {
    distance: string
    size: string
  }
  button: {
    boxShadow: string
  }
  card: {
    test: string
  }
  color: {
    avatar: {
      bg: string
      fg: string
    }
    bg: string
    border: string
    fg: string
    muted: {
      bg: string
      border: string
      fg: string
    }
    input: {
      checkbox: {
        bg: string
        border: string
        fg: string
      }
      text: {
        bg: string
        border: string
        fg: string
        placeholder: string
      }
      radio: {
        bg: string
        border: string
        fg: string
      }
      switch: {
        bg: string
        fg: string
      }
    }
  } & CSSCardColorTokens &
    Record<
      ColorVariant,
      Record<
        ElementTone,
        {
          bg: {
            0: string
            1: string
            2: string
            3: string
            4: string
          }
          border: {
            0: string
            1: string
            2: string
            3: string
            4: string
          }
          fg: {
            0: string
            1: string
            2: string
            3: string
            4: string
          }
        }
      >
    > &
    Record<
      CardTone,
      CSSCardColorTokens &
        Record<
          ColorVariant,
          Record<
            ElementTone,
            {
              bg: {
                0: string
                4: string
              }
              border: {
                0: string
                4: string
              }
              fg: {
                0: string
                4: string
              }
            }
          >
        >
    >

  font: {
    family: string
    featureSettings: string
    fontSize: string
    lineHeight: string
    letterSpacing: string
    fontWeight: string

    ascenderHeight: string
    descenderHeight: string
    iconSize: string
    customIconSize: string
    capHeight: string
    iconOffset: string
    customIconOffset: string

    skeleton: {
      ascenderHeight: string
      descenderHeight: string
      lineHeight: string
    }

    weight: {
      regular: string
      medium: string
      semibold: string
      bold: string
    }
  }

  input: {
    switch: {
      thumb: {
        offset: string
        size: string
      }
    }
    text: {
      fontSize: string
      lineHeight: string
      letterSpacing: string
      ascenderHeight: string
      descenderHeight: string
      padding: string
      gap: string
    }
  }
}

/** @public */
export type NullableTokens = {
  [key: string]: string | NullableTokens
}

/** @public */
export type ThemeContract<T extends NullableTokens> = ReturnType<typeof createThemeContract<T>>

/** @public */
export type ColorPaletteVars = ThemeContract<ColorPaletteTokens>

/** @public */
export type ScopedVars = ThemeContract<ScopedTokens>

/** @public */
export type ThemeVars = ThemeContract<ThemeTokens & ScopedTokens> // _CSSThemeWithoutPaletteTokens & ScopedVars
