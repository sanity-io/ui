import {WrappedValue} from '@sanity/react-loader/jsx'

import {NavData} from '../data'
import {NavNode} from './types'

export function parseNav(item: WrappedValue<NavData>, basePath: string[]): NavNode {
  const children = item.items
    ? item.items.map((i: any) => parseNav(i, basePath.concat(item.segment?.value || '')))
    : []

  return {
    collapsed: item.collapsed?.value || false,
    hidden: item.hidden?.value || false,
    href: basePath.concat(item.segment?.value || []).join('/'),
    isComponent: item.isComponent?.value === true,
    isHook: item.isHook?.value === true,
    menuTitle: item.menuTitle || undefined,
    segment: item.segment?.value || undefined,
    targetId: item.targetId?.value || undefined,
    title: item.title || undefined,

    children: children.length ? children : undefined,
  }
}
