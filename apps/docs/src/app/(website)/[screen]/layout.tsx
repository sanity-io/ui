import {draftMode} from 'next/headers'
import {notFound} from 'next/navigation'
import {Suspense} from 'react'

import {GLOBAL_QUERY} from '#lib/data/_global/query.ts'
import type {NavData} from '#lib/data/_global/types.ts'
import {parseNav} from '#lib/nav/parseNav.ts'
import {
  buildTargetByPathParams,
  screensQuery,
  targetByPathQuery,
  type ScreensQueryParams,
} from '#lib/sanity/queries.ts'
import {primaryNavId} from '@/constants'
import {
  DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchStaticParams,
} from '@/lib/sanity/live'

import {ArticleLayout} from './layout.client'

export const instant = false

export async function generateStaticParams() {
  const {data} = await sanityFetchStaticParams({
    query: screensQuery,
    params: {id: primaryNavId} satisfies ScreensQueryParams,
  })

  return data?.map(({screen}) => ({screen: screen!})) ?? []
}

export default async function ScreenLayout({params, children}: LayoutProps<'/[screen]'>) {
  const {isEnabled: isDraftMode} = await draftMode()
  if (!isDraftMode) {
    const {screen} = await params
    return (
      <CachedScreenLayout screen={screen} perspective="published" stega={false}>
        {children}
      </CachedScreenLayout>
    )
  }
  return (
    <Suspense>
      <DynamicScreenLayout params={params}>{children}</DynamicScreenLayout>
    </Suspense>
  )
}

async function DynamicScreenLayout({
  params,
  children,
}: Pick<LayoutProps<'/[screen]'>, 'params' | 'children'>) {
  const [{screen}, {perspective, stega}] = await Promise.all([params, getDynamicFetchOptions()])
  return (
    <CachedScreenLayout screen={screen} perspective={perspective} stega={stega}>
      {children}
    </CachedScreenLayout>
  )
}

async function CachedScreenLayout({
  screen,
  perspective,
  stega,
  children,
}: Awaited<LayoutProps<'/[screen]'>['params']> &
  DynamicFetchOptions & {children: React.ReactNode}) {
  'use cache'

  const params = buildTargetByPathParams({screen})
  const [{data}, {data: global}] = await Promise.all([
    sanityFetch({
      query: targetByPathQuery,
      params: buildTargetByPathParams({screen}),
      perspective,
      stega,
    }),
    sanityFetch({query: GLOBAL_QUERY, perspective, stega}),
  ])

  if (!data?._id) notFound()

  if (data._type === 'article') {
    const navData = (global?.nav ?? null) as NavData | null | undefined
    const nav = navData ? parseNav(navData, []) : null
    const pageNav = nav?.children?.find(
      (item) => params.path.length && item.segment === params.path[0],
    )
    return (
      <ArticleLayout path={params.path as string[]} nav={pageNav}>
        {children}
      </ArticleLayout>
    )
  }

  return <>{children}</>
}
