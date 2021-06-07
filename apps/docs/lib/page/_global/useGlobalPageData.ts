import {useMemo} from 'react'
import {DATA_QUERY} from './queries'
import {findNavNode} from '$lib/nav'
import {isArray, isArrayOfStrings, isRecord} from '$lib/types'
import {TARGET_QUERY} from '$queries'
import {usePreviewSubscription} from '$sanity'

export function useGlobalPageData(props: {
  data?: {nav: unknown; settings: unknown; target: unknown}
  params?: {path?: string[]}
  preview?: boolean
}) {
  const {data, params = {}, preview} = props
  const path = useMemo(() => (isArrayOfStrings(params.path) ? params.path : []), [params])

  const initialPagePage = data &&
    (data.nav || data.settings) && {nav: data.nav, settings: data.settings}

  const {data: page} = usePreviewSubscription(DATA_QUERY, {
    enabled: preview,
    initialData: initialPagePage || undefined,
    params,
  })

  const nav = isRecord(page) && page.nav
  const settings = isRecord(page) && page.settings
  const navValues: unknown[] = (isRecord(nav) && isArray(nav.items) && nav.items) || []
  const node = findNavNode(navValues, path)

  const {data: target} = usePreviewSubscription(TARGET_QUERY, {
    enabled: preview,
    initialData: (data && data.target) || undefined,
    params: {id: node ? node.targetId : '404'},
  })

  return {data: {nav, settings, target}}
}
