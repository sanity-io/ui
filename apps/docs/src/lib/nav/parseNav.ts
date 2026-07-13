import {stegaClean} from 'next-sanity'

import {NavItemData} from '../data'
import {NavNode} from './types'

export function parseNav(item: NavItemData, basePath: string[]): NavNode {
  // Segments and target ids drive routing and lookups, so they must be
  // cleaned of stega-encoded metadata; titles stay encoded for click-to-edit
  const segment = stegaClean(item.segment) || undefined

  const children = item.items
    ? item.items.map((i) => parseNav(i, basePath.concat(segment || '')))
    : []

  return {
    collapsed: item.collapsed || false,
    hidden: item.hidden || false,
    href: basePath.concat(segment ?? []).join('/'),
    isComponent: item.isComponent === true,
    isHook: item.isHook === true,
    menuTitle: item.menuTitle || undefined,
    segment,
    targetId: stegaClean(item.targetId) || undefined,
    title: item.title || undefined,

    children: children.length ? children : undefined,
  }
}
