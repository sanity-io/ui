import {ToggleArrowRightIcon} from '@sanity/icons'
import {ThemeFontWeightKey} from '@sanity/ui/theme'
import {memo, useCallback, useEffect, useId, useMemo, useRef, useState} from 'react'
import {styled} from 'styled-components'
import {Box, BoxProps, Flex, Text} from '../../primitives'
import {
  treeItemRootStyle,
  treeItemRootColorStyle,
  treeItemBoxStyle,
  TreeItemBoxStyleProps,
} from './style'
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
  space?: number | number[]
  text?: React.ReactNode
  weight?: ThemeFontWeightKey
}

const Root = memo(styled.li(treeItemRootStyle, treeItemRootColorStyle))

const TreeItemBox = styled(Box).attrs({forwardedAs: 'a'})<TreeItemBoxStyleProps>(treeItemBoxStyle)

const ToggleArrowText = styled(Text)`
  & > svg {
    transition: transform 100ms;
  }
`

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const TreeItem = memo(function TreeItem(
  props: TreeItemProps & Omit<React.HTMLProps<HTMLLIElement>, 'as' | 'ref' | 'role'>,
): React.ReactElement {
  const {
    children,
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
  const [rootElement, setRootElement] = useState<HTMLLIElement | null>(null)
  const treeitemRef = useRef<HTMLDivElement | null>(null)
  const tree = useTree()
  const {path, registerItem, setExpanded, setFocusedElement} = tree
  const _id = useId()
  const id = idProp || _id
  const [itemPath, itemKey] = useMemo(() => {
    const result = path.concat([id || ''])

    return [result, result.join('/')]
  }, [id, path])
  const itemState = tree.state[itemKey]
  const focused = tree.focusedElement === rootElement
  const expanded = itemState?.expanded === undefined ? expandedProp : itemState?.expanded || false
  const tabIndex = tree.focusedElement && tree.focusedElement === rootElement ? 0 : -1
  const contextValue = useMemo(
    () => ({...tree, level: tree.level + 1, path: itemPath}),
    [itemPath, tree],
  )

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
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
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (focused && event.key === 'Enter') {
        const el = treeitemRef.current || rootElement

        el?.click()
      }
    },
    [focused, rootElement],
  )

  useEffect(() => {
    if (!rootElement) return

    return registerItem(rootElement, itemPath.join('/'), expanded, selected)
  }, [expanded, itemPath, registerItem, rootElement, selected])

  const content = (
    <Flex padding={padding}>
      <Box
        marginRight={space}
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
          <ToggleArrowText muted={muted} size={fontSize} weight={weight}>
            <ToggleArrowRightIcon style={{transform: expanded ? 'rotate(90deg)' : undefined}} />
          </ToggleArrowText>
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
      <Root
        data-selected={selected ? '' : undefined}
        data-tree-id={id}
        data-tree-key={itemKey}
        data-ui="TreeItem"
        {...restProps}
        onClick={handleClick}
        ref={setRootElement}
        role="none"
      >
        <TreeItemBox
          $level={tree.level}
          aria-expanded={expanded}
          as={linkAs}
          data-ui="TreeItem__box"
          href={href}
          ref={treeitemRef}
          role="treeitem"
          tabIndex={tabIndex}
        >
          {content}
        </TreeItemBox>

        <TreeContext.Provider value={contextValue}>
          {children && <TreeGroup hidden={!expanded}>{children}</TreeGroup>}
        </TreeContext.Provider>
      </Root>
    )
  }

  return (
    <Root
      data-selected={selected ? '' : undefined}
      data-ui="TreeItem"
      data-tree-id={id}
      data-tree-key={itemKey}
      {...restProps}
      aria-expanded={expanded}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={setRootElement}
      role="treeitem"
      tabIndex={tabIndex}
    >
      <TreeItemBox $level={tree.level} as="div" data-ui="TreeItem__box">
        {content}
      </TreeItemBox>

      <TreeContext.Provider value={contextValue}>
        {children && <TreeGroup expanded={expanded}>{children}</TreeGroup>}
      </TreeContext.Provider>
    </Root>
  )
})
TreeItem.displayName = 'Memo(TreeItem)'
