'use client'

import type {IconComponent} from '@sanity/icons'
import {CheckmarkIcon} from '@sanity/icons/Checkmark'
import {DesktopIcon} from '@sanity/icons/Desktop'
import {MoonIcon} from '@sanity/icons/Moon'
import {SunIcon} from '@sanity/icons/Sun'
import {Button, Menu, MenuButton, MenuItem} from '@sanity/ui'
import type {ReactElement} from 'react'

import {useColorScheme} from '#context/color-scheme'
import type {ColorSchemePreference} from '#lib/color-scheme.ts'

const OPTIONS: {
  preference: ColorSchemePreference
  icon: IconComponent
  text: string
}[] = [
  {preference: 'system', icon: DesktopIcon, text: 'System'},
  {preference: 'light', icon: SunIcon, text: 'Light'},
  {preference: 'dark', icon: MoonIcon, text: 'Dark'},
]

export function ColorSchemeMenu(): ReactElement {
  const {preference, setPreference} = useColorScheme()
  const active = OPTIONS.find((option) => option.preference === preference) ?? OPTIONS[0]

  return (
    <MenuButton
      button={
        <Button
          aria-label="Color scheme"
          fontSize={[1, 1, 2]}
          icon={active.icon}
          mode="bleed"
          padding={3}
          radius={2}
        />
      }
      id="color-scheme-menu"
      menu={
        <Menu>
          {OPTIONS.map((option) => {
            const selected = preference === option.preference

            return (
              <MenuItem
                icon={option.icon}
                iconRight={selected ? CheckmarkIcon : undefined}
                key={option.preference}
                onClick={() => setPreference(option.preference)}
                pressed={selected}
                selected={selected}
                text={option.text}
              />
            )
          })}
        </Menu>
      }
      popover={{placement: 'bottom-end', portal: true}}
    />
  )
}
