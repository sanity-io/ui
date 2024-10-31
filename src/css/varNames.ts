import {
  Space,
  SPACE,
  ThemeColorCardToneKey,
  ThemeColorInputModeKey,
  ThemeColorInputStateKey,
  ThemeColorSchemeKey,
} from '@sanity/ui/theme'
import {
  type ColorCardVarNames,
  type ColorInputStateVarNames,
  type CSSVarName,
  type VarNames,
} from './types'

export const varNames: VarNames = {
  color: {
    dark: {
      transparent: buildColorCardVarNames({scheme: 'dark', tone: 'transparent'}),
      default: buildColorCardVarNames({scheme: 'dark', tone: 'default'}),
      primary: buildColorCardVarNames({scheme: 'dark', tone: 'primary'}),
      positive: buildColorCardVarNames({scheme: 'dark', tone: 'positive'}),
      caution: buildColorCardVarNames({scheme: 'dark', tone: 'caution'}),
      critical: buildColorCardVarNames({scheme: 'dark', tone: 'critical'}),
    },
    light: {
      transparent: buildColorCardVarNames({scheme: 'light', tone: 'transparent'}),
      default: buildColorCardVarNames({scheme: 'light', tone: 'default'}),
      primary: buildColorCardVarNames({scheme: 'light', tone: 'primary'}),
      positive: buildColorCardVarNames({scheme: 'light', tone: 'positive'}),
      caution: buildColorCardVarNames({scheme: 'light', tone: 'caution'}),
      critical: buildColorCardVarNames({scheme: 'light', tone: 'critical'}),
    },

    //
    accent: {
      fg: `--color-accent-fg`,
    },
    avatar: {
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
        fg: `--color-avatar-orange-fg`,
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
        fg: `--color-avatar-cyan-fg`,
      },
    },
    badge: {
      bg: `--color-badge-bg`,
      dot: `--color-badge-dot`,
      fg: `--color-badge-fg`,
      icon: `--color-badge-icon`,
      default: {
        bg: `--color-badge-default-bg`,
        dot: `--color-badge-default-dot`,
        fg: `--color-badge-default-fg`,
        icon: `--color-badge-default-icon`,
      },
      primary: {
        bg: `--color-badge-primary-bg`,
        dot: `--color-badge-primary-dot`,
        fg: `--color-badge-primary-fg`,
        icon: `--color-badge-primary-icon`,
      },
      positive: {
        bg: `--color-badge-positive-bg`,
        dot: `--color-badge-positive-dot`,
        fg: `--color-badge-positive-fg`,
        icon: `--color-badge-positive-icon`,
      },
      caution: {
        bg: `--color-badge-caution-bg`,
        dot: `--color-badge-caution-dot`,
        fg: `--color-badge-caution-fg`,
        icon: `--color-badge-caution-icon`,
      },
      critical: {
        bg: `--color-badge-critical-bg`,
        dot: `--color-badge-critical-dot`,
        fg: `--color-badge-critical-fg`,
        icon: `--color-badge-critical-icon`,
      },
    },
    bg: `--color-bg`,
    border: `--color-border`,
    code: {
      bg: `--color-code-bg`,
      fg: `--color-code-fg`,
    },
    fg: `--color-fg`,
    icon: `--color-icon`,
    kbd: {
      bg: `--color-kbd-bg`,
      border: `--color-kbd-border`,
      fg: `--color-kbd-fg`,
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
    syntax: {
      atrule: `--color-syntax-atrule`,
      attrName: `--color-syntax-attrName`,
      attrValue: `--color-syntax-attrValue`,
      attribute: `--color-syntax-attribute`,
      boolean: `--color-syntax-boolean`,
      builtin: `--color-syntax-builtin`,
      cdata: `--color-syntax-cdata`,
      char: `--color-syntax-char`,
      class: `--color-syntax-class`,
      className: `--color-syntax-className`,
      comment: `--color-syntax-comment`,
      constant: `--color-syntax-constant`,
      deleted: `--color-syntax-deleted`,
      doctype: `--color-syntax-doctype`,
      entity: `--color-syntax-entity`,
      function: `--color-syntax-function`,
      hexcode: `--color-syntax-hexcode`,
      id: `--color-syntax-id`,
      important: `--color-syntax-important`,
      inserted: `--color-syntax-inserted`,
      keyword: `--color-syntax-keyword`,
      number: `--color-syntax-number`,
      operator: `--color-syntax-operator`,
      prolog: `--color-syntax-prolog`,
      property: `--color-syntax-property`,
      pseudoClass: `--color-syntax-pseudoClass`,
      pseudoElement: `--color-syntax-pseudoElement`,
      punctuation: `--color-syntax-punctuation`,
      regex: `--color-syntax-regex`,
      selector: `--color-syntax-selector`,
      string: `--color-syntax-string`,
      symbol: `--color-syntax-symbol`,
      tag: `--color-syntax-tag`,
      unit: `--color-syntax-unit`,
      url: `--color-syntax-url`,
      variable: `--color-syntax-variable`,
    },
  },
  avatar: {
    focusRing: {
      offset: `--avatar-focus-ring-offset`,
      width: `--avatar-focus-ring-width`,
    },
  },
  space: Object.fromEntries(
    SPACE.map((space) => [space, `--space-${String(space).replace('.', '_')}` as CSSVarName]),
  ) as Record<Space, CSSVarName>,
} as const

function buildColorCardVarNames(props: {
  scheme: ThemeColorSchemeKey
  tone: ThemeColorCardToneKey
}): ColorCardVarNames {
  const {scheme, tone} = props

  const prefix = `--color-${scheme}-${tone}` as const

  return {
    accent: {
      fg: `${prefix}-accent-fg`,
    },
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
    badge: {
      default: {
        bg: `${prefix}-badge-default-bg`,
        dot: `${prefix}-badge-default-dot`,
        fg: `${prefix}-badge-default-fg`,
        icon: `${prefix}-badge-default-icon`,
      },
      primary: {
        bg: `${prefix}-badge-primary-bg`,
        dot: `${prefix}-badge-primary-dot`,
        fg: `${prefix}-badge-primary-fg`,
        icon: `${prefix}-badge-primary-icon`,
      },
      positive: {
        bg: `${prefix}-badge-positive-bg`,
        dot: `${prefix}-badge-positive-dot`,
        fg: `${prefix}-badge-positive-fg`,
        icon: `${prefix}-badge-positive-icon`,
      },
      caution: {
        bg: `${prefix}-badge-caution-bg`,
        dot: `${prefix}-badge-caution-dot`,
        fg: `${prefix}-badge-caution-fg`,
        icon: `${prefix}-badge-caution-icon`,
      },
      critical: {
        bg: `${prefix}-badge-critical-bg`,
        dot: `${prefix}-badge-critical-dot`,
        fg: `${prefix}-badge-critical-fg`,
        icon: `${prefix}-badge-critical-icon`,
      },
    },
    bg: `${prefix}-bg`,
    border: `${prefix}-border`,
    code: {
      bg: `${prefix}-code-bg`,
      fg: `${prefix}-code-fg`,
    },
    fg: `${prefix}-fg`,
    focusRing: `${prefix}-focus-ring`,
    icon: `${prefix}-icon`,
    input: {
      default: {
        enabled: buildColorInputStateVarNames({mode: 'default', scheme, state: 'enabled', tone}),
        hovered: buildColorInputStateVarNames({mode: 'default', scheme, state: 'hovered', tone}),
        readOnly: buildColorInputStateVarNames({mode: 'default', scheme, state: 'readOnly', tone}),
        disabled: buildColorInputStateVarNames({mode: 'default', scheme, state: 'disabled', tone}),
      },
      invalid: {
        enabled: buildColorInputStateVarNames({mode: 'invalid', scheme, state: 'enabled', tone}),
        hovered: buildColorInputStateVarNames({mode: 'invalid', scheme, state: 'hovered', tone}),
        readOnly: buildColorInputStateVarNames({mode: 'invalid', scheme, state: 'readOnly', tone}),
        disabled: buildColorInputStateVarNames({mode: 'invalid', scheme, state: 'disabled', tone}),
      },
    },
    kbd: {
      bg: `${prefix}-kbd-bg`,
      border: `${prefix}-kbd-border`,
      fg: `${prefix}-kbd-fg`,
    },
    link: {
      fg: `${prefix}-link-fg`,
    },
    muted: {
      bg: `${prefix}-muted-bg`,
      fg: `${prefix}-muted-fg`,
    },
    skeleton: {
      from: `${prefix}-skeleton-from`,
      to: `${prefix}-skeleton-to`,
    },
    shadow: {
      outline: `${prefix}-shadow-outline`,
      umbra: `${prefix}-shadow-umbra`,
      penumbra: `${prefix}-shadow-penumbra`,
      ambient: `${prefix}-shadow-ambient`,
    },
    syntax: {
      atrule: `${prefix}-syntax-atrule`,
      attrName: `${prefix}-syntax-attrName`,
      attrValue: `${prefix}-syntax-attrValue`,
      attribute: `${prefix}-syntax-attribute`,
      boolean: `${prefix}-syntax-boolean`,
      builtin: `${prefix}-syntax-builtin`,
      cdata: `${prefix}-syntax-cdata`,
      char: `${prefix}-syntax-char`,
      class: `${prefix}-syntax-class`,
      className: `${prefix}-syntax-className`,
      comment: `${prefix}-syntax-comment`,
      constant: `${prefix}-syntax-constant`,
      deleted: `${prefix}-syntax-deleted`,
      doctype: `${prefix}-syntax-doctype`,
      entity: `${prefix}-syntax-entity`,
      function: `${prefix}-syntax-function`,
      hexcode: `${prefix}-syntax-hexcode`,
      id: `${prefix}-syntax-id`,
      important: `${prefix}-syntax-important`,
      inserted: `${prefix}-syntax-inserted`,
      keyword: `${prefix}-syntax-keyword`,
      number: `${prefix}-syntax-number`,
      operator: `${prefix}-syntax-operator`,
      prolog: `${prefix}-syntax-prolog`,
      property: `${prefix}-syntax-property`,
      pseudoClass: `${prefix}-syntax-pseudoClass`,
      pseudoElement: `${prefix}-syntax-pseudoElement`,
      punctuation: `${prefix}-syntax-punctuation`,
      regex: `${prefix}-syntax-regex`,
      selector: `${prefix}-syntax-selector`,
      string: `${prefix}-syntax-string`,
      symbol: `${prefix}-syntax-symbol`,
      tag: `${prefix}-syntax-tag`,
      unit: `${prefix}-syntax-unit`,
      url: `${prefix}-syntax-url`,
      variable: `${prefix}-syntax-variable`,
    },
  }
}

function buildColorInputStateVarNames(props: {
  mode: ThemeColorInputModeKey
  scheme: ThemeColorSchemeKey
  state: ThemeColorInputStateKey
  tone: ThemeColorCardToneKey
}): ColorInputStateVarNames {
  const {mode, scheme, state, tone} = props

  const prefix = `--color-${scheme}-${tone}-input-${mode}-${state}` as const

  return {
    bg: `${prefix}-bg`,
    border: `${prefix}-border`,
    fg: `${prefix}-fg`,
    muted: {
      bg: `${prefix}-muted-bg`,
    },
    placeholder: `${prefix}-placeholder`,
  }
}
