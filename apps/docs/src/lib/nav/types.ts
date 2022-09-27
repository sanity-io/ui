import {SourceNode} from '@sanity/react-loader/jsx'

export interface NavNode {
  collapsed: boolean
  hidden: boolean
  href: string
  isComponent: boolean
  isHook: boolean
  menuTitle: SourceNode<string> | undefined
  segment: string | undefined
  targetId: string | undefined
  title: SourceNode<string> | undefined

  children: NavNode[] | undefined
}
