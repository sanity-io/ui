import {useMemo} from 'react'
import {DATA_QUERY} from './queries'
import {buildNavMenu, findNavNode, getNavItems} from '$lib/nav'
import {isArray, isRecord} from '$lib/types'
import {TARGET_QUERY} from '$queries'
import {usePreviewSubscription} from '$sanity'

export function useDocsPageData(props: {
  data: {nav: unknown; settings: unknown; target: unknown}
  params?: {path?: string[]}
  preview?: boolean
}) {
  const {data, params = {}, preview} = props
  const path = useMemo(() => (params.path ? ['docs'].concat(params.path) : ['docs']), [params])

  const initialPagePage = (data.nav || data.settings) && {nav: data.nav, settings: data.settings}

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
    initialData: data.target || undefined,
    params: {id: node ? node.targetId : '404'},
  })

  const navItems = getNavItems(navValues)
  const navItem = isArray(path) ? navItems.find((i) => i.segment === path[0]) : undefined
  const menu = navItem ? buildNavMenu(navItem) : undefined

  return {data: {nav, settings, target}, menu}
}
