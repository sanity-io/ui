import React, {createElement, forwardRef, useCallback, useEffect, useRef} from 'react'
import {Box, Card, Flex, Icon, IconSymbol, Text} from '../../atoms'
import {useForwardedRef} from '../../hooks'
import {ResponsivePaddingStyleProps} from '../../styles'
import {useMenu} from './hooks'

interface MenuItemProps extends ResponsivePaddingStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  icon?: IconSymbol | React.ComponentType
  iconRight?: IconSymbol | React.ComponentType
  size?: number | number[]
  space?: number | number[]
  text?: React.ReactNode
}

export const MenuItem = forwardRef(
  (
    props: MenuItemProps & Omit<React.HTMLProps<HTMLDivElement>, 'height' | 'ref'>,
    forwardedRef: React.ForwardedRef<HTMLDivElement>
  ) => {
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
    const rootRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => mount(rootRef.current), [mount])

    const ref = useForwardedRef(forwardedRef)

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
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

    function setRef(el: HTMLDivElement | null) {
      ref.current = el
      rootRef.current = el
    }

    return (
      <Card
        as="button"
        data-ui="MenuItem"
        {...restProps}
        onClick={restProps.disabled ? undefined : handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={setRef}
        role="menuitem"
        tabIndex={-1}
        type="button"
      >
        {(icon || text || iconRight) && (
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
      </Card>
    )
  }
)

MenuItem.displayName = 'MenuItem'
