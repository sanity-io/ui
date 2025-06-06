import type {
  AvatarColor,
  AvatarSize,
  ContainerScale,
  FontCodeSize,
  FontHeadingSize,
  FontLabelSize,
  FontTextSize,
  Hue,
  Radius,
  Shadow,
  Space,
  ThemeColorCardToneKey,
  ThemeColorSchemeKey,
  ThemeColorStateToneKey,
  ThemeColorVariantKey,
  Tint,
} from '@sanity/ui/theme'

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
export type CSSThemeColorPalette = {
  black: string
  white: string
} & Record<Hue, Record<Tint, string>>

/** @public */
export type CSSThemeColorCard = {
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
} & Record<
  ThemeColorVariantKey,
  Record<
    ThemeColorStateToneKey,
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

/** @public */
export type CSSThemeColorScheme = Record<ThemeColorCardToneKey, CSSThemeColorCard>

/** @public */
export type CSSThemeColor = {
  palette: CSSThemeColorPalette
} & Record<ThemeColorSchemeKey, CSSThemeColorScheme>

/** @public */
export type CSSThemeFont<FontScaleIndex extends number> = {
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
export type CSSTheme = {
  '@layer'?: string
  'avatar': {
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
  'button': {
    border: {
      width: string
    }
    focusRing: {
      offset: string
      width: string
    }
  }
  'card': {
    shadow: {
      outline: string
    }
  }
  'color': CSSThemeColor
  'container': Record<ContainerScale, string>
  'font': {
    code: CSSThemeFont<FontCodeSize>
    heading: CSSThemeFont<FontHeadingSize>
    label: CSSThemeFont<FontLabelSize>
    text: CSSThemeFont<FontTextSize>
  }
  'input': {
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
  'radius': Record<Radius, string>
  'shadow': Record<
    Shadow,
    {
      umbra: string
      penumbra: string
      ambient: string
    }
  >
  'space': Record<Space, string>
}

/** @internal */
export type _CSSThemeWithoutPalette = Omit<CSSTheme, '@layer' | 'color'> & {
  color: Omit<CSSThemeColor, 'palette'>
}
