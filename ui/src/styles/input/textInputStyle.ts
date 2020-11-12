import {css, CSSObject} from 'styled-components'
import {ColorSchemeKey, Theme} from '../../theme'
import {getResponsiveProp, rem, responsive} from '../helpers'

const root = (): CSSObject => ({
  display: 'block',
  position: 'relative',
})

export const textInputStyle = {
  root,
  color: textInputColorStyle,
  inputBase,
  inputSize,
}

function textInputColorStyle({
  border,
  disabled,
  scheme,
  theme,
}: {
  border: boolean
  disabled: boolean
  scheme: ColorSchemeKey
  theme: Theme
}) {
  const _scheme = theme.color[scheme] || theme.color.light
  const tone = _scheme.input.tones.default

  if (disabled) {
    return css`
      background-color: ${tone.disabled.bg};

      ${border &&
      css`
        box-shadow: inset 0 0 0 1px ${tone.disabled.border};
      `}

      & > input,
      & > textarea {
        color: ${tone.disabled.fg};

        &::placeholder {
          color: ${tone.disabled.placeholder};
        }
      }
    `
  }

  return css`
    background-color: ${tone.enabled.bg};

    ${border &&
    css`
      box-shadow: inset 0 0 0 1px ${tone.enabled.border};
    `}

    & > input,
    & > textarea {
      color: ${tone.enabled.fg};

      &::placeholder {
        color: ${tone.enabled.placeholder};
      }
    }

    @media (hover: hover) {
      &:hover {
        background-color: ${tone.hovered.bg};

        ${border &&
        css`
          box-shadow: inset 0 0 0 1px ${tone.hovered.border};
        `}

        & > input,
        & > textarea {
          color: ${tone.hovered.fg};

          &::placeholder {
            color: ${tone.hovered.placeholder};
          }
        }
      }
    }

    &:focus-within {
      box-shadow: 0 0 0 1px var(--card-bg-color), 0 0 0 3px var(--card-focus-ring-color);
    }
  `
}

function inputBase(props: {theme: Theme; weight?: string}) {
  const {theme, weight} = props
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

    &:is(textarea) {
      resize: none;
    }
  `
}

function inputSize(props: {theme: Theme; uiSize: number | number[]}) {
  const {theme} = props

  return responsive(
    theme.media,
    getResponsiveProp(props.uiSize, [2]).map((sizeIndex) => {
      const size = theme.fonts.text.sizes[sizeIndex]

      return {
        fontSize: rem(size.fontSize),
        lineHeight: size.lineHeight / size.fontSize,
      }
    })
  )
}
