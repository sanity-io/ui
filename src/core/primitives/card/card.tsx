import {card, CardStyleProps, composeClassNames} from '@sanity/ui/css'
import {ForwardedRef, forwardRef} from 'react'
import {isValidElementType} from 'react-is'

import {ThemeColorProvider, useRootTheme} from '../../_compat'
import {Props} from '../../types'
import {Box, BoxProps} from '../box'

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
    tone: toneProp,
    ...restProps
  } = props

  const as = isValidElementType(asProp) ? asProp : 'div'

  const rootTheme = useRootTheme()

  const tone = toneProp === 'inherit' ? rootTheme.tone : toneProp
  const scheme = schemeProp === undefined ? rootTheme.scheme : schemeProp

  const node = (
    <Box
      // data-as={typeof as === 'string' ? as : undefined}
      data-ui="Card"
      {...restProps}
      as={as}
      className={composeClassNames(
        className,
        card({
          scheme: scheme === rootTheme.scheme ? undefined : scheme,
          shadow,
          tone: tone === rootTheme.tone ? undefined : tone,
        }),
      )}
      data-checkered={checkered ? '' : undefined}
      data-focus-ring={focusRing ? '' : undefined}
      data-pressed={pressed ? '' : undefined}
      data-selectable={selectable ? '' : undefined}
      data-selected={selected ? '' : undefined}
      radius={radius}
      ref={ref}
      // selected={selected}
      style={style}
    />
  )

  if (scheme === rootTheme.scheme && tone === rootTheme.tone) {
    return node
  }

  return (
    // Render a theme provider around the card if the scheme or tone differs from the root theme.
    // This is needed for backwards compatibility with the legacy theme API.
    <ThemeColorProvider scheme={scheme} tone={tone ?? rootTheme.tone}>
      {node}
    </ThemeColorProvider>
  )
})

Card.displayName = 'ForwardRef(Card)'
