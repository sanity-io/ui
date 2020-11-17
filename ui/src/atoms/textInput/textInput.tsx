import React, {createElement, forwardRef} from 'react'
import {isValidElementType} from 'react-is'
import styled, {css} from 'styled-components'
import {
  responsiveRadiusStyle,
  ResponsiveRadiusProps,
  responsiveInputPaddingStyle,
  textInputStyle,
} from '../../styles'
import {ColorSchemeKey, Theme} from '../../theme'
import {Box} from '../box'
import {useCard} from '../card'
import {Icon, IconSymbol} from '../icon'
import {Text} from '../text'

interface TextInputProps extends ResponsiveRadiusProps {
  border?: boolean
  icon?: IconSymbol | React.ComponentType
  iconRight?: IconSymbol | React.ComponentType
  padding?: number | number[]
  size?: number | number[]
  space?: number | number[]
  type?:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'tel'
    | 'time'
    | 'text'
    | 'week'
  weight?: string
}

const Root = styled.span<
  {
    border: boolean
    disabled: boolean
    scheme: ColorSchemeKey
  } & ResponsiveRadiusProps
>(responsiveRadiusStyle, textInputStyle.root)

const Input = styled.input<{
  padding?: number | number[]
  iconLeft?: boolean
  iconRight?: boolean
  space?: number | number[]
  uiSize: number | number[]
  weight?: string
}>(responsiveInputPaddingStyle, textInputStyle.input)

const IconContainer = styled.div(({scheme, theme}: {scheme: ColorSchemeKey; theme: Theme}) => {
  const _scheme = theme.color[scheme] || theme.color.light
  const tone = _scheme.input.tones.default

  return css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    color: ${tone.enabled.fg};

    @media (hover: hover) {
      input:not(:disabled):hover + & {
        color: ${tone.hovered.fg};
      }
    }

    input:disabled + & {
      color: ${tone.disabled.fg};
    }
  `
})

const IconLeftBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
`

const IconRightBox = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
`

export const TextInput = forwardRef(
  (
    props: TextInputProps & Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'size'>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const {
      border = true,
      disabled = false,
      icon,
      iconRight,
      padding = 3,
      radius = 1,
      size = 2,
      space = 3,
      type = 'text',
      ...restProps
    } = props
    const {scheme} = useCard()

    return (
      <Root border={border} disabled={disabled} scheme={scheme} radius={radius}>
        <Input
          {...restProps}
          disabled={disabled}
          iconLeft={Boolean(icon)}
          iconRight={Boolean(iconRight)}
          padding={padding}
          ref={ref}
          space={space}
          type={type}
          uiSize={size}
        />

        {(icon || iconRight) && (
          <IconContainer scheme={scheme}>
            {icon && (
              <IconLeftBox padding={padding}>
                <Text size={size}>
                  {typeof icon === 'string' && <Icon symbol={icon} />}
                  {typeof icon !== 'string' && isValidElementType(icon) && createElement(icon)}
                </Text>
              </IconLeftBox>
            )}

            {iconRight && (
              <IconRightBox padding={padding}>
                <Text size={size}>
                  {typeof iconRight === 'string' && <Icon symbol={iconRight} />}
                  {typeof iconRight !== 'string' &&
                    isValidElementType(iconRight) &&
                    createElement(iconRight)}
                </Text>
              </IconRightBox>
            )}
          </IconContainer>
        )}
      </Root>
    )
  }
)

TextInput.displayName = 'TextInput'
