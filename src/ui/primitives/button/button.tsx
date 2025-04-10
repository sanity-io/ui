import {
  button,
  buttonLoadingBox,
  ButtonStyleProps,
  composeClassNames,
  DisplayStyleProps,
  FlexStyleProps,
  GapStyleProps,
  PaddingStyleProps,
  ResponsiveProp,
  Width,
} from '@sanity/ui/css'
import {FontTextSize, Space} from '@sanity/ui/theme'
import {ElementType, ForwardedRef, forwardRef, isValidElement, ReactNode} from 'react'
import {isValidElementType} from 'react-is'

import {useTheme_v2} from '../../_compat'
import {ButtonMode, ButtonTextAlign, ButtonTone, Props} from '../../types'
import {Box} from '../box'
import {Spinner} from '../spinner'
import {Text, TextProps} from '../text'

/**
 * @public
 */
export interface ButtonProps
  extends ButtonStyleProps,
    DisplayStyleProps,
    FlexStyleProps,
    GapStyleProps,
    PaddingStyleProps {
  'data-ui'?: string
  'fontSize'?: ResponsiveProp<FontTextSize>
  'href'?: string
  'mode'?: ButtonMode
  'icon'?: ElementType | ReactNode
  'iconRight'?: ElementType | ReactNode
  /** @beta Do not use in production, as this might change.*/
  'loading'?: boolean
  'selected'?: boolean
  /** @deprecated Use `gap` instead. */
  'space'?: ResponsiveProp<Space>
  'textAlign'?: ButtonTextAlign
  'muted'?: boolean
  'target'?: string
  'text'?: ReactNode
  'textOverflow'?: TextProps['textOverflow']
  'textWeight'?: TextProps['weight']
  'tone'?: ButtonTone
  'type'?: 'button' | 'reset' | 'submit'
  'width'?: ResponsiveProp<Width>
}

/**
 * @public
 */
export const Button = forwardRef(function Button(
  props: Props<ButtonProps, 'button'>,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const {
    align = 'center',
    as: As = 'button',
    children,
    className,
    direction,
    disabled,
    display = 'inline-flex',
    flex,
    fontSize = 1,
    gap = props.space ?? props.padding ?? 3,
    gapX,
    gapY,
    href,
    icon: IconComponent,
    iconRight: IconRightComponent,
    justify = 'center',
    loading,
    mode = 'default',
    padding = 3,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    radius = 2,
    selected,
    space = props.gap ?? props.space ?? props.padding ?? 3, // eslint-disable-line @typescript-eslint/no-unused-vars
    text,
    textAlign,
    textOverflow = 'ellipsis',
    textWeight,
    tone = 'default',
    type = 'button',
    muted = false,
    width,
    wrap,
    ...restProps
  } = props
  const {button: buttonTheme} = useTheme_v2()

  return (
    <As
      data-ui="Button"
      {...restProps}
      className={composeClassNames(className, button({display, flex, mode, radius, tone, width}))}
      data-disabled={loading || disabled ? '' : undefined}
      data-selected={selected ? '' : undefined}
      disabled={Boolean(loading || disabled)}
      href={disabled ? undefined : href}
      ref={ref}
      type={type}
    >
      {Boolean(loading) && (
        <Box
          align={align}
          as="span"
          className={buttonLoadingBox()}
          display="flex"
          flex={1}
          justify={justify}
          width="fill"
        >
          <Spinner size={fontSize} />
        </Box>
      )}

      {(IconComponent || text || IconRightComponent) && (
        <Box
          as="span"
          direction={direction}
          display="flex"
          flex={1}
          gap={gap}
          gapX={gapX}
          gapY={gapY}
          justify={justify}
          padding={padding}
          paddingX={paddingX}
          paddingY={paddingY}
          paddingTop={paddingTop}
          paddingBottom={paddingBottom}
          paddingLeft={paddingLeft}
          paddingRight={paddingRight}
          width="fill"
          wrap={wrap}
        >
          {IconComponent && (
            <Text as="span" flex="none" muted size={fontSize}>
              {isValidElement(IconComponent) && IconComponent}
              {isValidElementType(IconComponent) && <IconComponent />}
            </Text>
          )}

          {text && (
            <Text
              align={textAlign}
              as="span"
              flex="none"
              muted={muted}
              size={fontSize}
              textOverflow={textOverflow}
              weight={textWeight ?? buttonTheme.textWeight}
            >
              {text}
            </Text>
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
          direction={direction}
          display="flex"
          flex={1}
          gap={gap}
          gapX={gapX}
          gapY={gapY}
          padding={padding}
          paddingX={paddingX}
          paddingY={paddingY}
          paddingTop={paddingTop}
          paddingBottom={paddingBottom}
          paddingLeft={paddingLeft}
          paddingRight={paddingRight}
          width="fill"
          wrap={wrap}
        >
          {children}
        </Box>
      )}
    </As>
  )
})

Button.displayName = 'ForwardRef(Button)'
