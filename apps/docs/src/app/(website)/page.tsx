import {draftMode} from 'next/headers'
import {Suspense} from 'react'

import {Page} from '@/components/page'
import {API_DOCUMENT_TYPES, TARGET_QUERY, TargetData} from '@/lib/data'
import {DynamicFetchOptions, getDynamicFetchOptions, sanityFetch} from '@/lib/sanity/live'

export default async function RootRoute() {
  if ((await draftMode()).isEnabled) {
    return (
      <Suspense>
        <DynamicRootPage />
      </Suspense>
    )
  }

  return <CachedRootPage perspective="published" stega={false} />
}

async function DynamicRootPage() {
  const {perspective, stega} = await getDynamicFetchOptions()

  return <CachedRootPage perspective={perspective} stega={stega} />
}

async function CachedRootPage(props: DynamicFetchOptions) {
  'use cache'
  const {perspective, stega} = props
  const {data} = await sanityFetch({
    query: TARGET_QUERY,
    params: {memberTypes: API_DOCUMENT_TYPES, path: [null]},
    perspective,
    stega,
  })

  return <Page data={data as TargetData | null} path={[]} />
}
