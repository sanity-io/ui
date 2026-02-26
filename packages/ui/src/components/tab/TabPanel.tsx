import {type ComponentType, isFocusable, type Props} from '@sanity/ui/core'
import {tab_panel} from '@sanity/ui/css'
import {Box, type BoxOwnProps} from '@sanity/ui/primitives/box'
import {startTransition, useEffect, useImperativeHandle, useRef, useState} from 'react'

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

    if (!el) return

    // check if children has focusable elements
    const hasFocusableChildren = (e: Element) => {
      // return e.childNodes.some((child) => isFocusable(child as HTMLElement))
      for (let i = 0; i < e.childNodes.length; i++) {
        const child = e.childNodes[i]
        if (isFocusable(child as HTMLElement)) {
          return true
        }
        if (hasFocusableChildren(child as Element)) {
          return true
        }
      }
      return false
    }

    if (hasFocusableChildren(el)) {
      // el.tabIndex = 0
      startTransition(() => {
        setHasFocusableChildren(true)
      })
      // console.log('has focusable children')
    } else {
      // el.tabIndex = -1
      startTransition(() => {
        setHasFocusableChildren(false)
      })
    }

    // if (hasFocusableElements) {

    // isFocusable
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
