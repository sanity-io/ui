import {MobileDeviceIcon, MoonIcon, SunIcon} from '@sanity/icons'
import {Button, Flex} from '@sanity/ui'
import {useCallback} from 'react'

import {useWorkshop} from '../useWorkshop'
import type {WorkshopColorScheme} from '../WorkshopContext'

/** @internal */
export function SchemeMenu() {
  const {broadcast, scheme} = useWorkshop()

  const setScheme = useCallback(
    (value: WorkshopColorScheme) => {
      broadcast({type: 'workshop/setScheme', value})
    },
    [broadcast],
  )

  return (
    <Flex flex="none" radius={3} shadow={1}>
      <Button
        icon={MobileDeviceIcon}
        mode="bleed"
        padding={2}
        selected={scheme === 'system'}
        tooltip={{text: 'System'}}
        onClick={() => setScheme('system')}
      />
      <Button
        icon={SunIcon}
        mode="bleed"
        padding={2}
        selected={scheme === 'light'}
        tooltip={{text: 'Light'}}
        onClick={() => setScheme('light')}
      />
      <Button
        icon={MoonIcon}
        mode="bleed"
        padding={2}
        selected={scheme === 'dark'}
        tooltip={{text: 'Dark'}}
        onClick={() => setScheme('dark')}
      />
    </Flex>
  )
}
