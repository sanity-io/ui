import {type ComponentType, isFocusable, type Props} from '@sanity/ui/core'
import {tab_panel} from '@sanity/ui/css'
import {Box, type BoxOwnProps} from '@sanity/ui/primitives/box'
import {startTransition, useEffect, useImperativeHandle, useRef, useState} from 'react'

/**
 * The default HTML element type rendered by the {@link TabPanel} component.
 *
 * @public
 */
export const DEFAULT_TAB_PANEL_ELEMENT = 'div'

/**
 * Own props for the {@link TabPanel} component.
 *
 * @remarks
 * Extends {@link BoxOwnProps} to inherit all Box layout and style props.
 *
 * @public
 */
export type TabPanelOwnProps = BoxOwnProps & {
  /**
   * The `id` of the correlating {@link Tab} component, used to establish
   * an accessible relationship between the tab and its panel.
   */
  'aria-labelledby': string

  /**
   * A unique identifier for the tab panel. The corresponding {@link Tab}
   * should reference this value via its `aria-controls` prop.
   */
  'id': string
}

/**
 * Accepted values for the `as` prop of the {@link TabPanel} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `TabPanel`.
 *
 * @public
 */
export type TabPanelElementType = 'div' | 'span' | ComponentType

/**
 * Props for the {@link TabPanel} component.
 *
 * @remarks
 * Combines {@link TabPanelOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link TabPanelElementType}.
 *
 * @public
 */
export type TabPanelProps<E extends TabPanelElementType = TabPanelElementType> = Props<
  TabPanelOwnProps,
  E
>

/**
 * The `TabPanel` component renders the content associated with a {@link Tab}.
 *
 * @remarks
 * Each `TabPanel` is linked to a corresponding {@link Tab} via the `aria-labelledby`
 * and `id` props, following the WAI-ARIA tabs pattern. The panel renders with
 * `role="tabpanel"` and automatically manages its `tabIndex` based on whether
 * it contains focusable children.
 *
 * @public
 */
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
