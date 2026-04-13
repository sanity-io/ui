'use client'

import {wrapData} from '@sanity/react-loader/jsx'
import {QueryResponseInitial, useQuery} from '@sanity/react-loader/rsc'
import {useMemo} from 'react'

import {useApp} from '@/app/useApp'
import {Page} from '@/components/page'
import {TARGET_QUERY, TargetData} from '@/lib/data'

export function PreviewPage(props: {
  initial: QueryResponseInitial<TargetData | null>
  path: string[]
}) {
  const {initial, path} = props

  const {studioBaseUrl} = useApp()

  const {data: rawData, sourceMap} = useQuery<TargetData | null>(
    TARGET_QUERY,
    {
      path: path.length === 0 ? [null] : path,
    },
    {initial},
  )

  const data = useMemo(
    () =>
      rawData
        ? wrapData(
            {
              baseUrl: studioBaseUrl,
            },
            rawData,
            sourceMap,
          )
        : null,
    [rawData, sourceMap, studioBaseUrl],
  )

  return <Page data={data} path={path} />
}
