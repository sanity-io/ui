import {type ComponentType, isFocusable, type Props} from '@sanity/ui/core'
import {tab_panel} from '@sanity/ui/css'
import {Box, type BoxOwnProps} from '@sanity/ui/primitives/box'
import {useEffect, useImperativeHandle, useRef, useState} from 'react'

/** @public */
export const DEFAULT_TAB_PANEL_ELEMENT = 'div'

/** @public */
export type TabPanelOwnProps = BoxOwnProps & {
  /**
   * The `id` of the correlating `Tab` component.
   */
  'aria-labelledby': string
  'id': string
}

/** @public */
export type TabPanelElementType = 'div' | 'span' | ComponentType

/** @public */
export type TabPanelProps<E extends TabPanelElementType = TabPanelElementType> = Props<
  TabPanelOwnProps,
  E
>

/** @public */
export function TabPanel<E extends TabPanelElementType = typeof DEFAULT_TAB_PANEL_ELEMENT>(
  props: TabPanelProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_TAB_PANEL_ELEMENT,
    children,
    className,
    ref: forwardedRef,
    ...rest
  } = props as TabPanelProps<typeof DEFAULT_TAB_PANEL_ELEMENT>

  const ref = useRef<HTMLDivElement | null>(null)
  // const focusedRef = useRef(false)

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)

  const [hasFocusableChildren, setHasFocusableChildren] = useState(false)

  useEffect(() => {
    const el = ref.current

    if (!el) return undefined

    const mo = new MutationObserver(() => {
      setHasFocusableChildren(_hasFocusableChildren(el))
    })

    mo.observe(el, {
      childList: true,
      subtree: true,
    })

    return () => {
      mo.disconnect()
    }
  }, [])

  return (
    <Box
      data-ui="TabPanel"
      {...rest}
      ref={ref}
      as={as}
      className={tab_panel({className})}
      role="tabpanel"
      tabIndex={hasFocusableChildren ? undefined : 0}
      // tabIndex={tabIndex === undefined ? 0 : tabIndex}
    >
      {children}
    </Box>
  )
}

// check if children has focusable elements
function _hasFocusableChildren(element: HTMLElement) {
  for (let i = 0; i < element.childNodes.length; i++) {
    const child = element.childNodes[i]

    if (child instanceof HTMLElement) {
      if (isFocusable(child) || _hasFocusableChildren(child)) {
        return true
      }
    }
  }

  return false
}
