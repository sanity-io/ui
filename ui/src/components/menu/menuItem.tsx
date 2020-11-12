import React, {createElement, forwardRef, useCallback, useEffect, useRef} from 'react'
import styled, {css} from 'styled-components'
import {Box, Flex, Icon, IconSymbol, Text, useCard} from '../../atoms'
import {ResponsivePaddingStyleProps} from '../../styles'
import {ColorSchemeKey, Theme} from '../../theme'
import {useMenu} from './hooks'

interface MenuItemProps extends ResponsivePaddingStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  icon?: IconSymbol | React.ComponentType
  iconRight?: IconSymbol | React.ComponentType
  size?: number | number[]
  space?: number | number[]
  text?: React.ReactNode
}

const Root = styled.button<{scheme: ColorSchemeKey}>(
  (props: {scheme: ColorSchemeKey; theme: Theme}) => {
    const {scheme, theme} = props
    const tone = theme.color[scheme].card.tones.default

    return css`
      --card-bg-color: ${tone.enabled.bg};
      --card-fg-color: ${tone.enabled.fg};

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

      &:is(a) {
        text-decoration: none;
        display: block;
      }

      &:not(:disabled):focus {
        --card-bg-color: ${tone.selected.bg};
        --card-fg-color: ${tone.selected.fg};
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

export const MenuItem = forwardRef(
  (props: MenuItemProps & Omit<React.HTMLProps<HTMLButtonElement>, 'ref'>, ref) => {
    const card = useCard()
    const {
      children,
      icon,
      iconRight,
      onClick,
      padding = 3,
      paddingX,
      paddingY,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      size = 2,
      space = 3,
      text,
      ...restProps
    } = props
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

    const paddingProps = {
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
    }

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
          <Box as="span" {...paddingProps}>
            <Flex as="span">
              {icon && (
                <Text size={size}>
                  {typeof icon === 'string' && <Icon symbol={icon} />}
                  {typeof icon !== 'string' && createElement(icon)}
                </Text>
              )}

              {text && (
                <Box
                  flex={1}
                  marginLeft={icon ? space : undefined}
                  marginRight={iconRight ? space : undefined}
                >
                  <Text size={size}>{text}</Text>
                </Box>
              )}

              {iconRight && (
                <Text size={size}>
                  {typeof iconRight === 'string' && <Icon symbol={iconRight} />}
                  {typeof iconRight !== 'string' && createElement(iconRight)}
                </Text>
              )}
            </Flex>
          </Box>
        )}

        {children}
      </Root>
    )
  }
)

MenuItem.displayName = 'MenuItem'
