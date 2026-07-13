import {VisualEditing} from 'next-sanity/visual-editing'
import {draftMode} from 'next/headers'
import {PropsWithChildren, Suspense} from 'react'

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
      <SanityLive includeDrafts={isDraftMode} />
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

  return (
    <AppDataProvider nav={global?.nav ?? null} settings={global?.settings ?? null}>
      {children}
    </AppDataProvider>
  )
}
