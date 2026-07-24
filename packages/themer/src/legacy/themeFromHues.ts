import {ColorTints} from '@sanity/color'
import {
  buildTheme,
  // oxlint-disable-next-line no-deprecated
  createColorTheme,
  multiply as multiplyRgb,
  parseColor,
  rgba,
  rgbToHex,
  screen as screenRgb,
} from '@sanity/ui/theme'

import {applyHues} from './applyHues'
import {createTonesFromHues} from './createTonesFromHues'
import {blue, cyan, gray, green, magenta, orange, purple, red, yellow} from './palette'
import {LegacyTheme, PartialHues} from './types'

const NEUTRAL_TONES: string[] = ['default', 'transparent']

/** The static tints used for spot colors, syntax highlighting and input states */
const SPOT_TINTS: Record<string, ColorTints> = {
  blue,
  cyan,
  gray,
  green,
  magenta,
  orange,
  purple,
  red,
  yellow,
}

function getTint(key: string): ColorTints {
  const tints = SPOT_TINTS[key]

  if (!tints) {
    throw new Error(`Unknown tint: ${key}`)
  }

  return tints
}

const studioTheme = buildTheme()

/**
 * Generates a Studio theme from hues, producing the exact same colors as the
 * hosted Themer service (themer.sanity.build). This is a port of its
 * `themeFromHues` implementation:
 * https://github.com/sanity-io/themer/blob/main/apps/v1/utils/themeFromHues.ts
 */
export function themeFromHues(partialHues: PartialHues): LegacyTheme {
  function multiply(bg: string, fg: string): string {
    return rgbToHex(multiplyRgb(parseColor(bg), parseColor(fg)))
  }
  function screen(bg: string, fg: string): string {
    return rgbToHex(screenRgb(parseColor(bg), parseColor(fg)))
  }

  const hues = applyHues(partialHues)
  // These variables are made top-level to keep the body of createColorTheme largely the same.
  // This makes it much easier to sync it with new releases of @sanity/ui should its implementation details change.
  const black = {title: 'Black', hex: hues.default.darkest}
  const white = {title: 'white', hex: hues.default.lightest}

  const tones = createTonesFromHues(hues)
  const focusRingHue = tones.primary
  const accentHue = tones.critical
  const linkHue = tones.primary

  // Generate colors :OOO
  // Based on the studio color theme of @sanity/ui at the time the hosted
  // Themer service was built
  // oxlint-disable-next-line no-deprecated
  const color = createColorTheme({
    base: ({dark, name}) => {
      if (name === 'default') {
        const skeletonFrom = dark ? tones.transparent[900].hex : tones.transparent[100].hex

        return {
          fg: dark ? white.hex : black.hex,
          bg: dark ? black.hex : white.hex,
          border: tones.transparent[dark ? 800 : 200].hex,
          focusRing: focusRingHue[500].hex,
          shadow: {
            outline: rgba(tones.transparent[500].hex, 0.4),
            umbra: rgba(dark ? black.hex : tones.transparent[500].hex, 0.2),
            penumbra: rgba(dark ? black.hex : tones.transparent[500].hex, 0.14),
            ambient: rgba(dark ? black.hex : tones.transparent[500].hex, 0.12),
          },
          skeleton: {
            from: skeletonFrom,
            to: rgba(skeletonFrom, 0.5),
          },
        }
      }

      if (name === 'transparent') {
        const tints = tones.default
        const skeletonFrom = tints[dark ? 800 : 200].hex

        return {
          fg: tints[dark ? 100 : 900].hex,
          bg: tints[dark ? 950 : 50].hex,
          border: tints[dark ? 800 : 300].hex,
          focusRing: focusRingHue[500].hex,
          shadow: {
            outline: rgba(tints[500].hex, dark ? 0.2 : 0.4),
            umbra: rgba(dark ? black.hex : tints[500].hex, 0.2),
            penumbra: rgba(dark ? black.hex : tints[500].hex, 0.14),
            ambient: rgba(dark ? black.hex : tints[500].hex, 0.12),
          },
          skeleton: {
            from: skeletonFrom,
            to: rgba(skeletonFrom, 0.5),
          },
        }
      }

      const tints = tones[name] || tones.default
      const skeletonFrom = tints[dark ? 800 : 200].hex

      return {
        fg: tints[dark ? 100 : 900].hex,
        bg: tints[dark ? 950 : 50].hex,
        border: tints[dark ? 800 : 200].hex,
        focusRing: tints[500].hex,
        shadow: {
          outline: rgba(tints[500].hex, dark ? 0.2 : 0.4),
          umbra: rgba(dark ? black.hex : tints[500].hex, 0.2),
          penumbra: rgba(dark ? black.hex : tints[500].hex, 0.14),
          ambient: rgba(dark ? black.hex : tints[500].hex, 0.12),
        },
        skeleton: {
          from: skeletonFrom,
          to: rgba(skeletonFrom, 0.5),
        },
      }
    },

    solid: ({base, dark, name, state, tone}) => {
      const mix = dark ? screen : multiply
      const mix2 = dark ? multiply : screen
      const defaultTints = tones[name] || tones.default
      const isNeutral = NEUTRAL_TONES.includes(name) && NEUTRAL_TONES.includes(tone)

      let tints = tones[tone === 'default' ? name : tone] || defaultTints

      if (state === 'disabled') {
        tints = defaultTints
        const bg = mix(base.bg, tints[dark ? 800 : 200].hex)
        const skeletonFrom = mix2(bg, tints[dark ? 200 : 800].hex)

        return {
          bg,
          bg2: mix2(bg, tints[dark ? 50 : 950].hex),
          border: mix(base.bg, tints[dark ? 800 : 200].hex),
          fg: mix(base.bg, dark ? black.hex : white.hex),
          icon: mix(base.bg, dark ? black.hex : white.hex),
          muted: {
            fg: mix(base.bg, tints[dark ? 950 : 50].hex),
          },
          accent: {
            fg: mix(base.bg, tints[dark ? 950 : 50].hex),
          },
          link: {
            fg: mix(base.bg, tints[dark ? 950 : 50].hex),
          },
          code: {
            bg,
            fg: mix(base.bg, tints[dark ? 950 : 50].hex),
          },
          skeleton: {
            from: skeletonFrom,
            to: rgba(skeletonFrom, 0.5),
          },
        }
      }

      if (state === 'hovered') {
        const bg = mix(base.bg, tints[dark ? 300 : 600].hex)
        const skeletonFrom = mix2(bg, tints[dark ? 200 : 800].hex)

        return {
          bg,
          bg2: mix2(bg, tints[dark ? 50 : 950].hex),
          border: mix(base.bg, tints[dark ? 300 : 600].hex),
          fg: mix(base.bg, dark ? black.hex : white.hex),
          icon: mix(base.bg, dark ? black.hex : white.hex),
          muted: {
            fg: mix(base.bg, tints[dark ? 800 : 200].hex),
          },
          accent: {
            fg: mix2(bg, accentHue[dark ? 800 : 200].hex),
          },
          link: {
            fg: mix2(bg, linkHue[dark ? 800 : 200].hex),
          },
          code: {
            bg: mix(bg, tints[dark ? 950 : 50].hex),
            fg: mix(base.bg, tints[dark ? 800 : 200].hex),
          },
          skeleton: {
            from: skeletonFrom,
            to: rgba(skeletonFrom, 0.5),
          },
        }
      }

      if (state === 'pressed') {
        const bg = mix(base.bg, tints[dark ? 200 : 800].hex)
        const skeletonFrom = mix2(bg, tints[dark ? 200 : 800].hex)

        return {
          bg: mix(base.bg, tints[dark ? 200 : 800].hex),
          bg2: mix2(bg, tints[dark ? 50 : 950].hex),
          border: mix(base.bg, tints[dark ? 200 : 800].hex),
          fg: mix(base.bg, dark ? black.hex : white.hex),
          icon: mix(base.bg, dark ? black.hex : white.hex),
          muted: {
            fg: mix(base.bg, tints[dark ? 800 : 200].hex),
          },
          accent: {
            fg: mix2(bg, accentHue[dark ? 800 : 200].hex),
          },
          link: {
            fg: mix2(bg, linkHue[dark ? 800 : 200].hex),
          },
          code: {
            bg: mix(bg, tints[dark ? 950 : 50].hex),
            fg: mix(base.bg, tints[dark ? 800 : 200].hex),
          },
          skeleton: {
            from: skeletonFrom,
            to: rgba(skeletonFrom, 0.5),
          },
        }
      }

      if (state === 'selected') {
        if (isNeutral) {
          tints = tones.primary
        }

        const bg = mix(base.bg, tints[dark ? 200 : 800].hex)
        const skeletonFrom = mix2(bg, tints[dark ? 200 : 800].hex)

        return {
          bg,
          bg2: mix2(bg, tints[dark ? 50 : 950].hex),
          border: mix(base.bg, tints[dark ? 200 : 800].hex),
          fg: mix(base.bg, dark ? black.hex : white.hex),
          icon: mix(base.bg, dark ? black.hex : white.hex),
          muted: {
            fg: mix(base.bg, tints[dark ? 800 : 200].hex),
          },
          accent: {
            fg: mix2(bg, accentHue[dark ? 800 : 200].hex),
          },
          link: {
            fg: mix2(bg, linkHue[dark ? 800 : 200].hex),
          },
          code: {
            bg: mix(bg, tints[dark ? 950 : 50].hex),
            fg: mix(base.bg, tints[dark ? 800 : 200].hex),
          },
          skeleton: {
            from: skeletonFrom,
            to: rgba(skeletonFrom, 0.5),
          },
        }
      }

      // state: "enabled" | unknown
      const bg = mix(base.bg, tints[dark ? 400 : 500].hex)
      const skeletonFrom = mix2(bg, tints[dark ? 200 : 800].hex)

      return {
        bg,
        bg2: mix2(bg, tints[dark ? 50 : 950].hex),
        border: mix(base.bg, tints[dark ? 400 : 500].hex),
        fg: mix(base.bg, dark ? black.hex : white.hex),
        icon: mix(base.bg, dark ? black.hex : white.hex),
        muted: {
          fg: mix(base.bg, tints[dark ? 900 : 100].hex),
        },
        accent: {
          fg: mix2(bg, accentHue[dark ? 900 : 100].hex),
        },
        link: {
          fg: mix2(bg, linkHue[dark ? 900 : 100].hex),
        },
        code: {
          bg: mix(bg, tints[dark ? 950 : 50].hex),
          fg: mix(base.bg, tints[dark ? 900 : 100].hex),
        },
        skeleton: {
          from: skeletonFrom,
          to: rgba(skeletonFrom, 0.5),
        },
      }
    },

    muted: ({base, dark, name, state, tone}) => {
      const mix = dark ? screen : multiply
      const defaultTints = tones[name] || tones.default
      const isNeutral = NEUTRAL_TONES.includes(name) && NEUTRAL_TONES.includes(tone)

      let tints = tones[tone === 'default' ? name : tone] || defaultTints

      if (state === 'disabled') {
        tints = defaultTints

        const bg = base.bg
        const skeletonFrom = mix(bg, tints[dark ? 900 : 100].hex)

        return {
          bg,
          bg2: mix(bg, tints[dark ? 950 : 50].hex),
          border: mix(bg, tints[dark ? 950 : 50].hex),
          fg: mix(bg, tints[dark ? 800 : 200].hex),
          icon: mix(bg, tints[dark ? 800 : 200].hex),
          muted: {
            fg: mix(bg, tints[dark ? 900 : 100].hex),
          },
          accent: {
            fg: mix(bg, tints[dark ? 900 : 100].hex),
          },
          link: {
            fg: mix(bg, tints[dark ? 900 : 100].hex),
          },
          code: {
            bg,
            fg: mix(bg, tints[dark ? 900 : 100].hex),
          },
          skeleton: {
            from: rgba(skeletonFrom, 0.5),
            to: rgba(skeletonFrom, 0.25),
          },
        }
      }

      if (state === 'hovered') {
        if (isNeutral) {
          tints = tones.primary
        }

        const bg = mix(base.bg, tints[dark ? 950 : 50].hex)
        const skeletonFrom = mix(bg, tints[dark ? 900 : 100].hex)

        return {
          bg,
          bg2: mix(bg, tints[dark ? 950 : 50].hex),
          border: mix(bg, tints[dark ? 900 : 100].hex),
          fg: mix(base.bg, tints[dark ? 200 : 800].hex),
          icon: mix(base.bg, tints[dark ? 200 : 800].hex),
          muted: {
            fg: mix(base.bg, tints[dark ? 400 : 600].hex),
          },
          accent: {
            fg: mix(base.bg, linkHue[dark ? 400 : 500].hex),
          },
          link: {
            fg: mix(base.bg, linkHue[dark ? 400 : 600].hex),
          },
          code: {
            bg: mix(bg, tints[dark ? 950 : 50].hex),
            fg: mix(base.bg, tints[dark ? 400 : 600].hex),
          },
          skeleton: {
            from: skeletonFrom,
            to: rgba(skeletonFrom, 0.5),
          },
        }
      }

      if (state === 'pressed') {
        if (isNeutral) {
          tints = tones.primary
        }

        const bg = mix(base.bg, tints[dark ? 900 : 100].hex)
        const skeletonFrom = mix(bg, tints[dark ? 900 : 100].hex)

        return {
          bg,
          bg2: mix(bg, tints[dark ? 950 : 50].hex),
          border: mix(bg, tints[dark ? 900 : 100].hex),
          fg: mix(base.bg, tints[dark ? 200 : 800].hex),
          icon: mix(base.bg, tints[dark ? 200 : 800].hex),
          muted: {
            fg: mix(base.bg, tints[dark ? 400 : 600].hex),
          },
          accent: {
            fg: mix(bg, accentHue[dark ? 400 : 500].hex),
          },
          link: {
            fg: mix(bg, linkHue[dark ? 400 : 600].hex),
          },
          code: {
            bg: mix(bg, tints[dark ? 950 : 50].hex),
            fg: mix(base.bg, tints[dark ? 400 : 600].hex),
          },
          skeleton: {
            from: skeletonFrom,
            to: rgba(skeletonFrom, 0.5),
          },
        }
      }

      if (state === 'selected') {
        if (isNeutral) {
          tints = tones.primary
        }

        const bg = mix(base.bg, tints[dark ? 900 : 100].hex)
        const skeletonFrom = mix(bg, tints[dark ? 900 : 100].hex)

        return {
          bg,
          bg2: mix(bg, tints[dark ? 950 : 50].hex),
          border: mix(bg, tints[dark ? 900 : 100].hex),
          fg: mix(base.bg, tints[dark ? 200 : 800].hex),
          icon: mix(base.bg, tints[dark ? 200 : 800].hex),
          muted: {
            fg: mix(base.bg, tints[dark ? 400 : 600].hex),
          },
          accent: {
            fg: mix(bg, accentHue[dark ? 400 : 500].hex),
          },
          link: {
            fg: mix(bg, linkHue[dark ? 400 : 600].hex),
          },
          code: {
            bg: mix(bg, tints[dark ? 950 : 50].hex),
            fg: mix(base.bg, tints[dark ? 400 : 600].hex),
          },
          skeleton: {
            from: skeletonFrom,
            to: rgba(skeletonFrom, 0.5),
          },
        }
      }

      const bg = base.bg
      const skeletonFrom = mix(bg, tints[dark ? 900 : 100].hex)

      return {
        bg,
        bg2: mix(bg, tints[dark ? 950 : 50].hex),
        border: mix(bg, tints[dark ? 900 : 100].hex),
        fg: mix(base.bg, tints[dark ? 300 : 700].hex),
        icon: mix(base.bg, tints[dark ? 300 : 700].hex),
        muted: {
          fg: mix(base.bg, tints[dark ? 400 : 600].hex),
        },
        accent: {
          fg: mix(base.bg, accentHue[dark ? 400 : 500].hex),
        },
        link: {
          fg: mix(base.bg, linkHue[dark ? 400 : 600].hex),
        },
        code: {
          bg: mix(base.bg, tints[dark ? 950 : 50].hex),
          fg: mix(base.bg, tints[dark ? 400 : 600].hex),
        },
        skeleton: {
          from: skeletonFrom,
          to: rgba(skeletonFrom, 0.5),
        },
      }
    },

    button: ({base, mode, muted, solid}) => {
      if (mode === 'bleed') {
        return {
          enabled: {
            ...muted.enabled,
            border: muted.enabled.bg,
          },
          hovered: {
            ...muted.hovered,
            border: muted.hovered.bg,
          },
          pressed: {
            ...muted.pressed,
            border: muted.pressed.bg,
          },
          selected: {
            ...muted.selected,
            border: muted.selected.bg,
          },
          disabled: {
            ...muted.disabled,
            border: muted.disabled.bg,
          },
        }
      }

      if (mode === 'ghost') {
        return {
          ...solid,
          enabled: {
            ...muted.enabled,
            border: base.border,
          },
          disabled: muted.disabled,
        }
      }

      return solid
    },

    card: ({base, dark, muted, name, solid, state}) => {
      if (state === 'hovered') {
        return muted[name].hovered
      }

      if (state === 'disabled') {
        return muted[name].disabled
      }

      const isNeutral = NEUTRAL_TONES.includes(name)
      const tints = tones[name] || tones.default
      const mix = dark ? screen : multiply

      if (state === 'pressed') {
        if (isNeutral) {
          return muted.primary.pressed
        }

        return muted[name].pressed
      }

      if (state === 'selected') {
        if (isNeutral) {
          return solid.primary.enabled
        }

        return solid[name].enabled
      }

      const bg = base.bg
      const skeletonFrom = mix(base.bg, tints[dark ? 900 : 100].hex)

      return {
        bg,
        bg2: mix(bg, tints[dark ? 950 : 50].hex),
        fg: base.fg,
        icon: base.fg,
        border: base.border,
        muted: {
          fg: mix(base.bg, tints[dark ? 400 : 600].hex),
        },
        accent: {
          fg: mix(base.bg, red[dark ? 400 : 500].hex),
        },
        link: {
          fg: mix(base.bg, blue[dark ? 400 : 600].hex),
        },
        code: {
          bg: mix(base.bg, tints[dark ? 950 : 50].hex),
          fg: tints[dark ? 400 : 600].hex,
        },
        skeleton: {
          from: skeletonFrom,
          to: rgba(skeletonFrom, 0.5),
        },
      }
    },

    input: ({base, dark, mode, state}) => {
      const mix = dark ? screen : multiply

      if (mode === 'invalid') {
        const tints = tones.critical

        return {
          bg: mix(base.bg, tints[dark ? 950 : 50].hex),
          bg2: mix(base.bg, tints[dark ? 800 : 200].hex),
          fg: mix(base.bg, tints[dark ? 400 : 600].hex),
          border: mix(base.bg, tints[dark ? 800 : 200].hex),
          placeholder: mix(base.bg, tints[dark ? 600 : 400].hex),
        }
      }

      if (state === 'hovered') {
        return {
          bg: base.bg,
          bg2: mix(base.bg, gray[dark ? 700 : 300].hex),
          fg: base.fg,
          border: mix(base.bg, gray[dark ? 700 : 300].hex),
          placeholder: mix(base.bg, gray[dark ? 600 : 400].hex),
        }
      }

      if (state === 'disabled') {
        return {
          bg: mix(base.bg, gray[dark ? 950 : 50].hex),
          bg2: mix(base.bg, gray[dark ? 900 : 100].hex),
          fg: mix(base.bg, gray[dark ? 700 : 300].hex),
          border: mix(base.bg, gray[dark ? 900 : 100].hex),
          placeholder: mix(base.bg, gray[dark ? 800 : 200].hex),
        }
      }

      if (state === 'readOnly') {
        return {
          bg: mix(base.bg, gray[dark ? 950 : 50].hex),
          bg2: mix(base.bg, gray[dark ? 800 : 200].hex),
          fg: mix(base.bg, gray[dark ? 200 : 800].hex),
          border: mix(base.bg, gray[dark ? 800 : 200].hex),
          placeholder: mix(base.bg, gray[dark ? 600 : 400].hex),
        }
      }

      return {
        bg: base.bg,
        bg2: base.border,
        fg: base.fg,
        border: base.border,
        placeholder: mix(base.bg, gray[dark ? 600 : 400].hex),
      }
    },

    selectable: ({base, muted, tone, solid, state}) => {
      if (state === 'enabled') {
        return {
          ...muted[tone].enabled,
          bg: base.bg,
        }
      }

      if (state === 'pressed') {
        if (tone === 'default') {
          return muted.primary.pressed
        }

        return muted[tone].pressed
      }

      if (state === 'selected') {
        if (tone === 'default') {
          return solid.primary.enabled
        }

        return solid[tone].enabled
      }

      if (state === 'disabled') {
        return {
          ...muted[tone].disabled,
          bg: base.bg,
        }
      }

      return muted[tone][state]
    },

    spot: ({base, dark, key}) => {
      const mix = dark ? screen : multiply

      return mix(base.bg, getTint(key)[dark ? 400 : 500].hex)
    },

    syntax: ({base, dark}) => {
      const mix = dark ? screen : multiply
      const mainShade = dark ? 400 : 600
      const secondaryShade = dark ? 600 : 400

      return {
        atrule: mix(base.bg, purple[mainShade].hex),
        attrName: mix(base.bg, green[mainShade].hex),
        attrValue: mix(base.bg, yellow[mainShade].hex),
        attribute: mix(base.bg, yellow[mainShade].hex),
        boolean: mix(base.bg, purple[mainShade].hex),
        builtin: mix(base.bg, purple[mainShade].hex),
        cdata: mix(base.bg, yellow[mainShade].hex),
        char: mix(base.bg, yellow[mainShade].hex),
        class: mix(base.bg, orange[mainShade].hex),
        className: mix(base.bg, cyan[mainShade].hex),
        comment: mix(base.bg, gray[secondaryShade].hex),
        constant: mix(base.bg, purple[mainShade].hex),
        deleted: mix(base.bg, red[mainShade].hex),
        doctype: mix(base.bg, gray[secondaryShade].hex),
        entity: mix(base.bg, red[mainShade].hex),
        function: mix(base.bg, green[mainShade].hex),
        hexcode: mix(base.bg, blue[mainShade].hex),
        id: mix(base.bg, purple[mainShade].hex),
        important: mix(base.bg, purple[mainShade].hex),
        inserted: mix(base.bg, yellow[mainShade].hex),
        keyword: mix(base.bg, magenta[mainShade].hex),
        number: mix(base.bg, purple[mainShade].hex),
        operator: mix(base.bg, magenta[mainShade].hex),
        prolog: mix(base.bg, gray[secondaryShade].hex),
        property: mix(base.bg, blue[mainShade].hex),
        pseudoClass: mix(base.bg, yellow[mainShade].hex),
        pseudoElement: mix(base.bg, yellow[mainShade].hex),
        punctuation: mix(base.bg, gray[mainShade].hex),
        regex: mix(base.bg, blue[mainShade].hex),
        selector: mix(base.bg, red[mainShade].hex),
        string: mix(base.bg, yellow[mainShade].hex),
        symbol: mix(base.bg, purple[mainShade].hex),
        tag: mix(base.bg, red[mainShade].hex),
        unit: mix(base.bg, orange[mainShade].hex),
        url: mix(base.bg, red[mainShade].hex),
        variable: mix(base.bg, red[mainShade].hex),
      }
    },
  })

  return {...studioTheme, color, __themer: true, v2: undefined}
}
