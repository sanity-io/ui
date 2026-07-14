'use client'

import {Tree, TreeItem} from '@sanity/ui'
import Link from 'next/link'
import {ComponentProps, ReactElement} from 'react'

import {useApp} from '@/app/useApp'
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

// The destination pages are fully cached, so ship their content with the
// prefetch for instant navigations (`next/link` also prepends the basePath)
function PrefetchLink(props: ComponentProps<typeof Link> & {as?: unknown}) {
  // TreeItem's inner box is `styled(Box).attrs({forwardedAs: 'a'})`, which
  // forwards `as="a"` — next/link would treat that legacy prop as the URL
  const {as: _as, ...rest} = props

  return <Link {...rest} prefetch />
}

function NavMenuItem(props: {level: number; node: NavNode; path: string}) {
  const {level, node, path} = props
  const {features} = useApp()
  const href = node.targetId && node.href ? node.href : undefined

  if (node.hidden && !features.hintHiddenContent) {
    return null
  }

  const title = node.menuTitle || node.title

  return (
    <TreeItem
      expanded={!node.collapsed || path.startsWith(`${node.href}/`)}
      href={href}
      linkAs={PrefetchLink}
      selected={href ? href === path : false}
      style={{opacity: node.hidden ? 0.25 : undefined}}
      text={title ? node.isHook ? <>{title}()</> : title : <em>Untitled</em>}
    >
      {node.children?.map((child) => (
        <NavMenuItem key={child.href} level={level + 1} node={child} path={path} />
      ))}
    </TreeItem>
  )
}
