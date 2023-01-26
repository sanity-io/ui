import {FocusEvent, forwardRef, useCallback, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {EMPTY_RECORD} from '../../constants'
import {containsOrEqualsElement, isHTMLElement} from '../../helpers'
import {useForwardedRef} from '../../hooks'
import {LayerProvider} from './layerProvider'
import {useLayer} from './useLayer'

/**
 * @public
 */
export interface LayerProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  /** A callback that fires when the layer becomes the top layer when it was not the top layer before. */
  onActivate?: (props: {activeElement: HTMLElement | null}) => void
  zOffset?: number | number[]
}

interface LayerChildrenProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  onActivate?: (props: {activeElement: HTMLElement | null}) => void
}

const Root = styled.div`
  position: relative;
`

const LayerChildren = forwardRef(function LayerChildren(
  props: LayerChildrenProps & Omit<React.HTMLProps<HTMLDivElement>, 'as'>,
  ref: React.Ref<HTMLDivElement>
) {
  const {children, onActivate, onFocus, style = EMPTY_RECORD, ...restProps} = props
  const {zIndex, isTopLayer} = useLayer()
  const [lastFocusedElement, setLastFocusedElement] = useState<HTMLElement | null>(null)
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)

  const forwardedRef = useForwardedRef(ref)
  const isTopLayerRef = useRef<boolean>(isTopLayer)

  // When the layer very first mounts, it will be the top layer, but we don't want to fire
  // the callback in that case. We use a ref to track the previous value of isTopLayer to
  // determine if the layer has become the top layer since the last render.
  useEffect(() => {
    const becameTopLayer = isTopLayerRef.current !== isTopLayer && isTopLayer

    if (becameTopLayer) {
      onActivate?.({activeElement: lastFocusedElement})
    }

    isTopLayerRef.current = isTopLayer
  }, [isTopLayer, lastFocusedElement, onActivate])

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLDivElement, Element>) => {
      // Call the user-provided onFocus handler if any
      onFocus?.(event)

      const containsActiveElement =
        isHTMLElement(rootElement) &&
        isHTMLElement(document.activeElement) &&
        containsOrEqualsElement(rootElement, document.activeElement)

      if (containsActiveElement && isTopLayer && isHTMLElement(document.activeElement)) {
        setLastFocusedElement(document.activeElement)
      }
    },
    [isTopLayer, onFocus, rootElement]
  )

  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      setRootElement(el)
      forwardedRef.current = el
    },
    [forwardedRef]
  )

  return (
    <Root
      {...restProps}
      data-ui="Layer"
      onFocus={handleFocus}
      ref={setRef}
      style={{...style, zIndex}}
    >
      {children}
    </Root>
  )
})

/**
 * @public
 */
export const Layer = forwardRef(function Layer(
  props: LayerProps & Omit<React.HTMLProps<HTMLDivElement>, 'as'>,
  ref: React.Ref<HTMLDivElement>
) {
  const {children, onActivate, zOffset = 1, ...restProps} = props

  return (
    <LayerProvider zOffset={zOffset}>
      <LayerChildren {...restProps} ref={ref} onActivate={onActivate}>
        {children}
      </LayerChildren>
    </LayerProvider>
  )
})
