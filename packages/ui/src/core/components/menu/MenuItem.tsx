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

import {Box} from '../../primitives/box/Box'
import {Flex} from '../../primitives/flex/Flex'
import {Selectable} from '../../primitives/selectable/Selectable'
import {Text} from '../../primitives/text/Text'
import type {ComponentType, Props} from '../../types'
import {Hotkeys} from '../hotkeys/Hotkeys'
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
 * to provide spacing and visual control alongside menu-item-specific properties.
 *
 * @public
 */
export type MenuItemOwnProps = GapStyleProps &
  PaddingStyleProps &
  RadiusStyleProps & {
    /**
     * When `true`, disables the menu item, preventing click events and
     * applying a disabled visual state.
     */
    disabled?: boolean

    /**
     * Sets the font size of the menu item's text and icon content.
     *
     * @remarks
     * Uses the text font size scale defined by the theme. Supports responsive values.
     *
     * @defaultValue 1
     */
    fontSize?: ResponsiveProp<FontTextSize>

    /**
     * An array of keyboard shortcut keys to display alongside the menu item text.
     *
     * @remarks
     * When provided, renders a {@link Hotkeys} component to the right of the item
     * text showing the specified key combination (e.g. `["Ctrl", "S"]`).
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
     * When `true`, applies a pressed visual state to the menu item via the
     * `data-pressed` attribute.
     */
    pressed?: boolean

    /**
     * When `true`, applies a selected visual state to the menu item.
     *
     * @remarks
     * Note: Within a `Menu`, the `selected` prop is also used to determine which
     * item should receive initial focus when the menu opens. The internal `active`
     * state (managed by the menu controller) takes visual precedence over this
     * prop for highlighting the currently focused item.
     */
    selected?: boolean

    /**
     * The text label to display inside the menu item.
     *
     * @remarks
     * Rendered inside a {@link Text} component with `textOverflow="ellipsis"` and
     * `weight="medium"`. If both `text` and `children` are provided, `text` is
     * rendered with icon/hotkey layout and `children` is rendered in a separate
     * content area below.
     */
    text?: ReactNode

    /**
     * Sets the color tone of the menu item.
     *
     * @remarks
     * Controls the color scheme applied to the menu item's hover and active states.
     *
     * @defaultValue `"default"`
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
 * When `as="a"`, standard anchor attributes such as `href` and `target` become
 * available.
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
 * A selectable item within a {@link Menu} component.
 *
 * @remarks
 * The `MenuItem` component renders a single actionable entry in a menu list.
 * It supports text labels, leading and trailing icons, keyboard shortcut
 * indicators, and multiple color tones. The component integrates with the
 * parent `Menu`'s keyboard navigation and focus management system.
 *
 * Items are registered with the parent menu's controller on mount and
 * participate in arrow-key navigation, mouse-enter highlighting, and
 * click handling.
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
      radius={radius}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={onItemMouseEnter}
      onMouseLeave={onItemMouseLeave}
      ref={setRef}
      role={role}
      selected={active}
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
