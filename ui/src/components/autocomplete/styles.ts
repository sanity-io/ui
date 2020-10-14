import styled, {css} from 'styled-components'
import {Card} from '../../atoms'
import {ColorSchemeKey, Theme} from '../../theme'

export const Root = styled.div`
  position: relative;
`

export const SearchField = styled.div<{
  radius?: number
  scheme: ColorSchemeKey
  shadow: number
}>((props: {scheme: ColorSchemeKey; theme: Theme}) => {
  const {scheme, theme} = props
  const tone = theme.color[scheme].input.tones.default

  return css`
    background-color: ${tone.enabled.bg};
    color: ${tone.enabled.fg};
    box-shadow: inset 0 0 0 1px ${tone.enabled.border};
    border-radius: ${theme.radius[2]}px;

    @media (hover: hover) {
      &:hover {
        background-color: ${tone.hovered.bg};
        box-shadow: inset 0 0 0 1px ${tone.hovered.border};
      }
    }
  `
})

export const ListBoxContainer = styled.div`
  position: relative;
`

export const ListBoxCard = styled(Card)`
  position: absolute;
  top: 0;
  left: 1px;
  right: 1px;
  z-index: 1000;
  max-height: calc(100vh - 10em);
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  & > ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`
