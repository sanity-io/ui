import {withCentered} from '~/storybook/decorators'
import {Box, Button, Dialog, LayerProvider, Stack, Text} from '@sanity/ui'
import React, {useCallback, useRef, useState} from 'react'

export default {
  title: 'Components/Dialog',
  decorators: [withCentered],
}

export const plain = () => {
  return (
    <LayerProvider>
      <DialogExample />
    </LayerProvider>
  )
}

function DialogExample() {
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
