import React, {forwardRef} from 'react'
import styled, {css} from 'styled-components'
import {rem, margin, padding, radius} from '../../styles'
import {ColorSchemeKey, Theme} from '../../theme'
import {BoxMarginProps, BoxPaddingProps} from '../box'
import {useCard} from '../card'
import {getResponsiveProp} from '../helpers'

interface TextInputProps extends BoxMarginProps, BoxPaddingProps {
  muted?: boolean
  radius?: number | number[]
  size?: number | number[]
  weight?: string
}

function textInputBase() {
  return css`
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: ${rem(1)} 0;
    overflow: hidden;
  `
}

function textInputColor({
  disabled,
  scheme,
  theme,
}: {
  disabled: boolean
  scheme: ColorSchemeKey
  theme: Theme
}) {
  const tone = theme.color[scheme].input.tones.default

  if (disabled) {
    return css`
      background-color: ${tone.disabled.bg};
      box-shadow: inset 0 0 0 1px ${tone.disabled.border};

      & > input {
        color: ${tone.disabled.fg};

        &::placeholder {
          color: ${tone.disabled.placeholder};
        }
      }
    `
  }

  return css`
    background-color: ${tone.enabled.bg};
    box-shadow: inset 0 0 0 1px ${tone.enabled.border};

    & > input {
      color: ${tone.enabled.fg};

      &::placeholder {
        color: ${tone.enabled.placeholder};
      }
    }

    @media (hover: hover) {
      &:hover {
        background-color: ${tone.hovered.bg};
        box-shadow: inset 0 0 0 1px ${tone.hovered.border};

        & > input {
          color: ${tone.hovered.fg};

          &::placeholder {
            color: ${tone.hovered.placeholder};
          }
        }
      }
    }

    &:focus-within {
      box-shadow: 0 0 0 2px var(--card-focus-ring-color);
    }
  `
}

const Root = styled.span<{disabled?: boolean; scheme: ColorSchemeKey; uiRadius: number[]}>(
  textInputBase,
  textInputColor as any,
  margin,
  radius as any
)

function inputSize(props: {uiSize: number[]; theme: Theme}) {
  const {theme} = props
  const size = theme.fonts.text.sizes[props.uiSize[0]]

  return css`
    margin-top: ${rem(0 - size.ascenderHeight - 1)};
    margin-bottom: ${rem(0 - size.descenderHeight - 1)};
    font-size: ${rem(size.fontSize)};
    line-height: ${size.lineHeight / size.fontSize};
  `
}

const Input = styled.input<{uiSize: number[]; weight?: string}>(({theme, weight}) => {
  const font = theme.fonts.text

  return css`
    display: block;
    appearance: none;
    color: inherit;
    background: none;
    border: 0;
    border-radius: 0;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    font-family: ${font.family};
    font-weight: ${font.weights[weight || 'regular']};
    margin: 0;

    ${padding}
    ${inputSize as any}
  `
})

export const TextInput = forwardRef(
  (
    props: TextInputProps & Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const {
      disabled,
      margin,
      marginX,
      marginY,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      padding = [3],
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      radius = [1],
      size: sizeProp = [2],
      ...restProps
    } = props

    const card = useCard()

    const marginProps = {
      margin: getResponsiveProp(margin),
      marginX: getResponsiveProp(marginX),
      marginY: getResponsiveProp(marginY),
      marginTop: getResponsiveProp(marginTop),
      marginBottom: getResponsiveProp(marginBottom),
      marginLeft: getResponsiveProp(marginLeft),
      marginRight: getResponsiveProp(marginRight),
    }

    const paddingProps = {
      padding: getResponsiveProp(padding),
      paddingX: getResponsiveProp(paddingX),
      paddingY: getResponsiveProp(paddingY),
      paddingTop: getResponsiveProp(paddingTop),
      paddingBottom: getResponsiveProp(paddingBottom),
      paddingLeft: getResponsiveProp(paddingLeft),
      paddingRight: getResponsiveProp(paddingRight),
    }

    const uiSize = getResponsiveProp(sizeProp)

    const uiRadius = getResponsiveProp(radius)

    return (
      <Root {...marginProps} disabled={disabled} scheme={card.scheme} uiRadius={uiRadius}>
        <Input
          {...restProps}
          {...paddingProps}
          disabled={disabled}
          ref={ref}
          type="text"
          uiSize={uiSize}
        />
      </Root>
    )
  }
)

TextInput.displayName = 'TextInput'
