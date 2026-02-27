import {_splitKeys, type Props} from '@sanity/ui/core'
import {card, CARD_STYLE_PROP_KEYS, type CardStyleProps} from '@sanity/ui/css'
import type {BoxElementType} from '@sanity/ui/primitives/box'
import type {CardTone} from '@sanity/ui/theme'

import {CardProvider} from './CardProvider'
import {useCard} from './useCard'

/**
 * The default HTML element type rendered by the {@link Card} component.
 *
 * @public
 */
export const DEFAULT_CARD_ELEMENT = 'div'

/**
 * Own props for the {@link Card} component.
 *
 * @remarks
 * Extends {@link CardStyleProps} (with `tone` omitted and re-declared to support `'inherit'`)
 * to provide card-specific visual props such as `scheme` and `tone`.
 *
 * @public
 */
export interface CardOwnProps extends Omit<CardStyleProps, 'tone'> {
  /**
   * When `true`, renders a checkered background pattern on the card.
   *
   * @beta Do not use in production.
   * @deprecated Use `__unstable_pattern` instead.
   */
  __unstable_checkered?: boolean
  /**
   * When `true`, renders a focus ring around the card when it receives focus.
   *
   * @beta Do not use in production.
   */
  __unstable_focusRing?: boolean
  /**
   * When `true`, disables the card, preventing user interaction and applying
   * a disabled visual state.
   */
  disabled?: boolean
  /**
   * When `true`, applies a pressed visual state to the card.
   */
  pressed?: boolean
  /**
   * When `true`, applies a selected visual state to the card.
   */
  selected?: boolean
  /**
   * Specifies the browsing context for a link when `as="a"`.
   *
   * @remarks
   * Standard HTML anchor `target` attribute. Only meaningful when the
   * card renders as an anchor element.
   */
  target?: string
  /**
   * Sets the semantic color tone of the card.
   *
   * @remarks
   * When set to `'inherit'`, the card inherits the tone from its nearest
   * parent {@link Card} context.
   */
  tone?: CardTone | 'inherit'
}

/**
 * Accepted values for the `as` prop of the {@link Card} component.
 *
 * @remarks
 * Inherits all element types from {@link BoxElementType}. The rendered element
 * receives all applicable HTML attributes for the chosen element type.
 *
 * @public
 */
export type CardElementType = BoxElementType

/**
 * Props for the {@link Card} component.
 *
 * @remarks
 * Combines {@link CardOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link CardElementType}.
 *
 * @public
 */
export type CardProps<E extends CardElementType = CardElementType> = Props<CardOwnProps, E>

/**
 * The `Card` component acts like a {@link Box} but with a themed background and
 * foreground color. Child components within a `Card` inherit its color scheme and tone.
 *
 * @remarks
 * `Card` renders a single HTML element (default `<div>`) and wraps its children in
 * a {@link CardProvider} when the `scheme` or `tone` differs from its parent card context.
 * This enables nested cards with different color treatments.
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

  const styleTone = tone === context.tone && !context.root ? undefined : tone
  const styleScheme = scheme === context.scheme && !context.root ? undefined : scheme

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
    >
      {children}
    </As>
  )

  if (scheme === context?.scheme && tone === context?.tone) {
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
