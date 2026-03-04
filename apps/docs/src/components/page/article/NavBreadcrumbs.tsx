import {ChevronRightIcon} from '@sanity/icons'
import {sanity} from '@sanity/react-loader/jsx'
import {Breadcrumbs, Text} from '@sanity/ui'
import Link from 'next/link'

import {NavNode} from '@/lib/nav'

export function NavBreadcrumbs(props: {nav: NavNode; slug: string[] | undefined}) {
  const {nav, slug} = props

  const breadcrumbItems = _getBreadcrumbItems(nav, slug)

  return (
    <Breadcrumbs
      separator={
        <Text muted size={1}>
          <ChevronRightIcon />
        </Text>
      }
      gap={2}
    >
      {breadcrumbItems.map(({node, segment, index}) => (
        <Text key={segment} size={1} weight="medium">
          {index === 0 ? (
            <Link href={`/${node.segment}`} style={{color: 'inherit'}}>
              <sanity.span>{node.title}</sanity.span>
            </Link>
          ) : (
            <sanity.span>{node.title}</sanity.span>
          )}
        </Text>
      ))}
    </Breadcrumbs>
  )
}

function _getBreadcrumbItems(
  nav: NavNode,
  path: string[] | undefined,
): {node: NavNode; segment: string; index: number}[] {
  const items: {node: NavNode; segment: string; index: number}[] = []

  if (!path) {
    return items
  }

  const len = path.length

  let node: NavNode | undefined = nav

  for (let index = 0; index < len; index += 1) {
    const segment = path[index]

    if (index > 0) {
      node = node?.children?.find((child) => child.segment === segment)
    }

    if (!node) {
      break
    }

    items.push({
      node,
      segment,
      index,
    })
  }

  return items
}
