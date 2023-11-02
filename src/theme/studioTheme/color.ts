import {black, ColorTints, hues, white} from '@sanity/color'
import {rgba} from '../lib/color-fns'
import {createColorTheme} from '../lib/theme'
import {multiply, screen} from './helpers'

export const tones: {[key: string]: ColorTints} = {
  default: hues.gray,
  transparent: hues.gray,
  primary: hues.blue,
  positive: hues.green,
  caution: hues.yellow,
  critical: hues.red,
}

const NEUTRAL_TONES = ['default', 'transparent']

export const color = createColorTheme({
  base: ({dark, name}) => {
    if (name === 'default') {
      const tints = hues.gray
      const skeletonFrom = dark ? tints[900].hex : tints[100].hex

      return {
        fg: dark ? white.hex : black.hex,
        bg: dark ? black.hex : white.hex,
        border: tints[dark ? 800 : 200].hex,
        focusRing: hues.blue[dark ? 500 : 500].hex,
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
      focusRing: tints[500].hex,
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
        iconColor: '', // Add color

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
        iconColor: '', // Add color

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
        iconColor: '', // Add color

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
        iconColor: '', // Add color

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
      iconColor: '', // Add color

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
        iconColor: '', // Add color
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
        iconColor: '', // Add color

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
        iconColor: '', // Add color

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
        iconColor: '', // Add color

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
      iconColor: '', // Add color

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
      border: base.border,
      iconColor: '', // Add color
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

  input: ({base, dark, mode, state}) => {
    const mix = dark ? screen : multiply

    if (mode === 'invalid') {
      const tints = tones.critical

      return {
        bg: mix(base.bg, tints[dark ? 950 : 50].hex),
        bg2: '', // Add color
        fg: mix(base.bg, tints[dark ? 400 : 600].hex),
        border: mix(base.bg, tints[dark ? 800 : 200].hex),
        placeholder: mix(base.bg, tints[dark ? 600 : 400].hex),
      }
    }

    if (state === 'hovered') {
      return {
        bg: base.bg,
        bg2: '', // Add color

        fg: base.fg,
        border: mix(base.bg, hues.gray[dark ? 700 : 300].hex),
        placeholder: mix(base.bg, hues.gray[dark ? 600 : 400].hex),
      }
    }

    if (state === 'disabled') {
      return {
        bg: mix(base.bg, hues.gray[dark ? 950 : 50].hex),
        bg2: '', // Add color

        fg: mix(base.bg, hues.gray[dark ? 700 : 300].hex),
        border: mix(base.bg, hues.gray[dark ? 900 : 100].hex),
        placeholder: mix(base.bg, hues.gray[dark ? 800 : 200].hex),
      }
    }

    if (state === 'readOnly') {
      return {
        bg: mix(base.bg, hues.gray[dark ? 950 : 50].hex),
        bg2: '', // Add color

        fg: mix(base.bg, hues.gray[dark ? 200 : 800].hex),
        border: mix(base.bg, hues.gray[dark ? 800 : 200].hex),
        placeholder: mix(base.bg, hues.gray[dark ? 600 : 400].hex),
      }
    }

    return {
      bg: base.bg,
      bg2: '', // Add color
      fg: base.fg,
      border: base.border,
      placeholder: mix(base.bg, hues.gray[dark ? 600 : 400].hex),
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

    return mix(base.bg, hues[key][dark ? 400 : 500].hex)
  },

  syntax: ({base, dark}) => {
    const mix = dark ? screen : multiply
    const mainShade = dark ? 400 : 600
    const secondaryShade = dark ? 600 : 400

    return {
      atrule: mix(base.bg, hues.purple[mainShade].hex),
      attrName: mix(base.bg, hues.green[mainShade].hex),
      attrValue: mix(base.bg, hues.yellow[mainShade].hex),
      attribute: mix(base.bg, hues.yellow[mainShade].hex),
      boolean: mix(base.bg, hues.purple[mainShade].hex),
      builtin: mix(base.bg, hues.purple[mainShade].hex),
      cdata: mix(base.bg, hues.yellow[mainShade].hex),
      char: mix(base.bg, hues.yellow[mainShade].hex),
      class: mix(base.bg, hues.orange[mainShade].hex),
      className: mix(base.bg, hues.cyan[mainShade].hex),
      comment: mix(base.bg, hues.gray[secondaryShade].hex),
      constant: mix(base.bg, hues.purple[mainShade].hex),
      deleted: mix(base.bg, hues.red[mainShade].hex),
      doctype: mix(base.bg, hues.gray[secondaryShade].hex),
      entity: mix(base.bg, hues.red[mainShade].hex),
      function: mix(base.bg, hues.green[mainShade].hex),
      hexcode: mix(base.bg, hues.blue[mainShade].hex),
      id: mix(base.bg, hues.purple[mainShade].hex),
      important: mix(base.bg, hues.purple[mainShade].hex),
      inserted: mix(base.bg, hues.yellow[mainShade].hex),
      keyword: mix(base.bg, hues.magenta[mainShade].hex),
      number: mix(base.bg, hues.purple[mainShade].hex),
      operator: mix(base.bg, hues.magenta[mainShade].hex),
      prolog: mix(base.bg, hues.gray[secondaryShade].hex),
      property: mix(base.bg, hues.blue[mainShade].hex),
      pseudoClass: mix(base.bg, hues.yellow[mainShade].hex),
      pseudoElement: mix(base.bg, hues.yellow[mainShade].hex),
      punctuation: mix(base.bg, hues.gray[mainShade].hex),
      regex: mix(base.bg, hues.blue[mainShade].hex),
      selector: mix(base.bg, hues.red[mainShade].hex),
      string: mix(base.bg, hues.yellow[mainShade].hex),
      symbol: mix(base.bg, hues.purple[mainShade].hex),
      tag: mix(base.bg, hues.red[mainShade].hex),
      unit: mix(base.bg, hues.orange[mainShade].hex),
      url: mix(base.bg, hues.red[mainShade].hex),
      variable: mix(base.bg, hues.red[mainShade].hex),
    }
  },
})
