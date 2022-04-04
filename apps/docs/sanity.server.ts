import {createClient} from 'next-sanity'
import {sanity} from '$config'

export const sanityClient = createClient(sanity)
export const previewClient = createClient({
  ...sanity,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export const getClient = (preview?: boolean) => {
  if (preview) {
    return previewClient
  }

  return sanityClient
}
