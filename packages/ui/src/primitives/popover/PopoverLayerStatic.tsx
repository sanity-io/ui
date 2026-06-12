import {popover_card} from '@sanity/ui-css'
import {type CSSProperties, useMemo} from 'react'

import {Flex} from '../flex/Flex'
import {Layer} from '../layer/Layer'
import type {PopoverLayerProps} from './PopoverLayer'

/**
 * Static, motion-free popover layer. Rendered synchronously when the popover is not animated, so
 * popover content (and any listeners it attaches, e.g. click-outside handling in `Menu`) mounts in
 * the same commit that opens the popover, without pulling `motion/react` into the static module
 * graph.
 *
 * @internal
 */
export function PopoverLayerStatic(props: PopoverLayerProps): React.JSX.Element {
  const {
    animate: _animate,
    children,
    maxWidth,
    onAnimationStart: _onAnimationStart,
    onDrag: _onDrag,
    onDragEnd: _onDragEnd,
    onDragStart: _onDragStart,
    originX: _originX,
    originY: _originY,
    overflow,
    padding,
    radius,
    referenceWidth,
    shadow,
    strategy,
    style,
    tone = 'inherit',
    x,
    y,
    ...rest
  } = props

  const rootStyle = useMemo(
    (): CSSProperties => ({
      left: x,
      top: y,
      width: referenceWidth,
      ...(style as CSSProperties),
    }),
    [referenceWidth, style, x, y],
  )

  return (
    <Layer
      className={popover_card()}
      data-ui="Popover"
      {...rest}
      display="flex"
      flexDirection="column"
      position={strategy}
      radius={radius}
      shadow={shadow}
      sizing="border"
      style={rootStyle}
      tone={tone}
    >
      <Flex
        data-ui="Popover__wrapper"
        direction="column"
        flex={1}
        maxWidth={maxWidth}
        overflow={overflow}
        radius={radius}
        tabIndex={-1}
      >
        <Flex direction="column" flex={1} padding={padding}>
          {children}
        </Flex>
      </Flex>
    </Layer>
  )
}
