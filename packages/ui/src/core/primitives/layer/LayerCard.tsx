import {type FocusEvent, useCallback, useEffect, useImperativeHandle, useRef} from 'react'

import {EMPTY_RECORD} from '../../constants'
import {containsOrEqualsElement, isHTMLElement} from '../../helpers/element'
import {Card, type CardElementType} from '../../primitives/card/Card'
import type {Props} from '../../types'
import type {LayerElementType, LayerOwnProps} from './Layer'
import {useLayer} from './useLayer'

/** @internal */
export const DEFAULT_LAYER_CARD_ELEMENT = 'div'

/** @internal */
export type LayerCardOwnProps = Omit<LayerOwnProps, 'zOffset'>

/** @internal */
export type LayerCardElementType = LayerElementType

/** @internal */
export type LayerCardProps<E extends LayerCardElementType = LayerCardElementType> = Props<
  LayerCardOwnProps,
  E
>

/** @internal */
export function LayerCard<E extends LayerCardElementType = typeof DEFAULT_LAYER_CARD_ELEMENT>(
  props: LayerCardProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_LAYER_CARD_ELEMENT,
    children,
    onActivate,
    onFocus,
    position = 'relative',
    ref: forwardedRef,
    style = EMPTY_RECORD,
    ...rest
  } = props as LayerCardProps<typeof DEFAULT_LAYER_CARD_ELEMENT>

  const {zIndex, isTopLayer} = useLayer()
  const lastFocusedRef = useRef<HTMLElement | null>(null)
  const ref = useRef<HTMLDivElement | null>(null)
  const isTopLayerRef = useRef<boolean>(isTopLayer)

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)

  // When the layer very first mounts, it will be the top layer, but we don't want to fire
  // the callback in that case. We use a ref to track the previous value of isTopLayer to
  // determine if the layer has become the top layer since the last render.
  useEffect(() => {
    const becameTopLayer = isTopLayerRef.current !== isTopLayer && isTopLayer

    if (becameTopLayer) {
      onActivate?.({activeElement: lastFocusedRef.current})
    }

    isTopLayerRef.current = isTopLayer
  }, [isTopLayer, onActivate])

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLDivElement, Element>) => {
      // Call the user-provided onFocus handler if any
      onFocus?.(event)

      const rootElement = ref.current
      const target = document.activeElement

      if (!isTopLayer || !rootElement || !target) return

      if (isHTMLElement(target) && containsOrEqualsElement(rootElement, target)) {
        lastFocusedRef.current = target
      }
    },
    [isTopLayer, onFocus],
  )

  return (
    <Card
      data-ui="Layer"
      {...rest}
      as={as as CardElementType}
      onFocus={handleFocus}
      position={position}
      ref={ref}
      style={{...style, zIndex}}
    >
      {children}
    </Card>
  )
}
