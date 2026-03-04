'use client'

import {sanity} from '@sanity/react-loader/jsx'
import {ReactElement} from 'react'

import {useApp} from '@/app/useApp'
import {NavTree} from '@/components/nav-tree/NavTree'
import {NavTreeNode} from '@/components/nav-tree/types'
import {NavNode} from '@/lib/nav'

export function Nav(props: {nav: NavNode; path: string}): ReactElement {
  const {nav} = props
  const {basePath, defaultVersion, version} = useApp()
  const versionPrefix = version === defaultVersion ? '' : `/${version}`

  const nodes: NavTreeNode[] = [
    {
      key: nav.segment ?? '',
      path: ensureBasePath(`${versionPrefix}${nav.href}`, basePath),
      title: <sanity.span>{nav.menuTitle ?? nav.title}</sanity.span>,
      hidden: nav.hidden,
      link: !!nav.targetId,
    },

    ...(nav.children ?? []).map((n) => {
      return {
        key: n.segment ?? '',
        path: ensureBasePath(`${versionPrefix}${n.href}`, basePath),
        title: <sanity.span>{n.menuTitle ?? n.title}</sanity.span>,
        hidden: n.hidden,
        children: n.children?.map((c) => {
          return {
            key: c.segment ?? '',
            path: ensureBasePath(`${versionPrefix}${c.href}`, basePath),
            title: <sanity.span>{c.menuTitle ?? c.title}</sanity.span>,
            hidden: c.hidden,
            link: !!c.targetId,
          }
        }),
        link: !!n.targetId,
      }
    }),
  ]

  return <NavTree nodes={nodes} />
}

function ensureBasePath(path: string, basePath: string = '') {
  if (!basePath) return path

  if (path.startsWith(basePath)) return path

  return `${basePath}${path}`
}
