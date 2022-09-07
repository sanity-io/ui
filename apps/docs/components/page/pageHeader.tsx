import {Box, Layer, Tree, TreeItem} from '@sanity/ui'
import {useRouter} from 'next/router'
import {useCallback} from 'react'
import styled from 'styled-components'
import {basePath} from '$config'
import {NavMenu, NavMenuItem} from '$lib/nav'

export interface PageHeaderProps {
  header?: React.ReactNode
  menu?: NavMenu
}

const Root = styled(Layer).attrs({forwardedAs: 'nav'})`
  height: 100vh;
  top: 0;
  position: sticky;
  overflow: auto;
  border-right: 1px solid var(--card-border-color);
`

export function PageHeader({header, menu}: PageHeaderProps) {
  if (!header && !menu) return null

  return (
    <Root>
      {header}
      {menu && (
        <Box padding={[3, 3, 4]}>
          <Tree space={1}>
            {menu.items &&
              menu.items.map((item, itemIndex) => <PageHeaderItem item={item} key={itemIndex} />)}
          </Tree>
        </Box>
      )}
    </Root>
  )
}

function PageHeaderItem(props: {item: NavMenuItem}) {
  const {item} = props
  const router = useRouter()
  const {push: pushLocation} = router

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      if (event.altKey || event.metaKey || event.shiftKey) {
        return
      }

      if (item.type === 'menuLink') {
        event.preventDefault()
        pushLocation(item.href)
      }
    },
    [item, pushLocation]
  )

  if (item.type === 'menu') {
    return (
      <TreeItem
        expanded={!item.collapsed}
        fontSize={[1, 1, 1, 2]}
        padding={[2, 2, 2, 3]}
        text={item.title}
        weight="medium"
      >
        {item.items.map((child, childIndex) => (
          <PageHeaderItem item={child} key={childIndex} />
        ))}
      </TreeItem>
    )
  }

  return (
    <TreeItem
      fontSize={[1, 1, 1, 2]}
      href={`${basePath}${item.href}`}
      muted
      onClick={handleClick}
      padding={[2, 2, 2, 3]}
      selected={item.href === router.asPath}
      style={{opacity: item.hidden ? 0.25 : undefined}}
      text={item.title}
    />
  )
}
