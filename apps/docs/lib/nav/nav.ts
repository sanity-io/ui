import {NavItem, NavMenu, NavMenuItem} from './types'
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
  // Make sure the paths are unique
  const uniquePaths = uniq(getNavPaths(items))

  return uniquePaths.map((p) => ({
    params: {path: p.split('/').slice(1)},
  }))
}

export function findNavNode(nodes: unknown[], path: string[]): Record<string, unknown> | null {
  const len = path.length
  const segment = path[0]

  for (const node of nodes) {
    if (isRecord(node) && ((!node.segment && !segment) || node.segment === segment)) {
      if (len > 1) {
        return findNavNode((isArray(node.items) && node.items) || [], path.slice(1))
      }

      return node
    }
  }

  return null
}

function getNavMenuItem(navItem: NavItem): NavMenuItem {
  const items: NavMenuItem[] = []

  if (navItem.items) {
    for (const child of navItem.items) {
      if (features.hintHiddenContent || !child.hidden) {
        items.push(getNavMenuItem(child))
      }
    }
  }

  if (items.length) {
    return {
      type: 'menu',
      collapsed: navItem.collapsed,
      items,
      title: navItem.menuTitle || navItem.title || '',
    }
  }

  return {
    type: 'menuLink',
    hidden: navItem.hidden,
    href: navItem.href || '',
    title: navItem.menuTitle || navItem.title || '',
  }
}

export function buildNavMenu(navItem: NavItem): NavMenu {
  const items: NavMenuItem[] = [
    {
      type: 'menuLink',
      hidden: navItem.hidden,
      href: navItem.href || '',
      title: navItem.menuTitle || navItem.title || '',
    },
  ]

  for (const child of navItem.items) {
    if (features.hintHiddenContent || !child.hidden) {
      items.push(getNavMenuItem(child))
    }
  }

  return {
    type: 'menu',
    collapsed: false,
    items,
  }
}

function uniq(items: string[]): string[] {
  return items.filter((item, index) => items.indexOf(item) === index)
}
