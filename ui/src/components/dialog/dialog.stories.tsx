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
import {select, withKnobs} from '@storybook/addon-knobs'
import React, {useCallback, useRef, useState} from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  decorators: [withCentered, withKnobs],
  title: 'Components/Dialog',
}

export const props = () => {
  const width = select(
    'Icon',
    {
      '0 (default)': '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      Auto: 'auto',
    },
    '1',
    'Props'
  )

  return (
    <LayerProvider>
      <PropsExample width={width === 'auto' ? width : Number(width)} />
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

function PropsExample(props: {width: number | 'auto'}) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const handleClose = useCallback(() => {
    setOpen(false)
    buttonRef.current?.focus()
  }, [])

  return (
    <>
      <Button
        id="open-dialog-button"
        onClick={() => setOpen(true)}
        ref={buttonRef}
        text="Open dialog"
      />

      {open && (
        <Dialog {...props} header={<>Example</>} id="dialog" onClose={handleClose}>
          <Box padding={4}>
            <Stack space={4}>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et orci vitae diam
                aliquet imperdiet.
              </Text>
              <Button id="button-1" text="Focus test" />
              <Text>
                Sed in hendrerit metus. Sed sapien neque, imperdiet eu justo sed, vestibulum mollis
                dolor.
              </Text>
              <Button id="button-2" text="Focus test" />
              <Text>
                Nulla sit amet ipsum ligula. Duis sit amet velit tempor, ultricies mauris dignissim,
                mollis enim.
              </Text>
              <Button id="button-3" text="Focus test" />
              <Text>Cras quis elit non mauris faucibus molestie non non augue. </Text>
              <Text>
                Proin suscipit gravida sodales. Morbi vel purus molestie, rhoncus augue sit amet,
                auctor justo.
              </Text>
              <Button id="button-4" text="Focus test" />
              <Text>Proin lobortis nunc a tellus condimentum, a ultrices arcu egestas.</Text>
              <Button id="button-5" text="Focus test" />
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
            <Button onClick={() => setOpen2(true)} text="Open Dialog 2" />
          </Box>

          {open2 && (
            <Dialog cardShadow={2} id="dialog2" onClose={() => setOpen2(false)}>
              <Box padding={4}>
                <Button onClick={() => setOpen3(true)} text="Open Dialog 3" />
              </Box>

              {open3 && (
                <Dialog cardShadow={4} id="dialog3" onClose={() => setOpen3(false)}>
                  <Box padding={4}>
                    <MenuButton
                      button={<Button text="Test" />}
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
