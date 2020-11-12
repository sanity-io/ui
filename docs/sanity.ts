import {
  createClient,
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from 'next-sanity'

const config = {
  // Find your project ID and dataset in `sanity.json` in your studio project
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  useCdn: process.env.NODE_ENV === 'production',
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
}

export const imageUrlBuilder = createImageUrlBuilder(config)
export const usePreviewSubscription = createPreviewSubscriptionHook(config)
export const sanityClient = createClient(config)
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export const getClient = (usePreview?: boolean) => (usePreview ? previewClient : sanityClient)
export const useCurrentUser = createCurrentUserHook(config)
