import {FocusEvent, forwardRef, useCallback, useEffect, useImperativeHandle, useRef} from 'react'
import {styled} from 'styled-components'

import {EMPTY_RECORD} from '../../constants'
import {containsOrEqualsElement, isHTMLElement} from '../../helpers'
import {LayerProvider} from './layerProvider'
import {useLayer} from './useLayer'

/**
 * @public
 */
export interface LayerProps {
  as?: React.ElementType | keyof React.JSX.IntrinsicElements
  /** A callback that fires when the layer becomes the top layer when it was not the top layer before. */
  onActivate?: (props: {activeElement: HTMLElement | null}) => void
  zOffset?: number | number[]
}

interface LayerChildrenProps {
  as?: React.ElementType | keyof React.JSX.IntrinsicElements
  onActivate?: LayerProps['onActivate']
}

const StyledLayer = styled.div({position: 'relative'})

const LayerChildren = forwardRef(function LayerChildren(
  props: LayerChildrenProps & Omit<React.HTMLProps<HTMLDivElement>, 'as'>,
  forwardedRef: React.Ref<HTMLDivElement>,
) {
  const {children, onActivate, onFocus, style = EMPTY_RECORD, ...restProps} = props
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
    <StyledLayer
      {...restProps}
      data-ui="Layer"
      onFocus={handleFocus}
      ref={ref}
      style={{...style, zIndex}}
    >
      {children}
    </StyledLayer>
  )
})

/**
 * @public
 */
export const Layer = forwardRef(function Layer(
  props: LayerProps & Omit<React.HTMLProps<HTMLDivElement>, 'as'>,
  ref: React.Ref<HTMLDivElement>,
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
