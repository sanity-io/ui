import {card, type CardStyleProps} from '@sanity/ui/css'
import type {CardTone} from '@sanity/ui/theme'
import {CARD_STYLE_PROP_KEYS} from '@sanity/ui-css'

import {_splitKeys} from '../../_keys'
import type {Props} from '../../types'
import {type BoxElementType, type BoxOwnProps} from '../box/Box'
import {CardProvider} from './CardProvider'
import {useCard} from './useCard'

/** @public */
export const DEFAULT_CARD_ELEMENT = 'div'

/** @public */
export interface CardOwnProps extends BoxOwnProps, Omit<CardStyleProps, 'tone'> {
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
    children,
    pressed,
    selected,
    ...restDomProps
  } = domProps

  const context = useCard()
  const tone = toneProp === 'inherit' ? context?.tone : toneProp
  const scheme = schemeProp ?? context?.scheme

  let node = (
    <As
      data-ui="Card"
      {...restDomProps}
      className={card({
        ...styleProps,
        // __unstable_pattern: styleProps.__unstable_pattern ?? (checkered ? 'checkered' : undefined),
        tone: tone === context.tone && !context.root ? undefined : tone,
        scheme: scheme === context.scheme && !context.root ? undefined : scheme,
      })}
      data-checkered={checkered ? '' : undefined}
      // Extract the disabled prop without removing it from `...rest` so that the underlying <button> or <a> has `[disabled]` when needed
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
    <CardProvider
      scheme={scheme ?? 'light'}
      tone={tone ?? 'default'}
      unstable_CompatProvider={context?.unstable_CompatProvider}
    >
      {node}
    </CardProvider>
  )

  if (context?.unstable_CompatProvider) {
    const CompatProvider = context.unstable_CompatProvider

    return (
      <CompatProvider scheme={scheme ?? 'light'} tone={tone ?? context.tone}>
        {node}
      </CompatProvider>
    )
  }

  return node
}
