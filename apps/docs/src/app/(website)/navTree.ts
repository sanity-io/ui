import type {NavItemMeta, NavNode} from '#lib/nav/types.ts'

// The nav tree mirrors the route file structure: every route folder under
// (website) has a colocated `nav.ts` with its title/order/flags, and
// `import.meta.glob` (Turbopack) collects them all — no manually maintained
// list of routes. Group folders (e.g. /docs/primitive) have a `nav.ts` but no
// `page.tsx`; the lazy page glob is only used for its keys, to know which
// folders are actual pages.
const navModules = import.meta.glob('./**/nav.ts', {eager: true, import: 'nav'}) as Record<
  string,
  NavItemMeta
>
const pageModules = import.meta.glob('./**/page.tsx')

function parseKey(key: string, suffix: string): string[] {
  // './docs/primitive/button/nav.ts' -> ['docs', 'primitive', 'button']
  // './nav.ts' -> [] (this folder itself — the home page)
  return key.slice(2, -suffix.length).split('/').filter(Boolean)
}

interface Entry {
  segments: string[]
  meta: NavItemMeta
}

const entries: Entry[] = Object.entries(navModules).map(([key, meta]) => ({
  segments: parseKey(key, '/nav.ts'),
  meta,
}))

const pagePaths = new Set(
  Object.keys(pageModules).map((key) => parseKey(key, '/page.tsx').join('/')),
)

function byOrder(a: Entry, b: Entry): number {
  return a.meta.order - b.meta.order || a.segments.join('/').localeCompare(b.segments.join('/'))
}

function childrenOf(segments: string[]): Entry[] {
  // The zero-segment entry is (website)/nav.ts itself — the home page leaf.
  // Its subfolders are children of the synthetic root, not of the home page.
  if (segments.length === 0) return []
  const prefix = segments.join('/')
  return entries
    .filter(
      (entry) =>
        entry.segments.length === segments.length + 1 &&
        entry.segments.slice(0, -1).join('/') === prefix,
    )
    .sort(byOrder)
}

function buildNode(entry: Entry): NavNode {
  const {segments, meta} = entry
  const path = segments.join('/')
  const children = childrenOf(segments).map(buildNode)

  return {
    collapsed: meta.collapsed ?? false,
    hidden: meta.hidden ?? false,
    href: segments.length ? `/${path}` : '',
    hasPage: pagePaths.has(path),
    isComponent: meta.isComponent ?? false,
    isHook: meta.isHook ?? false,
    menuTitle: meta.menuTitle,
    segment: segments.at(-1),
    title: meta.title,

    children: children.length ? children : undefined,
  }
}

function buildTree(): NavNode {
  const topLevel = entries
    .filter((entry) => entry.segments.length <= 1)
    .sort(byOrder)
    .map(buildNode)

  // Synthetic root: not a route itself, only holds the top-level items (like
  // the `nav` document did before the docs became static)
  return {
    collapsed: false,
    hidden: false,
    href: '',
    hasPage: false,
    isComponent: false,
    isHook: false,
    menuTitle: undefined,
    segment: undefined,
    title: undefined,

    children: topLevel.length ? topLevel : undefined,
  }
}

export const navTree: NavNode = buildTree()
