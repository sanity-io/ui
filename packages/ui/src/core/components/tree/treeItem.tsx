import {ToggleArrowRightIcon} from '@sanity/icons/ToggleArrowRight'
import {clsx} from 'clsx/lite'
import {startTransition, useCallback, useEffect, useId, useMemo, useRef, useState} from 'react'
import {styled} from 'styled-components'

import {ThemeFontWeightKey} from '../../../theme/system/font'
import {Box} from '../../primitives/box/box'
import {Flex} from '../../primitives/flex/flex'
import {Text} from '../../primitives/text/text'
import {ElementType} from '../../types/component'
import {treeItemBoxStyle, TreeItemBoxStyleProps, treeItemRootColorStyle} from './style'
import {TreeContext} from './treeContext'
import {TreeGroup} from './treeGroup'
import {useTree} from './useTree'

import {treeItem, treeItemToggleArrow} from './tree.css'

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
  linkAs?: ElementType
  /**
   * Additional props for the link element that is rendered when `href` is set — e.g. `next/link`'s
   * `prefetch` together with `linkAs={Link}`. Props controlled by `TreeItem` itself (`href`,
   * `role`, `tabIndex`, `aria-expanded` and the ref) take precedence.
   */
  linkProps?: React.HTMLProps<HTMLAnchorElement> & Record<string, unknown>
  padding?: number | number[]
  gap?: number | number[]
  /**
   * @deprecated Use `gap` instead.
   */
  space?: never
  text?: React.ReactNode
  weight?: ThemeFontWeightKey
}

const StyledTreeItem = styled.li(treeItemRootColorStyle)

/**
 * Styles a plain element (rather than wrapping `Box`) so that `as={linkAs}` renders the custom
 * link component directly, the same way `<Button as={...}>` works. Wrapping `Box` with
 * `.attrs({forwardedAs: 'a'})` made styled-components pass `as="a"` on to the custom component
 * (breaking e.g. `next/link`, which treats `as` as a URL override) and skip the `Box` styles.
 */
const TreeItemBox = styled.a<TreeItemBoxStyleProps>(treeItemBoxStyle)

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function TreeItem(
  props: TreeItemProps & Omit<React.HTMLProps<HTMLLIElement>, 'as' | 'ref' | 'role'>,
): React.JSX.Element {
  const {
    children,
    expanded: expandedProp = false,
    fontSize = 1,
    href,
    icon: IconComponent,
    id: idProp,
    linkAs,
    linkProps,
    muted,
    onClick,
    padding = 2,
    selected = false,
    gap = 2,
    text,
    weight,
    ...restProps
  } = props
  const [rootElement, _setRootElement] = useState<HTMLLIElement | null>(null)
  /**
   * The startTransition wrapper here is to avoid an issue when on React 18 where this error can happen:
   * >Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.
   * This doesn't happen on React 19 due to automatic batching of all state updates, the startTransition wrapper here gives a type of batching for 18 users in a way that still works with 19.
   * NOTE: The startTransition wrapper is not needed in UI v4, since the baseline there is React 19.
   */
  const setRootElement = useCallback((node: HTMLLIElement | null) => {
    startTransition(() => _setRootElement(node))
  }, [])

  const treeitemRef = useRef<HTMLAnchorElement | null>(null)
  const tree = useTree()
  const {path, registerItem, setExpanded, setFocusedElement} = tree
  const _id = useId()
  const id = idProp || _id
  const [itemPath, itemKey] = useMemo(() => {
    const itemPath = path.concat([id || ''])
    return [itemPath, itemPath.join('/')]
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

    return registerItem(rootElement, itemKey, expanded, selected)
  }, [expanded, itemKey, registerItem, rootElement, selected])

  const content = (
    <Flex padding={padding}>
      <Box
        marginRight={gap}
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
          <Text className={treeItemToggleArrow} muted={muted} size={fontSize} weight={weight}>
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
      <StyledTreeItem
        data-selected={selected ? '' : undefined}
        data-tree-id={id}
        data-tree-key={itemKey}
        data-ui="TreeItem"
        {...restProps}
        className={clsx(treeItem, restProps.className)}
        onClick={handleClick}
        ref={setRootElement}
        role="none"
      >
        <TreeItemBox
          {...linkProps}
          $level={tree.level}
          aria-expanded={expanded}
          as={linkAs}
          data-as={typeof linkAs === 'string' ? linkAs : 'a'}
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
      </StyledTreeItem>
    )
  }

  return (
    <StyledTreeItem
      data-selected={selected ? '' : undefined}
      data-ui="TreeItem"
      data-tree-id={id}
      data-tree-key={itemKey}
      {...restProps}
      aria-expanded={expanded}
      className={clsx(treeItem, restProps.className)}
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
    </StyledTreeItem>
  )
}
