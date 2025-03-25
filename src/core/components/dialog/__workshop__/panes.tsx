import {useCallback, useState} from 'react'
import {styled} from 'styled-components'
import { Box } from '../../../primitives/box/box'
import { Button } from '../../../primitives/button/button'
import { Card } from '../../../primitives/card/card'
import { Flex } from '../../../primitives/flex/flex'
import { BoundaryElementProvider } from '../../../utils/boundaryElement/boundaryElementProvider'
import { PortalProvider } from '../../../utils/portal/portalProvider'
import { Menu } from '../../menu/menu'
import { MenuButton } from '../../menu/menuButton'
import { MenuItem } from '../../menu/menuItem'
import {Dialog} from '../dialog'

export default function PanesStory() {
  return (
    <Flex height="fill">
      <Pane id="A" />
      <Pane id="B" borderLeft />
    </Flex>
  )
}

const PaneRoot = styled(Card)`
  position: relative;
`

const PanePortal = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`

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
        <PaneRoot borderLeft={borderLeft} flex={1} ref={setElement}>
          <Box padding={4}>
            <Button onClick={() => setDialogOpen(true)} selected={dialogOpen} text="Open dialog" />
          </Box>

          <PanePortal ref={setPortalElement} />
        </PaneRoot>

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
              />
            </Box>
          </Dialog>
        )}
      </PortalProvider>
    </BoundaryElementProvider>
  )
}
