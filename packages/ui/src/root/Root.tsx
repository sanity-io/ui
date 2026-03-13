import {_splitKeys, type Props} from '@sanity/ui/core'
import {root, root_body, ROOT_STYLE_PROP_KEYS, type RootStyleProps} from '@sanity/ui-css'
import {useCallback, useImperativeHandle, useRef, useState} from 'react'

import {RootProvider} from './RootProvider'

/** @public */
export const DEFAULT_ROOT_ELEMENT = 'html'

/** @public */
export type RootOwnProps = RootStyleProps

/** @public */
export type RootElementType = 'html' | 'div'

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
  const [
    {
      height,
      overflow = 'hidden',
      scheme = 'light',
      tone = 'default',
      // split style props
      ...styleProps
    },
    {
      as: Element = DEFAULT_ROOT_ELEMENT,
      children,
      ref: forwardedRef,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as RootProps<typeof DEFAULT_ROOT_ELEMENT>, ROOT_STYLE_PROP_KEYS)

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

  if (Element === 'html') {
    node = <body className={root_body({height})}>{node}</body>
  }

  return (
    <Element
      data-ui="Root"
      {...domProps}
      ref={handleRef}
      className={root({
        ...styleProps,
        height,
        overflow,
        scheme,
        tone,
      })}
    >
      {node}
    </Element>
  )
}
