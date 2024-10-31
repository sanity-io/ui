import type {
  ButtonStyleProps,
  DisplayStyleProps,
  FlexStyleProps,
  GapStyleProps,
  PaddingStyleProps,
  ResponsiveProp,
  Width,
} from '@sanity/ui/css'
import {_composeClassNames, button, buttonLoadingBox} from '@sanity/ui/css'
import type {
  FontTextSize,
  Space,
  ThemeColorButtonModeKey,
  ThemeColorStateToneKey,
} from '@sanity/ui/theme'
import {type ElementType as ReactElementType, isValidElement, type ReactNode} from 'react'
import {isValidElementType} from 'react-is'

import type {ButtonTextAlign, ComponentType, Props} from '../../types'
import {Box} from '../box'
import {Spinner} from '../spinner'
import type {TextOwnProps} from '../text'
import {Text} from '../text'

/** @public */
export const DEFAULT_BUTTON_ELEMENT = 'button'

/** @public */
export type ButtonOwnProps = ButtonStyleProps &
  DisplayStyleProps &
  GapStyleProps &
  PaddingStyleProps & {
    'align'?: FlexStyleProps['align']
    'data-ui'?: string
    'disabled'?: boolean
    'fontSize'?: ResponsiveProp<FontTextSize>
    'mode'?: ThemeColorButtonModeKey
    'icon'?: ReactElementType | ReactNode
    'iconRight'?: ReactElementType | ReactNode
    'justify'?: FlexStyleProps['justify']
    /** @beta Do not use in production, as this might change.*/
    'loading'?: boolean
    'selected'?: boolean
    /** @deprecated Use `gap` instead. */
    'space'?: ResponsiveProp<Space>
    'textAlign'?: ButtonTextAlign
    'muted'?: boolean
    'target'?: string
    'text'?: ReactNode
    'textOverflow'?: TextOwnProps['textOverflow']
    'textWeight'?: TextOwnProps['weight']
    'tone'?: ThemeColorStateToneKey
    'width'?: ResponsiveProp<Width>
  }

/** @public */
export type ButtonElementType = 'a' | 'button' | 'label' | ComponentType

/** @public */
export type ButtonProps<E extends ButtonElementType = ButtonElementType> = Props<ButtonOwnProps, E>

/** @public */
export function Button<E extends ButtonElementType = typeof DEFAULT_BUTTON_ELEMENT>(
  props: ButtonProps<E>,
) {
  const {
    align = 'center',
    as: Element = DEFAULT_BUTTON_ELEMENT,
    children,
    className,
    disabled,
    display = 'inline-flex',
    flex,
    fontSize = 1,
    gap = props.space ?? props.padding ?? 3,
    gapX,
    gapY,
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
    textWeight = 'medium',
    tone = 'default',
    type = 'button',
    muted = false,
    width,
    ...rest
  } = props as ButtonProps<typeof DEFAULT_BUTTON_ELEMENT>

  let href: string | undefined = undefined

  if ('href' in rest) {
    href = typeof rest.href === 'string' ? rest.href : href
    delete rest.href
  }

  return (
    <Element
      data-ui="Button"
      {...rest}
      className={_composeClassNames(className, button({display, flex, radius, width}))}
      data-disabled={loading || disabled ? '' : undefined}
      data-mode={mode}
      data-tone={tone}
      data-selected={selected ? '' : undefined}
      disabled={Boolean(loading || disabled)}
      // @ts-expect-error - TODO: fix this
      href={disabled ? undefined : href}
      type={type}
    >
      {Boolean(loading) && (
        <Box
          align="center"
          as="span"
          className={buttonLoadingBox()}
          display="flex"
          flex={1}
          justify="center"
          width="fill"
        >
          <Spinner size={fontSize} />
        </Box>
      )}

      {(IconComponent || text || IconRightComponent) && (
        <Box
          align={align}
          as="span"
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
              weight={textWeight}
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

Button.displayName = 'Button'
