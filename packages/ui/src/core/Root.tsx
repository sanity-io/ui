import {box, root, type RootStyleProps} from '@sanity/ui/css'
import {useCallback, useImperativeHandle, useRef, useState} from 'react'

import {Box, type BoxOwnProps} from './primitives/box/Box'
import {RootProvider} from './RootProvider'
import type {Props} from './types'

/** @public */
export const DEFAULT_ROOT_ELEMENT = 'html'

/** @public */
export interface RootOwnProps extends BoxOwnProps, RootStyleProps {}

/** @public */
export type RootElementType = 'html' | 'body' | 'div'

/** @public */
export type RootProps<E extends RootElementType = RootElementType> = Props<RootOwnProps, E>

/**
 * The `Root` component.
 *
 * @public
 */
export function Root<E extends RootElementType = typeof DEFAULT_ROOT_ELEMENT>(
  props: RootProps<E>,
): React.JSX.Element {
  const {
    as: as = DEFAULT_ROOT_ELEMENT,
    children,
    className,
    height,
    overflow = 'hidden',
    ref: forwardedRef,
    scheme = 'light',
    tone = 'default',
    ...rest
  } = props as RootProps<typeof DEFAULT_ROOT_ELEMENT>

  const ref = useRef<HTMLHtmlElement | null>(null)

  useImperativeHandle<HTMLHtmlElement | null, HTMLHtmlElement | null>(
    forwardedRef,
    () => ref.current,
  )

  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null)
  const [boundaryElement, setBoundaryElement] = useState<HTMLElement | null>(null)

  const handleRef = useCallback((el: HTMLHtmlElement | null) => {
    setBoundaryElement(el)
    ref.current = el
  }, [])

  let node = (
    <RootProvider
      boundaryElement={boundaryElement}
      portalElement={portalElement}
      scheme={scheme}
      tone={tone}
    >
      {children}
      <div data-portal="" ref={setPortalElement} />
    </RootProvider>
  )

  if (as === 'html') {
    node = <body className={box({height, margin: 0})}>{node}</body>
  }

  return (
    <Box
      as={as}
      data-ui="Root"
      {...rest}
      className={root({
        className,
        height,
        scheme,
        tone,
      })}
      overflow={overflow}
      ref={handleRef}
    >
      {node}
    </Box>
  )
}
