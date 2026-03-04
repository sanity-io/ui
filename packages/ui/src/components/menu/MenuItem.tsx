import {Hotkeys} from '@sanity/ui/components/hotkeys'
import type {ComponentType, Props} from '@sanity/ui/core'
import {
  type GapStyleProps,
  type PaddingStyleProps,
  type RadiusStyleProps,
  type ResponsiveProp,
  selectable_hotkeys,
} from '@sanity/ui/css'
import {Selectable} from '@sanity/ui/primitives/selectable'
import {Text} from '@sanity/ui/primitives/text'
import type {ElementTone, FontTextSize} from '@sanity/ui/tokens'
import {
  type ElementType,
  isValidElement,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import {isValidElementType} from 'react-is'

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
    gap,
    hotkeys,
    icon: IconComponent,
    iconRight: IconRightComponent,
    onClick,
    padding = 3,
    pressed,
    radius = 3,
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

  const setRef = useCallback((el: HTMLButtonElement | null) => {
    ref.current = el
    setRootElement(el)
  }, [])

  return (
    <Selectable
      data-pressed={pressed ? '' : undefined}
      data-ui="MenuItem"
      {...rest}
      ref={setRef}
      as={as}
      disabled={disabled}
      display="flex"
      gap={gap ?? padding}
      padding={padding}
      radius={radius}
      role={role}
      selected={active}
      tabIndex={-1}
      tone={tone}
      type={as === 'button' ? 'button' : undefined}
      onClick={handleClick}
      onMouseEnter={onItemMouseEnter}
      onMouseLeave={onItemMouseLeave}
    >
      {IconComponent && (
        <Text flex="none" muted size={fontSize}>
          {isValidElement(IconComponent) && IconComponent}
          {isValidElementType(IconComponent) && <IconComponent />}
        </Text>
      )}

      {text && (
        <Text flex={1} size={fontSize} textOverflow="ellipsis" weight="medium">
          {text}
        </Text>
      )}

      {children}

      {hotkeys && <Hotkeys className={selectable_hotkeys()} keys={hotkeys} />}

      {IconRightComponent && (
        <Text flex="none" muted size={fontSize}>
          {isValidElement(IconRightComponent) && IconRightComponent}
          {isValidElementType(IconRightComponent) && <IconRightComponent />}
        </Text>
      )}
    </Selectable>
  )
}
