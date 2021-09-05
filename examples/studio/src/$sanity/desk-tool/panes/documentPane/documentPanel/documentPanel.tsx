import {
  AddIcon,
  BinaryDocumentIcon,
  EarthAmericasIcon,
  EllipsisVerticalIcon,
  RestoreIcon,
} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  Flex,
  LayerProvider,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  PortalProvider,
  Stack,
  Text,
  TextInput,
} from '@sanity/ui'
import React, {useRef, useState} from 'react'
import styled from 'styled-components'
import {Root, Header, Content, ScrollContainer} from './styles'

function EditInDialogButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button icon={AddIcon} mode="ghost" onClick={() => setOpen(true)} text="Add" />

      {open && (
        <LayerProvider zOffset={1000}>
          <Dialog
            header="Edit item"
            id="pane-context-dialog"
            onClose={() => setOpen(false)}
            position="absolute"
            width={1}
          >
            <Box paddingX={4} paddingY={5}>
              <Stack space={5}>
                <StringFieldInput />
                <StringFieldInput />
                <StringFieldInput />
              </Stack>
            </Box>
          </Dialog>
        </LayerProvider>
      )}
    </>
  )
}

const PaneTitle = styled(Text)`
  & > span {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

function StringFieldInput() {
  return (
    <Stack space={3}>
      <Text size={1} weight="semibold">
        String
      </Text>
      <TextInput />
    </Stack>
  )
}

function ArrayFieldInput() {
  return (
    <Stack space={3}>
      <Text size={1} weight="semibold">
        Array
      </Text>
      <EditInDialogButton />
    </Stack>
  )
}

export function DocumentPanel({onChangeOpen}: {onChangeOpen: () => void}) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)
  const [contentPortalElement, setContentPortalElement] = useState<HTMLDivElement | null>(null)

  return (
    <Root ref={rootRef}>
      <PortalProvider boundaryElement={rootRef.current} element={portalElement}>
        <Header zOffset={100}>
          <Card>
            <Flex>
              <Box flex={1} padding={4} paddingRight={1}>
                <PaneTitle weight="semibold">
                  <span>Hello, world</span>
                </PaneTitle>
              </Box>
              <Box padding={2}>
                <MenuButton
                  button={<Button icon={EllipsisVerticalIcon} mode="bleed" />}
                  id="pane-context-menu"
                  menu={
                    <Menu>
                      <MenuItem icon={RestoreIcon} onClick={onChangeOpen} text="Review changes" />
                      <MenuItem icon={BinaryDocumentIcon} text="Inspect JSON" />
                      <MenuDivider />
                      <MenuItem icon={EarthAmericasIcon} text="Preview on site" />
                    </Menu>
                  }
                  placement="bottom"
                />
              </Box>
            </Flex>
          </Card>
        </Header>

        <Content>
          <PortalProvider element={contentPortalElement}>
            <ScrollContainer tabIndex={-1}>
              <Container width={1}>
                <Box paddingX={4} paddingY={5}>
                  <Stack space={5}>
                    <StringFieldInput />
                    <ArrayFieldInput />
                    <StringFieldInput />
                    <ArrayFieldInput />
                    <StringFieldInput />
                    <ArrayFieldInput />
                    <StringFieldInput />
                    <ArrayFieldInput />
                    <StringFieldInput />
                    <ArrayFieldInput />
                  </Stack>
                </Box>
              </Container>
            </ScrollContainer>
          </PortalProvider>
          <div data-portal="" ref={setContentPortalElement} />
        </Content>
      </PortalProvider>
      <div data-portal="" ref={setPortalElement} />
    </Root>
  )
}
