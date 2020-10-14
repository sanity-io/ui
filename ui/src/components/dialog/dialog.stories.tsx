import {
  Box,
  Button,
  Dialog,
  LayerProvider,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Text,
} from '@sanity/ui'
import React, {useCallback, useRef, useState} from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  decorators: [withCentered],
  title: 'Components/Dialog',
}

export const plain = () => {
  return (
    <LayerProvider>
      <PlainExample />
    </LayerProvider>
  )
}

export const nested = () => {
  return (
    <LayerProvider>
      <NestedExample />
    </LayerProvider>
  )
}

function PlainExample() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const handleClose = useCallback(() => {
    setOpen(false)
    buttonRef.current?.focus()
  }, [])

  return (
    <>
      <Button onClick={() => setOpen(true)} ref={buttonRef}>
        Open dialog
      </Button>

      {open && (
        <Dialog header={<>Example</>} id="dialog1" onClose={handleClose}>
          <Box padding={4}>
            <Stack space={4}>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et orci vitae diam
                aliquet imperdiet.
              </Text>
              <Button>Focus test</Button>
              <Text>
                Sed in hendrerit metus. Sed sapien neque, imperdiet eu justo sed, vestibulum mollis
                dolor.
              </Text>
              <Button>Focus test</Button>
              <Text>
                Nulla sit amet ipsum ligula. Duis sit amet velit tempor, ultricies mauris dignissim,
                mollis enim.
              </Text>
              <Button>Focus test</Button>
              <Text>Cras quis elit non mauris faucibus molestie non non augue. </Text>
              <Text>
                Proin suscipit gravida sodales. Morbi vel purus molestie, rhoncus augue sit amet,
                auctor justo.
              </Text>
              <Button>Focus test</Button>
              <Text>Proin lobortis nunc a tellus condimentum, a ultrices arcu egestas.</Text>
              <Button>Focus test</Button>
              <Text>
                Suspendisse augue nibh, euismod sit amet sapien nec, molestie dignissim magna.
              </Text>
            </Stack>
          </Box>
        </Dialog>
      )}
    </>
  )
}

function NestedExample() {
  const [open1] = useState(true)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)

  return (
    <>
      {open1 && (
        <Dialog cardShadow={0} id="dialog1">
          <Box padding={4}>
            <Button onClick={() => setOpen2(true)}>Open Dialog 2</Button>
          </Box>

          {open2 && (
            <Dialog cardShadow={2} id="dialog2" onClose={() => setOpen2(false)}>
              <Box padding={4}>
                <Button onClick={() => setOpen3(true)}>Open Dialog 3</Button>
              </Box>

              {open3 && (
                <Dialog cardShadow={4} id="dialog3" onClose={() => setOpen3(false)}>
                  <Box padding={4}>
                    <MenuButton
                      button={<Button>Test</Button>}
                      id="menu3"
                      menu={
                        <Menu>
                          <MenuItem text="Test" />
                          <MenuItem text="Test" />
                        </Menu>
                      }
                    />
                  </Box>
                </Dialog>
              )}
            </Dialog>
          )}
        </Dialog>
      )}
    </>
  )
}
