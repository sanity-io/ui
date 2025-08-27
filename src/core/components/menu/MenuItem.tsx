import type {
  GapStyleProps,
  PaddingStyleProps,
  RadiusStyleProps,
  ResponsiveProp,
} from '@sanity/ui/css'
import type {ElementTone, FontTextSize} from '@sanity/ui/theme'
import {
  type ElementType,
  isValidElement,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import {isValidElementType} from 'react-is'

import {Box} from '../../primitives/box/box'
import {Flex} from '../../primitives/flex/flex'
import {Selectable} from '../../primitives/selectable/selectable'
import {Text} from '../../primitives/text/text'
import type {ComponentType, Props} from '../../types'
import {Hotkeys} from '../hotkeys/hotkeys'
import {useMenu} from './useMenu'

/** @public */
export const DEFAULT_MENU_ITEM_ELEMENT = 'button'

/** @public */
export type MenuItemOwnProps = GapStyleProps &
  PaddingStyleProps &
  RadiusStyleProps & {
    disabled?: boolean
    fontSize?: ResponsiveProp<FontTextSize>
    hotkeys?: string[]
    icon?: ElementType | ReactNode
    iconRight?: ElementType | ReactNode
    pressed?: boolean
    selected?: boolean
    text?: ReactNode
    tone?: ElementTone
  }

/** @public */
export type MenuItemElementType = 'button' | 'a' | ComponentType

/** @public */
export type MenuItemProps<E extends MenuItemElementType = MenuItemElementType> = Props<
  MenuItemOwnProps,
  E
>

/** @public */
export function MenuItem<E extends MenuItemElementType = typeof DEFAULT_MENU_ITEM_ELEMENT>(
  props: MenuItemProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_MENU_ITEM_ELEMENT,
    children,
    disabled,
    fontSize = 1,
    gap = 3,
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
    ref: forwardedRef,
    role = 'menuitem',
    selected: selectedProp,
    text,
    tone = 'default',
    ...rest
  } = props as MenuItemProps<typeof DEFAULT_MENU_ITEM_ELEMENT>

  const menu = useMenu()
  const {activeElement, mount, onItemClick, onItemMouseEnter, onItemMouseLeave} = menu
  const [rootElement, setRootElement] = useState<HTMLButtonElement | null>(null)
  const active = Boolean(activeElement) && activeElement === rootElement
  const ref = useRef<HTMLButtonElement | null>(null)

  useImperativeHandle<HTMLButtonElement | null, HTMLButtonElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useEffect(() => mount(rootElement, selectedProp), [mount, rootElement, selectedProp])

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (disabled) return
      if (onClick) onClick(event)
      if (onItemClick) onItemClick(event)
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

  const setRef = useCallback((el: HTMLButtonElement | null) => {
    ref.current = el
    setRootElement(el)
  }, [])

  return (
    <Selectable
      data-ui="MenuItem"
      {...rest}
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
      role={role}
      tabIndex={-1}
      tone={tone}
      type={as === 'button' ? 'button' : undefined}
    >
      {(IconComponent || text || IconRightComponent) && (
        <Flex as="span" gap={gap} gapX={gapX} gapY={gapY} align="center" {...paddingProps}>
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

          {hotkeys && <Hotkeys keys={hotkeys} style={{marginTop: -4, marginBottom: -4}} />}

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
}
