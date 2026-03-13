import {ToggleArrowRightIcon} from '@sanity/icons'
import type {ComponentType, Props} from '@sanity/ui/core'
import {type ResponsiveProp, tree_item, vars} from '@sanity/ui-css'
import {Box, type BoxProps} from '@sanity/ui/primitives/box'
import {
  Selectable,
  type SelectableElementType,
  type SelectableOwnProps,
} from '@sanity/ui/primitives/selectable'
import {Text} from '@sanity/ui/primitives/text'
import type {FontTextSize, FontWeight, Space} from '@sanity/ui-tokens'
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

/** @beta */
export const DEFAULT_TREE_ITEM_ELEMENT = 'a'

/** @beta */
export type TreeItemOwnProps = SelectableOwnProps & {
  expanded?: boolean
  fontSize?: ResponsiveProp<FontTextSize>
  icon?: ElementType
  /**
   * Allows passing a custom element type to the link component
   * @internal
   */
  linkAs?: SelectableElementType
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLLIElement>
  padding?: ResponsiveProp<Space>
  gap?: ResponsiveProp<Space>
  /** @deprecated Use `gap` instead */
  space?: never
  text?: ReactNode
  weight?: FontWeight
}

/** @beta */
export type TreeItemElementType = 'a' | 'li' | ComponentType

/** @beta */
export type TreeItemProps<E extends TreeItemElementType = TreeItemElementType> = Props<
  TreeItemOwnProps,
  E
>

/**
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

  const gap = gapProp ?? padding

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
          style={{paddingLeft: `calc(${vars.space[2]} * ${tree.level})`}}
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
      // ref={setRootElement}
      // aria-expanded={expanded}
      // as="li"
      // className={tree_item({className})}
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
        style={{paddingLeft: `calc(${vars.space[2]} * ${tree.level})`}}
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
