import type {
  BoxStyleProps,
  ButtonStyleProps,
  DisplayStyleProps,
  GapStyleProps,
  PaddingStyleProps,
  ResponsiveProp,
  Width,
} from '@sanity/ui/css'
import {button, buttonLoadingBox} from '@sanity/ui/css'
import type {FontTextSize} from '@sanity/ui/theme'
import {isValidElement} from 'react'
import {isValidElementType} from 'react-is'

import type {ComponentType, Props} from '../../types'
import {Box} from '../box/Box'
import {Spinner} from '../spinner/Spinner'
import {Text, type TextOwnProps} from '../text/Text'
import type {ButtonTextAlign} from './types'

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
 * Extends {@link ButtonStyleProps}, {@link DisplayStyleProps}, {@link GapStyleProps},
 * and {@link PaddingStyleProps} to combine visual button styling with layout capabilities.
 *
 * @public
 */
export type ButtonOwnProps = ButtonStyleProps &
  DisplayStyleProps &
  GapStyleProps &
  PaddingStyleProps & {
    /**
     * Controls alignment of the button's content along the cross axis.
     *
     * @remarks
     * Maps to the flex container's `align-items` property applied to the inner content wrapper.
     * Supports responsive values.
     *
     * @defaultValue `"center"`
     */
    align?: BoxStyleProps['alignItems']

    /**
     * Overrides the default `data-ui` attribute value on the rendered element.
     *
     * @defaultValue `"Button"`
     */
    'data-ui'?: string

    /**
     * When `true`, disables the button, preventing user interaction and
     * applying a disabled visual state.
     */
    disabled?: boolean

    /**
     * Sets the font size of the button's text and icon content.
     *
     * @remarks
     * Uses the text font size scale defined by the theme. Supports responsive values.
     *
     * @defaultValue 1
     */
    fontSize?: ResponsiveProp<FontTextSize>

    /**
     * An icon to render on the leading (left) side of the button content.
     *
     * @remarks
     * Accepts either a React component type (rendered as `<IconComponent />`) or
     * a React element (rendered as-is).
     */
    icon?: React.ElementType | React.ReactNode

    /**
     * An icon to render on the trailing (right) side of the button content.
     *
     * @remarks
     * Accepts either a React component type (rendered as `<IconComponent />`) or
     * a React element (rendered as-is).
     */
    iconRight?: React.ElementType | React.ReactNode

    /**
     * Controls distribution of the button's content along the main axis.
     *
     * @remarks
     * Maps to the flex container's `justify-content` property applied to the inner content wrapper.
     * Supports responsive values.
     *
     * @defaultValue `"center"`
     */
    justify?: BoxStyleProps['justifyContent']

    /**
     * When `true`, renders a loading spinner overlay on the button and
     * disables user interaction. The button's content is visually hidden
     * behind the spinner.
     */
    loading?: boolean

    /**
     * When `true`, applies a selected visual state to the button.
     */
    selected?: boolean

    /**
     * Controls the horizontal alignment of the button's text content.
     */
    textAlign?: ButtonTextAlign

    /**
     * When `true`, reduces the visual prominence of the button's text
     * by applying a muted foreground color from the theme.
     *
     * @defaultValue false
     */
    muted?: boolean

    /**
     * Specifies the browsing context for the link when `as="a"`.
     *
     * @remarks
     * Standard HTML anchor `target` attribute. Only meaningful when
     * the button renders as an anchor element.
     */
    target?: string

    /**
     * The text label to display inside the button.
     *
     * @remarks
     * When provided, the text is rendered inside a {@link Text} component.
     * If both `text` and `children` are provided, they are rendered in
     * separate layout containers within the button.
     */
    text?: React.ReactNode

    /**
     * Controls how overflowing text is treated within the button.
     *
     * @defaultValue `"ellipsis"`
     */
    textOverflow?: TextOwnProps['textOverflow']

    /**
     * Sets the font weight of the button's text content.
     *
     * @defaultValue `"medium"`
     */
    textWeight?: TextOwnProps['weight']

    /**
     * Sets the width of the button.
     *
     * @remarks
     * Uses the width scale from the theme. Supports responsive values.
     */
    width?: ResponsiveProp<Width>
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
  const {
    align = 'center',
    as: Element = DEFAULT_BUTTON_ELEMENT,
    children,
    className,
    disabled,
    flex,
    fontSize = 1,
    gap: _gap,
    gapX,
    gapY,
    icon: IconComponent,
    iconRight: IconRightComponent,
    justify = 'center',
    loading,
    mode = 'default',
    muted = false,
    padding = 3,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    radius = 2,
    selected,
    text,
    textAlign,
    textOverflow = 'ellipsis',
    textWeight = 'medium',
    tone = 'default',
    type = 'button',
    width,
    ...rest
  } = props as ButtonProps<typeof DEFAULT_BUTTON_ELEMENT>
  const gap = _gap ?? props.padding ?? 3

  let href: string | undefined = undefined

  if ('href' in rest) {
    href = typeof rest.href === 'string' ? rest.href : href
    delete rest.href
  }

  return (
    <Element
      data-ui="Button"
      {...rest}
      className={button({className, flex, mode, radius, tone, width})}
      data-disabled={loading || disabled ? '' : props['data-disabled']}
      data-selected={selected ? '' : props['data-selected']}
      disabled={Boolean(loading || disabled)}
      // @ts-expect-error - TODO: fix this
      href={disabled ? undefined : href}
      type={type}
    >
      {Boolean(loading) && (
        <Box
          alignItems="center"
          as="span"
          className={buttonLoadingBox()}
          display="flex"
          flex={1}
          justifyContent="center"
          width="fill"
        >
          <Spinner size={fontSize} />
        </Box>
      )}

      {(IconComponent || text || IconRightComponent) && (
        <Box
          alignItems={align}
          as="span"
          display="flex"
          flex={1}
          gap={gap}
          gapX={gapX}
          gapY={gapY}
          justifyContent={justify}
          padding={padding}
          paddingX={paddingX}
          paddingY={paddingY}
          paddingTop={paddingTop}
          paddingBottom={paddingBottom}
          paddingLeft={paddingLeft}
          paddingRight={paddingRight}
        >
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

          {IconRightComponent && (
            <Text as="span" flex="none" muted size={fontSize}>
              {isValidElement(IconRightComponent) && IconRightComponent}
              {isValidElementType(IconRightComponent) && <IconRightComponent />}
            </Text>
          )}
        </Box>
      )}

      {children && (
        <Box
          as="span"
          flex={1}
          padding={padding}
          paddingX={paddingX}
          paddingY={paddingY}
          paddingTop={paddingTop}
          paddingBottom={paddingBottom}
          paddingLeft={paddingLeft}
          paddingRight={paddingRight}
        >
          {children}
        </Box>
      )}
    </Element>
  )
}
