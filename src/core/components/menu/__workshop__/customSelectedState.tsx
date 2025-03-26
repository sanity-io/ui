import {ChevronDownIcon} from '@sanity/icons'
import {useSelect} from '@sanity/ui-workshop'

import {Box, Button} from '../../../primitives'
import {Menu} from '../menu'
import {MenuButton} from '../menuButton'
import {MenuItem} from '../menuItem'

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
