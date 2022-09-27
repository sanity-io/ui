'use client'

import {sanity} from '@sanity/react-loader/jsx'
import {Tree, TreeItem} from '@sanity/ui'
import {useRouter} from 'next/navigation'
import {MouseEvent, ReactElement, useCallback} from 'react'

import {useApp} from '@/app/useApp'
import {NavNode} from '@/lib/nav'

export function Nav(props: {nav: NavNode; path: string}): ReactElement {
  const {nav, path} = props

  return (
    <Tree space={1}>
      {nav.children?.map((node, idx) => (
        <NavMenuItem key={idx} level={1} node={node} path={path} />
      ))}
    </Tree>
  )
}

function NavMenuItem(props: {level: number; node: NavNode; path: string}) {
  const {level, node, path} = props
  const router = useRouter()
  const {features} = useApp()
  const href = node.targetId && node.href ? node.href : undefined

  const handleClick = useCallback(
    (event: MouseEvent<HTMLLIElement>) => {
      event.preventDefault()
      if (href) router.push(href)
    },
    [href, router],
  )

  if (node.hidden && !features.hintHiddenContent) {
    return null
  }

  const title = node.menuTitle || node.title

  return (
    <TreeItem
      expanded={node.collapsed !== true || path.startsWith(`${node.href}/`)}
      href={href}
      onClick={handleClick}
      selected={href ? href === path : false}
      style={{opacity: node.hidden ? 0.25 : undefined}}
      text={
        title ? (
          node.isHook ? (
            <>
              <sanity.span>{title}</sanity.span>()
            </>
          ) : (
            <sanity.span>{title}</sanity.span>
          )
        ) : (
          <em>Untitled</em>
        )
      }
    >
      {node.children?.map((child, idx) => (
        <NavMenuItem key={idx} level={level + 1} node={child} path={path} />
      ))}
    </TreeItem>
  )
}
