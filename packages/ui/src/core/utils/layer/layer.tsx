import {clsx} from 'clsx/lite'
import {FocusEvent, useCallback, useEffect, useRef} from 'react'

import {EMPTY_RECORD} from '../../constants'
import {containsOrEqualsElement, isHTMLElement} from '../../helpers/element'
import {attachRef} from '../attachRef'
import {LayerProvider} from './layerProvider'
import {useLayer} from './useLayer'

import {layer} from './layer.css'

/**
 * @public
 */
export interface LayerProps {
  as?: React.ElementType | keyof React.JSX.IntrinsicElements
  /** A callback that fires when the layer becomes the top layer when it was not the top layer before. */
  onActivate?: (props: {activeElement: HTMLElement | null}) => void
  zOffset?: number | number[]
}

function attachElement(
  node: HTMLDivElement | null,
  ref: React.RefObject<HTMLDivElement | null>,
  forwardedRef: React.Ref<HTMLDivElement> | undefined,
): () => void {
  ref.current = node

  const detachForwardedRef = attachRef(forwardedRef, node)

  return () => {
    detachForwardedRef()
    ref.current = null
  }
}

interface LayerChildrenProps {
  as?: React.ElementType | keyof React.JSX.IntrinsicElements
  onActivate?: LayerProps['onActivate']
}

function LayerChildren(props: LayerChildrenProps & Omit<React.HTMLProps<HTMLDivElement>, 'as'>) {
  const {
    as = 'div',
    children,
    className,
    onActivate,
    onFocus,
    ref: forwardedRef,
    style = EMPTY_RECORD,
    ...restProps
  } = props
  const {zIndex, isTopLayer} = useLayer()
  const lastFocusedRef = useRef<HTMLElement | null>(null)
  const ref = useRef<HTMLDivElement | null>(null)
  const isTopLayerRef = useRef<boolean>(isTopLayer)

  // The forwarded ref is attached from the element's own ref callback, so it is attached once,
  // follows the element when another `as` replaces it, and is detached and attached again only
  // when it changes itself. A `useImperativeHandle` without dependencies did that on every render,
  // which for a callback ref that sets state (Floating UI's `setFloating`, through `Tooltip`) was
  // an Immediate-priority update per render while the layer is shown.
  const setElement = useCallback(
    (node: HTMLDivElement | null) => attachElement(node, ref, forwardedRef),
    [forwardedRef],
  )

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
    // oxlint-disable-next-line no-unnecessary-type-arguments
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

  // Rendering the polymorphic `as` needs one concrete element type for JSX to
  // type-check the div-flavored props (the same widening styled-components'
  // `as` prop performed here before).
  // oxlint-disable-next-line no-unsafe-type-assertion
  const Component = as as 'div'

  return (
    <Component
      data-ui="Layer"
      {...restProps}
      className={clsx(layer, className)}
      onFocus={handleFocus}
      ref={setElement}
      style={{...style, zIndex}}
    >
      {children}
    </Component>
  )
}

/**
 * @public
 */
export function Layer(props: LayerProps & Omit<React.HTMLProps<HTMLDivElement>, 'as'>) {
  const {children, zOffset = 1, ...restProps} = props

  return (
    <LayerProvider zOffset={zOffset}>
      <LayerChildren {...restProps}>{children}</LayerChildren>
    </LayerProvider>
  )
}
