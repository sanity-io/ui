import {ThemeFontWeightKey} from '@sanity/ui/theme'
import {forwardRef, isValidElement, useMemo} from 'react'
import {isValidElementType} from 'react-is'
import {styled} from 'styled-components'

import {useArrayProp} from '../../hooks'
import {ThemeProps} from '../../styles'
import {responsiveRadiusStyle, ResponsiveRadiusStyleProps} from '../../styles/internal'
import {useTheme_v2} from '../../theme'
import {ButtonMode, ButtonTextAlign, ButtonTone, ButtonWidth, FlexJustify} from '../../types'
import {Box} from '../box'
import {Flex} from '../flex'
import {Spinner} from '../spinner'
import {Text} from '../text'
import {ResponsivePaddingProps, ResponsiveRadiusProps} from '../types'
import {buttonBaseStyles, buttonColorStyles} from './styles'

/**
 * @public
 */
export interface ButtonProps extends ResponsivePaddingProps, ResponsiveRadiusProps {
  as?: React.ElementType | keyof React.JSX.IntrinsicElements
  fontSize?: number | number[]
  mode?: ButtonMode
  icon?: React.ElementType | React.ReactNode
  iconRight?: React.ElementType | React.ReactNode
  justify?: FlexJustify | FlexJustify[]
  /**
   * @beta Do not use in production, as this might change.
   */
  loading?: boolean
  selected?: boolean
  space?: number | number[]
  muted?: boolean
  text?: React.ReactNode
  textAlign?: ButtonTextAlign
  textWeight?: ThemeFontWeightKey
  tone?: ButtonTone
  type?: 'button' | 'reset' | 'submit'
  width?: ButtonWidth
}

const StyledButton = styled.button<
  {$mode: ButtonMode; $tone: ButtonTone; $width?: ButtonWidth} & ResponsiveRadiusStyleProps &
    ThemeProps
>(responsiveRadiusStyle, buttonBaseStyles, buttonColorStyles)

const LoadingBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--card-bg-color);
  border-radius: inherit;
  z-index: 1;
  box-shadow: inherit;
`

/**
 * @public
 */
export const Button = forwardRef(function Button(
  props: ButtonProps & Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'width'>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const {
    children,
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
    textWeight,
    tone = 'default',
    type = 'button',
    muted = false,
    width,
    ...restProps
  } = props
  const {button} = useTheme_v2()

  const justify = useArrayProp(justifyProp)
  const padding = useArrayProp(paddingProp)
  const paddingX = useArrayProp(paddingXProp)
  const paddingY = useArrayProp(paddingYProp)
  const paddingTop = useArrayProp(paddingTopProp)
  const paddingBottom = useArrayProp(paddingBottomProp)
  const paddingLeft = useArrayProp(paddingLeftProp)
  const paddingRight = useArrayProp(paddingRightProp)
  const radius = useArrayProp(radiusProp)
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
    <StyledButton
      data-ui="Button"
      {...restProps}
      $mode={mode}
      $radius={radius}
      $tone={tone}
      data-disabled={Boolean(loading || disabled)}
      data-selected={selected ? '' : undefined}
      disabled={Boolean(loading || disabled)}
      ref={ref}
      type={type}
      $width={width}
    >
      {Boolean(loading) && (
        <LoadingBox>
          <Spinner />
        </LoadingBox>
      )}

      {(IconComponent || text || IconRightComponent) && (
        <Box as="span" {...boxProps}>
          <Flex as="span" justify={justify} gap={space}>
            {IconComponent && (
              <Text size={fontSize}>
                {isValidElement(IconComponent) && IconComponent}
                {isValidElementType(IconComponent) && <IconComponent />}
              </Text>
            )}

            {text && (
              <Box>
                <Text
                  muted={muted}
                  align={textAlign}
                  size={fontSize}
                  textOverflow="ellipsis"
                  weight={textWeight ?? button.textWeight}
                >
                  {text}
                </Text>
              </Box>
            )}

            {IconRightComponent && (
              <Text size={fontSize}>
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
    </StyledButton>
  )
})
Button.displayName = 'ForwardRef(Button)'
