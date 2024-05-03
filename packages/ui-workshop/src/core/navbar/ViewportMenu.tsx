import {SelectIcon} from '@sanity/icons'
import {Button, Menu, MenuButton, MenuButtonProps, MenuItem} from '@sanity/ui'
import {memo, useCallback} from 'react'

import {VIEWPORT_OPTIONS} from '../constants'
import {useWorkshop} from '../useWorkshop'

/** @internal */
export const ViewportMenu = memo(function ViewportMenu() {
  const {broadcast, story, viewport} = useWorkshop()

  const setViewport = useCallback(
    (value: string) => {
      broadcast({type: 'workshop/setViewport', value})
    },
    [broadcast],
  )

  return <ViewportMenuView disabled={!story} setViewport={setViewport} viewport={viewport} />
})

const POPOVER_PROPS: MenuButtonProps['popover'] = {
  constrainSize: true,
  placement: 'bottom',
  portal: true,
}

const ViewportMenuView = memo(function ViewportMenuView(props: {
  disabled: boolean
  setViewport: (v: string) => void
  viewport: string
}) {
  const {disabled, setViewport, viewport} = props

  return (
    <MenuButton
      button={
        <Button
          disabled={disabled}
          fontSize={1}
          iconRight={SelectIcon}
          mode="ghost"
          padding={2}
          text={VIEWPORT_OPTIONS.find((o) => o.name === viewport)?.title}
        />
      }
      id="viewport-menu"
      menu={
        <Menu>
          {VIEWPORT_OPTIONS.map((option) => (
            <MenuItem
              fontSize={1}
              key={option.name}
              onClick={() => setViewport(option.name)}
              padding={2}
              selected={option.name === viewport}
              text={option.title}
            />
          ))}
        </Menu>
      }
      popover={POPOVER_PROPS}
    />
  )
})
