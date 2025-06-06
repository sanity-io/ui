import {
  Box,
  Button,
  Menu,
  MenuButton,
  type MenuButtonProps,
  MenuItem,
  Stack,
  useToast,
} from '@sanity/ui'
import {useCallback} from 'react'

const POPOVER_PROPS: MenuButtonProps['popover'] = {
  constrainSize: true,
}

export default function OnCloseMenuButton() {
  const {push} = useToast()

  const handleClose = useCallback(() => {
    push({
      title: 'Menu closed',
      status: 'success',
    })
  }, [push])

  return (
    <Box padding={[4, 5, 6]}>
      <Stack gap={2}>
        <MenuButton
          button={<Button text="With onClose callback" />}
          id="closable-example"
          onClose={handleClose}
          menu={
            <Menu gap={0} padding={0}>
              <Stack gap={1} padding={1}>
                <MenuItem text="Item 1" />
                <MenuItem text="Item 2" />
                <MenuItem text="Item 3" />
                <MenuItem text="Item 4" />
              </Stack>
            </Menu>
          }
          popover={POPOVER_PROPS}
        />
        <Button text="Blur test button" mode="ghost" />
      </Stack>
    </Box>
  )
}
