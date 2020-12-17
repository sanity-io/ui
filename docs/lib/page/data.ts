import {findNavNode} from '$lib/nav'
import {isArrayOfStrings, isRecord} from '$lib/types'
import {MAIN_NAV_QUERY, TARGET_QUERY} from '$queries'
import {getClient, usePreviewSubscription} from '$sanity'

export async function loadPageData({
  params = {},
  preview,
}: {
  params?: {path?: string[]}
  preview?: boolean
}) {
  const nav: unknown = await getClient(preview).fetch(MAIN_NAV_QUERY)

  // console.log(JSON.stringify(nav))

  const navItems: unknown[] = (isRecord(nav) && Array.isArray(nav.items) && nav.items) || []
  const node = findNavNode(navItems, params.path || [])
  const target: unknown = await getClient(preview).fetch(TARGET_QUERY, {
    id: node ? node.targetId : '404',
  })

  return {nav, params, preview, target}
}

export function usePageData(props: unknown) {
  const initialNav = isRecord(props) && props.nav
  const preview = isRecord(props) && Boolean(props.preview)
  const params: Record<string, unknown> =
    (isRecord(props) && isRecord(props.params) && props.params) || {}
  const initialTarget = isRecord(props) && props.target

  const {data: nav = {}} = usePreviewSubscription(MAIN_NAV_QUERY, {
    initialData: initialNav,
    enabled: preview,
  })

  const navItems: unknown[] = (isRecord(nav) && Array.isArray(nav.items) && nav.items) || []
  const node = findNavNode(navItems, isArrayOfStrings(params.path) ? params.path : [])

  const {data: target} = usePreviewSubscription(TARGET_QUERY, {
    initialData: initialTarget || undefined,
    enabled: preview,
    params: {id: node ? node.targetId : '404'},
  })

  return {nav, params, node, target}
}
