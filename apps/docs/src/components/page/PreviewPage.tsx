'use client'

import {wrapData} from '@sanity/react-loader/jsx'
import {QueryResponseInitial, useQuery} from '@sanity/react-loader/rsc'
import {useMemo} from 'react'

import {useApp} from '@/app/useApp'
import {Page} from '@/components/page'
import {TARGET_QUERY, TargetData} from '@/lib/data'

export function PreviewPage(props: {
  initial: QueryResponseInitial<TargetData | null>
  slug: string[] | undefined
}) {
  const {initial, slug} = props
  const {studioBaseUrl, version} = useApp()

  const {
    data: rawData,
    error,
    sourceMap,
  } = useQuery<TargetData | null>(
    TARGET_QUERY,
    {
      navId: version,
      path: slug ?? [null],
    },
    {initial},
  )

  const data = useMemo(
    () => (rawData ? wrapData({baseUrl: studioBaseUrl}, rawData, sourceMap) : null),
    [rawData, sourceMap, studioBaseUrl],
  )

  return <Page data={data} error={error} slug={slug} />
}
