import {Box, Button, Dialog, LayerProvider, Menu, MenuButton, MenuItem} from '@sanity/ui'
import {useEffect, useRef, useState} from 'react'

export default function NestedStory() {
  const [open1] = useState(true)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)

  const dialog2Button = useRef<HTMLButtonElement>(null)
  const dialog3Button = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open2) dialog2Button.current?.focus()
  }, [open2])

  useEffect(() => {
    if (!open3) dialog3Button.current?.focus()
  }, [open3])

  return (
    <LayerProvider>
      {open1 && (
        <Dialog animate cardShadow={1} header="Dialog 1" id="dialog1">
          <Box padding={4}>
            <Button onClick={() => setOpen2(true)} ref={dialog2Button} text="Open Dialog 2" />
          </Box>

          {open2 && (
            <Dialog
              animate
              cardShadow={2}
              header="Dialog 2"
              id="dialog2"
              onClose={() => setOpen2(false)}
              onClickOutside={() => setOpen2(false)}
            >
              <Box padding={4}>
                <Button onClick={() => setOpen3(true)} ref={dialog3Button} text="Open Dialog 3" />
              </Box>

              {open3 && (
                <Dialog
                  animate
                  cardShadow={4}
                  header="Dialog 3"
                  id="dialog3"
                  onClose={() => setOpen3(false)}
                  onClickOutside={() => setOpen3(false)}
                >
                  <Box padding={4}>
                    <MenuButton
                      button={<Button text="Test" />}
                      id="menu3"
                      popover={{animate: true}}
                      menu={
                        <Menu>
                          <MenuItem text="Test" />
                          <MenuItem text="Test" />
                        </Menu>
                      }
                      portal
                    />
                  </Box>
                </Dialog>
              )}
            </Dialog>
          )}
        </Dialog>
      )}
    </LayerProvider>
  )
}
