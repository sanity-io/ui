import {Flex} from '@sanity/ui'
import {memo, ReactElement, useCallback, useState} from 'react'
import {ColorHueKey, ColorTintKey, HSL} from '../../types'
import {ColorPreview} from './ColorPreview'
import {Connectors} from './Connectors'
import {SwatchSlider} from './SwatchSlider'
import {ColorToolSwatch} from './types'

export const ColorSwatchesEditor = memo(function ColorSwatchesEditor(props: {
  hue: ColorHueKey
  swatches: ColorToolSwatch[]
  updateSwatch: (hue: ColorHueKey, tint: ColorTintKey, hsl: HSL) => void
}): ReactElement {
  const {hue, swatches, updateSwatch} = props
  const [expanded, setExpanded] = useState(false)
  const handleToggle = useCallback(() => setExpanded((prev) => !prev), [])
  const [wrapper, setWrapper] = useState<HTMLDivElement | null>(null)

  const _updateSwatch = useCallback(
    (tint: ColorTintKey, hsl: HSL) => {
      updateSwatch(hue, tint, hsl)
    },
    [hue, updateSwatch],
  )

  return (
    <div>
      <Flex gap={1} onClick={handleToggle}>
        {swatches.map((t) => (
          <ColorPreview expanded={expanded} key={t.key} hsl={t.hsl} />
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
