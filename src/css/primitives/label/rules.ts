import {responsiveRules} from '../../responsiveRules'
import {Rules} from '../../types'

export const labelRules: Rules = {
  'label': {
    '--font-weight-regular': `var(--font-label-weight-regular)`,
    '--font-weight-medium': `var(--font-label-weight-medium)`,
    '--font-weight-semibold': `var(--font-label-weight-semibold)`,
    '--font-weight-bold': `var(--font-label-weight-bold)`,

    '--font-family': `var(--font-label-family)`,
    '--font-feature-settings': `var(--font-label-feature-settings)`,

    'color': 'var(--color-fg)',
    'textTransform': 'uppercase',

    '@nest': {
      '& a': {
        color: 'var(--color-link-fg)',
        textDecoration: 'none',
      },
    },
  },

  'label-accent': {
    '--color-fg': 'var(--color-accent-fg)',
  },

  'label-muted': {
    '--color-fg': 'var(--color-muted-fg)',
  },

  ...responsiveRules('label-0', {
    '--font-size': 'var(--font-label-0-size)',
    '--font-line-height': 'var(--font-label-0-line-height)',
    '--font-letter-spacing': 'var(--font-label-0-letter-spacing)',
    '--font-icon-size': 'var(--font-label-0-icon-size)',
    '--font-ascender-height': 'var(--font-label-0-ascender-height)',
    '--font-descender-height': 'var(--font-label-0-descender-height)',
    // '--font-cap-height': 'var(--font-label-0-cap-height)',
  }),

  ...responsiveRules('label-1', {
    '--font-size': 'var(--font-label-1-size)',
    '--font-line-height': 'var(--font-label-1-line-height)',
    '--font-letter-spacing': 'var(--font-label-1-letter-spacing)',
    '--font-icon-size': 'var(--font-label-1-icon-size)',
    '--font-ascender-height': 'var(--font-label-1-ascender-height)',
    '--font-descender-height': 'var(--font-label-1-descender-height)',
    // '--font-cap-height': 'var(--font-label-1-cap-height)',
  }),

  ...responsiveRules('label-2', {
    '--font-size': 'var(--font-label-2-size)',
    '--font-line-height': 'var(--font-label-2-line-height)',
    '--font-letter-spacing': 'var(--font-label-2-letter-spacing)',
    '--font-icon-size': 'var(--font-label-2-icon-size)',
    '--font-ascender-height': 'var(--font-label-2-ascender-height)',
    '--font-descender-height': 'var(--font-label-2-descender-height)',
    // '--font-cap-height': 'var(--font-label-2-cap-height)',
  }),

  ...responsiveRules('label-3', {
    '--font-size': 'var(--font-label-3-size)',
    '--font-line-height': 'var(--font-label-3-line-height)',
    '--font-letter-spacing': 'var(--font-label-3-letter-spacing)',
    '--font-icon-size': 'var(--font-label-3-icon-size)',
    '--font-ascender-height': 'var(--font-label-3-ascender-height)',
    '--font-descender-height': 'var(--font-label-3-descender-height)',
    // '--font-cap-height': 'var(--font-label-3-cap-height)',
  }),

  ...responsiveRules('label-4', {
    '--font-size': 'var(--font-label-4-size)',
    '--font-line-height': 'var(--font-label-4-line-height)',
    '--font-letter-spacing': 'var(--font-label-4-letter-spacing)',
    '--font-icon-size': 'var(--font-label-4-icon-size)',
    '--font-ascender-height': 'var(--font-label-4-ascender-height)',
    '--font-descender-height': 'var(--font-label-4-descender-height)',
    // '--font-cap-height': 'var(--font-label-4-cap-height)',
  }),

  ...responsiveRules('label-5', {
    '--font-size': 'var(--font-label-5-size)',
    '--font-line-height': 'var(--font-label-5-line-height)',
    '--font-letter-spacing': 'var(--font-label-5-letter-spacing)',
    '--font-icon-size': 'var(--font-label-5-icon-size)',
    '--font-ascender-height': 'var(--font-label-5-ascender-height)',
    '--font-descender-height': 'var(--font-label-5-descender-height)',
    // '--font-cap-height': 'var(--font-label-5-cap-height)',
  }),
}

// import {getTheme_v2} from '@sanity/ui/theme'
// import {ThemeProps} from '../../_compat'
// import {css} from '../../lib/styled'

// export function labelBaseStyle(
//   props: {$accent?: boolean; $muted: boolean} & ThemeProps,
// ): ReturnType<typeof css> {
//   const {$accent, $muted} = props
//   const {font} = getTheme_v2(props.theme)

//   return css`
//     text-transform: uppercase;

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
