import {
  THEME_COLOR_BASE_TONES,
  ThemeColorBase,
  ThemeShadow,
  parseColor,
  studioTheme,
} from '@sanity/ui/theme'
import {SCHEMES} from '../vars/types'

export function writeStyles(): void {
  const figmaEffectStyles = figma.getLocalEffectStyles()

  const len = studioTheme.shadows.length

  for (const tone of THEME_COLOR_BASE_TONES) {
    for (const scheme of SCHEMES) {
      // focus ring
      createOrReplaceFocusRingStyle(
        figmaEffectStyles,
        `${scheme}/${tone}/focus-ring`,
        studioTheme.color[scheme][tone].base,
      )

      // shadow
      for (let i = 0; i < len; i += 1) {
        const shadow = studioTheme.shadows[i]

        if (!shadow) {
          continue
        }

        // shadow
        createOrReplaceShadowStyle(
          figmaEffectStyles,
          `${scheme}/${tone}/shadow-${i}`,
          shadow,
          studioTheme.color[scheme][tone].base.shadow,
        )
      }
    }
  }
}

function createOrReplaceFocusRingStyle(
  figmaEffectStyles: EffectStyle[],
  name: string,
  baseColor: ThemeColorBase,
) {
  let style = figmaEffectStyles.find((style) => style.name === name)

  if (!style) {
    style = figma.createEffectStyle()
    style.name = name
  }

  const bgColor = parseColor(baseColor.bg)
  const outlineColor = parseColor(baseColor.focusRing)

  style.effects = [
    // outline
    {
      type: 'DROP_SHADOW',
      color: {
        r: outlineColor.r / 255,
        g: outlineColor.g / 255,
        b: outlineColor.b / 255,
        a: outlineColor.a ?? 1,
      },
      offset: {x: 0, y: 0},
      radius: 0,
      spread: 3,
      visible: true,
      blendMode: 'PASS_THROUGH',
    },

    // offset
    {
      type: 'DROP_SHADOW',
      color: {
        r: bgColor.r / 255,
        g: bgColor.g / 255,
        b: bgColor.b / 255,
        a: bgColor.a ?? 1,
      },
      offset: {x: 0, y: 0},
      radius: 0,
      spread: 1,
      visible: true,
      blendMode: 'PASS_THROUGH',
    },
  ]
}

function createOrReplaceShadowStyle(
  figmaEffectStyles: EffectStyle[],
  name: string,
  shadow: ThemeShadow,
  shadowColor: ThemeColorBase['shadow'],
) {
  let style = figmaEffectStyles.find((style) => style.name === name)

  if (!style) {
    style = figma.createEffectStyle()
    style.name = name
  }

  const outlineColor = parseColor(shadowColor.outline)
  const umbraColor = parseColor(shadowColor.umbra)
  const penumbraColor = parseColor(shadowColor.penumbra)
  const ambientColor = parseColor(shadowColor.ambient)

  style.effects = [
    // ambient
    {
      type: 'DROP_SHADOW',
      color: {
        r: ambientColor.r / 255,
        g: ambientColor.g / 255,
        b: ambientColor.b / 255,
        a: ambientColor.a ?? 1,
      },
      offset: {x: shadow.ambient[0] || 0, y: shadow.ambient[1] || 0},
      radius: shadow.ambient[2] || 0,
      spread: shadow.ambient[3] || 0,
      visible: true,
      blendMode: 'PASS_THROUGH',
    },

    // penumbra
    {
      type: 'DROP_SHADOW',
      color: {
        r: penumbraColor.r / 255,
        g: penumbraColor.g / 255,
        b: penumbraColor.b / 255,
        a: penumbraColor.a ?? 1,
      },
      offset: {x: shadow.penumbra[0] || 0, y: shadow.penumbra[1] || 0},
      radius: shadow.penumbra[2] || 0,
      spread: shadow.penumbra[3] || 0,
      visible: true,
      blendMode: 'PASS_THROUGH',
    },

    // umbra
    {
      type: 'DROP_SHADOW',
      color: {
        r: umbraColor.r / 255,
        g: umbraColor.g / 255,
        b: umbraColor.b / 255,
        a: umbraColor.a ?? 1,
      },
      offset: {x: shadow.umbra[0] || 0, y: shadow.umbra[1] || 0},
      radius: shadow.umbra[2] || 0,
      spread: shadow.umbra[3] || 0,
      visible: true,
      blendMode: 'PASS_THROUGH',
    },

    // outline
    {
      type: 'DROP_SHADOW',
      color: {
        r: outlineColor.r / 255,
        g: outlineColor.g / 255,
        b: outlineColor.b / 255,
        a: outlineColor.a ?? 1,
      },
      offset: {x: 0, y: 0},
      radius: 0,
      spread: studioTheme.card.shadow.outline,
      visible: true,
      blendMode: 'PASS_THROUGH',
    },
  ]
}
