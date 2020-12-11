import {HINT_HIDDEN_CONTENT} from '$features'

interface NavItem {
  collapsed: boolean
  hidden: boolean
  href?: string
  title: string
  menuTitle?: string
  items: NavItem[]
  segment?: string
}

export function getNavItems(items: any[], basePath = ''): NavItem[] {
  return items
    .filter((item) => HINT_HIDDEN_CONTENT || !item.hidden)
    .map((item: any) => {
      const href = `${basePath}/${item.segment || ''}`

      return {
        collapsed: item.collapsed || false,
        hidden: item.hidden || false,
        href: item.targetId ? href : undefined,
        title: item.title,
        menuTitle: item.menuTitle,
        items: getNavItems(item.items || [], href),
        segment: item.segment,
      }
    })
}

export function getNavPaths(items: any[], basePath = ''): string[] {
  const paths = []

  for (const item of items) {
    if (!HINT_HIDDEN_CONTENT && item.hidden) continue

    const path = `${basePath}/${item.segment || ''}`

    if (item.targetId) {
      paths.push(path)
    }

    if (item.items) {
      paths.push(...getNavPaths(item.items, path))
    }
  }

  return paths
}

export function getNavPathSegments(items: any[]) {
  return getNavPaths(items).map((p) => p.split('/').slice(1))
}

export function getNavStaticPaths(items: any[]) {
  return getNavPaths(items).map((p) => ({
    params: {path: p.split('/').slice(1)},
  }))
}

export function findNavNode(nodes: any[], path: string[]): any {
  const len = path.length
  const segment = path[0]

  for (const node of nodes) {
    if (node.segment === segment) {
      if (len > 1) {
        return findNavNode(node.items, path.slice(1))
      }

      return node
    }
  }

  return null
}
