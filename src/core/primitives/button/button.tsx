import {buttonLoadingBox, composeClassNames, ResponsiveProp} from '@sanity/ui/css'
import {button} from '@sanity/ui/css'
import {PaddingStyleProps, RadiusStyleProps} from '@sanity/ui/css'
import {Width} from '@sanity/ui/css'
import {FontTextSize, Space} from '@sanity/ui/theme'
import {forwardRef, isValidElement, useMemo} from 'react'
import {isValidElementType} from 'react-is'
import {useArrayProp} from '../../hooks'
import {useTheme_v2} from '../../theme'
import {ButtonMode, ButtonTextAlign, ButtonTone, FlexJustify} from '../../types'
import {Box} from '../box'
import {Flex} from '../flex'
import {Spinner} from '../spinner'
import {Text, TextProps} from '../text'

/**
 * @public
 */
export interface ButtonProps extends PaddingStyleProps, RadiusStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  fontSize?: ResponsiveProp<FontTextSize>
  mode?: ButtonMode
  icon?: React.ElementType | React.ReactNode
  iconRight?: React.ElementType | React.ReactNode
  justify?: ResponsiveProp<FlexJustify>
  /**
   * @beta Do not use in production, as this might change.
   */
  loading?: boolean
  selected?: boolean
  space?: ResponsiveProp<Space>
  textAlign?: ButtonTextAlign
  muted?: boolean
  text?: React.ReactNode
  textOverflow?: TextProps['textOverflow']
  textWeight?: TextProps['weight']
  tone?: ButtonTone
  type?: 'button' | 'reset' | 'submit'
  // width?: ButtonWidth
  width?: ResponsiveProp<Width>
}

/**
 * @public
 */
export const Button = forwardRef(function Button(
  props: ButtonProps & Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'width' | 'height' | 'wrap'>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const {
    as: As = 'button',
    children,
    className,
    disabled,
    fontSize = 1,
    icon: IconComponent,
    iconRight: IconRightComponent,
    justify: justifyProp = 'center',
    loading,
    mode = 'default',
    padding: paddingProp = 3,
    paddingX: paddingXProp,
    paddingY: paddingYProp,
    paddingTop: paddingTopProp,
    paddingBottom: paddingBottomProp,
    paddingLeft: paddingLeftProp,
    paddingRight: paddingRightProp,
    radius: radiusProp = 2,
    selected,
    space: spaceProp = 3,
    text,
    textAlign,
    textOverflow = 'ellipsis',
    textWeight,
    tone = 'default',
    type = 'button',
    muted = false,
    width,
    ...restProps
  } = props
  const {button: buttonTheme} = useTheme_v2()

  const justify = useArrayProp(justifyProp)
  const padding = useArrayProp(paddingProp)
  const paddingX = useArrayProp(paddingXProp)
  const paddingY = useArrayProp(paddingYProp)
  const paddingTop = useArrayProp(paddingTopProp)
  const paddingBottom = useArrayProp(paddingBottomProp)
  const paddingLeft = useArrayProp(paddingLeftProp)
  const paddingRight = useArrayProp(paddingRightProp)
  // const radius = useArrayProp(radiusProp)
  const space = useArrayProp(spaceProp)

  const boxProps = useMemo(
    () => ({
      // flex: 1,
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
    }),
    [padding, paddingX, paddingY, paddingTop, paddingBottom, paddingLeft, paddingRight],
  )

  return (
    <As
      data-ui="Button"
      {...restProps}
      // $mode={mode}
      // $radius={radius}
      // $tone={tone}
      className={composeClassNames(
        className,
        button({
          mode,
          radius: radiusProp,
          tone,
          width,
        }),
      )}
      data-disabled={Boolean(loading || disabled)}
      data-selected={selected ? '' : undefined}
      disabled={Boolean(loading || disabled)}
      ref={ref}
      type={type}
      // $width={width}
    >
      {Boolean(loading) && (
        <Box align="center" className={buttonLoadingBox()} display="flex" justify="center">
          <Spinner size={fontSize} />
        </Box>
      )}

      {(IconComponent || text || IconRightComponent) && (
        <Box as="span" {...boxProps}>
          <Flex as="span" justify={justify} gap={space}>
            {IconComponent && (
              <Text as="span" size={fontSize} style={{flex: 'none'}}>
                {isValidElement(IconComponent) && IconComponent}
                {isValidElementType(IconComponent) && <IconComponent />}
              </Text>
            )}

            {text && (
              <Box>
                <Text
                  as="span"
                  muted={muted}
                  align={textAlign}
                  size={fontSize}
                  textOverflow={textOverflow}
                  weight={textWeight ?? buttonTheme.textWeight}
                >
                  {text}
                </Text>
              </Box>
            )}

            {IconRightComponent && (
              <Text as="span" size={fontSize} style={{flex: 'none'}}>
                {isValidElement(IconRightComponent) && IconRightComponent}
                {isValidElementType(IconRightComponent) && <IconRightComponent />}
              </Text>
            )}
          </Flex>
        </Box>
      )}

      {children && (
        <Box as="span" {...boxProps}>
          {children}
        </Box>
      )}
    </As>
  )
})

Button.displayName = 'ForwardRef(Button)'
