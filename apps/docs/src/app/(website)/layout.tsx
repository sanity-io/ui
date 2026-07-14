import {VisualEditing} from 'next-sanity/visual-editing'
import {draftMode} from 'next/headers'
import {PropsWithChildren, Suspense} from 'react'

import {Layout} from '@/components/Layout'
import {GLOBAL_QUERY, GlobalData} from '@/lib/data'
import {
  DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  SanityLive,
} from '@/lib/sanity/live'

import {AppDataProvider} from './AppDataProvider'

export default async function WebsiteLayout(props: PropsWithChildren) {
  const {children} = props
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <>
      {isDraftMode ? (
        <Suspense>
          <DynamicGlobalData>{children}</DynamicGlobalData>
        </Suspense>
      ) : (
        <CachedGlobalData perspective="published" stega={false}>
          {children}
        </CachedGlobalData>
      )}
      <SanityLive
        includeDrafts={isDraftMode}
        // In production the invalidate-sync-tags Sanity Function (deployed
        // from apps/blueprints/docs) revalidates the cache via
        // /ui/api/expire-tags, so live events wait for it before refreshing.
        // Previews and local dev aren't called by the function, so they
        // handle events immediately.
        waitFor={process.env.VERCEL_ENV === 'production' ? 'function' : undefined}
      />
      {isDraftMode && <VisualEditing />}
    </>
  )
}

async function DynamicGlobalData(props: PropsWithChildren) {
  const {perspective, stega} = await getDynamicFetchOptions()

  return (
    <CachedGlobalData perspective={perspective} stega={stega}>
      {props.children}
    </CachedGlobalData>
  )
}

async function CachedGlobalData(props: PropsWithChildren<DynamicFetchOptions>) {
  'use cache'
  const {children, perspective, stega} = props
  const {data} = await sanityFetch({query: GLOBAL_QUERY, perspective, stega})
  const global = data as GlobalData | null

  // The banner/navbar/footer chrome lives in the layout so it stays mounted
  // (and doesn't flash a fallback) while pages swap during navigations
  return (
    <AppDataProvider nav={global?.nav ?? null} settings={global?.settings ?? null}>
      <Layout>{children}</Layout>
    </AppDataProvider>
  )
}
