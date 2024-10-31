import {ToggleArrowRightIcon} from '@sanity/icons'
import {composeClassNames, ResponsiveProp, treeItem} from '@sanity/ui/css'
import {Space, ThemeFontWeightKey} from '@sanity/ui/theme'
import {memo, useCallback, useEffect, useId, useMemo, useRef} from 'react'
import {Box, BoxProps, Flex, Text} from '../../primitives'
import {TreeContext} from './treeContext'
import {TreeGroup} from './treeGroup'
import {useTree} from './useTree'

/**
 * @beta
 */
export interface TreeItemProps {
  expanded?: boolean
  fontSize?: number | number[]
  icon?: React.ElementType
  /**
   * Allows passing a custom element type to the link component
   */
  linkAs?: BoxProps['as']
  padding?: number | number[]
  space?: ResponsiveProp<Space>
  text?: React.ReactNode
  weight?: ThemeFontWeightKey
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const TreeItem = memo(function TreeItem(
  props: TreeItemProps &
    Omit<
      React.HTMLProps<HTMLDivElement>,
      'as' | 'height' | 'ref' | 'role' | 'rows' | 'width' | 'wrap'
    >,
): React.ReactElement {
  const {
    children,
    className,
    expanded: expandedProp = false,
    fontSize = 1,
    href,
    icon: IconComponent,
    id: idProp,
    linkAs,
    muted,
    onClick,
    padding = 2,
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
    (event: React.MouseEvent<HTMLDivElement>) => {
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
    (event: React.KeyboardEvent<HTMLElement>) => {
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
        // marginRight={space}
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
          <Text
            // ToggleArrowText
            muted={muted}
            size={fontSize}
            weight={weight}
          >
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
        <Box
          // $level={tree.level}
          aria-expanded={expanded}
          as={linkAs}
          data-ui="TreeItem__box"
          href={href}
          ref={treeitemRef}
          role="treeitem"
          tabIndex={tabIndex}
          // todo
          style={{
            paddingLeft: `calc(var(--space-2) * ${tree.level})`,
          }}
        >
          {content}
        </Box>

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
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={rootRef}
      role="treeitem"
      tabIndex={tabIndex}
    >
      <Box
        // $level={tree.level}
        as="div"
        data-ui="TreeItem__box"
        // todo
        style={{
          paddingLeft: `calc(var(--space-2) * ${tree.level})`,
        }}
      >
        {content}
      </Box>

      <TreeContext.Provider value={contextValue}>
        {children && <TreeGroup expanded={expanded}>{children}</TreeGroup>}
      </TreeContext.Provider>
    </Box>
  )
})

TreeItem.displayName = 'Memo(TreeItem)'
