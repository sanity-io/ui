import {SelectIcon} from '@sanity/icons'
import {Button, Menu, MenuButton, type MenuButtonProps, MenuItem} from '@sanity/ui'
import {useCallback} from 'react'

import {ZOOM_OPTIONS} from '../constants'
import {useWorkshop} from '../useWorkshop'

/** @internal */
export function ZoomMenu() {
  const {broadcast, story, zoom} = useWorkshop()

  const setZoom = useCallback(
    (value: number) => broadcast({type: 'workshop/setZoom', value}),
    [broadcast],
  )

  return <ZoomMenuView disabled={!story} setZoom={setZoom} zoom={zoom} />
}

const POPOVER_PROPS: MenuButtonProps['popover'] = {
  'constrainSize': true,
  // @ts-expect-error - data-testid is not a valid prop for PopoverProps
  'data-testid': 'zoom-menu-popover',
  'placement': 'bottom',
}

function ZoomMenuView(props: {disabled: boolean; setZoom: (z: number) => void; zoom: number}) {
  const {disabled, setZoom, zoom} = props

  return (
    <MenuButton
      button={
        <Button
          data-testid="zoom-menu-button"
          disabled={disabled}
          fontSize={1}
          iconRight={SelectIcon}
          mode="ghost"
          padding={2}
          text={ZOOM_OPTIONS.find((o) => o.value === zoom)?.title}
        />
      }
      id="zoom-menu"
      menu={
        <Menu>
          {ZOOM_OPTIONS.map((option) => (
            <MenuItem
              key={option.value}
              fontSize={1}
              padding={2}
              selected={option.value === zoom}
              text={option.title}
              onClick={() => setZoom(option.value)}
            />
          ))}
        </Menu>
      }
      popover={POPOVER_PROPS}
    />
  )
}
