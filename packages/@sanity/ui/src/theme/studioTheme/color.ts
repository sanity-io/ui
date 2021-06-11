import {black, ColorTints, hues, white} from '@sanity/color'
import {rgba} from '../lib/color-fns'
import {createColorTheme} from '../lib/theme'
import {multiply, screen} from './helpers'

const tones: {[key: string]: ColorTints} = {
  default: hues.gray,
  primary: hues.blue,
  positive: hues.green,
  caution: hues.yellow,
  critical: hues.red,
}

export const color = createColorTheme({
  base: ({dark, name}) => {
    if (name === 'default') {
      return {
        fg: dark ? white.hex : black.hex,
        bg: dark ? black.hex : white.hex,
        border: hues.gray[dark ? 900 : 200].hex,
        focusRing: hues.blue[500].hex,
        shadow: {
          outline: rgba(hues.gray[500].hex, dark ? 0.2 : 0.4),
          umbra: rgba(dark ? black.hex : hues.gray[500].hex, 0.2),
          penumbra: rgba(dark ? black.hex : hues.gray[500].hex, 0.14),
          ambient: rgba(dark ? black.hex : hues.gray[500].hex, 0.12),
        },
        skeleton: {
          from: dark ? hues.gray[900].hex : hues.gray[100].hex,
          to: rgba(dark ? hues.gray[900].hex : hues.gray[100].hex, 0.5),
        },
      }
    }

    if (name === 'transparent') {
      const tints = tones.default

      return {
        fg: tints[dark ? 100 : 900].hex,
        bg: tints[dark ? 950 : 50].hex,
        border: tints[dark ? 800 : 300].hex,
        focusRing: hues.blue[500].hex,
        shadow: {
          outline: rgba(tints[500].hex, dark ? 0.2 : 0.4),
          umbra: rgba(dark ? black.hex : tints[500].hex, 0.2),
          penumbra: rgba(dark ? black.hex : tints[500].hex, 0.14),
          ambient: rgba(dark ? black.hex : tints[500].hex, 0.12),
        },
        skeleton: {
          from: dark ? tints[800].hex : tints[200].hex,
          to: rgba(dark ? tints[800].hex : tints[200].hex, 0.5),
        },
      }
    }

    const tints = tones[name] || tones.default

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
        from: dark ? tints[800].hex : tints[200].hex,
        to: rgba(dark ? tints[800].hex : tints[200].hex, 0.5),
      },
    }
  },

  solid: ({base, dark, state, tone}) => {
    const mix = dark ? screen : multiply
    const tints = tones[tone] || tones.default

    if (state === 'disabled') {
      return {
        bg: mix(base.bg, hues.gray[dark ? 800 : 200].hex),
        border: mix(base.bg, hues.gray[dark ? 800 : 200].hex),
        fg: mix(base.bg, dark ? black.hex : white.hex),
      }
    }

    if (state === 'hovered') {
      return {
        bg: mix(base.bg, tints[dark ? 300 : 600].hex),
        border: mix(base.bg, tints[dark ? 300 : 600].hex),
        fg: mix(base.bg, dark ? black.hex : white.hex),
      }
    }

    if (state === 'pressed') {
      return {
        bg: mix(base.bg, tints[dark ? 200 : 800].hex),
        border: mix(base.bg, tints[dark ? 200 : 800].hex),
        fg: mix(base.bg, dark ? black.hex : white.hex),
      }
    }

    if (state === 'selected') {
      return {
        bg: mix(base.bg, tints[dark ? 200 : 800].hex),
        border: mix(base.bg, tints[dark ? 200 : 800].hex),
        fg: mix(base.bg, dark ? black.hex : white.hex),
      }
    }

    // state: "enabled" | unknown
    return {
      bg: mix(base.bg, tints[dark ? 400 : 500].hex),
      border: mix(base.bg, tints[dark ? 400 : 500].hex),
      fg: mix(base.bg, dark ? black.hex : white.hex),
    }
  },

  muted: ({base, dark, state, tone}) => {
    const mix = dark ? screen : multiply
    const tints = tones[tone] || tones.default

    if (state === 'disabled') {
      return {
        bg: mix(base.bg, hues.gray[dark ? 950 : 50].hex),
        border: mix(base.bg, hues.gray[dark ? 950 : 50].hex),
        fg: mix(base.bg, hues.gray[dark ? 800 : 200].hex),
      }
    }

    if (state === 'hovered') {
      return {
        bg: mix(base.bg, tints[dark ? 950 : 50].hex),
        border: mix(base.bg, tints[dark ? 950 : 50].hex),
        fg: mix(base.bg, tints[dark ? 100 : 900].hex),
      }
    }

    if (state === 'pressed') {
      return {
        bg: mix(base.bg, tints[dark ? 900 : 100].hex),
        border: mix(base.bg, tints[dark ? 900 : 100].hex),
        fg: mix(base.bg, tints[dark ? 100 : 900].hex),
      }
    }

    if (state === 'selected') {
      return {
        bg: mix(base.bg, tints[dark ? 900 : 100].hex),
        border: mix(base.bg, tints[dark ? 900 : 100].hex),
        fg: mix(base.bg, tints[dark ? 100 : 900].hex),
      }
    }

    return {
      bg: mix(base.bg, tints[dark ? 900 : 100].hex),
      border: mix(base.bg, tints[dark ? 900 : 100].hex),
      fg: mix(base.bg, tints[dark ? 300 : 700].hex),
    }
  },

  button: ({base, mode, muted, solid}) => {
    if (mode === 'bleed') {
      return {
        ...muted,
        enabled: {
          ...muted.enabled,
          bg: base.bg,
          border: base.bg,
        },
        disabled: {
          ...muted.disabled,
          bg: base.bg,
          border: base.bg,
        },
      }
    }

    if (mode === 'ghost') {
      return {
        ...solid,
        enabled: {...muted.enabled, bg: base.bg, border: base.border},
        disabled: {
          ...muted.disabled,
          bg: base.bg,
        },
      }
    }

    return solid
  },

  input: ({base, dark, mode, state}) => {
    const mix = dark ? screen : multiply

    if (mode === 'invalid') {
      const tints = tones.critical

      return {
        bg: mix(base.bg, tints[dark ? 950 : 50].hex),
        fg: mix(base.bg, tints[dark ? 300 : 700].hex),
        border: mix(base.bg, tints[dark ? 800 : 200].hex),
        placeholder: mix(base.bg, tints[dark ? 600 : 400].hex),
      }
    }

    if (state === 'hovered') {
      return {
        bg: base.bg,
        fg: base.fg,
        border: mix(base.bg, hues.gray[dark ? 700 : 300].hex),
        placeholder: mix(base.bg, hues.gray[dark ? 600 : 400].hex),
      }
    }

    if (state === 'disabled') {
      return {
        bg: mix(base.bg, hues.gray[dark ? 950 : 50].hex),
        fg: mix(base.bg, hues.gray[dark ? 700 : 300].hex),
        border: mix(base.bg, hues.gray[dark ? 900 : 100].hex),
        placeholder: mix(base.bg, hues.gray[dark ? 800 : 200].hex),
      }
    }

    if (state === 'readOnly') {
      return {
        bg: mix(base.bg, hues.gray[dark ? 950 : 50].hex),
        fg: mix(base.bg, hues.gray[dark ? 200 : 800].hex),
        border: mix(base.bg, hues.gray[dark ? 800 : 200].hex),
        placeholder: mix(base.bg, hues.gray[dark ? 600 : 400].hex),
      }
    }

    return {
      bg: base.bg,
      fg: base.fg,
      border: base.border,
      placeholder: mix(base.bg, hues.gray[dark ? 600 : 400].hex),
    }
  },

  card: ({base, dark, muted, name, state}) => {
    let mix = dark ? screen : multiply

    if (state === 'selected') {
      mix = dark ? multiply : screen

      const tint = ['default', 'transparent'].includes(name) ? hues.blue : tones[name]
      const bg = tint[dark ? 400 : 500].hex

      return {
        bg,
        fg: dark ? black.hex : white.hex,
        border: tint[dark ? 300 : 400].hex,
        muted: {
          fg: mix(bg, hues.gray[dark ? 600 : 300].hex),
        },
        accent: {
          fg: mix(bg, hues.red[dark ? 600 : 500].hex),
        },
        link: {
          fg: mix(bg, hues.blue[dark ? 600 : 300].hex),
        },
        code: {
          bg: mix(bg, hues.gray[dark ? 50 : 950].hex),
          fg: mix(bg, hues.gray[dark ? 600 : 300].hex),
        },
        skeleton: base.skeleton,
      }
    }

    if (state === 'hovered') {
      const bg = muted.hovered.bg

      return {
        ...muted.hovered,
        // fg: base.fg,
        border: mix(bg, base.border),
        muted: {
          fg: mix(bg, hues.gray[dark ? 400 : 700].hex),
        },
        accent: {
          fg: mix(bg, hues.red[dark ? 500 : 500].hex),
        },
        link: {
          fg: mix(bg, hues.blue[dark ? 400 : 700].hex),
        },
        code: {
          bg: mix(bg, hues.gray[dark ? 950 : 50].hex),
          fg: hues.gray[dark ? 400 : 600].hex,
        },
        skeleton: base.skeleton,
      }
    }

    if (state === 'pressed') {
      return {
        ...muted.pressed,
        fg: base.fg,
        muted: {
          fg: mix(muted.pressed.bg, hues.gray[dark ? 400 : 700].hex),
        },
        accent: {
          fg: mix(muted.pressed.bg, hues.red[dark ? 500 : 500].hex),
        },
        link: {
          fg: mix(muted.pressed.bg, hues.blue[dark ? 400 : 700].hex),
        },
        code: {
          bg: mix(muted.pressed.bg, hues.gray[dark ? 950 : 50].hex),
          fg: hues.gray[dark ? 400 : 700].hex,
        },
        skeleton: base.skeleton,
      }
    }

    if (state === 'disabled') {
      return {
        ...muted.disabled,
        muted: {
          fg: muted.disabled.fg,
        },
        accent: {
          fg: muted.disabled.fg,
        },
        link: {
          fg: muted.disabled.fg,
        },
        code: {
          bg: 'transparent',
          fg: muted.disabled.fg,
        },
        skeleton: base.skeleton,
      }
    }

    return {
      bg: base.bg,
      fg: base.fg,
      border: base.border,
      muted: {
        fg: mix(base.bg, hues.gray[dark ? 400 : 700].hex),
      },
      accent: {
        fg: mix(base.bg, hues.red[dark ? 500 : 500].hex),
      },
      link: {
        fg: mix(base.bg, hues.blue[dark ? 400 : 700].hex),
      },
      code: {
        bg: mix(base.bg, hues.gray[dark ? 950 : 50].hex),
        fg: hues.gray[dark ? 400 : 700].hex,
      },
      skeleton: base.skeleton,
    }
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
