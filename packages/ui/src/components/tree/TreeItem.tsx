import {ToggleArrowRightIcon} from '@sanity/icons'
import type {ComponentType, Props} from '@sanity/ui/core'
import {type ResponsiveProp, tree_item, vars} from '@sanity/ui/css'
import {Box, type BoxProps} from '@sanity/ui/primitives/box'
import {Flex} from '@sanity/ui/primitives/flex'
import {
  Selectable,
  type SelectableElementType,
  type SelectableOwnProps,
} from '@sanity/ui/primitives/selectable'
import {Text} from '@sanity/ui/primitives/text'
import type {FontTextSize, FontWeight, Space} from '@sanity/ui/theme'
import {
  type ElementType,
  type KeyboardEvent,
  type MouseEvent,
  type MouseEventHandler,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'

import {TreeContext} from './TreeContext'
import {TreeGroup} from './TreeGroup'
import {useTree} from './useTree'

/**
 * The default HTML element type rendered by the {@link TreeItem} component.
 *
 * @beta
 */
export const DEFAULT_TREE_ITEM_ELEMENT = 'a'

/**
 * Own props for the {@link TreeItem} component.
 *
 * @remarks
 * Extends {@link SelectableOwnProps} to inherit selectable visual styling,
 * and adds tree-specific behavior for expandable, navigable tree nodes.
 *
 * @beta
 */
export type TreeItemOwnProps = SelectableOwnProps & {
  /**
   * When `true`, the tree item's children are visible.
   */
  expanded?: boolean

  /**
   * Sets the font size of the tree item's text and icon content.
   * Supports responsive values.
   */
  fontSize?: ResponsiveProp<FontTextSize>

  /**
   * An icon component to render on the leading side of the tree item.
   *
   * @remarks
   * When not provided, a toggle arrow icon is displayed instead.
   */
  icon?: ElementType

  /**
   * Allows passing a custom element type to the link component.
   *
   * @internal
   */
  linkAs?: SelectableElementType

  /**
   * A callback that fires when the tree item is clicked.
   */
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLLIElement>

  /**
   * The padding inside the tree item content. Supports responsive values.
   */
  padding?: ResponsiveProp<Space>

  /**
   * The gap between the icon and text within the tree item.
   * Supports responsive values.
   */
  gap?: ResponsiveProp<Space>

  /**
   * @deprecated Use `gap` instead.
   */
  space?: never

  /**
   * The text label to display inside the tree item.
   */
  text?: ReactNode

  /**
   * The font weight of the tree item's text content.
   */
  weight?: FontWeight
}

/**
 * Accepted values for the `as` prop of the {@link TreeItem} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `TreeItem`.
 *
 * @beta
 */
export type TreeItemElementType = 'a' | 'li' | ComponentType

/**
 * Props for the {@link TreeItem} component.
 *
 * @remarks
 * Combines {@link TreeItemOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders an `<a>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link TreeItemElementType}.
 *
 * @beta
 */
export type TreeItemProps<E extends TreeItemElementType = TreeItemElementType> = Props<
  TreeItemOwnProps,
  E
>

/**
 * The `TreeItem` component represents a single node within a {@link Tree},
 * supporting expandable children, icons, text labels, and link navigation.
 *
 * @remarks
 * `TreeItem` renders as either a link (`<a>`) or a list item depending on
 * whether an `href` prop is provided. It integrates with the parent
 * {@link Tree} context for keyboard navigation (ArrowUp, ArrowDown,
 * ArrowLeft, ArrowRight) and focus management.
 *
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function TreeItem<E extends TreeItemElementType = typeof DEFAULT_TREE_ITEM_ELEMENT>(
  props: TreeItemProps<E>,
): React.JSX.Element {
  const {
    children,
    className,
    expanded: expandedProp = false,
    fontSize = 1,
    gap: gapProp,
    href,
    icon: IconComponent,
    id: idProp,
    linkAs = 'a',
    muted,
    onClick,
    padding = 2,
    radius = 3,
    selected = false,
    text,
    weight,
    ...rest
  } = props as TreeItemProps<typeof DEFAULT_TREE_ITEM_ELEMENT>

  const [rootElement, setRootElement] = useState<HTMLElement | null>(null)
  const treeitemRef = useRef<HTMLDivElement | null>(null)
  const tree = useTree()
  const {path, registerItem, setExpanded, setFocusedElement} = tree
  const _id = useId()
  const id = idProp || _id
  const [itemPath, itemKey] = useMemo(() => {
    const itemPath = path.concat([id || ''])
    return [itemPath, itemPath.join('/')]
  }, [id, path])
  const itemState = tree.state[itemKey]
  const expanded = itemState?.expanded === undefined ? expandedProp : itemState?.expanded || false
  const focused = tree.focusedElement && tree.focusedElement === rootElement
  const tabIndex = focused ? 0 : -1
  const contextValue = useMemo(
    () => ({...tree, level: tree.level + 1, path: itemPath}),
    [itemPath, tree],
  )

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLLIElement>) => {
      // (event: MouseEvent<HTMLLIElement>) => {
      if (onClick) onClick(event)

      const target = event.target

      if (
        target instanceof HTMLElement &&
        (target.getAttribute('data-ui') === 'TreeItem' ||
          target.closest('[data-ui="TreeItem__box"]'))
      ) {
        event.stopPropagation()
        setExpanded(itemKey, !expanded)
        setFocusedElement(rootElement)
      }
    },
    [expanded, itemKey, onClick, rootElement, setExpanded, setFocusedElement],
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (focused && event.key === 'Enter') {
        const el = treeitemRef.current || rootElement

        el?.click()
      }
    },
    [focused, rootElement],
  )

  useEffect(() => {
    if (!rootElement) return

    return registerItem(rootElement, itemKey, expanded, selected)
  }, [expanded, itemKey, registerItem, rootElement, selected])

  const content = (
    <Box display="flex" gap={gap} padding={padding}>
      <Text
        flex="none"
        muted={muted}
        size={fontSize}
        style={{
          visibility: IconComponent || children ? 'visible' : 'hidden',
          pointerEvents: 'none',
        }}
        weight={weight}
      >
        {IconComponent ? (
          <IconComponent />
        ) : (
          <ToggleArrowRightIcon style={{transform: expanded ? 'rotate(90deg)' : undefined}} />
        )}
      </Text>

      <Text flex={1} muted={muted} size={fontSize} textOverflow="ellipsis" weight={weight}>
        {text}
      </Text>
    </Box>
  )

  if (href) {
    return (
      <Box
        // ref={setRootElement}
        // as="li"
        // className={tree_item({className})}
        data-selected={selected ? '' : undefined}
        data-tree-id={id}
        data-tree-key={itemKey}
        data-ui="TreeItem"
        {...(rest as BoxProps<'li'>)}
        ref={setRootElement}
        as="li"
        className={tree_item({className})}
        role="none"
        onClick={handleClick}
      >
        <Selectable
          ref={treeitemRef}
          aria-expanded={expanded}
          as={linkAs}
          data-ui="TreeItem__box"
          // {...rest}
          href={href}
          radius={radius}
          role="treeitem"
          selected={selected}
          style={{
            paddingLeft: `calc(${vars.space[2]} * ${tree.level})`,
          }}
          tabIndex={tabIndex}
        >
          {content}
        </Selectable>

        <TreeContext value={contextValue}>
          {children && <TreeGroup hidden={!expanded}>{children}</TreeGroup>}
        </TreeContext>
      </Box>
    )
  }

  return (
    <Box
      data-pressed={selected ? '' : undefined}
      data-tree-id={id}
      data-tree-key={itemKey}
      data-ui="TreeItem"
      {...rest}
      ref={setRootElement}
      aria-expanded={expanded}
      className={tree_item({className})}
      role="treeitem"
      tabIndex={tabIndex}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <Selectable
        data-focused={focused ? '' : undefined}
        data-ui="TreeItem__box"
        // {...rest}
        radius={radius}
        selected={selected}
        style={{
          paddingLeft: `calc(${vars.space[2]} * ${tree.level})`,
        }}
        tabIndex={tabIndex}
      >
        {content}
      </Selectable>

      <TreeContext value={contextValue}>
        {children && <TreeGroup expanded={expanded}>{children}</TreeGroup>}
      </TreeContext>
    </Box>
  )
}
