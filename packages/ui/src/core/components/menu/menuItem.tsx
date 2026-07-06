import {
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import {isValidElementType} from 'react-is'

import {useArrayProp} from '../../hooks'
import {Box, Flex, Text} from '../../primitives'
import {Selectable} from '../../primitives/_selectable'
import {ResponsivePaddingProps, ResponsiveRadiusProps} from '../../primitives/types'
import {useRootTheme} from '../../theme'
import {SelectableTone} from '../../types/selectable'
import {Hotkeys} from '../hotkeys'
import {useMenu} from './useMenu'

/**
 * @public
 */
export interface MenuItemProps extends ResponsivePaddingProps, ResponsiveRadiusProps {
  as?: React.ElementType | keyof React.JSX.IntrinsicElements
  fontSize?: number | number[]
  hotkeys?: string[]
  icon?: React.ElementType | React.ReactNode
  iconRight?: React.ElementType | React.ReactNode
  pressed?: boolean
  selected?: boolean
  space?: number | number[]
  text?: React.ReactNode
  tone?: SelectableTone
}

/**
 * @public
 */
export const MenuItem = forwardRef(function MenuItem(
  props: MenuItemProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'ref' | 'selected' | 'tabIndex'>,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    as = 'button',
    children,
    disabled,
    fontSize = 1,
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
  const {scheme} = useRootTheme()
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
    (event: React.MouseEvent<HTMLDivElement>) => {
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

  const hotkeysFontSize = useArrayProp(fontSize).map((s) => s - 1)

  const setRef = useCallback((el: HTMLDivElement | null) => {
    ref.current = el
    setRootElement(el)
  }, [])

  return (
    <Selectable
      data-ui="MenuItem"
      role="menuitem"
      {...restProps}
      data-pressed={as !== 'button' && pressed ? '' : undefined}
      data-selected={active ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      forwardedAs={as}
      $radius={useArrayProp(radius)}
      $padding={useArrayProp(0)}
      $tone={disabled ? 'default' : tone}
      $scheme={scheme}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={onItemMouseEnter}
      onMouseLeave={onItemMouseLeave}
      ref={setRef}
      tabIndex={-1}
      type={as === 'button' ? 'button' : undefined}
    >
      {(IconComponent || text || IconRightComponent) && (
        <Flex as="span" gap={space} align="center" {...paddingProps}>
          {IconComponent && (
            <Text size={fontSize}>
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
            <Hotkeys
              fontSize={hotkeysFontSize}
              keys={hotkeys}
              style={{marginTop: -4, marginBottom: -4}}
            />
          )}

          {IconRightComponent && (
            <Text size={fontSize}>
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
