import {useBoolean} from '@sanity/ui-workshop'
import {ReactElement, useMemo} from 'react'
import {ColorHueKey} from '../../types'
import {ColorTool} from './ColorTool'

export default function ToolStory(): ReactElement {
  const gray = useBoolean('Gray', true)
  const magenta = useBoolean('Magenta', true)
  const purple = useBoolean('Purple', true)
  const blue = useBoolean('Blue', true)
  const cyan = useBoolean('Cyan', true)
  const green = useBoolean('Green', true)
  const yellow = useBoolean('Yellow', true)
  const orange = useBoolean('Orange', true)
  const red = useBoolean('Red', true)

  const showCode = useBoolean('Show code', false)
  const showAABadges = useBoolean('Show AA badges', false)
  const showContrast = useBoolean('Show contrast ratio', false)

  const visibleHues: ColorHueKey[] = useMemo(
    () =>
      [
        gray && 'gray',
        magenta && 'magenta',
        purple && 'purple',
        blue && 'blue',
        cyan && 'cyan',
        green && 'green',
        yellow && 'yellow',
        orange && 'orange',
        red && 'red',
      ].filter(Boolean) as ColorHueKey[],
    [gray, magenta, purple, blue, cyan, green, yellow, orange, red],
  )

  return (
    <ColorTool
      showAABadges={showAABadges}
      showCode={showCode}
      showContrast={showContrast}
      visibleHues={visibleHues}
    />
  )
}
