import {draftMode} from 'next/headers'
import {Suspense} from 'react'

import {GLOBAL_QUERY} from '#lib/data/_global/query.ts'
import type {NavData} from '#lib/data/_global/types.ts'
import {parseNav} from '#lib/nav/parseNav.ts'
import {screensQuery, type ScreensQueryParams} from '#lib/sanity/queries.ts'
import {primaryNavId} from '@/constants'
import {
  DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchStaticParams,
} from '@/lib/sanity/live'

import {ArticleLayout} from './layout.client'

// The article chrome below is `params`-free, so the App Shell that `<Link>`
// prefetches already contains it: a navigation into any screen commits the
// frame immediately and streams only the article body and the nav branch the
// URL selects.
export async function generateStaticParams() {
  const {data} = await sanityFetchStaticParams({
    query: screensQuery,
    params: {id: primaryNavId} satisfies ScreensQueryParams,
  })

  return data?.map(({screen}) => ({screen: screen!})) ?? []
}

export default async function ScreenLayout({children}: LayoutProps<'/[screen]'>) {
  const {isEnabled: isDraftMode} = await draftMode()
  if (!isDraftMode) {
    return (
      <CachedScreenLayout perspective="published" stega={false}>
        {children}
      </CachedScreenLayout>
    )
  }
  return (
    <Suspense>
      <DynamicScreenLayout>{children}</DynamicScreenLayout>
    </Suspense>
  )
}

async function DynamicScreenLayout({children}: Pick<LayoutProps<'/[screen]'>, 'children'>) {
  const {perspective, stega} = await getDynamicFetchOptions()
  return (
    <CachedScreenLayout perspective={perspective} stega={stega}>
      {children}
    </CachedScreenLayout>
  )
}

async function CachedScreenLayout({
  perspective,
  stega,
  children,
}: DynamicFetchOptions & {children: React.ReactNode}) {
  'use cache'

  const {data: global} = await sanityFetch({
    query: GLOBAL_QUERY,
    params: {id: primaryNavId},
    perspective,
    stega,
  })

  const navData = (global?.nav ?? null) as NavData | null | undefined

  // The whole nav goes to the client, which picks the current screen's branch
  // from the pathname. Reading the `screen` param here instead would put URL
  // data in the shell and make every navigation wait for the server.
  return <ArticleLayout nav={navData ? parseNav(navData, []) : null}>{children}</ArticleLayout>
}
