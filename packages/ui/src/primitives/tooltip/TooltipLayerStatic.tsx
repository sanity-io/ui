import {Layer} from '../layer/Layer'
import type {TooltipLayerProps} from './TooltipLayer'

/**
 * Static, motion-free tooltip layer. Rendered synchronously when the tooltip is not animated (e.g.
 * under reduced motion or `animate={false}`), keeping `motion/react` out of the static module
 * graph for that path.
 *
 * @internal
 */
export function TooltipLayerStatic(props: TooltipLayerProps): React.JSX.Element {
  const {
    animate: _animate,
    children,
    originX: _originX,
    originY: _originY,
    padding,
    placement,
    radius,
    scheme,
    shadow,
    style,
    tone,
    ...rest
  } = props

  return (
    <Layer
      data-ui="Tooltip__layer"
      {...rest}
      data-placement={placement}
      padding={padding}
      radius={radius}
      scheme={scheme}
      shadow={shadow}
      style={style}
      tone={tone}
    >
      {children}
    </Layer>
  )
}
