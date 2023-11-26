import {SelectIcon} from '@sanity/icons'
import {Button, Menu, MenuButton, MenuButtonProps, MenuItem} from '@sanity/ui'
import {memo, useCallback} from 'react'

import {ZOOM_OPTIONS} from '../constants'
import {useWorkshop} from '../useWorkshop'

/** @internal */
export function ZoomMenu(): React.ReactElement {
  const {broadcast, story, zoom} = useWorkshop()

  const setZoom = useCallback(
    (value: number) => broadcast({type: 'workshop/setZoom', value}),
    [broadcast],
  )

  return <ZoomMenuView disabled={!story} setZoom={setZoom} zoom={zoom} />
}

const POPOVER_PROPS: MenuButtonProps['popover'] = {
  constrainSize: true,
  matchReferenceWidth: true,
  placement: 'bottom',
  portal: true,
}

const ZoomMenuView = memo(function ZoomMenuView(props: {
  disabled: boolean
  setZoom: (z: number) => void
  zoom: number
}) {
  const {disabled, setZoom, zoom} = props

  return (
    <MenuButton
      button={
        <Button
          disabled={disabled}
          fontSize={1}
          iconRight={SelectIcon}
          mode="ghost"
          padding={2}
          style={{minWidth: 80}}
          text={ZOOM_OPTIONS.find((o) => o.value === zoom)?.title}
        />
      }
      id="zoom-menu"
      menu={
        <Menu>
          {ZOOM_OPTIONS.map((option) => (
            <MenuItem
              fontSize={1}
              key={option.value}
              onClick={() => setZoom(option.value)}
              padding={2}
              selected={option.value === zoom}
              text={option.title}
            />
          ))}
        </Menu>
      }
      popover={POPOVER_PROPS}
    />
  )
})
