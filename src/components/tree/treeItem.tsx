import {useId} from '@reach/auto-id'
import {ToggleArrowRightIcon} from '@sanity/icons'
import React, {createElement, useCallback, useEffect, useMemo, useRef} from 'react'
import styled, {css} from 'styled-components'
import {Box, Flex, Text} from '../../primitives'
import {rem} from '../../styles'
import {Theme, ThemeFontWeightKey} from '../../theme'
import {TreeContext} from './treeContext'
import {TreeGroup} from './treeGroup'
import {useTree} from './useTree'

/**
 * @beta
 */
export interface TreeItemProps {
  expanded?: boolean
  fontSize?: number | number[]
  icon?: React.ComponentType
  padding?: number | number[]
  space?: number | number[]
  text?: React.ReactNode
  weight?: ThemeFontWeightKey
}

const Root = styled.li((props: {theme: Theme}) => {
  const {theme} = props
  const {card, muted} = theme.sanity.color

  return css`
    --treeitem-bg-color: ${card.enabled.bg};
    --card-fg-color: ${card.enabled.fg};

    &[data-selected] {
      --treeitem-bg-color: ${card.pressed.bg};
      --card-fg-color: ${card.pressed.fg};
    }

    &[role='none'] > [role='treeitem'] {
      outline: none;
      cursor: default;
      background-color: var(--treeitem-bg-color);
      color: var(--treeitem-fg-color);
      border-radius: 3px;

      &:not(:focus):hover {
        --treeitem-bg-color: ${muted.default.hovered.bg};
        --card-fg-color: ${muted.default.hovered.fg};
      }

      &:focus {
        --treeitem-bg-color: ${card.selected.bg};
        --card-fg-color: ${card.selected.fg};
        position: relative;
      }
    }

    &[role='treeitem'] {
      outline: none;

      & > div {
        cursor: default;
        background-color: var(--treeitem-bg-color);
        color: var(--card-fg-color);
        border-radius: 3px;
      }

      &:not(:focus) > div:hover {
        --treeitem-bg-color: ${muted.default.hovered.bg};
        --card-fg-color: ${muted.default.hovered.fg};
      }

      &:focus > div {
        --treeitem-bg-color: ${card.selected.bg};
        --card-fg-color: ${card.selected.fg};
        position: relative;
      }
    }
  `
})

const TreeItemBox = styled(Box)<{$level: number}>((props: {$level: number; theme: Theme}) => {
  const {$level, theme} = props
  const {space} = theme.sanity

  return css`
    padding-left: ${rem(space[2] * $level)};
  `
})

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function TreeItem(
  props: TreeItemProps & Omit<React.HTMLProps<HTMLLIElement>, 'as' | 'ref' | 'role'>
): React.ReactElement {
  const {
    children,
    expanded: expandedProp = false,
    fontSize,
    href,
    icon,
    id: idProp,
    onClick,
    padding = 3,
    selected = false,
    space = 2,
    text,
    weight,
    ...restProps
  } = props
  const rootRef = useRef<HTMLLIElement | null>(null)
  const treeitemRef = useRef<HTMLElement | null>(null)
  const tree = useTree()
  const {path, registerItem, setExpanded, setFocusedElement} = tree
  const id = useId(idProp) || idProp
  const itemPath = useMemo(() => path.concat([id || '']), [id, path])
  const itemKey = itemPath.join('/')
  const itemState = tree.state[itemKey]
  const focused = tree.focusedElement === rootRef.current
  const expanded = itemState?.expanded === undefined ? expandedProp : itemState?.expanded || false
  const tabIndex = tree.focusedElement && tree.focusedElement === rootRef.current ? 0 : -1
  const contextValue = useMemo(
    () => ({...tree, level: tree.level + 1, path: itemPath}),
    [itemPath, tree]
  )

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      if (onClick) onClick(event)

      const target = event.target

      if (
        target instanceof HTMLElement &&
        (target.getAttribute('data-ui') === 'TreeItem__box' ||
          target.closest('[data-ui="TreeItem__box"]'))
      ) {
        event.stopPropagation()
        setExpanded(itemKey, !expanded)
        setFocusedElement(rootRef.current)
      }
    },
    [expanded, itemKey, onClick, setExpanded, setFocusedElement]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (focused && event.key === 'Enter') {
        const el = treeitemRef.current || rootRef.current

        el?.click()
      }
    },
    [focused]
  )

  useEffect(() => {
    if (!rootRef.current) return

    return registerItem(rootRef.current, itemPath.join('/'), expanded, selected)
  }, [expanded, itemPath, registerItem, selected])

  const content = (
    <Flex padding={padding}>
      <Box
        marginRight={space}
        style={{visibility: icon || children ? 'visible' : 'hidden', pointerEvents: 'none'}}
      >
        {icon && (
          <Text size={fontSize} weight={weight}>
            {createElement(icon)}
          </Text>
        )}
        {!icon && (
          <Text size={fontSize} weight={weight}>
            <ToggleArrowRightIcon style={{transform: expanded ? 'rotate(90deg)' : undefined}} />
          </Text>
        )}
      </Box>
      <Text size={fontSize} weight={weight}>
        {text}
      </Text>
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
        ref={rootRef}
        role="none"
      >
        <TreeItemBox
          $level={tree.level}
          aria-expanded={expanded}
          data-ui="TreeItem__box"
          forwardedAs="a"
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
      ref={rootRef}
      role="treeitem"
      tabIndex={tabIndex}
    >
      <TreeItemBox $level={tree.level} data-ui="TreeItem__box">
        {content}
      </TreeItemBox>

      <TreeContext.Provider value={contextValue}>
        {children && <TreeGroup expanded={expanded}>{children}</TreeGroup>}
      </TreeContext.Provider>
    </Root>
  )
}
