import {_arrow, _arrowShape, _arrowStroke, _arrowStrokeMask, _arrowSvg, vars} from '@sanity/ui/css'
import {assignInlineVars} from '@vanilla-extract/dynamic'
import {useMemo} from 'react'

import type {ComponentType, Props} from '../../types/props'
import {compileCommands, getRoundedCommands, type Point} from './cmds'

/** @internal */
export const DEFAULT_ARROW_ELEMENT = 'div'

/** @internal */
export type ArrowOwnProps = {
  width: number
  height: number
  radius?: number
}

/** @internal */
export type ArrowElementType = 'div' | 'span' | ComponentType

/** @internal */
export type ArrowProps<E extends ArrowElementType = ArrowElementType> = Props<ArrowOwnProps, E>

/** @internal */
export function Arrow<E extends ArrowElementType = typeof DEFAULT_ARROW_ELEMENT>(
  props: ArrowProps<E>,
) {
  const {
    as: Element = DEFAULT_ARROW_ELEMENT,
    width: w,
    height: h,
    radius = 0,
    style,
    ...rest
  } = props as ArrowProps<typeof DEFAULT_ARROW_ELEMENT>

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
    <Element
      {...rest}
      className={_arrow()}
      style={{
        ...style,
        ...assignInlineVars({[vars.arrow.size]: `${w}px`}),
      }}
    >
      <svg className={_arrowSvg()} width={w} height={w} viewBox={`0 0 ${w} ${w}`}>
        <mask id="stroke-mask">
          <rect className={_arrowStrokeMask()} x={0} width={w} height={w} fill="white" />
        </mask>
        <path className={_arrowStroke()} d={strokePath} mask="url(#stroke-mask)" />
        <path className={_arrowShape()} d={fillPath} />
      </svg>
    </Element>
  )
}
