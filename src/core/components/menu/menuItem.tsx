import {GapStyleProps, PaddingStyleProps, RadiusStyleProps, ResponsiveProp} from '@sanity/ui/css'
import {Space} from '@sanity/ui/theme'
import {
  ElementType,
  ForwardedRef,
  forwardRef,
  isValidElement,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import {isValidElementType} from 'react-is'

import {Box, Flex, Text} from '../../primitives'
import {Selectable} from '../../primitives/_selectable'
import {Props, SelectableTone} from '../../types'
import {Hotkeys} from '../hotkeys'
import {useMenu} from './useMenu'

/**
 * @public
 */
export interface MenuItemProps extends GapStyleProps, PaddingStyleProps, RadiusStyleProps {
  disabled?: boolean
  fontSize?: number | number[]
  hotkeys?: string[]
  icon?: ElementType | ReactNode
  iconRight?: ElementType | ReactNode
  pressed?: boolean
  selected?: boolean
  /** @deprecated Use `gap` instead. */
  space?: ResponsiveProp<Space>
  text?: ReactNode
  tone?: SelectableTone
}

/**
 * @public
 */
export const MenuItem = forwardRef(function MenuItem(
  props: Props<MenuItemProps, 'div'>,
  forwardedRef: ForwardedRef<HTMLDivElement>,
) {
  const {
    as = 'button',
    children,
    disabled,
    fontSize = 1,
    gap,
    gapX,
    gapY,
    hotkeys,
    icon: IconComponent,
    iconRight: IconRightComponent,
    onClick,
    padding = 3,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    pressed,
    radius = 2,
    selected: selectedProp,
    space = 3,
    text,
    tone = 'default',
    ...restProps
  } = props

  const menu = useMenu()
  const {
    activeElement,
    mount,
    onItemClick,
    onItemMouseEnter: _onItemMouseEnter,
    onItemMouseLeave: _onItemMouseLeave,
  } = menu
  const onItemMouseEnter = _onItemMouseEnter ?? menu.onMouseEnter
  const onItemMouseLeave = _onItemMouseLeave ?? menu.onMouseLeave
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
  const active = Boolean(activeElement) && activeElement === rootElement
  const ref = useRef<HTMLDivElement | null>(null)

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)

  useEffect(() => mount(rootElement, selectedProp), [mount, rootElement, selectedProp])

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      if (onClick) onClick(event)
      if (onItemClick) onItemClick()
    },
    [disabled, onClick, onItemClick],
  )

  const paddingProps = useMemo(
    () => ({
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
    }),
    [padding, paddingX, paddingY, paddingTop, paddingRight, paddingBottom, paddingLeft],
  )

  const setRef = useCallback((el: HTMLDivElement | null) => {
    ref.current = el
    setRootElement(el)
  }, [])

  return (
    <Selectable
      data-ui="MenuItem"
      role="menuitem"
      {...restProps}
      as={as}
      data-pressed={pressed ? '' : undefined}
      data-selected={active ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      radius={radius}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={onItemMouseEnter}
      onMouseLeave={onItemMouseLeave}
      ref={setRef}
      tabIndex={-1}
      tone={tone}
      type={as === 'button' ? 'button' : undefined}
    >
      {(IconComponent || text || IconRightComponent) && (
        <Flex as="span" gap={gap ?? space} gapX={gapX} gapY={gapY} align="center" {...paddingProps}>
          {IconComponent && (
            <Text muted size={fontSize}>
              {isValidElement(IconComponent) && IconComponent}
              {isValidElementType(IconComponent) && <IconComponent />}
            </Text>
          )}

          {text && (
            <Box flex={1}>
              <Text size={fontSize} textOverflow="ellipsis" weight="medium">
                {text}
              </Text>
            </Box>
          )}

          {hotkeys && (
            <Hotkeys gap={0.5} keys={hotkeys} style={{marginTop: -4, marginBottom: -4}} />
          )}

          {IconRightComponent && (
            <Text muted size={fontSize}>
              {isValidElement(IconRightComponent) && IconRightComponent}
              {isValidElementType(IconRightComponent) && <IconRightComponent />}
            </Text>
          )}
        </Flex>
      )}

      {children && (
        <Box as="span" {...paddingProps}>
          {children}
        </Box>
      )}
    </Selectable>
  )
})

MenuItem.displayName = 'ForwardRef(MenuItem)'
