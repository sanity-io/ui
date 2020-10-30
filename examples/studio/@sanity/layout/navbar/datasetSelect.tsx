import {Button, Menu, MenuButton, MenuItem} from '@sanity/ui'
import React from 'react'

export function DatasetSelect() {
  return (
    <MenuButton
      button={<Button icon="database" iconRight="chevron-down" mode="ghost" text="Production" />}
      id="dataset-menu"
      menu={
        <Menu>
          <MenuItem icon="database" text="Production" />
          <MenuItem icon="database" text="Staging" />
          <MenuItem icon="database" text="Development" />
        </Menu>
      }
    />
  )
}
