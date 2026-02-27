import {_arrow, _arrowShape, _arrowStroke, _arrowStrokeMask, _arrowSvg, vars} from '@sanity/ui/css'
import {assignInlineVars} from '@vanilla-extract/dynamic'
import {useMemo} from 'react'

import type {ComponentType, Props} from '../../types'
import {compileCommands, getRoundedCommands, type Point} from './cmds'

/**
 * The default HTML element type rendered by the {@link Arrow} component.
 *
 * @internal
 */
export const DEFAULT_ARROW_ELEMENT = 'div'

/**
 * Own props for the {@link Arrow} component.
 *
 * @remarks
 * Defines the dimensions and corner rounding of the SVG arrow shape used
 * internally by floating UI components such as {@link Popover} and {@link Tooltip}.
 *
 * @internal
 */
export type ArrowOwnProps = {
  /**
   * Sets the width of the arrow shape in pixels.
   *
   * @remarks
   * Determines the horizontal size of the rendered SVG arrow element.
   * The SVG viewBox is sized to match this value.
   */
  width: number

  /**
   * Sets the height of the arrow shape in pixels.
   *
   * @remarks
   * Determines the vertical extent of the arrow's triangular point.
   * The actual SVG element height is equal to the `width` value; the
   * `height` controls how far the triangular point extends downward
   * within that space.
   */
  height: number

  /**
   * Sets the corner radius for the arrow's triangular point in pixels.
   *
   * @remarks
   * Controls how rounded the corners of the triangular arrow shape are.
   * A value of `0` produces sharp corners.
   *
   * @defaultValue 0
   */
  radius?: number
}

/**
 * Accepted values for the `as` prop of the {@link Arrow} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Arrow`.
 *
 * @internal
 */
export type ArrowElementType = 'div' | 'span' | ComponentType

/**
 * Props for the {@link Arrow} component.
 *
 * @remarks
 * Combines {@link ArrowOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link ArrowElementType}.
 *
 * @internal
 */
export type ArrowProps<E extends ArrowElementType = ArrowElementType> = Props<ArrowOwnProps, E>

/**
 * Renders an SVG arrow shape used as a directional indicator by floating UI
 * components such as {@link Popover} and {@link Tooltip}.
 *
 * @remarks
 * The `Arrow` component generates a triangular SVG path with optional rounded
 * corners, a filled shape, and a stroke outline controlled by an SVG mask. The
 * arrow's size is set via a CSS custom property (`--arrow-size`) using
 * `@vanilla-extract/dynamic`.
 *
 * This component is not intended for direct use by consumers. It is used
 * internally by floating UI primitives.
 *
 * @internal
 */
export function Arrow<E extends ArrowElementType = typeof DEFAULT_ARROW_ELEMENT>(
  props: ArrowProps<E>,
): React.JSX.Element {
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
