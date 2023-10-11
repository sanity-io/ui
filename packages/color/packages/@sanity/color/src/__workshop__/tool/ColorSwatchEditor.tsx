import {Flex} from '@sanity/ui'
import {Dispatch, memo, ReactElement, useCallback, useState} from 'react'
import {ColorHueKey, ColorTintKey, HSL} from '../../types'
import {ColorPreview} from './ColorPreview'
import {Connectors} from './Connectors'
import {SwatchSlider} from './SwatchSlider'
import {ColorToolMsg, ColorToolSwatch} from './types'

export const ColorSwatchesEditor = memo(function ColorSwatchesEditor(props: {
  dispatch: Dispatch<ColorToolMsg>
  hue: ColorHueKey
  showAABadges?: boolean
  showContrast?: boolean
  swatches: ColorToolSwatch[]
}): ReactElement {
  const {dispatch, hue, showAABadges, showContrast, swatches} = props
  const [expanded, setExpanded] = useState(false)
  const handleToggle = useCallback(() => setExpanded((prev) => !prev), [])
  const [wrapper, setWrapper] = useState<HTMLDivElement | null>(null)

  const _updateSwatch = useCallback(
    (tint: ColorTintKey, hsl: HSL) => dispatch({type: 'swatch/update', hue, tint, hsl}),
    [dispatch, hue],
  )

  return (
    <div>
      <Flex onClick={handleToggle}>
        {swatches.map((t) => (
          <ColorPreview
            expanded={expanded}
            key={t.key}
            hsl={t.hsl}
            showAABadges={showAABadges}
            showContrast={showContrast}
          />
        ))}
      </Flex>
      <div hidden={!expanded} ref={setWrapper}>
        <Connectors swatches={swatches} wrapper={wrapper} />
        <Flex gap={1}>
          {swatches.map((t) => (
            <SwatchSlider key={t.key} swatch={t} tint={t.key} updateSwatch={_updateSwatch} />
          ))}
        </Flex>
      </div>
    </div>
  )
})
