import {
  FocusEvent,
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

import {EMPTY_RECORD} from '../../constants'
import {containsOrEqualsElement, isHTMLElement} from '../../helpers'
import {Box, BoxProps} from '../../primitives'
import {Props} from '../../types'
import {LayerProvider} from './layerProvider'
import {useLayer} from './useLayer'

/**
 * @public
 */
export interface LayerProps extends BoxProps {
  /** A callback that fires when the layer becomes the top layer when it was not the top layer before. */
  onActivate?: (props: {activeElement: HTMLElement | null}) => void
  zOffset?: number | number[]
}

interface LayerChildrenProps extends BoxProps {
  onActivate?: LayerProps['onActivate']
}

const LayerChildren = forwardRef(function LayerChildren(
  props: Props<LayerChildrenProps, 'div'>,
  forwardedRef: ForwardedRef<HTMLDivElement>,
) {
  const {
    children,
    onActivate,
    onFocus,
    position = 'relative',
    style = EMPTY_RECORD,
    ...restProps
  } = props
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
    <Box
      data-ui="Layer"
      {...restProps}
      onFocus={handleFocus}
      position={position}
      ref={ref}
      style={{...style, zIndex}}
    >
      {children}
    </Box>
  )
})

/**
 * @public
 */
export const Layer = forwardRef(function Layer(
  props: Props<LayerProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {children, zOffset = 1, ...restProps} = props

  return (
    <LayerProvider zOffset={zOffset}>
      <LayerChildren {...restProps} ref={ref}>
        {children}
      </LayerChildren>
    </LayerProvider>
  )
})

Layer.displayName = 'ForwardRef(Layer)'
