import {responsiveRules} from '../../responsiveRules'
import {Rules} from '../../types'

export const textRules: Rules = {
  'text': {
    '--font-weight-regular': `var(--font-text-weight-regular)`,
    '--font-weight-medium': `var(--font-text-weight-medium)`,
    '--font-weight-semibold': `var(--font-text-weight-semibold)`,
    '--font-weight-bold': `var(--font-text-weight-bold)`,

    '--font-family': `var(--font-text-family)`,
    '--font-feature-settings': `var(--font-text-feature-settings)`,

    'color': 'var(--color-fg)',

    '@nest': {
      '& a': {
        color: 'var(--color-link-fg)',
        textDecoration: 'none',
      },

      '& a:hover': {
        color: 'var(--color-fg)',
      },

      // '& svg': {
      //   color: 'var(--color-icon)',
      // },
    },
  },

  // 'text-accent': {
  //   '--color-fg': 'var(--color-accent-fg)',
  // },

  'text-muted': {
    color: 'var(--color-muted-fg)',
    // '--color-fg': 'var(--color-tinted-default-fg-4)',
  },

  ...responsiveRules('text-0', {
    '--font-size': 'var(--font-text-0-size)',
    '--font-line-height': 'var(--font-text-0-line-height)',
    '--font-letter-spacing': 'var(--font-text-0-letter-spacing)',
    '--font-icon-size': 'var(--font-text-0-icon-size)',
    '--font-ascender-height': 'var(--font-text-0-ascender-height)',
    '--font-descender-height': 'var(--font-text-0-descender-height)',
    // '--font-cap-height': 'var(--font-text-0-cap-height)',
  }),

  ...responsiveRules('text-1', {
    '--font-size': 'var(--font-text-1-size)',
    '--font-line-height': 'var(--font-text-1-line-height)',
    '--font-letter-spacing': 'var(--font-text-1-letter-spacing)',
    '--font-icon-size': 'var(--font-text-1-icon-size)',
    '--font-ascender-height': 'var(--font-text-1-ascender-height)',
    '--font-descender-height': 'var(--font-text-1-descender-height)',
    // '--font-cap-height': 'var(--font-text-1-cap-height)',
  }),

  ...responsiveRules('text-2', {
    '--font-size': 'var(--font-text-2-size)',
    '--font-line-height': 'var(--font-text-2-line-height)',
    '--font-letter-spacing': 'var(--font-text-2-letter-spacing)',
    '--font-icon-size': 'var(--font-text-2-icon-size)',
    '--font-ascender-height': 'var(--font-text-2-ascender-height)',
    '--font-descender-height': 'var(--font-text-2-descender-height)',
    // '--font-cap-height': 'var(--font-text-2-cap-height)',
  }),

  ...responsiveRules('text-3', {
    '--font-size': 'var(--font-text-3-size)',
    '--font-line-height': 'var(--font-text-3-line-height)',
    '--font-letter-spacing': 'var(--font-text-3-letter-spacing)',
    '--font-icon-size': 'var(--font-text-3-icon-size)',
    '--font-ascender-height': 'var(--font-text-3-ascender-height)',
    '--font-descender-height': 'var(--font-text-3-descender-height)',
    // '--font-cap-height': 'var(--font-text-3-cap-height)',
  }),

  ...responsiveRules('text-4', {
    '--font-size': 'var(--font-text-4-size)',
    '--font-line-height': 'var(--font-text-4-line-height)',
    '--font-letter-spacing': 'var(--font-text-4-letter-spacing)',
    '--font-icon-size': 'var(--font-text-4-icon-size)',
    '--font-ascender-height': 'var(--font-text-4-ascender-height)',
    '--font-descender-height': 'var(--font-text-4-descender-height)',
    // '--font-cap-height': 'var(--font-text-4-cap-height)',
  }),
}

// import {getTheme_v2} from '@sanity/ui/theme'
// import {ThemeProps} from '../../_compat'
// import {css} from '../../lib/styled'

// export function textBaseStyle(
//   props: {$accent?: boolean; $muted?: boolean} & ThemeProps,
// ): ReturnType<typeof css> {
//   const {$accent, $muted} = props
//   const {font} = getTheme_v2(props.theme)

//   return css`
//     color: var(--card-fg-color);

//     ${$accent &&
//     css`
//       color: var(--card-accent-fg-color);
//     `}

//     ${$muted &&
//     css`
//       color: var(--card-muted-fg-color);
//     `}

//     & code {
//       font-family: ${font.code.family};
//       border-radius: 1px;
//       background-color: var(--card-code-bg-color);
//       color: var(--card-code-fg-color);
//     }

//     & a {
//       text-decoration: none;
//       border-radius: 1px;
//       color: var(--card-link-color);
//       outline: none;

//       @media (hover: hover) {
//         &:hover {
//           text-decoration: underline;
//         }
//       }

//       &:focus {
//         box-shadow:
//           0 0 0 1px var(--card-bg-color),
//           0 0 0 3px var(--card-focus-ring-color);
//       }

//       &:focus:not(:focus-visible) {
//         box-shadow: none;
//       }
//     }

//     & strong {
//       font-weight: ${font.text.weights.bold};
//     }

//     & svg {
//       /* Certain popular CSS libraries changes the defaults for SVG display */
//       /* Make sure SVGs are rendered as inline elements */
//       display: inline;
//     }

//     & [data-sanity-icon] {
//       vertical-align: baseline;
//       color: var(--card-icon-color);

//       & path {
//         vector-effect: non-scaling-stroke !important;
//       }
//     }
//   `
// }
