import {assignInlineVars} from '@vanilla-extract/dynamic'
import {clsx} from 'clsx/lite'
import {HTMLProps} from 'react'

import {useTheme_v2} from '../../theme/useTheme'
import {compileCommands, getRoundedCommands, Point} from './cmds'

import {arrow, arrowShape, arrowSize, arrowStroke} from './arrow.css'

/** @internal */
export function Arrow(
  props: {width: number; height: number; radius?: number} & Omit<
    HTMLProps<HTMLDivElement>,
    'width' | 'height'
  >,
): React.JSX.Element {
  const {className, width: w, height: h, radius = 0, ref, style, ...restProps} = props
  const {card} = useTheme_v2()
  const strokeWidth = card.shadow.outline

  const center = w / 2

  const points: Point[] = [
    {
      x: 0,
      y: 0,
    },
    {
      x: radius,
      y: 0,
      radius,
    },
    {
      x: center,
      y: h - 1,
      radius,
    },
    {
      x: w - radius,
      y: 0,
      radius,
    },
    {
      x: w,
      y: 0,
    },
  ]

  const cmds = getRoundedCommands(points)
  const path = compileCommands(cmds)

  // oxlint-disable-next-line no-unnecessary-template-expression
  const strokePath = `${path}`
  const fillPath = `${path} M ${w} -1 M 0 -1 Z`

  return (
    <div
      {...restProps}
      className={clsx(arrow, className)}
      ref={ref}
      style={{...style, ...assignInlineVars({[arrowSize]: `${w}px`})}}
    >
      <svg width={w} height={w} viewBox={`0 0 ${w} ${w}`}>
        <mask id="stroke-mask">
          <rect x={0} y={strokeWidth} width={w} height={w} fill="white" />
        </mask>
        <path
          className={arrowStroke}
          d={strokePath}
          mask="url(#stroke-mask)"
          strokeWidth={strokeWidth * 2}
        />
        <path className={arrowShape} d={fillPath} />
      </svg>
    </div>
  )
}
