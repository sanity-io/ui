// import {defineEnableDraftMode} from 'next-sanity/draft-mode'

// import {client} from '@/lib/sanity/client'

// export const {GET} = defineEnableDraftMode({
//   client: client.withConfig({
//     token: process.env.SANITY_API_READ_TOKEN,
//   }),
// })

export async function GET(_request: Request) {
  return new Response('Hello, world!')
}
