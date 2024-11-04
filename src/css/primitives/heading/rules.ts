import {responsiveRules} from '../../responsiveRules'
import {Rules} from '../../types'

export const headingRules: Rules = {
  'heading': {
    '--font-weight-regular': `var(--font-heading-weight-regular)`,
    '--font-weight-medium': `var(--font-heading-weight-medium)`,
    '--font-weight-semibold': `var(--font-heading-weight-semibold)`,
    '--font-weight-bold': `var(--font-heading-weight-bold)`,

    '--font-family': `var(--font-heading-family)`,
    '--font-feature-settings': `var(--font-heading-feature-settings)`,

    'color': 'var(--color-fg)',

    '@nest': {
      '& a': {
        color: 'var(--color-link-fg)',
        textDecoration: 'none',
      },
    },
  },

  // 'heading-accent': {
  //   '--color-fg': 'var(--color-accent-fg)',
  // },

  'heading-muted': {
    '--color-fg': 'var(--color-tinted-default-fg-4)',
  },

  ...responsiveRules('heading-0', {
    '--font-size': 'var(--font-heading-0-size)',
    '--font-line-height': 'var(--font-heading-0-line-height)',
    '--font-letter-spacing': 'var(--font-heading-0-letter-spacing)',
    '--font-icon-size': 'var(--font-heading-0-icon-size)',
    '--font-ascender-height': 'var(--font-heading-0-ascender-height)',
    '--font-descender-height': 'var(--font-heading-0-descender-height)',
    // '--font-cap-height': 'var(--font-heading-0-cap-height)',
  }),

  ...responsiveRules('heading-1', {
    '--font-size': 'var(--font-heading-1-size)',
    '--font-line-height': 'var(--font-heading-1-line-height)',
    '--font-letter-spacing': 'var(--font-heading-1-letter-spacing)',
    '--font-icon-size': 'var(--font-heading-1-icon-size)',
    '--font-ascender-height': 'var(--font-heading-1-ascender-height)',
    '--font-descender-height': 'var(--font-heading-1-descender-height)',
    // '--font-cap-height': 'var(--font-heading-1-cap-height)',
  }),

  ...responsiveRules('heading-2', {
    '--font-size': 'var(--font-heading-2-size)',
    '--font-line-height': 'var(--font-heading-2-line-height)',
    '--font-letter-spacing': 'var(--font-heading-2-letter-spacing)',
    '--font-icon-size': 'var(--font-heading-2-icon-size)',
    '--font-ascender-height': 'var(--font-heading-2-ascender-height)',
    '--font-descender-height': 'var(--font-heading-2-descender-height)',
    // '--font-cap-height': 'var(--font-heading-2-cap-height)',
  }),

  ...responsiveRules('heading-3', {
    '--font-size': 'var(--font-heading-3-size)',
    '--font-line-height': 'var(--font-heading-3-line-height)',
    '--font-letter-spacing': 'var(--font-heading-3-letter-spacing)',
    '--font-icon-size': 'var(--font-heading-3-icon-size)',
    '--font-ascender-height': 'var(--font-heading-3-ascender-height)',
    '--font-descender-height': 'var(--font-heading-3-descender-height)',
    // '--font-cap-height': 'var(--font-heading-3-cap-height)',
  }),

  ...responsiveRules('heading-4', {
    '--font-size': 'var(--font-heading-4-size)',
    '--font-line-height': 'var(--font-heading-4-line-height)',
    '--font-letter-spacing': 'var(--font-heading-4-letter-spacing)',
    '--font-icon-size': 'var(--font-heading-4-icon-size)',
    '--font-ascender-height': 'var(--font-heading-4-ascender-height)',
    '--font-descender-height': 'var(--font-heading-4-descender-height)',
    // '--font-cap-height': 'var(--font-heading-4-cap-height)',
  }),

  ...responsiveRules('heading-5', {
    '--font-size': 'var(--font-heading-5-size)',
    '--font-line-height': 'var(--font-heading-5-line-height)',
    '--font-letter-spacing': 'var(--font-heading-5-letter-spacing)',
    '--font-icon-size': 'var(--font-heading-5-icon-size)',
    '--font-ascender-height': 'var(--font-heading-5-ascender-height)',
    '--font-descender-height': 'var(--font-heading-5-descender-height)',
    // '--font-cap-height': 'var(--font-heading-5-cap-height)',
  }),
}

// import {getTheme_v2} from '@sanity/ui/theme'
// import {ThemeProps} from '../../_compat'
// import {css} from '../../lib/styled'
// import {HeadingStyleProps} from './types'

// export function headingBaseStyle(props: HeadingStyleProps & ThemeProps): ReturnType<typeof css> {
//   const {$accent, $muted} = props
//   const {font} = getTheme_v2(props.theme)

//   return css`
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
//       font-weight: ${font.heading.weights.bold};
//     }

//     & svg {
//       /* Certain popular CSS libraries changes the defaults for SVG display */
//       /* Make sure SVGs are rendered as inline elements */
//       display: inline;
//     }

//     & [data-sanity-icon] {
//       vertical-align: baseline;
//     }
//   `
// }
