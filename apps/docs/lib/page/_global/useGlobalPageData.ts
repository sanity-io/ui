import {useMemo} from 'react'
import {TARGET_QUERY} from '../../../queries'
import {usePreviewSubscription} from '../../../sanity'
import {buildNavMenu, findNavNode, getNavItems} from '../../nav'
import {isArray, isArrayOfStrings, isRecord} from '../../types'
import {PageProps} from '../types'
import {DATA_QUERY} from './queries'

export function useGlobalPageData(props: PageProps) {
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

  const navItems = getNavItems(navValues)
  const navItem = path[0] ? navItems.find((i) => i.segment === path[0]) : undefined
  const menu = navItem ? buildNavMenu(navItem) : undefined

  return {data: {nav, settings, target}, menu}
}
