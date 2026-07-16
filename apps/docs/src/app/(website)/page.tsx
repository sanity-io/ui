import {draftMode} from 'next/headers'
import {notFound} from 'next/navigation'
import {Suspense} from 'react'

import {buildTargetByPathParams, targetByPathQuery} from '#lib/sanity/queries.ts'
import {PageBuilder} from '@/components/page'
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
    query: targetByPathQuery,
    params: buildTargetByPathParams({screen: null}),
    perspective,
    stega,
  })

  if (!data?._type || data._type === 'article') {
    notFound()
  }

  return <PageBuilder page={data} />
}
