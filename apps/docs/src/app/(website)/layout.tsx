import {VisualEditing} from 'next-sanity/visual-editing'
import dynamic from 'next/dynamic'
import {draftMode} from 'next/headers'
import {PropsWithChildren, Suspense, ReactElement, ReactNode} from 'react'
import {styled} from 'styled-components'

import {Banner} from '@/components/Banner'
import {AppFooter} from '@/components/Footer'
import {Navbar} from '@/components/Navbar'
import {GLOBAL_QUERY, GlobalData} from '@/lib/data'
import {
  DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  SanityLive,
} from '@/lib/sanity/live'

import {AppDataProvider} from './AppDataProvider'

const DraftModeToast = dynamic(() => import('@/app/DraftModeToast'))

const basePath = (process.env.__NEXT_ROUTER_BASEPATH as string) || ''
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

  // The banner/navbar/footer chrome lives in the layout so it stays mounted
  // (and doesn't flash a fallback) while pages swap during navigations
  return (
    <AppDataProvider nav={global?.nav ?? null} settings={global?.settings ?? null}>
      <Layout>{children}</Layout>
    </AppDataProvider>
  )
}

const Root = styled.div({
  'height': '100%',
  'flexDirection': 'column',

  '&:not([hidden])': {
    display: 'flex',
  },
})

function Layout(props: {children?: ReactNode}): ReactElement {
  const {children} = props

  return (
    <Root>
      <Banner />
      <Navbar />
      {children}
      <AppFooter />
    </Root>
  )
}
