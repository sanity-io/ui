import {Preview} from '@sanity/components'
import {Card, ColorSchemeKey, Theme, useCard} from '@sanity/ui'
import React from 'react'
import styled, {css} from 'styled-components'

const Root = styled(Card)((props: {scheme: ColorSchemeKey; theme: Theme}) => {
  const {scheme, theme} = props
  const tone = theme.color[scheme].card.tones.default

  return css`
    outline: none;

    &:hover {
      --card-bg-color: ${tone.hovered.bg};
      --card-fg-color: ${tone.hovered.fg};
      --card-muted-fg-color: ${tone.hovered.muted.fg};
      --card-focus-ring-color: ${tone.hovered.focusRing};
      --card-hairline-soft-color: ${tone.hovered.hairline.soft};
      --card-hairline-hard-color: ${tone.hovered.hairline.hard};
      --card-link-color: ${tone.hovered.link};
      --card-shadow-outline-color: ${tone.hovered.shadow.outline};
      --card-shadow-umbra-color: ${tone.hovered.shadow.umbra};
      --card-shadow-penumbra-color: ${tone.hovered.shadow.penumbra};
      --card-shadow-ambient-color: ${tone.hovered.shadow.ambient};
    }

    &:focus {
      --card-bg-color: ${tone.selected.bg};
      --card-fg-color: ${tone.selected.fg};
      --card-muted-fg-color: ${tone.selected.muted.fg};
      --card-focus-ring-color: ${tone.selected.focusRing};
      --card-hairline-soft-color: ${tone.selected.hairline.soft};
      --card-hairline-hard-color: ${tone.selected.hairline.hard};
      --card-link-color: ${tone.selected.link};
      --card-shadow-outline-color: ${tone.selected.shadow.outline};
      --card-shadow-umbra-color: ${tone.selected.shadow.umbra};
      --card-shadow-penumbra-color: ${tone.selected.shadow.penumbra};
      --card-shadow-ambient-color: ${tone.selected.shadow.ambient};
    }
  `
})

export function ListItem() {
  const card = useCard()

  return (
    <Root paddingX={3} paddingY={2} radius={2} scheme={card.scheme} tabIndex={0}>
      <Preview />
    </Root>
  )
}
