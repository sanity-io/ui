import {Box, Button, Dialog, LayerProvider, Menu, MenuButton, MenuItem} from '@sanity/ui'
import {useEffect, useRef, useState} from 'react'

export default function NestedStory(): React.JSX.Element {
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
        <Dialog animate header="Dialog 1" id="dialog1" shadow={1}>
          <Box padding={4}>
            <Button ref={dialog2Button} text="Open Dialog 2" onClick={() => setOpen2(true)} />
          </Box>

          {open2 && (
            <Dialog
              animate
              header="Dialog 2"
              id="dialog2"
              shadow={2}
              onClickOutside={() => setOpen2(false)}
              onClose={() => setOpen2(false)}
            >
              <Box padding={4}>
                <Button ref={dialog3Button} text="Open Dialog 3" onClick={() => setOpen3(true)} />
              </Box>

              {open3 && (
                <Dialog
                  animate
                  header="Dialog 3"
                  id="dialog3"
                  shadow={4}
                  onClickOutside={() => setOpen3(false)}
                  onClose={() => setOpen3(false)}
                >
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
                      popover={{animate: true, portal: true}}
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
