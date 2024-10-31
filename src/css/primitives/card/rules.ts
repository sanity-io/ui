import {HUES, THEME_COLOR_CARD_TONES, THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'

import {
  ColorCardVarNames,
  ColorCardVars,
  ColorVariantVarNames,
  ColorVariantVars,
  Properties,
  type Rules,
} from '../../types'
import {varNames} from '../../varNames'
import {vars} from '../../vars'
import {toneMap} from './_constants'

export const cardRules: Rules = {
  card: {
    'backgroundColor': vars.color.bg,
    'color': vars.color.fg,

    [varNames.color.bg]: vars.color.tinted.default.bg[0],
    [varNames.color.border]: vars.color.tinted.default.border[1],
    [varNames.color.fg]: vars.color.tinted.default.fg[0],
    [varNames.color.muted.bg]: vars.color.tinted.default.bg[1],
    [varNames.color.muted.fg]: vars.color.tinted.default.fg[4],

    '@nest': {
      ...buildCardTonesRules(),

      '&[data-checkered]': {
        '--card-bg-image': `repeating-conic-gradient(var(--color-tinted-default-bg-0) 0% 25%, var(--color-tinted-default-bg-1) 0% 50%)`,
        'backgroundSize': `var(--space-3) var(--space-3)`,
        'backgroundPosition': '50% 50%',
        'backgroundImage': 'var(--card-bg-image)',
      },

      '&:is(a)': {
        'outline': 'none',
        'textDecoration': 'none',

        '@nest': {
          '&:not(:disabled)': {
            '@nest': {
              '&:hover': {
                '--color-bg': 'var(--color-tinted-default-bg-1)',
                '--color-fg': 'var(--color-tinted-default-fg-0)',
                '--color-muted-bg': 'var(--color-tinted-default-bg-2)',
                '--color-muted-fg': 'var(--color-tinted-default-fg-3)',
                // '--color-icon': 'var(--color-tinted-default-fg-1)',
              },

              '&:active, &[data-pressed]': {
                '--color-bg': 'var(--color-tinted-default-bg-2)',
                '--color-fg': 'var(--color-tinted-default-fg-1)',
                '--color-muted-bg': 'var(--color-tinted-default-bg-3)',
                '--color-muted-fg': 'var(--color-tinted-default-fg-4)',
                // '--color-icon': 'var(--color-tinted-default-fg-1)',
              },

              //
              '&[data-selectable]:focus, &[data-selected]': {
                '--color-bg': 'var(--color-solid-default-bg-1)',
                '--color-fg': 'var(--color-solid-default-fg-1)',
                '--color-muted-bg': 'var(--color-solid-default-bg-0)',
                '--color-muted-fg': 'var(--color-solid-default-fg-3)',
                // '--color-icon': 'var(--color-solid-default-fg-1)',
              },
            },
          },
        },
      },

      '&:is(button)': {
        'WebkitFontSmoothing': 'inherit',
        'appearance': 'none',
        'outline': 'none',
        'font': 'inherit',
        'textAlign': 'inherit',
        'border': 0,
        'width': ['-moz-available', '-webkit-fill-available', 'stretch'],
        'cursor': 'default',

        // todo
        // --card-focus-ring-box-shadow: none;
        // box-shadow: var(--card-focus-ring-box-shadow);

        '@nest': {
          '&:not(:disabled)': {
            '@nest': {
              '&:hover': {
                '--color-bg': 'var(--color-tinted-default-bg-1)',
                '--color-fg': 'var(--color-tinted-default-fg-1)',
                '--color-muted-bg': 'var(--color-tinted-default-bg-2)',
                '--color-muted-fg': 'var(--color-tinted-default-fg-3)',
                // '--color-icon': 'var(--color-tinted-default-fg-1)',
              },

              '&:active': {
                '--color-bg': 'var(--color-tinted-default-bg-2)',
                '--color-fg': 'var(--color-tinted-default-fg-1)',
                '--color-muted-bg': 'var(--color-tinted-default-bg-3)',
                '--color-muted-fg': 'var(--color-tinted-default-fg-4)',
                // '--color-icon': 'var(--color-tinted-default-fg-1)',
              },

              '&[data-pressed]': {
                '--color-bg': 'var(--color-tinted-default-bg-2)',
                '--color-fg': 'var(--color-tinted-default-fg-1)',
                '--color-muted-bg': 'var(--color-tinted-default-bg-3)',
                '--color-muted-fg': 'var(--color-tinted-default-fg-4)',
                // '--color-icon': 'var(--color-tinted-default-fg-1)',
              },

              // &:focus,
              '&[data-selectable]:focus, &[data-selected]': {
                '--color-bg': 'var(--color-solid-default-bg-2)',
                '--color-border': 'var(--color-solid-default-border-0)',
                '--color-fg': 'var(--color-solid-default-fg-1)',
                '--color-muted-bg': 'var(--color-solid-default-bg-3)',
                '--color-muted-fg': 'var(--color-solid-default-fg-4)',
                // '--color-icon': 'var(--color-solid-default-fg-1)',
              },
            },
          },

          '&:disabled': {
            '--color-bg': 'var(--color-tinted-default-bg-0)',
            '--color-fg': 'var(--color-tinted-default-border-2)',
            '--color-muted-bg': 'var(--color-tinted-default-bg-1)',
            '--color-muted-fg': 'var(--color-tinted-default-border-1)',
          },
        },
      },

      '&:is(pre)': {
        font: 'inherit',
      },
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Legacy `--card` variables
    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // '--card-accent-fg-color': 'var(--color-accent-fg)',
    // ...THEME_COLOR_AVATAR_COLORS.reduce((acc, color) => {
    //   return {
    //     ...acc,
    //     [`--card-avatar-${color}-bg-color`]: `var(--color-avatar-${color}-bg)`,
    //     [`--card-avatar-${color}-fg-color`]: `var(--color-avatar-${color}-fg)`,
    //   }
    // }, {} as Properties),
    // '--card-backdrop-color': 'var(--color-backdrop)',
    // ...THEME_COLOR_STATE_TONES.reduce((acc, tone) => {
    //   return {
    //     ...acc,
    //     [`--card-badge-${tone}-bg-color`]: `var(--color-badge-${tone}-bg)`,
    //     [`--card-badge-${tone}-dot-color`]: `var(--color-badge-${tone}-dot)`,
    //     [`--card-badge-${tone}-fg-color`]: `var(--color-badge-${tone}-fg)`,
    //     [`--card-badge-${tone}-icon-color`]: `var(--color-badge-${tone}-icon)`,
    //   }
    // }, {} as Properties),
    '--card-bg-color': vars.color.bg,
    '--card-bg2-color': vars.color.muted.bg,
    '--card-border-color': vars.color.border,
    '--card-code-bg-color': vars.color.muted.bg,
    '--card-code-fg-color': vars.color.tinted.default.fg[4],
    '--card-fg-color': vars.color.fg,
    '--card-focus-ring-color': vars.color.focusRing,
    '--card-icon-color': vars.color.fg,
    '--card-kbd-bg-color': vars.color.muted.bg,
    '--card-kbd-border-color': vars.color.tinted.default.border[1],
    '--card-kbd-fg-color': vars.color.muted.fg,
    '--card-link-color': vars.color.link.fg,
    '--card-link-fg-color': vars.color.link.fg,
    '--card-muted-bg-color': vars.color.muted.bg, // 'var(--color-muted-bg)', // vars.color.tinted.default.bg[1],
    '--card-muted-fg-color': vars.color.muted.fg, // vars.color.tinted.default.fg[4],
    '--card-shadow-outline-color': vars.color.shadow.outline,
    '--card-shadow-umbra-color': vars.color.shadow.umbra,
    '--card-shadow-penumbra-color': vars.color.shadow.penumbra,
    '--card-shadow-ambient-color': vars.color.shadow.ambient,
    // '--card-skeleton-from-color': 'var(--color-skeleton-from)',
    // '--card-skeleton-to-color': 'var(--color-skeleton-to)',
    '--card-hairline-soft-color': vars.color.tinted.default.border[1],
    '--card-hairline-hard-color': vars.color.tinted.default.border[2],
  },
}

function buildCardTonesRules() {
  const rules: Record<string, Properties> = {}

  for (const scheme of ['light', 'dark'] as const) {
    const props: Properties = {colorScheme: scheme}

    for (const cardTone of THEME_COLOR_CARD_TONES) {
      const source = vars.color[scheme][cardTone]
      const target = varNames.color[cardTone]

      Object.assign(props, {
        ...buildCardAvatarColorProperties({source, target}),

        [target.backdrop]: source.backdrop,
        [target.focusRing]: source.focusRing,
        [target.link.fg]: source.link.fg,

        [target.shadow.outline]: source.shadow.outline,
        [target.shadow.umbra]: source.shadow.umbra,
        [target.shadow.penumbra]: source.shadow.penumbra,
        [target.shadow.ambient]: source.shadow.ambient,

        [target.token.atrule]: source.token.atrule,
        [target.token.attrName]: source.token.attrName,
        [target.token.attrValue]: source.token.attrValue,
        [target.token.attribute]: source.token.attribute,
        [target.token.boolean]: source.token.boolean,
        [target.token.builtin]: source.token.builtin,
        [target.token.cdata]: source.token.cdata,
        [target.token.char]: source.token.char,
        [target.token.class]: source.token.class,
        [target.token.className]: source.token.className,
        [target.token.comment]: source.token.comment,
        [target.token.constant]: source.token.constant,
        [target.token.deleted]: source.token.deleted,
        [target.token.doctype]: source.token.doctype,
        [target.token.entity]: source.token.entity,
        [target.token.function]: source.token.function,
        [target.token.hexcode]: source.token.hexcode,
        [target.token.id]: source.token.id,
        [target.token.important]: source.token.important,
        [target.token.inserted]: source.token.inserted,
        [target.token.keyword]: source.token.keyword,
        [target.token.number]: source.token.number,
        [target.token.operator]: source.token.operator,
        [target.token.prolog]: source.token.prolog,
        [target.token.property]: source.token.property,
        [target.token.pseudoClass]: source.token.pseudoClass,
        [target.token.pseudoElement]: source.token.pseudoElement,
        [target.token.punctuation]: source.token.punctuation,
        [target.token.regex]: source.token.regex,
        [target.token.selector]: source.token.selector,
        [target.token.string]: source.token.string,
        [target.token.symbol]: source.token.symbol,
        [target.token.tag]: source.token.tag,
        [target.token.unit]: source.token.unit,
        [target.token.url]: source.token.url,
        [target.token.variable]: source.token.variable,

        ...buildCardColorVariantProperties({
          source: source.solid,
          target: target.solid,
        }),

        ...buildCardColorVariantProperties({
          source: source.tinted,
          target: target.tinted,
        }),
      })
    }

    rules[`&.${scheme}`] = props
  }

  for (const cardTone of THEME_COLOR_CARD_TONES) {
    const source = vars.color[cardTone]
    const target = varNames.color

    rules[`&.${toneMap[cardTone]}`] = {
      ...buildCardAvatarColorProperties({source, target}),

      [target.backdrop]: source.backdrop,
      [target.focusRing]: source.focusRing,
      [target.link.fg]: source.link.fg,

      [target.shadow.outline]: source.shadow.outline,
      [target.shadow.umbra]: source.shadow.umbra,
      [target.shadow.penumbra]: source.shadow.penumbra,
      [target.shadow.ambient]: source.shadow.ambient,

      [target.token.atrule]: source.token.atrule,
      [target.token.attrName]: source.token.attrName,
      [target.token.attrValue]: source.token.attrValue,
      [target.token.attribute]: source.token.attribute,
      [target.token.boolean]: source.token.boolean,
      [target.token.builtin]: source.token.builtin,
      [target.token.cdata]: source.token.cdata,
      [target.token.char]: source.token.char,
      [target.token.class]: source.token.class,
      [target.token.className]: source.token.className,
      [target.token.comment]: source.token.comment,
      [target.token.constant]: source.token.constant,
      [target.token.deleted]: source.token.deleted,
      [target.token.doctype]: source.token.doctype,
      [target.token.entity]: source.token.entity,
      [target.token.function]: source.token.function,
      [target.token.hexcode]: source.token.hexcode,
      [target.token.id]: source.token.id,
      [target.token.important]: source.token.important,
      [target.token.inserted]: source.token.inserted,
      [target.token.keyword]: source.token.keyword,
      [target.token.number]: source.token.number,
      [target.token.operator]: source.token.operator,
      [target.token.prolog]: source.token.prolog,
      [target.token.property]: source.token.property,
      [target.token.pseudoClass]: source.token.pseudoClass,
      [target.token.pseudoElement]: source.token.pseudoElement,
      [target.token.punctuation]: source.token.punctuation,
      [target.token.regex]: source.token.regex,
      [target.token.selector]: source.token.selector,
      [target.token.string]: source.token.string,
      [target.token.symbol]: source.token.symbol,
      [target.token.tag]: source.token.tag,
      [target.token.unit]: source.token.unit,
      [target.token.url]: source.token.url,
      [target.token.variable]: source.token.variable,

      ...buildCardColorVariantProperties({
        source: source.solid,
        target: target.solid,
      }),

      ...buildCardColorVariantProperties({
        source: source.tinted,
        target: target.tinted,
      }),
    }
  }

  return rules
}

function buildCardAvatarColorProperties(options: {
  source: ColorCardVars
  target: ColorCardVarNames
}): Properties {
  const {source, target} = options

  const props: Properties = {}

  for (const hue of HUES) {
    Object.assign(props, {
      [target.avatar[hue].bg]: source.avatar[hue].bg,
      [target.avatar[hue].fg]: source.avatar[hue].fg,
    } satisfies Properties)
  }

  return props
}

function buildCardColorVariantProperties(options: {
  source: ColorVariantVars
  target: ColorVariantVarNames
}): Properties {
  const {source, target} = options

  const props: Properties = {}

  for (const elementTone of THEME_COLOR_STATE_TONES) {
    Object.assign(props, {
      [target[elementTone].bg[0]]: source[elementTone].bg[0],
      [target[elementTone].bg[1]]: source[elementTone].bg[1],
      [target[elementTone].bg[2]]: source[elementTone].bg[2],
      [target[elementTone].bg[3]]: source[elementTone].bg[3],
      [target[elementTone].bg[4]]: source[elementTone].bg[4],

      [target[elementTone].border[0]]: source[elementTone].border[0],
      [target[elementTone].border[1]]: source[elementTone].border[1],
      [target[elementTone].border[2]]: source[elementTone].border[2],
      [target[elementTone].border[3]]: source[elementTone].border[3],
      [target[elementTone].border[4]]: source[elementTone].border[4],

      [target[elementTone].fg[0]]: source[elementTone].fg[0],
      [target[elementTone].fg[1]]: source[elementTone].fg[1],
      [target[elementTone].fg[2]]: source[elementTone].fg[2],
      [target[elementTone].fg[3]]: source[elementTone].fg[3],
      [target[elementTone].fg[4]]: source[elementTone].fg[4],
    } satisfies Properties)
  }

  return props
}

// export function cardColorStyle(props: CardStyleProps & ThemeProps): ReturnType<typeof css> {
//   const {$checkered, $focusRing, $muted} = props
//   const {card, color, style} = getTheme_v2(props.theme)
//   const border = {width: card.border.width, color: 'var(--card-border-color)'}

//   return css`
//

//     ${_cardColorStyle(color, color, $checkered)}

//     background-color: ${$muted ? 'var(--card-muted-bg-color)' : 'var(--card-bg-color)'};
//     color: var(--card-fg-color);

//     /* &:is(button) */
//     &[data-as='button'] {

//       &:disabled {
//         ${_cardColorStyle(color, color.selectable.default.disabled, $checkered)}
//       }

//       &:not(:disabled) {
//         &[data-pressed] {
//           ${_cardColorStyle(color, color.selectable.default.pressed, $checkered)}
//         }

//         &[data-selected] {
//           ${_cardColorStyle(color, color.selectable.default.selected, $checkered)}
//         }

//         @media (hover: hover) {
//           &:not([data-pressed]):not([data-selected]) {
//             &[data-hovered],
//             &:hover {
//               ${_cardColorStyle(color, color.selectable.default.hovered, $checkered)}
//             }

//             &:active {
//               ${_cardColorStyle(color, color.selectable.default.pressed, $checkered)}
//             }
//           }
//         }

//         &:focus-visible {
//           --card-focus-ring-box-shadow: ${$focusRing
//             ? focusRingStyle({base: color, border, focusRing: card.focusRing})
//             : undefined};
//         }
//       }
//     }

//     /* &:is(a) */
//     &[data-as='a'] {
//       cursor: pointer;
//       box-shadow: var(--card-focus-ring-box-shadow);

//       &[data-disabled] {
//         ${_cardColorStyle(color, color.selectable.default.disabled, $checkered)}
//       }

//       &:not([data-disabled]) {
//         &[data-pressed] {
//           ${_cardColorStyle(color, color.selectable.default.pressed, $checkered)}
//         }

//         &[data-selected] {
//           ${_cardColorStyle(color, color.selectable.default.selected, $checkered)}
//         }

//         @media (hover: hover) {
//           &:not([data-pressed]):not([data-selected]) {
//             &[data-hovered],
//             &:hover {
//               ${_cardColorStyle(color, color.selectable.default.hovered, $checkered)}
//             }

//             &:active {
//               ${_cardColorStyle(color, color.selectable.default.pressed, $checkered)}
//             }
//           }
//         }

//         &:focus-visible {
//           --card-focus-ring-box-shadow: ${$focusRing
//             ? focusRingStyle({base: color, border, focusRing: card.focusRing})
//             : undefined};
//         }
//       }
//     }

//     ${style?.card?.root}
//   `
// }
