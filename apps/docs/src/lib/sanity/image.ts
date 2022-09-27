import createImageUrlBuilder from '@sanity/image-url'
import {ImageUrlBuilder} from '@sanity/image-url/lib/types/builder'
import {SanityImageSource} from '@sanity/image-url/lib/types/types'

export function getImageUrlBuilder(options: {projectId: string; dataset: string}): {
  imageUrlBuilder: ImageUrlBuilder
  urlForImage: (source: SanityImageSource) => ImageUrlBuilder
} {
  const imageUrlBuilder = createImageUrlBuilder(options)

  function urlForImage(source: SanityImageSource): ImageUrlBuilder {
    return imageUrlBuilder.image(source).auto('format').fit('max')
  }

  return {imageUrlBuilder, urlForImage}
}
