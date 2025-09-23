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

import {panePortal, paneRoot} from './styles.css'

export default function PanesStory(): React.JSX.Element {
  return (
    <Flex height="fill">
      <Pane id="A" />
      <Pane id="B" borderLeft />
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
        <Card className={paneRoot} borderLeft={borderLeft} flex={1} ref={setElement}>
          <Box padding={4}>
            <Button onClick={() => setDialogOpen(true)} selected={dialogOpen} text="Open dialog" />
          </Box>

          <div className={panePortal} ref={setPortalElement} />
        </Card>

        {dialogOpen && (
          <Dialog
            header={`Dialog ${id}`}
            id={id}
            onClickOutside={handleClose}
            onClose={handleClose}
            position="absolute"
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
