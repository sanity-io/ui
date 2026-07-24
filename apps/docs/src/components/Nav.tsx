'use client'

import {Tree, TreeItem} from '@sanity/ui'
import Link from 'next/link'
import {ReactElement} from 'react'

import {NavNode} from '@/lib/nav'

export function Nav(props: {nav: NavNode; path: string}): ReactElement {
  const {nav, path} = props

  return (
    <Tree gap={1}>
      {nav.children?.map((node) => (
        <NavMenuItem key={node.href} level={1} node={node} path={path} />
      ))}
    </Tree>
  )
}

function NavMenuItem(props: {level: number; node: NavNode; path: string}) {
  const {level, node, path} = props
  const href = node.targetId && node.href ? node.href : undefined

  if (node.hidden) {
    return null
  }

  const title = node.menuTitle || node.title

  return (
    <TreeItem
      expanded={!node.collapsed || path.startsWith(`${node.href}/`)}
      href={href}
      // `next/link` adds the `/ui` basePath and prefetches the fully cached
      // destination pages, making sidebar navigations instant
      linkAs={Link}
      selected={href ? href === path : false}
      text={title ? node.isHook ? <>{title}()</> : title : <em>Untitled</em>}
    >
      {node.children?.map((child) => (
        <NavMenuItem key={child.href} level={level + 1} node={child} path={path} />
      ))}
    </TreeItem>
  )
}
