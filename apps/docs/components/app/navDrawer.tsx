import {CloseIcon} from '@sanity/icons'
import {Box, Button, Card, Flex, Heading, Layer, useClickOutside} from '@sanity/ui'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useApp} from './hooks'
import {NavMenu} from '$components/navMenu'
import {NavMenu as NavMenuType} from '$lib/nav'

const Root = styled(Layer).attrs({forwardedAs: 'aside'})`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  max-width: 16em;
  width: calc(100% - 35px);
  background-color: var(--card-shadow-penumbra-color);
`

const Header = styled(Layer)`
  position: relative;

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    border-bottom: 1px solid var(--card-shadow-outline-color);
  }
`

export function NavDrawer({
  menu,
  onClose,
  open,
}: {
  menu: NavMenuType
  onClose: () => void
  open: boolean
}) {
  const {zOffsets} = useApp()
  const router = useRouter()
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)

  useClickOutside(onClose, [rootElement])

  useEffect(() => onClose(), [onClose, router])

  return (
    <Root hidden={!open} ref={setRootElement} zOffset={zOffsets.navDrawer}>
      <Card height="fill" shadow={3}>
        <Flex direction="column" height="fill">
          <Header style={{minHeight: 'auto'}}>
            <Card>
              <Flex align="center">
                <Box flex={1} padding={[4, 4, 5]}>
                  <Heading as="h1" size={1}>
                    {menu.title}
                  </Heading>
                </Box>
                <Box padding={[3, 3, 4]}>
                  <Button
                    aria-label="Close menu"
                    icon={CloseIcon}
                    mode="bleed"
                    onClick={onClose}
                    padding={[2, 2, 3]}
                  />
                </Box>
              </Flex>
            </Card>
          </Header>

          <Box flex={1} overflow="auto">
            {menu.items &&
              menu.items.map((item, itemIndex) => {
                if (item.type === 'menu') {
                  return <NavMenu key={itemIndex} menu={item} />
                }

                return null
              })}
          </Box>
        </Flex>
      </Card>
    </Root>
  )
}
