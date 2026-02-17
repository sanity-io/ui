// import {_fromEntries} from '../_fromEntries'
// import {_sanityColorToken} from '../_sanity/creators'
// import type {SanityTokenScope} from '../_sanity/schema'
// import type {TokenCollection} from '../types'
// import {cardToken} from './_cardTone'
// import {AVATAR_COLORS} from './constants'
// import type {SanityColorToken} from './schema'
// import type {AvatarColor} from './types'

// const AVATAR_NAMESPACE = '_avatarColor'

// export interface AvatarColorCollectionTokens {
//   [AVATAR_NAMESPACE]: {
//     color: {
//       bg: SanityColorToken
//       fg: SanityColorToken
//     }
//   }
// }

// export type AvatarColorCollection = TokenCollection<
//   typeof AVATAR_NAMESPACE,
//   AvatarColor,
//   AvatarColorCollectionTokens
// >

// export const avatarColorCollection: AvatarColorCollection = {
//   namespace: AVATAR_NAMESPACE,
//   title: 'Avatar color',
//   modes: _fromEntries(
//     AVATAR_COLORS.map((color) => [
//       color,
//       {
//         [AVATAR_NAMESPACE]: {
//           color: {
//             bg: cardToken(`avatar.${color}.bg`),
//             fg: cardToken(`avatar.${color}.fg`),
//           },
//         },
//       },
//     ]),
//   ),
// }

// export function avatarColorToken(
//   sourceKey: `bg` | `fg`,
//   options?: {scopes?: SanityTokenScope[]},
// ): SanityColorToken {
//   return _sanityColorToken(`{${AVATAR_NAMESPACE}.color.${sourceKey}}`, options)
// }

export {}
