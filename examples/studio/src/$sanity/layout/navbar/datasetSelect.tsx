import {DatabaseIcon} from '@sanity/icons'
import {Button, Menu, MenuButton, MenuItem} from '@sanity/ui'

export function DatasetSelect() {
  return (
    <MenuButton
      button={
        <Button icon={DatabaseIcon} iconRight="chevron-down" mode="ghost" text="Production" />
      }
      id="dataset-menu"
      menu={
        <Menu>
          <MenuItem icon={DatabaseIcon} text="Production" />
          <MenuItem icon={DatabaseIcon} text="Staging" />
          <MenuItem icon={DatabaseIcon} text="Development" />
        </Menu>
      }
      popoverScheme="light"
    />
  )
}
