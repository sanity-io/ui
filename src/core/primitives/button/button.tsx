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
import {type ElementType as ReactElementType, isValidElement, type ReactNode} from 'react'
import {isValidElementType} from 'react-is'

import type {ComponentType, Props} from '../../types'
import {Box} from '../box/box'
import {Spinner} from '../spinner/spinner'
import {Text, type TextOwnProps} from '../text/text'
import type {ButtonTextAlign} from './types'

/** @public */
export const DEFAULT_BUTTON_ELEMENT = 'button'

/** @public */
export type ButtonOwnProps = ButtonStyleProps &
  DisplayStyleProps &
  GapStyleProps &
  PaddingStyleProps & {
    'align'?: BoxStyleProps['alignItems']
    'data-ui'?: string
    'disabled'?: boolean
    'fontSize'?: ResponsiveProp<FontTextSize>
    'icon'?: ReactElementType | ReactNode
    'iconRight'?: ReactElementType | ReactNode
    'justify'?: BoxStyleProps['justifyContent']
    /** @beta Do not use in production, as this might change.*/
    'loading'?: boolean
    'selected'?: boolean
    'textAlign'?: ButtonTextAlign
    'muted'?: boolean
    'target'?: string
    'text'?: ReactNode
    'textOverflow'?: TextOwnProps['textOverflow']
    'textWeight'?: TextOwnProps['weight']
    'width'?: ResponsiveProp<Width>
  }

/** @public */
export type ButtonElementType = 'a' | 'button' | 'label' | ComponentType

/** @public */
export type ButtonProps<E extends ButtonElementType = ButtonElementType> = Props<ButtonOwnProps, E>

/** @public */
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
    gap = props.padding ?? 3,
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
      className={button({className, flex, mode, radius, tone, width})}
      data-disabled={loading || disabled ? '' : undefined}
      data-selected={selected ? '' : undefined}
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
