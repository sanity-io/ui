/**
 * Per-route navigation metadata, exported as `nav` from a `nav.ts` file
 * colocated with each route folder under `src/app/(website)/`. The nav tree
 * mirrors the file structure — these files only carry what the folder name
 * cannot: titles, ordering and display flags.
 */
export interface NavItemMeta {
  title: string
  /** Position among siblings (folders don't encode order) */
  order: number
  /** Sidebar label override (falls back to `title`) */
  menuTitle?: string
  /** Routable but excluded from the navbar and sidebar */
  hidden?: boolean
  /** Sidebar tree item starts collapsed */
  collapsed?: boolean
  /** Render the article heading as `<Title />` */
  isComponent?: boolean
  /** Render the article heading as `title()` */
  isHook?: boolean
}

export interface NavNode {
  collapsed: boolean
  hidden: boolean
  href: string
  /** Whether the route folder has a `page.tsx` (group folders don't) */
  hasPage: boolean
  isComponent: boolean
  isHook: boolean
  menuTitle: string | undefined
  segment: string | undefined
  title: string | undefined

  children: NavNode[] | undefined
}
