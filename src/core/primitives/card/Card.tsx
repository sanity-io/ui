import {card, type CardStyleProps} from '@sanity/ui/css'
import {use} from 'react'

import type {Props} from '../../types'
import {Box, type BoxElementType, type BoxOwnProps} from '../box/Box'
import {CardContext} from './CardContext'
import {CardProvider} from './CardProvider'

/** @public */
export const DEFAULT_CARD_ELEMENT = 'div'

/** @public */
export interface CardOwnProps extends BoxOwnProps, CardStyleProps {
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
  pressed?: boolean
  selected?: boolean
  target?: string
}

/** @public */
export type CardElementType = BoxElementType

/** @public */
export type CardProps<E extends CardElementType = CardElementType> = Props<CardOwnProps, E>

/**
 * The `Card` component acts much like a `Box`, but with a background and foreground color.
 * Components within a `Card` inherit its colors.
 *
 * @public
 */
export function Card<E extends CardElementType = typeof DEFAULT_CARD_ELEMENT>(
  props: CardProps<E>,
): React.JSX.Element {
  const {
    __unstable_checkered: checkered = false,
    __unstable_focusRing: focusRing = false,
    as = DEFAULT_CARD_ELEMENT,
    className,
    pressed,
    radius = 0,
    scheme: schemeProp,
    selected,
    style,
    tone: toneProp = 'default',
    ...rest
  } = props as CardProps<typeof DEFAULT_CARD_ELEMENT>

  const parent = use(CardContext)
  const tone = toneProp === 'inherit' ? parent?.tone : toneProp
  const scheme = schemeProp === undefined ? parent?.scheme : schemeProp

  let node = (
    <Box
      data-ui="Card"
      {...rest}
      as={as}
      className={card({
        className,
        scheme: scheme === parent?.scheme ? undefined : scheme,
        tone,
      })}
      data-checkered={checkered ? '' : undefined}
      // Extract the disabled prop without removing it from `...rest` so that the underlying <button> or <a> has `[disabled]` when needed
      data-disabled={props.disabled ? '' : undefined}
      data-focus-ring={focusRing ? '' : undefined}
      data-pressed={pressed ? '' : undefined}
      data-selected={selected ? '' : undefined}
      radius={radius}
      style={style}
    />
  )

  if (scheme === parent?.scheme && tone === parent?.tone) {
    return node
  }

  node = (
    <CardProvider
      scheme={scheme ?? 'light'}
      tone={tone ?? 'default'}
      unstable_CompatProvider={parent?.unstable_CompatProvider}
    >
      {node}
    </CardProvider>
  )

  if (parent?.unstable_CompatProvider) {
    const CompatProvider = parent.unstable_CompatProvider

    return (
      <CompatProvider scheme={scheme ?? 'light'} tone={tone ?? parent.tone}>
        {node}
      </CompatProvider>
    )
  }

  return node
}
