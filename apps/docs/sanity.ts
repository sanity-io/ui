import {
  createClient,
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from 'next-sanity'
import {sanity} from '$config'

export const imageUrlBuilder = createImageUrlBuilder(sanity)
export const usePreviewSubscription: any = createPreviewSubscriptionHook(sanity)
export const sanityClient: any = createClient(sanity)
export const previewClient: any = createClient({
  ...sanity,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export const getClient = (preview?: boolean): any => {
  if (preview) {
    return previewClient
  }

  return sanityClient
}

export const useCurrentUser = createCurrentUserHook(sanity)
