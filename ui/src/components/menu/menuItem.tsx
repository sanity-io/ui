import React, {
  createElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import {isValidElementType} from 'react-is'
import {useForwardedRef} from '../../hooks'
import {Box, Card, Flex, Text} from '../../primitives'
import {ResponsivePaddingProps, ResponsiveRadiusProps} from '../../primitives/types'
import {ThemeColorToneKey} from '../../theme'
import {useMenu} from './hooks'

interface MenuItemProps extends ResponsivePaddingProps, ResponsiveRadiusProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  fontSize?: number | number[]
  icon?: React.ComponentType | React.ReactNode
  iconRight?: React.ComponentType | React.ReactNode
  space?: number | number[]
  text?: React.ReactNode
  tone?: ThemeColorToneKey
}

export const MenuItem = forwardRef(
  (
    props: MenuItemProps & Omit<React.HTMLProps<HTMLDivElement>, 'height' | 'ref'>,
    forwardedRef: React.ForwardedRef<HTMLDivElement>
  ) => {
    const {
      children,
      fontSize = 2,
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
      radius = 2,
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
        radius={radius}
        ref={setRef}
        role="menuitem"
        tabIndex={-1}
        type="button"
      >
        {(icon || text || iconRight) && (
          <Box as="span" {...paddingProps}>
            <Flex as="span">
              {icon && (
                <Text size={fontSize}>
                  {isValidElement(icon) && icon}
                  {isValidElementType(icon) && createElement(icon)}
                </Text>
              )}

              {text && (
                <Box
                  flex={1}
                  marginLeft={icon ? space : undefined}
                  marginRight={iconRight ? space : undefined}
                >
                  <Text size={fontSize}>{text}</Text>
                </Box>
              )}

              {iconRight && (
                <Text size={fontSize}>
                  {isValidElement(iconRight) && iconRight}
                  {isValidElementType(iconRight) && createElement(iconRight)}
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
