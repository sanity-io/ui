import type {Props} from '@sanity/ui/core'
import {box, root, type RootStyleProps} from '@sanity/ui/css'
import {Box, type BoxOwnProps} from '@sanity/ui/primitives/box'
import {useCallback, useImperativeHandle, useRef, useState} from 'react'

import {RootProvider} from './RootProvider'

/**
 * The default HTML element type rendered by the {@link Root} component.
 *
 * @public
 */
export const DEFAULT_ROOT_ELEMENT = 'html'

/**
 * Own props for the {@link Root} component.
 *
 * @remarks
 * Extends {@link BoxOwnProps} and {@link RootStyleProps} to provide
 * layout utilities alongside root-level theming props such as `scheme` and `tone`.
 *
 * @public
 */
export interface RootOwnProps extends BoxOwnProps, RootStyleProps {}

/**
 * Accepted values for the `as` prop of the {@link Root} component.
 *
 * @remarks
 * Determines the HTML element rendered by `Root`. When rendered as `<html>`,
 * an additional `<body>` wrapper is inserted automatically.
 *
 * @public
 */
export type RootElementType = 'html' | 'body' | 'div'

/**
 * Props for the {@link Root} component.
 *
 * @remarks
 * Combines {@link RootOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders an `<html>` element by default.
 *
 * @typeParam E - The HTML element type to render. Defaults to {@link RootElementType}.
 *
 * @public
 */
export type RootProps<E extends RootElementType = RootElementType> = Props<RootOwnProps, E>

/**
 * The top-level wrapper component that establishes the design system context
 * for all descendant components.
 *
 * @remarks
 * The `Root` component renders a {@link Box} element (default `<html>`) that
 * initialises the theme, color scheme, card tone, portal container, and
 * boundary element for the entire component tree. It wraps its children in a
 * {@link RootProvider} which supplies {@link CardProvider}, {@link LayerProvider},
 * {@link ToastProvider}, {@link BoundaryElementProvider}, and {@link PortalProvider}.
 *
 * When rendered as `<html>`, an additional `<body>` wrapper is inserted
 * automatically to apply height and margin reset styles.
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
      <div ref={setPortalElement} data-portal="" />
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
      ref={handleRef}
      className={root({
        className,
        height,
        scheme,
        tone,
      })}
      overflow={overflow}
    >
      {node}
    </Box>
  )
}
