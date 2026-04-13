import {card, CARD_STYLE_PROP_KEYS, type CardStyleProps} from '@sanity/ui-css'
import type {CardTone} from '@sanity/ui-tokens'
import {use} from 'react'

import {_splitKeys} from '../../core/_keys'
import type {Props} from '../../core/types'
import type {BoxElementType} from '../box/Box'
import {CardInternalContext} from './CardInternalContext'
import {CardInternalProvider} from './CardInternalProvider'
import {CardProvider} from './CardProvider'
import {useCard} from './useCard'

/** @public */
export const DEFAULT_CARD_ELEMENT = 'div'

/** @public */
export interface CardOwnProps extends Omit<CardStyleProps, 'tone'> {
  /**
   * Do not use in production.
   * @beta
   * @deprecated Use `__unstable_pattern` instead.
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
  tone?: CardTone | 'inherit'
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
  const [
    {
      scheme: schemeProp,
      tone: toneProp = 'inherit',
      // split style props
      ...styleProps
    },
    // split DOM props
    domProps,
  ] = _splitKeys(props as CardProps<typeof DEFAULT_CARD_ELEMENT>, CARD_STYLE_PROP_KEYS)

  const {
    __unstable_checkered: checkered = false,
    __unstable_focusRing: focusRing = false,
    as: As = DEFAULT_CARD_ELEMENT,

    pressed,

    selected,
    ...restDomProps
  } = domProps

  const context = useCard()
  const internalContext = use(CardInternalContext)
  const tone = toneProp === 'inherit' ? context?.tone : toneProp
  const scheme = schemeProp ?? context?.scheme

  const styleTone = tone === context.tone && !internalContext?.root ? undefined : tone
  const styleScheme = scheme === context.scheme && !internalContext?.root ? undefined : scheme

  let node = (
    <As
      data-ui="Card"
      {...restDomProps}
      className={card({
        ...styleProps,
        __unstable_pattern: styleProps.__unstable_pattern ?? (checkered ? 'checkered' : undefined),
        // If the style scheme is different from the context scheme, then set the tone
        tone: styleScheme ? tone : styleTone,
        scheme: styleScheme,
      })}
      // Extract the disabled prop without removing it from `...rest` so that the underlying
      // <button> or <a> has `[data-disabled]` when needed
      data-disabled={props.disabled ? '' : props['data-disabled']}
      data-focus-ring={focusRing ? '' : props['data-focus-ring']}
      data-pressed={pressed ? '' : props['data-pressed']}
      data-selected={selected ? '' : props['data-selected']}
    />
  )

  if (scheme === context.scheme && tone === context.tone) {
    return node
  }

  node = (
    <CardInternalProvider CompatProvider={internalContext?.CompatProvider}>
      <CardProvider scheme={scheme ?? 'light'} tone={tone ?? 'default'}>
        {node}
      </CardProvider>
    </CardInternalProvider>
  )

  if (internalContext?.CompatProvider) {
    const CompatProvider = internalContext.CompatProvider

    return (
      <CompatProvider scheme={scheme ?? 'light'} tone={tone ?? context.tone}>
        {node}
      </CompatProvider>
    )
  }

  return node
}
