import {TARGET_QUERY} from '../../../queries'
import {getClient} from '../../../sanity.server'
import {buildNavMenu, findNavNode, getNavItems} from '../../nav'
import {isRecord} from '../../types'
import {DATA_QUERY} from './queries'

export async function loadDocsPageData({
  params = {},
  preview,
}: {
  params?: {path?: string[]}
  preview?: boolean
}) {
  const path = params.path ? ['docs'].concat(params.path) : ['docs']
  const pageData: unknown = await getClient(preview).fetch(DATA_QUERY)
  const nav = isRecord(pageData) && pageData.nav
  const settings = isRecord(pageData) && pageData.settings
  const navValues: unknown[] = (isRecord(nav) && Array.isArray(nav.items) && nav.items) || []
  const node = findNavNode(navValues, path)
  const targetData: unknown = await getClient(preview).fetch(TARGET_QUERY, {
    id: node ? node.targetId : '404',
  })
  const navItems = getNavItems(navValues)
  const navItem = path[0] ? navItems.find((i) => i.segment === path[0]) : undefined
  const menu = navItem && buildNavMenu(navItem)
  const menuData = menu ? {menu} : undefined

  return {
    scope: 'docs',
    ...menuData,
    data: {nav, settings, target: targetData},
    preview,
  }
}
