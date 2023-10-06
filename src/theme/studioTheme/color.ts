import {black, ColorTints, hues, white} from '@sanity/color'
import {rgba} from '../lib/color-fns'
import {createColorTheme, ThemeColorName} from '../lib/theme'
import {multiply, screen} from './helpers'
import {getColorHex} from './tints'

export const tones: Record<ThemeColorName, ColorTints> = {
  default: hues.gray,
  transparent: hues.gray,
  primary: hues.gray,
  positive: hues.cyan,
  caution: hues.yellow,
  critical: hues.red,
} as const

const NEUTRAL_TONES = ['default', 'transparent']

export const color = createColorTheme({
  tones,
  base: ({dark, name}) => {
    if (name === 'default') {
      const tints = hues.gray
      const skeletonFrom = dark ? tints[900].hex : tints[100].hex

      return {
        fg: dark ? white.hex : black.hex,
        bg: dark ? black.hex : white.hex,
        border: tints[dark ? 800 : 200].hex,
        focusRing: getColorHex(tones['positive'], dark, 'positive', 'border_accent'),
        shadow: {
          outline: rgba(tints[500].hex, 0.4),
          umbra: dark ? rgba(tints[950].hex, 0.4) : rgba(tints[500].hex, 0.2),
          penumbra: dark ? rgba(tints[950].hex, 0.28) : rgba(tints[500].hex, 0.14),
          ambient: dark ? rgba(tints[950].hex, 0.24) : rgba(tints[500].hex, 0.12),
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
        focusRing: hues.blue[500].hex,
        shadow: {
          outline: rgba(tints[500].hex, 0.4),
          umbra: dark ? rgba(tints[900].hex, 0.4) : rgba(tints[500].hex, 0.2),
          penumbra: dark ? rgba(tints[900].hex, 0.28) : rgba(tints[500].hex, 0.14),
          ambient: dark ? rgba(tints[900].hex, 0.24) : rgba(tints[500].hex, 0.12),
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
      focusRing: getColorHex(tints, dark, name, 'border_accent'),
      shadow: {
        outline: rgba(tints[500].hex, 0.4),
        umbra: dark ? rgba(tints[900].hex, 0.4) : rgba(tints[500].hex, 0.2),
        penumbra: dark ? rgba(tints[900].hex, 0.28) : rgba(tints[500].hex, 0.14),
        ambient: dark ? rgba(tints[900].hex, 0.24) : rgba(tints[500].hex, 0.12),
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
        muted: {
          fg: mix(base.bg, tints[dark ? 800 : 200].hex),
        },
        accent: {
          fg: mix2(bg, hues.red[dark ? 800 : 200].hex),
        },
        link: {
          fg: mix2(bg, hues.blue[dark ? 800 : 200].hex),
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
        muted: {
          fg: mix(base.bg, tints[dark ? 800 : 200].hex),
        },
        accent: {
          fg: mix2(bg, hues.red[dark ? 800 : 200].hex),
        },
        link: {
          fg: mix2(bg, hues.blue[dark ? 800 : 200].hex),
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
        muted: {
          fg: mix(base.bg, tints[dark ? 800 : 200].hex),
        },
        accent: {
          fg: mix2(bg, hues.red[dark ? 800 : 200].hex),
        },
        link: {
          fg: mix2(bg, hues.blue[dark ? 800 : 200].hex),
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
      muted: {
        fg: mix(base.bg, tints[dark ? 900 : 100].hex),
      },
      accent: {
        fg: mix2(bg, hues.red[dark ? 900 : 100].hex),
      },
      link: {
        fg: mix2(bg, hues.blue[dark ? 900 : 100].hex),
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
      // if (isNeutral) {
      //   tints = tones.primary
      // }

      const bg = mix(base.bg, tints[dark ? 950 : 50].hex)
      const skeletonFrom = mix(bg, tints[dark ? 900 : 100].hex)

      return {
        bg,
        bg2: mix(bg, tints[dark ? 950 : 50].hex),
        border: mix(bg, tints[dark ? 900 : 100].hex),
        fg: mix(base.bg, tints[dark ? 200 : 800].hex),
        muted: {
          fg: mix(base.bg, tints[dark ? 400 : 600].hex),
        },
        accent: {
          fg: mix(base.bg, hues.red[dark ? 400 : 500].hex),
        },
        link: {
          fg: mix(base.bg, hues.blue[dark ? 400 : 600].hex),
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
        muted: {
          fg: mix(base.bg, tints[dark ? 400 : 600].hex),
        },
        accent: {
          fg: mix(bg, hues.red[dark ? 400 : 500].hex),
        },
        link: {
          fg: mix(bg, hues.blue[dark ? 400 : 600].hex),
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
        muted: {
          fg: mix(base.bg, tints[dark ? 400 : 600].hex),
        },
        accent: {
          fg: mix(bg, hues.red[dark ? 400 : 500].hex),
        },
        link: {
          fg: mix(bg, hues.blue[dark ? 400 : 600].hex),
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
      muted: {
        fg: mix(base.bg, tints[dark ? 400 : 600].hex),
      },
      accent: {
        fg: mix(base.bg, hues.red[dark ? 400 : 500].hex),
      },
      link: {
        fg: mix(base.bg, hues.blue[dark ? 400 : 600].hex),
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
      border: base.border,
      muted: {
        fg: mix(base.bg, tints[dark ? 400 : 600].hex),
      },
      accent: {
        fg: mix(base.bg, hues.red[dark ? 400 : 500].hex),
      },
      link: {
        fg: mix(base.bg, hues.blue[dark ? 400 : 600].hex),
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
})
