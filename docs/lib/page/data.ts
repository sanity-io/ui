import {findNavNode} from '$lib/nav'
import {FEATURES_QUERY, MAIN_NAV_QUERY, TARGET_QUERY} from '$queries'
import {getClient, usePreviewSubscription} from '$sanity'

export async function loadPageData({
  params = {},
  preview,
}: {
  params?: {path?: string[]}
  preview?: boolean
}) {
  const features = await getClient(preview).fetch(FEATURES_QUERY)
  const nav = await getClient(preview).fetch(MAIN_NAV_QUERY)
  const node = findNavNode(nav.items, params.path || [])
  const target = await getClient(preview).fetch(TARGET_QUERY, {id: node.targetId})

  return {features, nav, params, preview, target}
}

export function usePageData(props: any = {}) {
  const {
    features: initialFeatures,
    nav: initialNav,
    params = {},
    preview,
    target: initialTarget,
  } = props

  const {data: features} = usePreviewSubscription(FEATURES_QUERY, {
    initialData: initialFeatures,
    enabled: preview,
  })

  const {data: nav = {}} = usePreviewSubscription(MAIN_NAV_QUERY, {
    initialData: initialNav,
    enabled: preview,
  })

  const node = findNavNode(nav.items || [], params.path || [])

  const {data: target} = usePreviewSubscription(TARGET_QUERY, {
    initialData: initialTarget || undefined,
    enabled: preview,
    params: {id: node ? node.targetId : '404'},
  })

  return {features, nav, params, node, target}
}
