import {ToggleArrowRightIcon} from '@sanity/icons'
import {type ResponsiveProp, treeItem, vars} from '@sanity/ui/css'
import type {FontTextSize, FontWeight, Space} from '@sanity/ui/theme'
import {
  type ElementType,
  type KeyboardEvent,
  type MouseEvent,
  type MouseEventHandler,
  type ReactNode,
  type Ref,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
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

/** @beta */
export const DEFAULT_TREE_ITEM_ELEMENT = 'a'

/** @beta */
export type TreeItemOwnProps = CardOwnProps & {
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
  space?: ResponsiveProp<Space>
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

  const rootRef = useRef<HTMLElement | null>(null)
  const treeitemRef = useRef<HTMLDivElement | null>(null)
  const tree = useTree()
  const {path, registerItem, setExpanded, setFocusedElement} = tree
  const _id = useId()
  const id = idProp || _id
  const itemPath = useMemo(() => path.concat([id || '']), [id, path])
  const itemKey = itemPath.join('/')
  const itemState = tree.state[itemKey]
  const expanded = itemState?.expanded === undefined ? expandedProp : itemState?.expanded || false
  const focused = tree.focusedElement && tree.focusedElement === rootRef.current
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
        setFocusedElement(rootRef.current)
      }
    },
    [expanded, itemKey, onClick, setExpanded, setFocusedElement],
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (focused && event.key === 'Enter') {
        const el = treeitemRef.current || rootRef.current

        el?.click()
      }
    },
    [focused],
  )

  useEffect(() => {
    if (!rootRef.current) return

    return registerItem(rootRef.current, itemPath.join('/'), expanded, selected)
  }, [expanded, itemPath, registerItem, selected])

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
        ref={rootRef as Ref<HTMLLIElement>}
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

        <TreeContext.Provider value={contextValue}>
          {children && <TreeGroup hidden={!expanded}>{children}</TreeGroup>}
        </TreeContext.Provider>
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
      ref={rootRef as Ref<HTMLAnchorElement>}
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

      <TreeContext.Provider value={contextValue}>
        {children && <TreeGroup expanded={expanded}>{children}</TreeGroup>}
      </TreeContext.Provider>
    </Box>
  )
}
