// import {_fromEntries} from '../_fromEntries'
// import {_sanityColorToken} from '../_sanity/creators'
// import type {SanityTokenScope} from '../_sanity/schema'
// import type {TokenCollection} from '../types'
// import {cardToken} from './_cardTone'
// import {COLOR_VARIANTS, ELEMENT_TONES} from './constants'
// import type {SanityColorToken} from './schema'
// import type {ColorVariant, ElementTone} from './types'

// export const ELEMENT_TONE_NAMESPACE = '_elementTone'

// export interface ElementToneCollectionTokens {
//   [ELEMENT_TONE_NAMESPACE]: {
//     color: Record<
//       ColorVariant,
//       {
//         bg: Record<0 | 1 | 2 | 3 | 4, SanityColorToken>
//         border: Record<0 | 1 | 2 | 3 | 4, SanityColorToken>
//         fg: Record<0 | 1 | 2 | 3 | 4, SanityColorToken>
//       }
//     >
//   }
// }

// export type ElementToneCollection = TokenCollection<
//   typeof ELEMENT_TONE_NAMESPACE,
//   ElementTone,
//   ElementToneCollectionTokens
// >

// export const elementToneCollection: ElementToneCollection = {
//   namespace: ELEMENT_TONE_NAMESPACE,
//   title: 'Element tone',
//   modes: _fromEntries(ELEMENT_TONES.map((elementTone) => [elementTone, buildTokens(elementTone)])),
// }

// function buildTokens(elementTone: ElementTone): ElementToneCollectionTokens {
//   return {
//     [ELEMENT_TONE_NAMESPACE]: {
//       color: {
//         ..._fromEntries(
//           COLOR_VARIANTS.map((variant) => {
//             return [
//               variant,
//               {
//                 bg: {
//                   0: buildToken(variant, elementTone, 'bg.0'),
//                   1: buildToken(variant, elementTone, 'bg.1'),
//                   2: buildToken(variant, elementTone, 'bg.2'),
//                   3: buildToken(variant, elementTone, 'bg.3'),
//                   4: buildToken(variant, elementTone, 'bg.4'),
//                 },

//                 border: {
//                   0: buildToken(variant, elementTone, 'border.0'),
//                   1: buildToken(variant, elementTone, 'border.1'),
//                   2: buildToken(variant, elementTone, 'border.2'),
//                   3: buildToken(variant, elementTone, 'border.3'),
//                   4: buildToken(variant, elementTone, 'border.4'),
//                 },

//                 fg: {
//                   0: buildToken(variant, elementTone, 'fg.0'),
//                   1: buildToken(variant, elementTone, 'fg.1'),
//                   2: buildToken(variant, elementTone, 'fg.2'),
//                   3: buildToken(variant, elementTone, 'fg.3'),
//                   4: buildToken(variant, elementTone, 'fg.4'),
//                 },
//               },
//             ]
//           }),
//         ),
//       },
//     },
//   }
// }

// function buildToken(
//   variant: ColorVariant,
//   elementTone: ElementTone,
//   key: `${'bg' | 'border' | 'fg'}.${0 | 1 | 2 | 3 | 4}`,
// ): SanityColorToken {
//   return cardToken(`element.${variant}.${elementTone}.${key}`)
// }

// export function elementToken(
//   key: `${ColorVariant}.${'bg' | 'border' | 'fg'}.${0 | 1 | 2 | 3 | 4}`,
//   options?: {scopes?: SanityTokenScope[]},
// ): SanityColorToken {
//   return _sanityColorToken(`{${ELEMENT_TONE_NAMESPACE}.color.${key}}`, options)
// }

export {}
