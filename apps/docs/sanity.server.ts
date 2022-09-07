import {createClient, SanityClient} from 'next-sanity'
import {sanity} from '$config'

export const sanityClient: SanityClient = createClient(sanity)
export const previewClient: SanityClient = createClient({
  ...sanity,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export const getClient = (preview?: boolean): SanityClient => {
  if (preview) {
    return previewClient
  }

  return sanityClient
}
