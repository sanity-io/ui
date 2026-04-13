import {
  BoundaryElementProvider,
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  PortalProvider,
} from '@sanity/ui'
import {useCallback, useState} from 'react'

export default function PanesStory(): React.JSX.Element {
  return (
    <Flex height="fill">
      <Pane id="A" />
      <Pane borderLeft id="B" />
    </Flex>
  )
}

function Pane(props: {borderLeft?: boolean; id: string}) {
  const {borderLeft, id} = props
  const [element, setElement] = useState<HTMLDivElement | null>(null)
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleClose = useCallback(() => {
    setDialogOpen(false)
  }, [])

  return (
    <BoundaryElementProvider element={element}>
      <PortalProvider element={portalElement}>
        <Card ref={setElement} borderLeft={borderLeft} flex={1} position="relative">
          <Box padding={4}>
            <Button selected={dialogOpen} text="Open dialog" onClick={() => setDialogOpen(true)} />
          </Box>

          <div ref={setPortalElement} />
        </Card>

        {dialogOpen && (
          <Dialog
            header={`Dialog ${id}`}
            id={id}
            position="absolute"
            onClickOutside={handleClose}
            onClose={handleClose}
          >
            <Box padding={4}>
              <MenuButton
                button={<Button text="Open menu" />}
                id={`${id}-menu`}
                menu={
                  <Menu>
                    <MenuItem text="Item 1" />
                    <MenuItem text="Item 2" />
                    <MenuItem text="Item 3" />
                  </Menu>
                }
                popover={{
                  modal: true,
                  portal: true,
                }}
              />
            </Box>
          </Dialog>
        )}
      </PortalProvider>
    </BoundaryElementProvider>
  )
}
