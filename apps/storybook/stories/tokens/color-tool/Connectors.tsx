import {useElementSize} from '@sanity/ui'
import {ReactNode} from 'react'

import {CHANNEL_COLORS, SLIDER_H} from './constants'
import {ColorToolSwatch} from './types'

/** Lines connecting the H, S and L handle positions across the tint sliders */
export function Connectors(props: {
  swatches: ColorToolSwatch[]
  wrapper: HTMLDivElement | null
}): ReactNode {
  const {swatches, wrapper} = props
  const size = useElementSize(wrapper)
  const w = size?.border.width ?? 0
  const cellW = w / swatches.length
  const H = cellW / 2

  return (
    <svg
      viewBox={`0 0 ${w} ${SLIDER_H + 12}`}
      height={SLIDER_H + 12}
      style={{position: 'absolute', display: 'block'}}
    >
      <path
        d={swatches
          .map((t, i) => {
            const command = i === 0 ? 'M' : 'L'

            return `${command}${cellW * i + H},${(t.hsl[0] / 360) * SLIDER_H + 6}`
          })
          .join(' ')}
        stroke={CHANNEL_COLORS.h}
        fill="none"
      />

      <path
        d={swatches
          .map((t, i) => {
            const command = i === 0 ? 'M' : 'L'

            return `${command}${cellW * i + H},${(t.hsl[1] / 100) * SLIDER_H + 6}`
          })
          .join(' ')}
        stroke={CHANNEL_COLORS.s}
        fill="none"
      />

      <path
        d={swatches
          .map((t, i) => {
            const command = i === 0 ? 'M' : 'L'

            return `${command}${cellW * i + H},${(t.hsl[2] / 100) * SLIDER_H + 6}`
          })
          .join(' ')}
        stroke={CHANNEL_COLORS.l}
        fill="none"
      />
    </svg>
  )
}
