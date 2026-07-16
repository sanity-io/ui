import {
  createImageUrlBuilder,
  // type ImageUrlBuilder,
  // type SanityImageSource,
} from '@sanity/image-url'

import {dataset, projectId} from '@/constants'

export const imageUrlBuilder = createImageUrlBuilder({dataset, projectId})

// export function urlForImage(source: SanityImageSource): ImageUrlBuilder {
//   return imageUrlBuilder.image(source).auto('format').fit('max')
// }
