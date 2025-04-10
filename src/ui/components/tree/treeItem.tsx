import {ToggleArrowRightIcon} from '@sanity/icons'
import {composeClassNames, ResponsiveProp, treeItem} from '@sanity/ui/css'
import {FontTextSize, Space, ThemeFontWeightKey} from '@sanity/ui/theme'
import {
  ElementType,
  KeyboardEvent,
  memo,
  MouseEvent,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
} from 'react'

import {Box, CardProps, Flex, Text} from '../../primitives'
import {Selectable} from '../../primitives/_selectable'
import {Props} from '../../types'
import {TreeContext} from './treeContext'
import {TreeGroup} from './treeGroup'
import {useTree} from './useTree'

/**
 * @beta
 */
export interface TreeItemProps extends CardProps {
  expanded?: boolean
  fontSize?: ResponsiveProp<FontTextSize>
  icon?: ElementType
  /**
   * Allows passing a custom element type to the link component
   */
  linkAs?: ElementType
  padding?: ResponsiveProp<Space>
  space?: ResponsiveProp<Space>
  text?: ReactNode
  weight?: ThemeFontWeightKey
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const TreeItem = memo(function TreeItem(
  props: Omit<Props<TreeItemProps, 'div'>, 'as'>,
): ReactElement {
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
    ...restProps
  } = props
  const rootRef = useRef<HTMLDivElement | null>(null)
  const treeitemRef = useRef<HTMLDivElement | null>(null)
  const tree = useTree()
  const {path, registerItem, setExpanded, setFocusedElement} = tree
  const _id = useId()
  const id = idProp || _id
  const itemPath = useMemo(() => path.concat([id || '']), [id, path])
  const itemKey = itemPath.join('/')
  const itemState = tree.state[itemKey]
  const focused = tree.focusedElement === rootRef.current
  const expanded = itemState?.expanded === undefined ? expandedProp : itemState?.expanded || false
  const tabIndex = tree.focusedElement && tree.focusedElement === rootRef.current ? 0 : -1
  const contextValue = useMemo(
    () => ({...tree, level: tree.level + 1, path: itemPath}),
    [itemPath, tree],
  )

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
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
        {...restProps}
        as="li"
        className={composeClassNames(className, treeItem())}
        onClick={handleClick}
        ref={rootRef}
        role="none"
      >
        <Selectable
          aria-expanded={expanded}
          as={linkAs}
          data-pressed={selected ? '' : undefined}
          data-ui="TreeItem__box"
          href={href}
          radius={radius}
          ref={treeitemRef}
          role="treeitem"
          tabIndex={tabIndex}
          style={{
            paddingLeft: `calc(var(--space-2) * ${tree.level})`,
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
      {...restProps}
      aria-expanded={expanded}
      className={composeClassNames(className, treeItem())}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={rootRef}
      role="treeitem"
      tabIndex={tabIndex}
    >
      <Selectable
        as="button"
        data-pressed={selected ? '' : undefined}
        data-ui="TreeItem__box"
        radius={radius}
        style={{
          paddingLeft: `calc(var(--space-2) * ${tree.level})`,
        }}
      >
        {content}
      </Selectable>

      <TreeContext.Provider value={contextValue}>
        {children && <TreeGroup expanded={expanded}>{children}</TreeGroup>}
      </TreeContext.Provider>
    </Box>
  )
})

TreeItem.displayName = 'Memo(TreeItem)'
