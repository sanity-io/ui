import {NavMenu, NavItem, NavMenuItem} from './types'
import {features} from '$config'
import {isArray, isRecord, isString} from '$lib/types'

export function getNavItems(values: unknown[], basePath = ''): NavItem[] {
  const records: Record<string, unknown>[] = values.filter(isRecord)
  const visibleRecords = records.filter((record) => features.hintHiddenContent || !record.hidden)

  const ret: NavItem[] = []

  for (const record of visibleRecords) {
    const href = `${basePath}/${record.segment || ''}`

    ret.push({
      collapsed: Boolean(record.collapsed),
      hidden: Boolean(record.hidden),
      href: record.targetId ? href : undefined,
      title: isString(record.title) ? record.title : undefined,
      menuTitle: isString(record.menuTitle) ? record.menuTitle : undefined,
      items: getNavItems(isArray(record.items) ? record.items : [], href),
      segment: isString(record.segment) ? record.segment : undefined,
    })
  }

  return ret
}

export function getNavPaths(values: unknown[], basePath = ''): string[] {
  const paths = []

  for (const value of values) {
    if (!isRecord(value)) continue
    if (!features.hintHiddenContent && value.hidden) continue

    const path = `${basePath}/${value.segment || ''}`

    if (value.targetId) {
      paths.push(path)
    }

    if (value.items) {
      paths.push(...getNavPaths(isArray(value.items) ? value.items : [], path))
    }
  }

  return paths
}

export function getNavStaticPaths(items: unknown[]) {
  return getNavPaths(items).map((p) => ({
    params: {path: p.split('/').slice(1)},
  }))
}

export function findNavNode(nodes: unknown[], path: string[]): Record<string, unknown> | null {
  const len = path.length
  const segment = path[0]

  for (const node of nodes) {
    if (isRecord(node) && node.segment === segment) {
      if (len > 1) {
        return findNavNode((isArray(node.items) && node.items) || [], path.slice(1))
      }

      return node
    }
  }

  return null
}

function getMenuItems(items: NavItem[]) {
  const ret: NavMenuItem[] = []

  for (const item of items) {
    if (item.href) {
      ret.push({
        type: 'menuLink',
        hidden: item.hidden,
        title: item.menuTitle || item.title,
        href: item.href,
      })
    } else {
      ret.push({
        type: 'menu',
        collapsed: item.collapsed,
        items: getMenuItems(item.items),
        title: item.menuTitle || item.title,
      })
    }
  }

  return ret
}

export function buildNavMenu(navItem: NavItem) {
  if (navItem.items.length === 0) return null

  const menu: NavMenu = {
    type: 'menu',
    collapsed: false,
    items: [],
    title: navItem.title || '',
  }

  const items = getMenuItems(navItem.items)

  const initialGroup: NavMenu = {
    type: 'menu',
    collapsed: false,
    items: [
      {
        type: 'menuLink',
        hidden: false,
        title: navItem.menuTitle || navItem.title || '',
        href: `/${navItem.segment || ''}`,
      },
    ],
  }

  while (items.length) {
    const item = items[0]

    if (!item) break

    if (item.type === 'menu') {
      break
    } else {
      items.shift()
      initialGroup.items.push(item)
    }
  }

  menu.items.push(initialGroup)
  menu.items.push(...items)

  return menu
}
