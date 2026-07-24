import {useElementSize} from '@sanity/ui'
import {ReactNode} from 'react'

import {CHANNEL_COLORS, SLIDER_GAP, SLIDER_H} from './constants'
import {ColorToolSwatch} from './types'

/** Lines connecting the H, S and L handle positions across the tint sliders */
export function Connectors(props: {
  swatches: ColorToolSwatch[]
  wrapper: HTMLDivElement | null
}): ReactNode {
  const {swatches, wrapper} = props
  const size = useElementSize(wrapper)
  const w = size?.border.width ?? 0

  // The slider row is a flex layout of equally sized columns with
  // SLIDER_GAP px between them; the lines must hit each column's center
  const cellW = (w - SLIDER_GAP * (swatches.length - 1)) / swatches.length
  const centerX = (index: number) => index * (cellW + SLIDER_GAP) + cellW / 2

  // No valid geometry until the wrapper has been measured
  if (!w) return null

  return (
    <svg
      viewBox={`0 0 ${w} ${SLIDER_H + 12}`}
      width={w}
      height={SLIDER_H + 12}
      style={{position: 'absolute', top: 0, left: 0, display: 'block', pointerEvents: 'none'}}
    >
      <path
        d={swatches
          .map((t, i) => {
            const command = i === 0 ? 'M' : 'L'

            return `${command}${centerX(i)},${(t.hsl[0] / 360) * SLIDER_H + 6}`
          })
          .join(' ')}
        stroke={CHANNEL_COLORS.h}
        fill="none"
      />

      <path
        d={swatches
          .map((t, i) => {
            const command = i === 0 ? 'M' : 'L'

            return `${command}${centerX(i)},${(t.hsl[1] / 100) * SLIDER_H + 6}`
          })
          .join(' ')}
        stroke={CHANNEL_COLORS.s}
        fill="none"
      />

      <path
        d={swatches
          .map((t, i) => {
            const command = i === 0 ? 'M' : 'L'

            return `${command}${centerX(i)},${(t.hsl[2] / 100) * SLIDER_H + 6}`
          })
          .join(' ')}
        stroke={CHANNEL_COLORS.l}
        fill="none"
      />
    </svg>
  )
}
