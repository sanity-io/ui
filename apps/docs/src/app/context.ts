import {cookies, draftMode, headers} from 'next/headers'
import {ClientPerspective, ClientReturn, ContentSourceMap, createClient} from 'next-sanity'
import {DefinedSanityFetchType, defineLive} from 'next-sanity/live'

import {apiVersion, datasets, projectId} from '@/sanity/env'
import {token} from '@/sanity/token'

import {AppEnv} from './types'

const RE_VERSION = /^v([0-9]+)$/

export async function getContext(slugParam: string[] | undefined) {
  const defaultVersion = process.env.NEXT_PUBLIC_VERSION || 'v3'

  let version = defaultVersion

  let slug = slugParam

  if (slug && typeof slug[0] === 'string' && RE_VERSION.test(slug[0])) {
    version = slug[0]
    slug = slug.slice(1)
  }

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
    useCdn: !isDraftMode,
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
    basePath: process.env.BASE_PATH || '',
    client,
    dataset,
    defaultVersion,
    env,
    initialScheme,
    isDraftMode,
    perspective,
    projectId,
    slug,
    studioBaseUrl: `${process.env.NEXT_PUBLIC_SANITY_STUDIO_BASE_URL || 'http://localhost:3333'}/${env}`,
    version,

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
