export interface NavNode {
  collapsed: boolean
  hidden: boolean
  href: string
  isComponent: boolean
  isHook: boolean
  menuTitle: string | undefined
  segment: string | undefined
  targetId: string | undefined
  title: string | undefined

  children: NavNode[] | undefined
}
