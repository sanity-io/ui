import React, {forwardRef, useCallback, useEffect, useRef} from 'react'
import styled, {css} from 'styled-components'
import {Box, Icon, IconSymbol, Text, useCard} from '../../atoms'
import {ColorSchemeKey, Theme} from '../../theme'
import {useMenu} from './hooks'

interface MenuItemProps {
  icon?: IconSymbol
  text?: React.ReactNode
}

const Root = styled.button<{scheme: ColorSchemeKey}>(
  (props: {scheme: ColorSchemeKey; theme: Theme}) => {
    const {scheme, theme} = props
    const tone = theme.color[scheme].card.tones.default

    return css`
      --card-bg-color: ${tone.enabled.bg} !important;
      --card-fg-color: ${tone.enabled.fg} !important;

      -webkit-font-smoothing: inherit;
      appearance: none;
      font: inherit;
      border: 0;
      border-radius: 0;
      background: none;
      color: inherit;
      text-align: left;
      margin: 0;
      padding: 0;
      outline: none;
      background-color: var(--card-bg-color);
      color: var(--card-fg-color);

      &:not(:disabled):focus {
        --card-bg-color: ${tone.selected.bg} !important;
        --card-fg-color: ${tone.selected.fg} !important;
      }

      &:not(:disabled):active {
        --card-bg-color: ${tone.pressed.bg};
        --card-fg-color: ${tone.pressed.fg};
      }

      &:disabled {
        --card-bg-color: ${tone.disabled.bg};
        --card-fg-color: ${tone.disabled.fg};
      }
    `
  }
)

const TextContainer = styled.span`
  svg + & {
    margin-left: 0.75em;
  }
`

export const MenuItem = forwardRef(
  (props: MenuItemProps & Omit<React.HTMLProps<HTMLButtonElement>, 'as'>, ref) => {
    const card = useCard()
    const {children, icon, onClick, text, ...restProps} = props
    const {mount, onItemClick, onMouseEnter, onMouseLeave} = useMenu()
    const rootRef = useRef<HTMLButtonElement | null>(null)

    useEffect(() => mount(rootRef.current), [mount])

    const setRef = (el: HTMLButtonElement | null) => {
      rootRef.current = el
      if (typeof ref === 'function') ref(el)
      else if (ref) ref.current = el
    }

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) onClick(event)
        if (onItemClick) onItemClick()
      },
      [onClick, onItemClick]
    )

    return (
      <Root
        data-ui="MenuItem"
        {...restProps}
        onClick={restProps.disabled ? undefined : handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={setRef}
        role="menuitem"
        scheme={card.scheme}
        tabIndex={-1}
        type="button"
      >
        {(icon || text) && (
          <Box paddingX={4} paddingY={3}>
            <Text as="span">
              {icon && <Icon symbol={icon} />}
              {text && <TextContainer>{text}</TextContainer>}
            </Text>
          </Box>
        )}

        {children}
      </Root>
    )
  }
)

MenuItem.displayName = 'MenuItem'
