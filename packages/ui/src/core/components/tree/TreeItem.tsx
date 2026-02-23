import {ToggleArrowRightIcon} from '@sanity/icons'
import {type ResponsiveProp, treeItem, vars} from '@sanity/ui/css'
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

import {Box, type BoxProps} from '../../primitives/box/Box'
import type {CardOwnProps} from '../../primitives/card/Card'
import {Flex} from '../../primitives/flex/Flex'
import {Selectable, type SelectableElementType} from '../../primitives/selectable/Selectable'
import {Text} from '../../primitives/text/Text'
import type {ComponentType, Props} from '../../types'
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
 * Extends {@link CardOwnProps} to inherit all card, box layout, spacing, sizing,
 * position, and visual style props. Adds tree-item-specific properties for
 * controlling expand/collapse state, icon rendering, text content, and click behavior.
 *
 * Inherited from {@link CardOwnProps} (which extends {@link BoxOwnProps} and {@link CardStyleProps}):
 * - All layout props: `display`, `flex`, `flexDirection`, `alignItems`, `justifyContent`, etc.
 * - All spacing props: `margin`, `marginX`, `marginY`, `padding`, `paddingX`, `paddingY` (and per-side variants).
 * - All sizing props: `width`, `height`, `minWidth`, `minHeight`, `maxWidth`.
 * - All position props: `position`, `inset`, and per-side inset variants.
 * - All visual props: `border`, `radius`, `shadow`, `overflow`, `muted`, `outline`.
 * - Card-specific props: `scheme`, `tone`, `disabled`, `pressed`, `selected`.
 *
 * @beta
 */
export type TreeItemOwnProps = CardOwnProps & {
  /**
   * Controls whether the tree item's children are visible (expanded) or
   * hidden (collapsed).
   *
   * @remarks
   * When `true`, the item's nested children are rendered in a visible
   * {@link TreeGroup}. When `false`, the children are hidden. The expand/collapse
   * state can also be toggled by clicking the item or pressing the ArrowRight/ArrowLeft
   * keys while the item is focused.
   *
   * The component tracks its own expanded state internally; this prop sets
   * the initial value which can be overridden by user interaction.
   *
   * @type {boolean}
   * @defaultValue false
   * @optional
   */
  expanded?: boolean

  /**
   * Sets the font size of the tree item's text and icon content.
   *
   * @remarks
   * Uses the text font size scale defined by the theme. Supports responsive values.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4`
   *
   * @type {ResponsiveProp\<FontTextSize\>}
   * @defaultValue 1
   * @optional
   */
  fontSize?: ResponsiveProp<FontTextSize>

  /**
   * An icon component rendered on the leading (left) side of the tree item.
   *
   * @remarks
   * Accepts a React component type (rendered as `<IconComponent />`). When
   * provided, replaces the default toggle arrow icon. When omitted and the
   * tree item has children, a toggle arrow icon is rendered that rotates to
   * indicate the expanded/collapsed state.
   *
   * @type {ElementType}
   * @defaultValue undefined
   * @optional
   */
  icon?: ElementType

  /**
   * Allows passing a custom element type to the inner link/selectable component
   * rendered when the tree item has an `href`.
   *
   * @remarks
   * Only used when the tree item renders as a link (i.e. when `href` is provided).
   * The custom element type receives all props that a {@link Selectable} component
   * would receive, including `href`, `radius`, `role`, `tabIndex`, and `selected`.
   *
   * @internal
   *
   * @type {SelectableElementType}
   * @defaultValue `"a"`
   * @optional
   */
  linkAs?: SelectableElementType

  /**
   * Callback fired when the tree item is clicked.
   *
   * @remarks
   * Receives a mouse event from either an `<a>` or `<li>` element depending
   * on whether the tree item renders as a link or a plain list item. Clicking
   * the item also toggles its expanded/collapsed state and updates the focused
   * item in the parent {@link Tree}.
   *
   * @type {MouseEventHandler\<HTMLAnchorElement | HTMLLIElement\>}
   * @defaultValue undefined
   * @optional
   */
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLLIElement>

  /**
   * Sets the inner padding of the tree item's content area.
   *
   * @remarks
   * Uses the spacing scale defined by the theme. Supports responsive values.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`
   *
   * @type {ResponsiveProp\<Space\>}
   * @defaultValue 2
   * @optional
   */
  padding?: ResponsiveProp<Space>

  /**
   * Sets the spacing between the icon/toggle and the text label inside
   * the tree item.
   *
   * @remarks
   * Uses the spacing scale defined by the theme. Supports responsive values.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`
   *
   * @type {ResponsiveProp\<Space\>}
   * @defaultValue 2
   * @optional
   */
  space?: ResponsiveProp<Space>

  /**
   * The text label displayed inside the tree item.
   *
   * @remarks
   * Rendered inside a {@link Text} component with `textOverflow="ellipsis"`.
   * Accepts any React node, though typically a short string.
   *
   * @type {ReactNode}
   * @defaultValue undefined
   * @optional
   */
  text?: ReactNode

  /**
   * Sets the font weight of the tree item's text content.
   *
   * @remarks
   * Accepted values: `"regular"` | `"medium"` | `"semibold"` | `"bold"`
   *
   * @type {FontWeight}
   * @defaultValue undefined
   * @optional
   */
  weight?: FontWeight
}

/**
 * Accepted values for the `as` prop of the {@link TreeItem} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `TreeItem`.
 *
 * Accepted values: `"a"` | `"li"` | `ComponentType`
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
 * When `href` is provided, the tree item renders as a link with an inner
 * {@link Selectable} anchor element. When `href` is omitted, the item renders
 * as a non-link `<li>`-based element with a button-based selectable inside.
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
 * A single item within a {@link Tree} component that supports expand/collapse,
 * nested children, icons, links, and keyboard navigation.
 *
 * @remarks
 * The `TreeItem` component renders a tree node that can contain text, an icon,
 * and nested child tree items. It participates in the parent {@link Tree}'s
 * keyboard navigation and focus management system.
 *
 * When `href` is provided, the item renders as a navigable link with a
 * {@link Selectable} anchor element. When `href` is omitted, the item renders
 * as a plain list item with a button-based selectable. In both cases, clicking
 * the item toggles its expanded/collapsed state.
 *
 * The component registers itself with the parent tree's context on mount and
 * tracks its own expanded/selected state. Indentation is applied automatically
 * based on the nesting `level` from the tree context.
 *
 * This API might change. DO NOT USE IN PRODUCTION.
 *
 * ### Default prop values
 *
 * | Prop | Type | Default | Required | Description |
 * |------|------|---------|----------|-------------|
 * | `as` | `TreeItemElementType` | `"a"` | No | The HTML element or component type to render. |
 * | `expanded` | `boolean` | `false` | No | Controls whether nested children are visible. |
 * | `fontSize` | `ResponsiveProp<FontTextSize>` | `1` | No | Font size of the item text. Accepted values: `0 \| 1 \| 2 \| 3 \| 4`. |
 * | `icon` | `ElementType` | `undefined` | No | An icon component rendered on the leading side. |
 * | `linkAs` | `SelectableElementType` | `"a"` | No | Custom element type for the inner link component (internal). |
 * | `padding` | `ResponsiveProp<Space>` | `2` | No | Inner padding. Accepted values: `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9`. |
 * | `radius` | `ResponsiveProp<Radius \| 'full'>` | `2` | No | Border radius of the selectable area. |
 * | `selected` | `boolean` | `false` | No | When `true`, marks this item as selected and sets initial focus. |
 * | `space` | `ResponsiveProp<Space>` | `2` | No | Spacing between the icon/toggle and the text label. |
 * | `text` | `ReactNode` | `undefined` | No | The text label displayed inside the item. |
 * | `weight` | `FontWeight` | `undefined` | No | Font weight of the text. Accepted values: `"regular"` \| `"medium"` \| `"semibold"` \| `"bold"`. |
 *
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
    href,
    icon: IconComponent,
    id: idProp,
    linkAs = 'a',
    muted,
    onClick,
    padding = 2,
    radius = 2,
    selected = false,
    space = 2,
    text,
    weight,
    ...rest
  } = props as TreeItemProps<typeof DEFAULT_TREE_ITEM_ELEMENT>

  const [rootElement, setRootElement] = useState<HTMLLIElement | null>(null)
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
    <Flex gap={space} padding={padding}>
      <Box
        style={{
          visibility: IconComponent || children ? 'visible' : 'hidden',
          pointerEvents: 'none',
        }}
      >
        {IconComponent && (
          <Text muted={muted} size={fontSize} weight={weight}>
            <IconComponent />
          </Text>
        )}
        {!IconComponent && (
          <Text muted={muted} size={fontSize} weight={weight}>
            <ToggleArrowRightIcon style={{transform: expanded ? 'rotate(90deg)' : undefined}} />
          </Text>
        )}
      </Box>
      <Box flex={1}>
        <Text muted={muted} size={fontSize} textOverflow="ellipsis" weight={weight}>
          {text}
        </Text>
      </Box>
    </Flex>
  )

  if (href) {
    return (
      <Box
        data-selected={selected ? '' : undefined}
        data-tree-id={id}
        data-tree-key={itemKey}
        data-ui="TreeItem"
        {...(rest as BoxProps<'li'>)}
        as="li"
        className={treeItem({className})}
        onClick={handleClick}
        ref={setRootElement}
        role="none"
      >
        <Selectable
          aria-expanded={expanded}
          as={linkAs}
          // data-pressed={selected ? '' : undefined}
          data-ui="TreeItem__box"
          href={href}
          radius={radius}
          ref={treeitemRef}
          role="treeitem"
          selected={selected}
          tabIndex={tabIndex}
          style={{
            paddingLeft: `calc(${vars.space[2]} * ${tree.level})`,
          }}
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
      data-selected={selected ? '' : undefined}
      data-ui="TreeItem"
      data-tree-id={id}
      data-tree-key={itemKey}
      {...(rest as BoxProps<'a'>)}
      aria-expanded={expanded}
      className={treeItem({className})}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      // @ts-expect-error - TODO: fix this
      ref={setRootElement}
      role="treeitem"
      tabIndex={tabIndex}
    >
      <Selectable
        as="button"
        // data-pressed={selected ? '' : undefined}
        data-focused={focused ? '' : undefined}
        data-ui="TreeItem__box"
        radius={radius}
        selected={selected}
        style={{
          paddingLeft: `calc(${vars.space[2]} * ${tree.level})`,
        }}
      >
        {content}
      </Selectable>

      <TreeContext value={contextValue}>
        {children && <TreeGroup expanded={expanded}>{children}</TreeGroup>}
      </TreeContext>
    </Box>
  )
}
