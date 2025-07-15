import {AddIcon} from '@sanity/icons'
import {Box, Button, Menu, MenuButton, type MenuButtonProps, MenuItem, Stack} from '@sanity/ui'
import {vars} from '@sanity/ui/css'
import {useRef} from 'react'

const POPOVER_PROPS: MenuButtonProps['popover'] = {
  constrainSize: true,
}

export default function ClosableMenuButtonStory(): React.JSX.Element {
  const ref = useRef<HTMLButtonElement | null>(null)

  return (
    <Box padding={[4, 5, 6]}>
      <Stack>
        <MenuButton
          button={<Button text="Open" />}
          id="closable-example"
          menu={
            <Menu gap={0} padding={0}>
              <Stack gap={1} padding={1}>
                <MenuItem text="Item 1" />
                <MenuItem text="Item 2" />
                <MenuItem text="Item 3" />
                <MenuItem text="Item 4" />
              </Stack>
              <Stack padding={1} style={{borderTop: `1px solid ${vars.color.border}`}}>
                <Button
                  icon={AddIcon}
                  onClick={() => {
                    ref.current?.click()
                    ref.current?.focus()
                  }}
                  mode="bleed"
                  text="Add item"
                  tone="primary"
                />
              </Stack>
            </Menu>
          }
          popover={POPOVER_PROPS}
          ref={ref}
        />
      </Stack>
    </Box>
  )
}
