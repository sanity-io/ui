import {HINT_HIDDEN_CONTENT} from '$features'
import {isArray, isRecord, isString} from '$lib/types'

interface NavItem {
  collapsed: boolean
  hidden: boolean
  href?: string
  title?: string
  menuTitle?: string
  items: NavItem[]
  segment?: string
}

export function getNavItems(items: unknown[], basePath = ''): NavItem[] {
  const records: Record<string, unknown>[] = items.filter(isRecord)

  return records
    .filter((item) => HINT_HIDDEN_CONTENT || !item.hidden)
    .map((item: Record<string, unknown>) => {
      const href = `${basePath}/${item.segment || ''}`

      return {
        collapsed: Boolean(item.collapsed),
        hidden: Boolean(item.hidden),
        href: item.targetId ? href : undefined,
        title: isString(item.title) ? item.title : undefined,
        menuTitle: isString(item.menuTitle) ? item.menuTitle : undefined,
        items: getNavItems(isArray(item.items) ? item.items : [], href),
        segment: isString(item.segment) ? item.segment : undefined,
      }
    })
}

export function getNavPaths(items: unknown[], basePath = ''): string[] {
  const paths = []

  for (const item of items) {
    if (!isRecord(item)) continue
    if (!HINT_HIDDEN_CONTENT && item.hidden) continue

    const path = `${basePath}/${item.segment || ''}`

    if (item.targetId) {
      paths.push(path)
    }

    if (item.items) {
      paths.push(...getNavPaths(isArray(item.items) ? item.items : [], path))
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
