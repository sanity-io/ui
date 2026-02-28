import {SelectIcon} from '@sanity/icons'
import {Button, Menu, MenuButton, type MenuButtonProps, MenuItem} from '@sanity/ui'
import {useCallback} from 'react'

import {VIEWPORT_OPTIONS} from '../constants'
import {startViewTransition} from '../lib/startViewTransition'
import {useWorkshop} from '../useWorkshop'

/** @internal */
export function ViewportMenu() {
  const {broadcast, story, viewport} = useWorkshop()

  const setViewport = useCallback(
    (value: string) => {
      startViewTransition(() => broadcast({type: 'workshop/setViewport', value}))
    },
    [broadcast],
  )

  return <ViewportMenuView disabled={!story} setViewport={setViewport} viewport={viewport} />
}

const POPOVER_PROPS: MenuButtonProps['popover'] = {
  constrainSize: true,
  placement: 'bottom',
  portal: true,
}

function ViewportMenuView(props: {
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
          tooltip={{text: 'Viewport'}}
        />
      }
      id="viewport-menu"
      menu={
        <Menu>
          {VIEWPORT_OPTIONS.map((option) => (
            <MenuItem
              key={option.name}
              fontSize={1}
              padding={2}
              pressed={option.name === viewport}
              selected={option.name === viewport}
              text={option.title}
              onClick={() => setViewport(option.name)}
            />
          ))}
        </Menu>
      }
      popover={POPOVER_PROPS}
    />
  )
}
