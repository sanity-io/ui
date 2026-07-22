import {ColorHueKey} from '@sanity/color'
import {Flex} from '@sanity/ui'
import {Dispatch, ReactNode, useState} from 'react'

import {ColorPreview} from './ColorPreview'
import {Connectors} from './Connectors'
import {HSLSlider} from './HSLSlider'
import {ColorToolMsg, ColorToolSwatch} from './types'

/** A hue strip; click it to expand the HSL sliders for each of its tints */
export function ColorSwatchesEditor(props: {
  dispatch: Dispatch<ColorToolMsg>
  hue: ColorHueKey
  showAABadges?: boolean
  showContrast?: boolean
  swatches: ColorToolSwatch[]
}): ReactNode {
  const {dispatch, hue, showAABadges, showContrast, swatches} = props
  const [expanded, setExpanded] = useState(false)
  const [wrapper, setWrapper] = useState<HTMLDivElement | null>(null)

  return (
    <div>
      <button
        aria-expanded={expanded}
        aria-label={`Toggle ${hue} sliders`}
        onClick={() => setExpanded((prev) => !prev)}
        style={{
          appearance: 'none',
          background: 'none',
          border: 0,
          display: 'block',
          margin: 0,
          padding: 0,
          width: '100%',
        }}
        type="button"
      >
        <Flex>
          {swatches.map((t) => (
            <ColorPreview
              key={t.key}
              hsl={t.hsl}
              showAABadges={showAABadges}
              showContrast={showContrast}
            />
          ))}
        </Flex>
      </button>

      <div hidden={!expanded} ref={setWrapper}>
        <Connectors swatches={swatches} wrapper={wrapper} />
        <Flex gap={1}>
          {swatches.map((t) => (
            <HSLSlider
              key={t.key}
              onChange={(hsl) => dispatch({type: 'swatch/update', hue, tint: t.key, hsl})}
              value={t.hsl}
            />
          ))}
        </Flex>
      </div>
    </div>
  )
}
