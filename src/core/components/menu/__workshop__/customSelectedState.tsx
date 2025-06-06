import {ChevronDownIcon} from '@sanity/icons'
import {Box, Button, Menu, MenuButton, MenuItem} from '@sanity/ui'
import {useSelect} from '@sanity/ui-workshop'

const selectedOptions = {
  undefined: 'undefined',
  true: true,
  false: false,
} as const

export default function CustomSelectedStateStory() {
  const selected = useSelect('Selected', selectedOptions, false)

  return (
    <Box padding={4}>
      <MenuButton
        button={
          <Button
            icon={ChevronDownIcon}
            mode="bleed"
            selected={selected === 'undefined' ? undefined : selected}
            text="Menu"
          />
        }
        id="test-menu"
        menu={
          <Menu>
            <MenuItem text="Item 1" />
            <MenuItem text="Item 2" />
          </Menu>
        }
      />
    </Box>
  )
}
