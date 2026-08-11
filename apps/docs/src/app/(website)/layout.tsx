import {Flex} from '@sanity/ui'
import {VisualEditing} from 'next-sanity/visual-editing'
import dynamic from 'next/dynamic'
import {draftMode} from 'next/headers'
import {PropsWithChildren, Suspense} from 'react'

import {parseNav} from '#lib/nav/parseNav.ts'
import {Banner} from '@/components/Banner'
import {AppFooter} from '@/components/Footer'
import {Navbar, NavbarWithActiveSegment} from '@/components/Navbar'
import {basePath, primaryNavId} from '@/constants'
import {GLOBAL_QUERY} from '@/lib/data/_global/query'
import {GlobalData} from '@/lib/data/_global/types'
import {
  cachedSanity,
  DynamicFetchOptions,
  getDynamicFetchOptions,
  SanityLive,
} from '@/lib/sanity/live'

const DraftModeToast = dynamic(() => import('@/app/DraftModeToast'))

export default async function WebsiteLayout(props: PropsWithChildren) {
  const {children} = props
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <>
      <Flex direction="column" height="fill">
        {isDraftMode ? (
          <Suspense fallback={<GlobalChromeFallback />}>
            <DynamicGlobalChrome />
          </Suspense>
        ) : (
          <CachedGlobalChrome perspective="published" stega={false} />
        )}
        {children}
        <AppFooter />
      </Flex>
      <SanityLive
        includeDrafts={isDraftMode}
        // In production the invalidate-sync-tags Sanity Function (deployed
        // from apps/blueprints/docs) revalidates the cache via
        // /ui/api/expire-tags, so live events wait for it before refreshing.
        // Previews and local dev aren't called by the function, so they
        // handle events immediately.
        waitFor={process.env.VERCEL_ENV === 'production' ? 'function' : undefined}
      />
      {isDraftMode && (
        <>
          <DraftModeToast
            action={async () => {
              'use server'

              await Promise.allSettled([
                // oxlint-disable-next-line typescript/await-thenable
                (await draftMode()).disable(),
                // Simulate a delay to show the loading state
                new Promise((resolve) => setTimeout(resolve, 1000)),
              ])
            }}
          />
          <VisualEditing basePath={basePath} />
        </>
      )}
    </>
  )
}

async function DynamicGlobalChrome() {
  const {perspective, stega} = await getDynamicFetchOptions()

  return <CachedGlobalChrome perspective={perspective} stega={stega} />
}

/**
 * Only the banner and navbar, never `children`: a cached component that wraps
 * `children` would make the page wait on this fetch instead of streaming
 * independently.
 */
async function CachedGlobalChrome({perspective, stega}: DynamicFetchOptions) {
  const {data} = await cachedSanity({
    query: GLOBAL_QUERY,
    params: {id: primaryNavId},
    perspective,
    stega,
  })
  const global = data as GlobalData | null
  const nav = global?.nav ? parseNav(global.nav, []) : null

  return (
    <>
      <Banner settings={global?.settings ?? null} />
      <Suspense fallback={<Navbar nav={nav} />}>
        <NavbarWithActiveSegment nav={nav} />
      </Suspense>
    </>
  )
}

function GlobalChromeFallback() {
  return <Navbar nav={null} />
}
