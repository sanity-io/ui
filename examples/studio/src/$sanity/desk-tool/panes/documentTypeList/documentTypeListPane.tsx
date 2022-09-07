import {EllipsisVerticalIcon, SplitHorizontalIcon, StackCompactIcon} from '@sanity/icons'
import {
  Box,
  Button,
  Flex,
  LayerProvider,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  PortalProvider,
  Stack,
  Text,
} from '@sanity/ui'
import {useRef, useState} from 'react'
import styled from 'styled-components'
import {ListItem} from '../../components/listItem'
import {Root, Header, Content, ScrollContainer} from './styles'

const PaneTitle = styled(Text)`
  & > span {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export function DocumentTypeListPane() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)
  const [contentPortalElement, setContentPortalElement] = useState<HTMLDivElement | null>(null)

  return (
    <Root ref={rootRef}>
      <PortalProvider boundaryElement={rootRef.current} element={portalElement}>
        <Header>
          <Flex>
            <Box flex={1} padding={4} paddingRight={1}>
              <PaneTitle weight="semibold">
                <span>Post</span>
              </PaneTitle>
            </Box>
            <Box padding={2}>
              <LayerProvider zOffset={200}>
                <MenuButton
                  button={<Button icon={EllipsisVerticalIcon} mode="bleed" />}
                  id="pane-context-menu"
                  menu={
                    <Menu>
                      <MenuItem space={4} text="Sort by title" />
                      <MenuItem space={4} text="Sort by slug" />
                      <MenuItem iconRight="arrow-down" space={4} text="Sort by last edited" />
                      <MenuItem space={4} text="Sort by created" />
                      <MenuDivider />
                      <MenuItem icon={StackCompactIcon} iconRight="checkmark" text="Compact view" />
                      <MenuItem icon={SplitHorizontalIcon} text="Detailed view" />
                    </Menu>
                  }
                  placement="bottom"
                  portal
                />
              </LayerProvider>
            </Box>
          </Flex>
        </Header>

        <Content>
          <PortalProvider element={contentPortalElement}>
            <ScrollContainer tabIndex={-1}>
              <Box paddingX={2} paddingY={3}>
                <Stack space={1}>
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                  <ListItem />
                </Stack>
              </Box>
            </ScrollContainer>
          </PortalProvider>
          <div data-portal="" ref={setContentPortalElement} />
        </Content>
      </PortalProvider>
      <div data-portal="" ref={setPortalElement} />
    </Root>
  )
}
