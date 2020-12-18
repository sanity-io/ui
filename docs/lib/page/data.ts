import {buildNavMenu, findNavNode, getNavItems} from '$lib/nav'
import {isArray, isArrayOfStrings, isRecord} from '$lib/types'
import {MAIN_NAV_QUERY, SETTINGS_QUERY, TARGET_QUERY} from '$queries'
import {getClient, usePreviewSubscription} from '$sanity'

export async function loadPageData({
  params = {},
  preview,
}: {
  params?: {path?: string[]}
  preview?: boolean
}) {
  const nav: unknown = await getClient(preview).fetch(MAIN_NAV_QUERY)
  const navValues: unknown[] = (isRecord(nav) && isArray(nav.items) && nav.items) || []
  const node = findNavNode(navValues, params.path || [])
  const settings: unknown = await getClient(preview).fetch(SETTINGS_QUERY)
  const target: unknown = await getClient(preview).fetch(TARGET_QUERY, {
    id: node ? node.targetId : '404',
  })
  const path = params.path
  const navItems = getNavItems(navValues)
  const navItem = isArray(path) ? navItems.find((i) => i.segment === path[0]) : null
  const menu = navItem ? buildNavMenu(navItem) : null

  return {menu, nav, params, preview, settings, target}
}

export function usePageData(props: unknown) {
  const initialNav = isRecord(props) && props.nav
  const initialSettings = (isRecord(props) && props.settings) || null
  const preview = isRecord(props) && Boolean(props.preview)
  const params: Record<string, unknown> =
    (isRecord(props) && isRecord(props.params) && props.params) || {}
  const initialTarget = isRecord(props) && props.target
  const {data: nav = {}} = usePreviewSubscription(MAIN_NAV_QUERY, {
    initialData: initialNav,
    enabled: preview,
  })
  const navValues: unknown[] = (isRecord(nav) && isArray(nav.items) && nav.items) || []
  const node = findNavNode(navValues, isArrayOfStrings(params.path) ? params.path : [])
  const {data: settings = {}} = usePreviewSubscription(SETTINGS_QUERY, {
    initialData: initialSettings,
    enabled: preview,
  })
  const {data: target} = usePreviewSubscription(TARGET_QUERY, {
    initialData: initialTarget || undefined,
    enabled: preview,
    params: {id: node ? node.targetId : '404'},
  })
  const path = params.path
  const navItems = getNavItems(navValues)
  const navItem = isArray(path) ? navItems.find((i) => i.segment === path[0]) : null
  const menu = navItem ? buildNavMenu(navItem) : null

  return {menu, nav, settings, target}
}
