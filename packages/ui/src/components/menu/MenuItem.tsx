import {Hotkeys} from '@sanity/ui/components/hotkeys'
import type {ComponentType, Props} from '@sanity/ui/core'
import {
  type GapStyleProps,
  type PaddingStyleProps,
  type RadiusStyleProps,
  type ResponsiveProp,
  selectable_hotkeys,
} from '@sanity/ui/css'
import {Box} from '@sanity/ui/primitives/box'
import {Selectable} from '@sanity/ui/primitives/selectable'
import {Text} from '@sanity/ui/primitives/text'
import type {ElementTone, FontTextSize} from '@sanity/ui/theme'
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

/**
 * The default HTML element type rendered by the {@link MenuItem} component.
 *
 * @public
 */
export const DEFAULT_MENU_ITEM_ELEMENT = 'button'

/**
 * Own props for the {@link MenuItem} component.
 *
 * @remarks
 * Extends {@link GapStyleProps}, {@link PaddingStyleProps}, and {@link RadiusStyleProps}
 * to provide layout and visual styling for menu items.
 *
 * @public
 */
export type MenuItemOwnProps = GapStyleProps &
  PaddingStyleProps &
  RadiusStyleProps & {
    /**
     * When `true`, disables the menu item, preventing user interaction.
     */
    disabled?: boolean

    /**
     * Sets the font size of the menu item's text and icon content.
     * Supports responsive values.
     */
    fontSize?: ResponsiveProp<FontTextSize>

    /**
     * Keyboard shortcut keys to display alongside the menu item text.
     *
     * @remarks
     * Rendered as a {@link Hotkeys} component on the trailing side of the item.
     */
    hotkeys?: string[]

    /**
     * An icon to render on the leading (left) side of the menu item.
     *
     * @remarks
     * Accepts either a React component type (rendered as `<IconComponent />`) or
     * a React element (rendered as-is).
     */
    icon?: ElementType | ReactNode

    /**
     * An icon to render on the trailing (right) side of the menu item.
     *
     * @remarks
     * Accepts either a React component type (rendered as `<IconComponent />`) or
     * a React element (rendered as-is).
     */
    iconRight?: ElementType | ReactNode

    /**
     * When `true`, applies a pressed visual state to the menu item.
     */
    pressed?: boolean

    /**
     * When `true`, applies a selected visual state to the menu item.
     */
    selected?: boolean

    /**
     * The text label to display inside the menu item.
     */
    text?: ReactNode

    /**
     * The semantic color tone of the menu item.
     */
    tone?: ElementTone
  }

/**
 * Accepted values for the `as` prop of the {@link MenuItem} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `MenuItem`.
 *
 * @public
 */
export type MenuItemElementType = 'button' | 'a' | ComponentType

/**
 * Props for the {@link MenuItem} component.
 *
 * @remarks
 * Combines {@link MenuItemOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<button>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link MenuItemElementType}.
 *
 * @public
 */
export type MenuItemProps<E extends MenuItemElementType = MenuItemElementType> = Props<
  MenuItemOwnProps,
  E
>

/**
 * The `MenuItem` component represents a single actionable item within a {@link Menu}.
 *
 * @remarks
 * `MenuItem` renders a `<button>` element by default with `role="menuitem"`.
 * It supports text labels, leading and trailing icons, keyboard shortcut hints,
 * and integrates with the parent {@link Menu} context for focus management
 * and keyboard navigation.
 *
 * @public
 */
export function MenuItem<E extends MenuItemElementType = typeof DEFAULT_MENU_ITEM_ELEMENT>(
  props: MenuItemProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_MENU_ITEM_ELEMENT,
    children,
    disabled,
    fontSize = 1,
    gap,
    // gapX,
    // gapY,
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
        <Box flex={1}>
          <Text size={fontSize} textOverflow="ellipsis" weight="medium">
            {text}
          </Text>
        </Box>
      )}

      {hotkeys && (
        <Hotkeys
          className={selectable_hotkeys()}
          keys={hotkeys}
          // style={{marginTop: -4, marginBottom: -4}}
        />
      )}

      {IconRightComponent && (
        <Text flex="none" muted size={fontSize}>
          {isValidElement(IconRightComponent) && IconRightComponent}
          {isValidElementType(IconRightComponent) && <IconRightComponent />}
        </Text>
      )}

      {children}
    </Selectable>
  )
}
