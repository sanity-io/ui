import {_splitKeys, type ComponentType, type Props} from '@sanity/ui/core'
import {
  button,
  button_loadingBox,
  BUTTON_STYLE_PROP_KEYS,
  type ButtonStyleProps,
  type ResponsiveProp,
} from '@sanity/ui/css'
import {Box} from '@sanity/ui/primitives/box'
import {Spinner} from '@sanity/ui/primitives/spinner'
import {Text, type TextOwnProps} from '@sanity/ui/primitives/text'
import type {TooltipProps} from '@sanity/ui/primitives/tooltip'
import type {FontTextSize} from '@sanity/ui/theme'
import {isValidElement, Suspense} from 'react'
import {isValidElementType} from 'react-is'

import {LazyTooltip} from './LazyTooltip'

/**
 * The default HTML element type rendered by the {@link Button} component.
 *
 * @public
 */
export const DEFAULT_BUTTON_ELEMENT = 'button'

/**
 * Own props for the {@link Button} component.
 *
 * @remarks
 * Extends {@link ButtonStyleProps} to combine visual button styling with
 * interactive and content-related capabilities.
 *
 * @public
 */
export interface ButtonOwnProps extends ButtonStyleProps {
  /**
   * Overrides the default `data-ui` attribute value on the rendered element.
   */
  'data-ui'?: string

  /**
   * Sets the font size of the button's text and icon content.
   *
   * @remarks
   * Uses the text font size scale defined by the theme. Supports responsive values.
   */
  'fontSize'?: ResponsiveProp<FontTextSize>

  /**
   * An icon to render on the leading (left) side of the button content.
   *
   * @remarks
   * Accepts either a React component type (rendered as `<IconComponent />`) or
   * a React element (rendered as-is).
   */
  'icon'?: React.ElementType | React.ReactNode

  /**
   * An icon to render on the trailing (right) side of the button content.
   *
   * @remarks
   * Accepts either a React component type (rendered as `<IconComponent />`) or
   * a React element (rendered as-is).
   */
  'iconRight'?: React.ElementType | React.ReactNode

  /**
   * When `true`, renders a loading spinner overlay on the button and
   * disables user interaction. The button's content is visually hidden
   * behind the spinner.
   *
   * @beta Do not use in production, as this might change.
   */
  'loading'?: boolean

  /**
   * When `true`, reduces the visual prominence of the button's text
   * by applying a muted foreground color from the theme.
   */
  'muted'?: boolean

  /**
   * When `true`, applies a selected visual state to the button.
   */
  'selected'?: boolean

  /**
   * Controls the horizontal alignment of the button's text content.
   */
  'textAlign'?: TextOwnProps['align']

  /**
   * The text label to display inside the button.
   *
   * @remarks
   * When provided, the text is rendered inside a {@link Text} component.
   */
  'text'?: React.ReactNode

  /**
   * Controls how overflowing text is treated within the button.
   */
  'textOverflow'?: TextOwnProps['textOverflow']

  /**
   * Sets the font weight of the button's text content.
   */
  'textWeight'?: TextOwnProps['weight']

  /**
   * Configures a {@link Tooltip} to display when hovering the button.
   *
   * @remarks
   * Accepts all {@link TooltipProps} except `as` and `children`, which are
   * managed internally.
   */
  'tooltip'?: Omit<TooltipProps<'div'>, 'as' | 'children'>
}

/**
 * Accepted values for the `as` prop of the {@link Button} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Button`.
 *
 * @public
 */
export type ButtonElementType = 'a' | 'button' | 'label' | ComponentType

/**
 * Props for the {@link Button} component.
 *
 * @remarks
 * Combines {@link ButtonOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link ButtonElementType}.
 *
 * @public
 */
export type ButtonProps<E extends ButtonElementType = ButtonElementType> = Props<ButtonOwnProps, E>

/**
 * A clickable button component that supports text labels, icons, loading states,
 * multiple visual modes, and color tones.
 *
 * @remarks
 * The `Button` component renders a `<button>` element by default and can be
 * configured to render as an `<a>`, `<label>`, or custom component via the `as` prop.
 *
 * It supports leading and trailing icons, text labels, loading spinners, and
 * multiple visual modes (`"default"`, `"ghost"`, `"bleed"`) combined with
 * semantic color tones.
 *
 * @public
 */
export function Button<E extends ButtonElementType = typeof DEFAULT_BUTTON_ELEMENT>(
  props: ButtonProps<E>,
): React.JSX.Element {
  const [
    styleProps,
    {
      as: Element = DEFAULT_BUTTON_ELEMENT,
      children,
      disabled,
      fontSize = 1,
      icon: IconComponent,
      iconRight: IconRightComponent,
      loading,
      muted,
      selected,
      text,
      textAlign,
      textOverflow = 'ellipsis',
      textWeight = 'medium',
      tooltip,
      type = 'button',
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as ButtonProps<typeof DEFAULT_BUTTON_ELEMENT>, BUTTON_STYLE_PROP_KEYS)

  let href: string | undefined = undefined

  if ('href' in domProps) {
    href = typeof domProps.href === 'string' ? domProps.href : href
    delete domProps.href
  }

  const node = (
    <Element
      data-ui="Button"
      {...domProps}
      className={button(styleProps)}
      data-disabled={loading || disabled ? '' : props['data-disabled']}
      data-selected={selected ? '' : props['data-selected']}
      disabled={Boolean(loading || disabled)}
      // WORKAROUND: Since `a` elements don't support the `disabled` prop,
      // we need to remove the `href` prop from the DOM props when the button is disabled.
      // @ts-expect-error - the default element is a `button` and does not have a `href` prop
      href={disabled ? undefined : href}
      type={type}
    >
      {Boolean(loading) && (
        <Box
          alignItems="center"
          as="span"
          className={button_loadingBox()}
          display="flex"
          flex={1}
          justifyContent="center"
          width="fill"
        >
          <Spinner size={fontSize} />
        </Box>
      )}

      {IconComponent && (
        <Text as="span" flex="none" muted size={fontSize}>
          {isValidElement(IconComponent) && IconComponent}
          {isValidElementType(IconComponent) && <IconComponent />}
        </Text>
      )}

      {text && (
        <Box as="span" maxWidth="auto">
          <Text
            align={textAlign}
            as="span"
            muted={muted}
            size={fontSize}
            textOverflow={textOverflow}
            weight={textWeight}
          >
            {text}
          </Text>
        </Box>
      )}

      {children}

      {IconRightComponent && (
        <Text as="span" flex="none" muted size={fontSize}>
          {isValidElement(IconRightComponent) && IconRightComponent}
          {isValidElementType(IconRightComponent) && <IconRightComponent />}
        </Text>
      )}
    </Element>
  )

  if (tooltip) {
    return (
      <Suspense fallback={node}>
        <LazyTooltip {...tooltip}>{node}</LazyTooltip>
      </Suspense>
    )
  }

  return node
}
