import {useElementSize} from '@sanity/ui'
import {ReactElement} from 'react'
import {SLIDER_H} from './constants'
import {ColorToolSwatch} from './types'

export function Connectors(props: {
  swatches: ColorToolSwatch[]
  wrapper: HTMLDivElement | null
}): ReactElement {
  const {swatches, wrapper} = props
  const size = useElementSize(wrapper)
  const w = size?.border.width ?? 0
  const cellW = w / 11
  const H = cellW / 2

  return (
    <svg
      viewBox={`0 0 ${w} ${SLIDER_H + 12}`}
      height={SLIDER_H + 12}
      style={{
        position: 'absolute',
        display: 'block',
      }}
    >
      <path
        d={swatches
          .map((t, i) => {
            if (i === 0) {
              return `M${cellW * i + H},${(t.hsl[0] / 360) * SLIDER_H + 6}`
            }

            return `L${cellW * i + H},${(t.hsl[0] / 360) * SLIDER_H + 6}`
          })
          .join(' ')}
        stroke="red"
        fill="none"
      />

      <path
        d={swatches
          .map((t, i) => {
            if (i === 0) {
              return `M${cellW * i + H},${(t.hsl[1] / 100) * SLIDER_H + 6}`
            }

            return `L${cellW * i + H},${(t.hsl[1] / 100) * SLIDER_H + 6}`
          })
          .join(' ')}
        stroke="green"
        fill="none"
      />

      <path
        d={swatches
          .map((t, i) => {
            if (i === 0) {
              return `M${cellW * i + H},${(t.hsl[2] / 100) * SLIDER_H + 6}`
            }

            return `L${cellW * i + H},${(t.hsl[2] / 100) * SLIDER_H + 6}`
          })
          .join(' ')}
        stroke="blue"
        fill="none"
      />
    </svg>
  )
}
