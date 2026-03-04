import {Box, Button, Dialog, LayerProvider, Stack, Text} from '@sanity/ui'
import {CARD_TONES, COLOR_SCHEMES, CONTAINER} from '@sanity/ui/tokens'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import {useCallback, useRef, useState} from 'react'

export default function PropsStory(): React.JSX.Element {
  const animate = useBoolean('Animate', false)
  const header = useText('Header', 'Props example')
  const onClickOutside = useBoolean('Close when click outside', false)
  const hideCloseButton = useBoolean('Hide close button', false)
  const scheme = useSelect('Scheme', [undefined, ...COLOR_SCHEMES])
  const tone = useSelect('Tone', [undefined, ...CARD_TONES])
  const width = useSelect('Width', CONTAINER)
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const handleClose = useCallback(() => {
    setOpen(false)
    buttonRef.current?.focus()
  }, [])

  return (
    <LayerProvider>
      <Box padding={[4, 5, 6]}>
        <Button
          ref={buttonRef}
          id="open-dialog-button"
          text="Open dialog"
          onClick={() => setOpen(true)}
        />

        {open && (
          <Dialog
            __unstable_hideCloseButton={hideCloseButton}
            animate={animate}
            header={header}
            id="dialog"
            open={open}
            scheme={scheme}
            tone={tone}
            width={width}
            onClickOutside={onClickOutside ? handleClose : undefined}
            onClose={handleClose}
          >
            <Box padding={4}>
              <Stack gap={4}>
                <Text muted size={1}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et orci vitae diam
                  aliquet imperdiet.
                </Text>
                <Button id="button-1" mode="ghost" text="Focus test" />
                <Text muted size={1}>
                  Sed in hendrerit metus. Sed sapien neque, imperdiet eu justo sed, vestibulum
                  mollis dolor.
                </Text>
                <Button id="button-2" mode="ghost" text="Focus test" />
                <Text muted size={1}>
                  Nulla sit amet ipsum ligula. Duis sit amet velit tempor, ultricies mauris
                  dignissim, mollis enim.
                </Text>
                <Button id="button-3" mode="ghost" text="Focus test" />
                <Text muted size={1}>
                  Cras quis elit non mauris faucibus molestie non non augue.{' '}
                </Text>
                <Text muted size={1}>
                  Proin suscipit gravida sodales. Morbi vel purus molestie, rhoncus augue sit amet,
                  auctor justo.
                </Text>
                <Button id="button-4" mode="ghost" text="Focus test" />
                <Text muted size={1}>
                  Proin lobortis nunc a tellus condimentum, a ultrices arcu egestas.
                </Text>
                <Button id="button-5" mode="ghost" text="Focus test" />
                <Text muted size={1}>
                  Suspendisse augue nibh, euismod sit amet sapien nec, molestie dignissim magna.
                </Text>
              </Stack>
            </Box>
          </Dialog>
        )}
      </Box>
    </LayerProvider>
  )
}
