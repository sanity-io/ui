import {ThemeColorBuilderOpts} from './factory'

const black = 'hsl(0, 0%, 0%)'
const white = 'hsl(0, 0%, 100%)'

const colors = {
  default: {
    lightest: 'hsl(0, 0%, 95%)',
    lighter: 'hsl(0, 0%, 70%)',
    light: 'hsl(0, 0%, 65%)',
    base: 'hsl(0, 0%, 50%)',
    dark: 'hsl(0, 0%, 35%)',
    darker: 'hsl(0, 0%, 20%)',
    darkest: 'hsl(0, 0%, 5%)',
  },
  transparent: {
    lightest: 'hsl(240, 100%, 95%)',
    lighter: 'hsl(240, 100%, 70%)',
    light: 'hsl(240, 100%, 65%)',
    base: 'hsl(240, 100%, 50%)',
    dark: 'hsl(240, 100%, 35%)',
    darker: 'hsl(240, 100%, 20%)',
    darkest: 'hsl(240, 100%, 5%)',
  },
  primary: {
    lightest: 'hsl(240, 100%, 95%)',
    lighter: 'hsl(240, 100%, 70%)',
    light: 'hsl(240, 100%, 65%)',
    base: 'hsl(240, 100%, 50%)',
    dark: 'hsl(240, 100%, 35%)',
    darker: 'hsl(240, 100%, 20%)',
    darkest: 'hsl(240, 100%, 5%)',
  },
  positive: {
    lightest: 'hsl(120, 100%, 95%)',
    lighter: 'hsl(120, 100%, 70%)',
    light: 'hsl(120, 100%, 65%)',
    base: 'hsl(120, 100%, 50%)',
    dark: 'hsl(120, 100%, 35%)',
    darker: 'hsl(120, 100%, 20%)',
    darkest: 'hsl(120, 100%, 5%)',
  },
  caution: {
    lightest: 'hsl(60, 100%, 95%)',
    lighter: 'hsl(60, 100%, 70%)',
    light: 'hsl(60, 100%, 65%)',
    base: 'hsl(60, 100%, 50%)',
    dark: 'hsl(60, 100%, 35%)',
    darker: 'hsl(60, 100%, 20%)',
    darkest: 'hsl(60, 100%, 5%)',
  },
  critical: {
    lightest: 'hsl(0, 100%, 95%)',
    lighter: 'hsl(0, 100%, 70%)',
    light: 'hsl(0, 100%, 65%)',
    base: 'hsl(0, 100%, 50%)',
    dark: 'hsl(0, 100%, 35%)',
    darker: 'hsl(0, 100%, 20%)',
    darkest: 'hsl(0, 100%, 5%)',
  },
}

const spots = {
  gray: 'hsl(0, 0%, 50%)',
  red: 'hsl(0, 100%, 50%)',
  orange: 'hsl(30, 100%, 50%)',
  yellow: 'hsl(60, 100%, 50%)',
  green: 'hsl(120, 100%, 50%)',
  cyan: 'hsl(180, 100%, 50%)',
  blue: 'hsl(240, 100%, 50%)',
  purple: 'hsl(270, 100%, 50%)',
  magenta: 'hsl(300, 100%, 50%)',
}

const tones = {
  transparent: {
    bg: [colors.transparent.darkest, colors.transparent.lightest],
    fg: [colors.transparent.lightest, colors.transparent.darkest],
    border: [colors.transparent.darker, colors.transparent.lighter],
    focusRing: [colors.transparent.base, colors.transparent.base],
  },
  primary: {
    bg: [colors.primary.darkest, colors.primary.lightest],
    fg: [colors.primary.lightest, colors.primary.darkest],
    border: [colors.primary.darker, colors.primary.lighter],
    focusRing: [colors.primary.base, colors.primary.base],
  },
  positive: {
    bg: [colors.positive.darkest, colors.positive.lightest],
    fg: [colors.positive.lightest, colors.positive.darkest],
    border: [colors.positive.darker, colors.positive.lighter],
    focusRing: [colors.positive.base, colors.positive.base],
  },
  caution: {
    bg: [colors.caution.darkest, colors.caution.lightest],
    fg: [colors.caution.lightest, colors.caution.darkest],
    border: [colors.caution.darker, colors.caution.lighter],
    focusRing: [colors.caution.base, colors.caution.base],
  },
  critical: {
    bg: [colors.critical.darkest, colors.critical.lightest],
    fg: [colors.critical.lightest, colors.critical.darkest],
    border: [colors.critical.darker, colors.critical.lighter],
    focusRing: [colors.critical.base, colors.critical.base],
  },
}

export const defaultOpts: ThemeColorBuilderOpts = {
  base: ({dark, name}) => {
    if (name === 'default') {
      return {
        bg: dark ? black : white,
        fg: dark ? white : black,
        border: dark ? colors.default.darkest : colors.default.lightest,
        focusRing: colors.primary.base,
        shadow: {
          outline: black,
          umbra: black,
          penumbra: black,
          ambient: black,
        },
        skeleton: {
          from: dark ? white : black,
          to: dark ? white : black,
        },
      }
    }

    // Variants:
    // - primary
    // - positive
    // - caution
    // - critical
    return {
      bg: tones[name].bg[dark ? 0 : 1],
      fg: tones[name].fg[dark ? 0 : 1],
      border: tones[name].border[dark ? 0 : 1],
      focusRing: tones[name].focusRing[dark ? 0 : 1],
      shadow: {
        outline: black,
        umbra: black,
        penumbra: black,
        ambient: black,
      },
      skeleton: {
        from: dark ? white : black,
        to: dark ? white : black,
      },
    }
  },

  solid: ({base, dark, state, tone}) => {
    const color = colors[tone]

    if (state === 'hovered') {
      return {
        bg: dark ? color.light : color.dark,
        bg2: dark ? color.light : color.dark,
        border: dark ? color.lighter : color.darker,
        fg: dark ? color.darkest : color.lightest,
        icon: dark ? color.darkest : color.lightest,
        muted: {
          fg: black,
        },
        accent: {
          fg: black,
        },
        link: {
          fg: black,
        },
        code: {
          bg: black,
          fg: black,
        },
        skeleton: base.skeleton,
      }
    }

    return {
      bg: color.base,
      bg2: color.base,
      border: dark ? color.light : color.dark,
      fg: dark ? color.darkest : color.lightest,
      icon: dark ? color.darkest : color.lightest,
      muted: {
        fg: black,
      },
      accent: {
        fg: black,
      },
      link: {
        fg: black,
      },
      code: {
        bg: black,
        fg: black,
      },
      skeleton: base.skeleton,
    }
  },

  muted: ({base, dark, state, tone}) => {
    const color = colors[tone]

    if (state === 'hovered') {
      return {
        bg: dark ? color.darker : color.lighter,
        bg2: dark ? color.darker : color.lighter,
        border: dark ? color.lighter : color.darker,
        fg: dark ? color.lightest : color.darkest,
        icon: dark ? color.lightest : color.darkest,
        muted: {
          fg: black,
        },
        accent: {
          fg: black,
        },
        link: {
          fg: black,
        },
        code: {
          bg: black,
          fg: black,
        },
        skeleton: base.skeleton,
      }
    }

    return {
      bg: dark ? color.darkest : color.lightest,
      bg2: dark ? color.darkest : color.lightest,
      border: dark ? color.darker : color.lighter,
      fg: dark ? color.lighter : color.darker,
      icon: dark ? color.lighter : color.darker,
      muted: {
        fg: black,
      },
      accent: {
        fg: black,
      },
      link: {
        fg: black,
      },
      code: {
        bg: black,
        fg: black,
      },
      skeleton: base.skeleton,
    }
  },

  button: ({base, mode, muted, solid}) => {
    if (mode === 'bleed') {
      return {
        ...muted,
        enabled: {
          bg: 'transparent',
          bg2: 'transparent',
          fg: muted.enabled.fg,
          icon: muted.enabled.fg,
          border: 'transparent',
          muted: {
            fg: black,
          },
          accent: {
            fg: black,
          },
          link: {
            fg: black,
          },
          code: {
            bg: black,
            fg: black,
          },
          skeleton: base.skeleton,
        },
        hovered: {
          bg: muted.enabled.bg,
          bg2: muted.enabled.bg,
          fg: muted.hovered.fg,
          icon: muted.hovered.fg,
          border: 'transparent',
          muted: {
            fg: black,
          },
          accent: {
            fg: black,
          },
          link: {
            fg: black,
          },
          code: {
            bg: black,
            fg: black,
          },
          skeleton: base.skeleton,
        },
      }
    }

    if (mode === 'ghost')
      return {
        ...solid,
        enabled: muted.enabled,
      }

    return solid
  },

  card: ({base}) => {
    return {
      bg: black,
      bg2: black,
      fg: black,
      icon: black,
      border: black,
      muted: {
        fg: black,
      },
      accent: {
        fg: black,
      },
      link: {
        fg: black,
      },
      code: {
        bg: black,
        fg: black,
      },
      skeleton: base.skeleton,
    }
  },

  input: () => {
    return {
      bg: black,
      bg2: black,
      fg: black,
      border: black,
      placeholder: black,
    }
  },

  selectable: ({muted, state, tone}) => {
    return muted[tone][state]
  },

  spot: ({key}) => {
    return spots[key]
  },

  syntax: () => ({
    atrule: black,
    attrName: black,
    attrValue: black,
    attribute: black,
    boolean: black,
    builtin: black,
    cdata: black,
    char: black,
    class: black,
    className: black,
    comment: black,
    constant: black,
    deleted: black,
    doctype: black,
    entity: black,
    function: black,
    hexcode: black,
    id: black,
    important: black,
    inserted: black,
    keyword: black,
    number: black,
    operator: black,
    prolog: black,
    property: black,
    pseudoClass: black,
    pseudoElement: black,
    punctuation: black,
    regex: black,
    selector: black,
    string: black,
    symbol: black,
    tag: black,
    unit: black,
    url: black,
    variable: black,
  }),
}
