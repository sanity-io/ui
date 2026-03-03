import {cookies, draftMode, headers} from 'next/headers'

import {apiVersion, datasets, projectId} from '@/sanity/env'

import {AppEnv} from './types'
import {ClientPerspective, ClientReturn, ContentSourceMap, createClient} from 'next-sanity'
import {token} from '@/sanity/token'
import {DefinedSanityFetchType, defineLive} from 'next-sanity/live'

export async function getContext() {
  const env = ((await cookies()).get('env')?.value ?? 'production') as AppEnv

  const isDraftMode = (await draftMode()).isEnabled

  const initialScheme = (await headers()).get('sec-ch-prefers-color-scheme') as
    | 'dark'
    | 'light'
    | null

  const dataset = datasets[env]
  const perspective: ClientPerspective = isDraftMode ? 'drafts' : 'published'

  const clientOptions = {
    projectId,
    dataset,
    apiVersion,
    useCdn: isDraftMode ? false : true,
    perspective,
    token,
    resultSourceMap: isDraftMode ? 'withKeyArraySelector' : false,
  } as const

  const client = createClient(clientOptions)

  const {sanityFetch, SanityLive} = defineLive({
    client,
    // Required for showing draft content when the Sanity Presentation Tool is used, or to enable
    // the Vercel Toolbar Edit Mode
    serverToken: token,
    // Required for standalone live previews, the token is only shared to the browser if it's a
    // valid Next.js Draft Mode session
    browserToken: token,
  })

  return {
    client,
    dataset,
    env,
    initialScheme,
    isDraftMode,
    perspective,
    projectId,
    studioBaseUrl: `${process.env.NEXT_PUBLIC_SANITY_STUDIO_BASE_URL || 'http://localhost:3333'}/${env}`,

    sanityFetch: <const QueryString extends string>(
      options: Parameters<DefinedSanityFetchType>[0],
    ): Promise<{
      data: ClientReturn<QueryString>
      sourceMap: ContentSourceMap | null
      tags: string[]
    }> => {
      return sanityFetch({...options, perspective})
    },

    SanityLive,
  }
}
