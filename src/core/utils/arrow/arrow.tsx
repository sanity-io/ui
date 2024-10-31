import {_arrow, _arrowShape, _arrowStroke} from '@sanity/ui/css'
import {CSSProperties, ForwardedRef, forwardRef, ReactElement, useMemo} from 'react'

import {useTheme_v2} from '../../_compat'
import {Props} from '../../types'
import {compileCommands, getRoundedCommands, Point} from './cmds'

/** @internal */
export const Arrow = forwardRef(function Arrow(
  props: Props<{width: number; height: number; radius?: number}, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement {
  const {width: w, height: h, radius = 0, style, ...restProps} = props
  const {card} = useTheme_v2()
  const strokeWidth = card.shadow.outline

  const center = w / 2

  const path = useMemo(() => {
    const points: Point[] = [
      {x: 0, y: 0},
      {x: radius, y: 0, radius},
      {x: center, y: h - 1, radius},
      {x: w - radius, y: 0, radius},
      {x: w, y: 0},
    ]

    const cmds = getRoundedCommands(points)

    return compileCommands(cmds)
  }, [center, h, radius, w])

  const strokePath = `${path}`
  const fillPath = `${path} M ${w} -1 M 0 -1 Z`

  return (
    <div
      {...restProps}
      className={_arrow()}
      ref={ref}
      style={{...style, '--arrow-size': `${w}px`} as CSSProperties}
    >
      <svg width={w} height={w} viewBox={`0 0 ${w} ${w}`}>
        <mask id="stroke-mask">
          <rect x={0} y={strokeWidth} width={w} height={w} fill="white" />
        </mask>
        <path
          className={_arrowStroke()}
          d={strokePath}
          mask="url(#stroke-mask)"
          strokeWidth={strokeWidth * 2}
        />
        <path className={_arrowShape()} d={fillPath} />
      </svg>
    </div>
  )
})

Arrow.displayName = 'ForwardRef(Arrow)'
