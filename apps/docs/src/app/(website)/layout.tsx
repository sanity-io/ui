import {VisualEditing} from 'next-sanity/visual-editing'
import dynamic from 'next/dynamic'
import {draftMode} from 'next/headers'
import {PropsWithChildren, Suspense} from 'react'
import {styled} from 'styled-components'

import {parseNav} from '#lib/nav/parseNav.ts'
import {Banner} from '@/components/Banner'
import {AppFooter} from '@/components/Footer'
import {Navbar} from '@/components/Navbar'
import {basePath} from '@/constants'
import {GLOBAL_QUERY, GlobalData} from '@/lib/data'
import {
  DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  SanityLive,
} from '@/lib/sanity/live'

const DraftModeToast = dynamic(() => import('@/app/DraftModeToast'))

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
  const nav = global?.nav ? parseNav(global.nav, []) : null

  return (
    <Root>
      <Banner settings={global?.settings ?? null} />
      <Navbar nav={nav} />
      {children}
      <AppFooter />
    </Root>
  )
}

const Root = styled.div({
  'height': '100%',
  'flexDirection': 'column',

  '&:not([hidden])': {
    display: 'flex',
  },
})
