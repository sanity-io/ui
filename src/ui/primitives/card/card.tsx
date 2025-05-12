import {_selectable, card, CardStyleProps, composeClassNames} from '@sanity/ui/css'
import {createElement, ForwardedRef, forwardRef} from 'react'
import {isValidElementType} from 'react-is'

import {Props} from '../../types'
import {Box, BoxProps} from '../box'
import {CardProvider} from './cardProvider'
import {useCard} from './useCard'

/**
 * @public
 */
export interface CardProps extends BoxProps, CardStyleProps {
  /**
   * Do not use in production.
   * @beta
   */
  __unstable_checkered?: boolean
  /**
   * Do not use in production.
   * @beta
   */
  __unstable_focusRing?: boolean
  disabled?: boolean
  href?: string
  pressed?: boolean
  selected?: boolean
  target?: string
}

/**
 * The `Card` component acts much like a `Box`, but with a background and foreground color.
 * Components within a `Card` inherit its colors.
 *
 * @public
 */
export const Card = forwardRef(function Card(
  props: Props<CardProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    __unstable_checkered: checkered = false,
    __unstable_focusRing: focusRing = false,
    as: asProp,
    className,
    pressed,
    radius = 0,
    scheme: schemeProp,
    selectable,
    selected,
    shadow,
    style,
    tone: toneProp = 'inherit',
    ...restProps
  } = props

  const as = isValidElementType(asProp) ? asProp : 'div'

  const parent = useCard()

  const context = {
    tone: parent?.tone ?? 'default',
    scheme: parent?.scheme ?? 'light',
  }

  const tone = toneProp === 'inherit' ? context.tone : toneProp
  const scheme = schemeProp === undefined ? context.scheme : schemeProp

  let node = (
    <Box
      data-ui="Card"
      {...restProps}
      as={as}
      className={composeClassNames(
        className,
        card({
          scheme: scheme === context.scheme ? undefined : scheme,
          shadow,
          tone: tone === context.tone ? undefined : tone,
        }),
        selectable && _selectable({radius}),
      )}
      data-checkered={checkered ? '' : undefined}
      data-focus-ring={focusRing ? '' : undefined}
      data-pressed={pressed ? '' : undefined}
      data-selected={selected ? '' : undefined}
      radius={radius}
      ref={ref}
      style={style}
    />
  )

  if (scheme === context.scheme && tone === context.tone) {
    return node
  }

  node = (
    <CardProvider
      compat_provider={parent?.compat_provider}
      rendered={true}
      scheme={scheme}
      tone={tone ?? context.tone}
    >
      {node}
    </CardProvider>
  )

  if (parent?.compat_provider) {
    return createElement(parent.compat_provider, {
      children: node,
      scheme,
      tone: tone ?? context.tone,
    })
  }

  return node
})

Card.displayName = 'ForwardRef(Card)'
