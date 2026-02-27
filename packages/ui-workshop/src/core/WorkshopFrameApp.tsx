import {Root, usePrefersDark} from '@sanity/ui'
import type {ColorScheme} from '@sanity/ui/theme'
import {useState} from 'react'

import type {WorkshopConfig} from './config/types'
import {WorkshopFrame} from './frame/WorkshopFrame'

export function WorkshopFrameApp(props: {config: WorkshopConfig}) {
  const {config} = props
  const prefersDark = usePrefersDark()
  const [scheme, setScheme] = useState<ColorScheme>(prefersDark ? 'dark' : 'light')

  return (
    <Root scheme={scheme}>
      <WorkshopFrame config={config} setScheme={setScheme} />
    </Root>
  )
}
