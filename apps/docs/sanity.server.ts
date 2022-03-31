import {createClient} from 'next-sanity'
import {sanity} from '$config'

// @todo Remove this type when `next-sanity` exports the correct typings
type FIXME = any

export const sanityClient: FIXME = createClient(sanity)
export const previewClient: FIXME = createClient({
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
