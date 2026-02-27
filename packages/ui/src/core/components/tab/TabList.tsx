import {
  Children,
  cloneElement,
  type KeyboardEvent,
  type ReactElement,
  useCallback,
  useState,
} from 'react'

import {Flex, type FlexOwnProps} from '../../primitives/flex/Flex'
import type {ComponentType, Props} from '../../types'
import type {TabProps} from './Tab'

/**
 * The default HTML element type rendered by the {@link TabList} component.
 *
 * @public
 */
export const DEFAULT_TAB_LIST_ELEMENT = 'div'

/**
 * Represents a valid child element of the {@link TabList} component.
 *
 * @remarks
 * Each child must be a React element whose props conform to {@link TabProps}
 * with a `"button"` element type, or a falsy value (`null`, `undefined`, `false`)
 * which will be filtered out.
 *
 * @public
 */
export type TabListChild = ReactElement<Props<TabProps, 'button'>> | null | undefined | false

/**
 * Own props for the {@link TabList} component.
 *
 * @remarks
 * Extends {@link FlexOwnProps} (with `as` and `height` omitted) to inherit all
 * flex layout and spacing props, and adds a required `children` prop that accepts
 * an array of {@link Tab} elements.
 *
 * @public
 */
export type TabListOwnProps = Omit<FlexOwnProps, 'as' | 'height'> & {
  /**
   * The {@link Tab} elements to render inside the tab list.
   *
   * @remarks
   * Accepts an array of {@link TabListChild} elements. Falsy values (`null`,
   * `undefined`, `false`) are filtered out. Each tab is cloned with injected
   * `focused` and `onFocus` props for keyboard navigation management.
   */
  children: TabListChild[]
}

/**
 * Accepted values for the `as` prop of the {@link TabList} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `TabList`.
 *
 * @public
 */
export type TabListElementType = 'div' | 'span' | ComponentType

/**
 * Props for the {@link TabList} component.
 *
 * @remarks
 * Combines {@link TabListOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link TabListElementType}.
 *
 * @public
 */
export type TabListProps<E extends TabListElementType = TabListElementType> = Props<
  TabListOwnProps,
  E
>

/**
 * A container for {@link Tab} components that manages horizontal keyboard
 * navigation following the WAI-ARIA Tabs pattern.
 *
 * @remarks
 * The `TabList` component renders a {@link Flex} container with `role="tablist"`
 * and manages focus movement between its child {@link Tab} elements via
 * ArrowLeft and ArrowRight keyboard navigation. Focus wraps cyclically from
 * the last tab to the first and vice versa.
 *
 * Each child {@link Tab} is cloned with injected `focused` and `onFocus` props
 * so that the `TabList` can track and programmatically move focus between tabs.
 * Falsy children are filtered out.
 *
 * @public
 */
export function TabList<E extends TabListElementType = typeof DEFAULT_TAB_LIST_ELEMENT>(
  props: TabListProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_TAB_LIST_ELEMENT,
    children: childrenProp,
    gap = 1,
    wrap = 'nowrap',
    ...rest
  } = props as TabListProps<typeof DEFAULT_TAB_LIST_ELEMENT>

  const [focusedIndex, setFocusedIndex] = useState(-1)

  const children = Children.toArray(childrenProp).filter(_isReactElement)

  const tabs = children.map((child, childIndex) =>
    cloneElement(child, {
      focused: focusedIndex === childIndex,
      key: childIndex,
      onFocus: () => setFocusedIndex(childIndex),
    }),
  )

  const numTabs = tabs.length

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        setFocusedIndex((prevIndex) => (prevIndex + numTabs - 1) % numTabs)
      }

      if (event.key === 'ArrowRight') {
        setFocusedIndex((prevIndex) => (prevIndex + 1) % numTabs)
      }
    },
    [numTabs],
  )

  return (
    <Flex
      data-ui="TabList"
      {...rest}
      as={as}
      gap={gap}
      onKeyDown={handleKeyDown}
      role="tablist"
      wrap={wrap}
    >
      {tabs}
    </Flex>
  )
}

function _isReactElement(node: unknown): node is ReactElement<Props<TabProps, 'button'>> {
  return Boolean(node)
}
