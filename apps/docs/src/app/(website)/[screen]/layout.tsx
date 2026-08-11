import {draftMode} from 'next/headers'

import {GLOBAL_QUERY} from '#lib/data/_global/query.ts'
import type {NavData} from '#lib/data/_global/types.ts'
import {parseNav} from '#lib/nav/parseNav.ts'
import type {NavNode} from '#lib/nav/types.ts'
import {screensQuery, type ScreensQueryParams} from '#lib/sanity/queries.ts'
import {primaryNavId} from '@/constants'
import {
  cachedSanity,
  cachedSanityStaticParams,
  DynamicFetchOptions,
  getDynamicFetchOptions,
} from '@/lib/sanity/live'

import {ArticleLayout} from './layout.client'

// The article chrome below is `params`-free, so the App Shell that `<Link>`
// prefetches already contains it: a navigation into any screen commits the
// frame immediately and streams only the article body and the nav branch the
// URL selects.
export async function generateStaticParams() {
  const {data} = await cachedSanityStaticParams({
    query: screensQuery,
    params: {id: primaryNavId} satisfies ScreensQueryParams,
  })

  return data?.map(({screen}) => ({screen: screen!})) ?? []
}

export default async function ScreenLayout({children}: LayoutProps<'/[screen]'>) {
  const {isEnabled: isDraftMode} = await draftMode()

  // Deliberately not awaited. The nav is handed to the client as a promise and
  // unwrapped inside the boundaries that render it, so `children` streams
  // independently instead of waiting on this fetch.
  const nav = isDraftMode ? fetchNav() : fetchNav({perspective: 'published', stega: false})

  return <ArticleLayout nav={nav}>{children}</ArticleLayout>
}

/**
 * The whole nav goes to the client, which picks the current screen's branch
 * from the pathname. Reading the `screen` param here instead would put URL
 * data in the shell and make every navigation wait for the server.
 */
async function fetchNav(options?: DynamicFetchOptions): Promise<NavNode | null> {
  const {perspective, stega} = options ?? (await getDynamicFetchOptions())
  const {data: global} = await cachedSanity({
    query: GLOBAL_QUERY,
    params: {id: primaryNavId},
    perspective,
    stega,
  })

  const navData = (global?.nav ?? null) as NavData | null | undefined
  return navData ? parseNav(navData, []) : null
}
