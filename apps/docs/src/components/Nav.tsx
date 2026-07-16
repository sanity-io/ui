'use client'

import {Tree, TreeItem} from '@sanity/ui'
import {useRouter} from 'next/navigation'
import {MouseEvent, ReactElement, useCallback, useEffect} from 'react'

import {useApp} from '@/app/useApp'
import {basePath} from '@/constants'
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

function ensureBasePath(path: string, basePath: string = '') {
  if (path.startsWith(basePath)) return path

  return `${basePath}${path}`
}

function NavMenuItem(props: {level: number; node: NavNode; path: string}) {
  const {level, node, path} = props
  const router = useRouter()
  const {features} = useApp()
  const hidden = node.hidden && !features.hintHiddenContent
  const href = node.targetId && node.href ? node.href : undefined
  const hrefWithBasePath =
    node.targetId && node.href ? ensureBasePath(node.href, basePath) : undefined

  // The destination pages are fully cached, so prefetching their content makes
  // sidebar navigations instant. (TreeItem renders a plain anchor — its
  // `linkAs` prop bypasses the Box styles — so prefetch imperatively instead
  // of through `next/link`.)
  useEffect(() => {
    if (href && !hidden) router.prefetch(href)
  }, [hidden, href, router])

  const handleClick = useCallback(
    (event: MouseEvent<HTMLLIElement>) => {
      if (!(event.ctrlKey || event.metaKey || event.shiftKey)) {
        event.preventDefault()
        if (href) router.push(href)
      }
    },
    [href, router],
  )

  if (hidden) {
    return null
  }

  const title = node.menuTitle || node.title

  return (
    <TreeItem
      expanded={!node.collapsed || path.startsWith(`${node.href}/`)}
      href={hrefWithBasePath}
      onClick={handleClick}
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
