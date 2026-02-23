import {card, type CardStyleProps} from '@sanity/ui/css'
import {use} from 'react'

import type {Props} from '../../types'
import {Box, type BoxElementType, type BoxOwnProps} from '../box/Box'
import {CardContext} from './CardContext'
import {CardProvider} from './CardProvider'

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
 * Extends {@link BoxOwnProps} (all Box layout/style props) and {@link CardStyleProps}
 * (card-specific visual props such as `scheme` and `tone`).
 *
 * Inherited from {@link BoxOwnProps}:
 * - All layout props: `display`, `flex`, `flexDirection`, `alignItems`, `justifyContent`, etc.
 * - All spacing props: `margin`, `padding`, and per-side variants.
 * - All sizing props: `width`, `height`, `minWidth`, `minHeight`, `maxWidth`.
 * - All position props: `position`, `inset`, and per-side inset variants.
 * - All visual props: `border`, `radius`, `shadow`, `overflow`, `muted`, `outline`.
 *
 * Inherited from {@link CardStyleProps}:
 * - `scheme` – Color scheme (`"light"` | `"dark"`).
 * - `tone` – Color tone (`"transparent"` | `"default"` | `"neutral"` | `"primary"` | `"suggest"` | `"positive"` | `"caution"` | `"critical"` | `"inherit"`).
 *
 * @public
 */
export interface CardOwnProps extends BoxOwnProps, CardStyleProps {
  /**
   * When `true`, renders a checkered background pattern on the card.
   *
   * @beta Do not use in production.
   *
   * @type {boolean}
   * @defaultValue false
   * @optional
   */
  __unstable_checkered?: boolean

  /**
   * When `true`, renders a focus ring around the card when it receives focus.
   *
   * @beta Do not use in production.
   *
   * @type {boolean}
   * @defaultValue false
   * @optional
   */
  __unstable_focusRing?: boolean

  /**
   * When `true`, disables the card, preventing user interaction and applying
   * a disabled visual state via the `data-disabled` attribute.
   *
   * @remarks
   * When the card renders as a `<button>` or `<a>` element, the native
   * `disabled` attribute is also applied.
   *
   * @type {boolean}
   * @defaultValue undefined
   * @optional
   */
  disabled?: boolean

  /**
   * When `true`, applies a pressed visual state to the card via the
   * `data-pressed` attribute.
   *
   * @type {boolean}
   * @defaultValue undefined
   * @optional
   */
  pressed?: boolean

  /**
   * When `true`, applies a selected visual state to the card via the
   * `data-selected` attribute.
   *
   * @type {boolean}
   * @defaultValue undefined
   * @optional
   */
  selected?: boolean

  /**
   * Specifies the browsing context for a link when `as="a"`.
   *
   * @remarks
   * Standard HTML anchor `target` attribute. Only meaningful when the
   * card renders as an anchor element.
   *
   * @type {string}
   * @defaultValue undefined
   * @optional
   */
  target?: string
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
 * ### Default prop values
 *
 * | Prop | Default |
 * |------|---------|
 * | `as` | `"div"` |
 * | `radius` | `0` |
 * | `tone` | `"default"` |
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
      data-disabled={props.disabled ? '' : props['data-disabled']}
      data-focus-ring={focusRing ? '' : props['data-focus-ring']}
      data-pressed={pressed ? '' : props['data-pressed']}
      data-selected={selected ? '' : props['data-selected']}
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
