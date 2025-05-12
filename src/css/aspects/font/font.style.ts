// import {responsiveRules} from '../../responsiveRules'
import {_responsiveRule} from '../../_responsiveRule'
import {Style, StyleRules} from '../../types'

export const rules: StyleRules = {
  '.font': {
    // 'position': 'relative',
    'fontFamily': 'var(--font-family)',
    'fontFeatureSettings': 'var(--font-feature-settings)',
    'fontSize': 'var(--font-size)',
    'lineHeight': 'var(--font-line-height)',
    'letterSpacing': 'var(--font-letter-spacing)',
    'fontWeight': 'var(--font-weight)',
    'transform': `translateY(var(--font-descender-height))`,
    'padding': '1px 0',
    'margin': '0',

    '--font-icon-offset':
      'calc(((var(--font-line-height) - var(--font-ascender-height) - var(--font-descender-height)) - var(--font-icon-size)) / 2)',
    '--font-weight': 'var(--font-weight-regular)',

    '@nest': {
      '&:before': {
        content: '""',
        display: 'block',
        height: 0,
        marginTop: `calc((0px - var(--font-ascender-height) - var(--font-descender-height)) - 1px)`,
      },

      '&:after': {
        content: '""',
        display: 'block',
        height: 0,
        marginBottom: '-1px',
      },

      '& svg': {
        // Certain popular CSS libraries changes the defaults for SVG display
        // Make sure SVGs are rendered as inline elements
        display: 'inline',
      },

      // todo
      // '& svg:not([data-sanity-icon])': {
      //   fontSize: 'calc(var(--custom-icon-size) / 16 * 1rem)',
      //   margin: 'var(--custom-icon-offset)',
      // },

      '& [data-sanity-icon]': {
        fontSize: 'var(--font-icon-size)',
        margin: 'var(--font-icon-offset)',
        vectorEffect: 'non-scaling-stroke',
      },
    },
  },

  '.font-regular': {
    '--font-weight': 'var(--font-weight-regular)',
  },

  '.font-medium': {
    '--font-weight': 'var(--font-weight-medium)',
  },

  '.font-semibold': {
    '--font-weight': 'var(--font-weight-semibold)',
  },

  '.font-bold': {
    '--font-weight': 'var(--font-weight-bold)',
  },
}

// align

_responsiveRule(rules, `text-align-initial`, {
  textAlign: 'initial',
})

_responsiveRule(rules, `text-align-left`, {
  textAlign: 'left',
})

_responsiveRule(rules, `text-align-center`, {
  textAlign: 'center',
})

_responsiveRule(rules, `text-align-right`, {
  textAlign: 'right',
})

_responsiveRule(rules, `text-align-justify`, {
  textAlign: 'justify',
})

export const fontStyle: Style = {layers: {primitive: rules}}

// .font {
//   position: relative;
//   font-family: var(--font-family);
//   font-size: var(--font-size);
//   line-height: var(--font-line-height);
//   letter-spacing: var(--font-letter-spacing);
//   font-weight: var(--font-weight);
//   transform: translateY(var(--font-descender-height));
//   padding: 1px 0;
//   margin: 0;

//   --font-negative-height: calc(var(--font-ascender-height) + var(--font-descender-height));
//   --font-cap-height: calc(var(--font-line-height) - var(--font-negative-height));
//   --font-icon-offset: calc((var(--font-cap-height) - var(--font-icon-size)) / 2);
//   --font-custom-icon-size: calc((var(--font-size) * 1.125) / 2) * 2 + 1;
//   --font-custom-icon-offset: calc((var(--font-cap-height) - var(--font-custom-icon-size)) / 2);

//   &:before {
//     content: '';
//     display: block;
//     height: 0;
//     margin-top: calc(0px - var(--font-negative-height) - 1px);
//   }

//   &:after {
//     content: '';
//     display: block;
//     height: 0;
//     margin-bottom: -1px;
//   }

//   & > code,
//   & > span {
//     display: block;
//   }

//   &:not([hidden]) {
//     display: block;
//   }

//   & svg:not([data-sanity-icon]) {
//     /* todo */
//     font-size: var(--font-custom-icon-size);
//     /* font-size: calc(var(--font-custom-icon-size) / 16 * 1rem); */
//     margin: var(--font-custom-icon-offset);
//   }

//   & [data-sanity-icon] {
//     /* todo */
//     font-size: var(--font-icon-size);
//     /* font-size: calc(var(--font-icon-size) / 16 * 1rem); */
//     margin: var(--font-icon-offset);
//   }
// }
