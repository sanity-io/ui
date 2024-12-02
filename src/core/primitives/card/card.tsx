import {card, CardStyleProps, composeClassNames} from '@sanity/ui/css'
import {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {forwardRef} from 'react'
import {isValidElementType} from 'react-is'
import {ThemeColorProvider, useRootTheme} from '../../_compat'
import {CardTone} from '../../types'
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
  muted?: boolean
  pressed?: boolean
  scheme?: ThemeColorSchemeKey
  tone?: CardTone
}

/**
 * The `Card` component acts much like a `Box`, but with a background and foreground color.
 * Components within a `Card` inherit its colors.
 *
 * @public
 */
export const Card = forwardRef(function Card(
  props: CardProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'width' | 'wrap'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    __unstable_checkered: checkered = false,
    __unstable_focusRing: focusRing = false,
    as: asProp,
    border = false,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    className,
    muted,
    pressed,
    radius = 0,
    scheme,
    selected,
    shadow,
    style,
    tone: toneProp,
    ...restProps
  } = props

  const as = isValidElementType(asProp) ? asProp : 'div'

  const rootTheme = useRootTheme()

  const tone = toneProp === 'inherit' ? undefined : toneProp

  // todo: Consider adding the wrapper approach for nested cards in which the tones are not
  // changing, avoid unnecessary ThemeColorProvider
  const node = (
    <ThemeColorProvider scheme={scheme} tone={tone ?? rootTheme.tone}>
      <Box
        data-as={typeof as === 'string' ? as : undefined}
        data-ui="Card"
        data-scheme={scheme ?? rootTheme.scheme}
        data-tone={tone ?? rootTheme.tone}
        {...restProps}
        as={as}
        className={composeClassNames(
          className,
          // rootCard ? undefined : 'root',
          card({
            border,
            borderTop,
            borderRight,
            borderBottom,
            borderLeft,
            radius,
            shadow,
          }),
        )}
        data-checkered={checkered ? '' : undefined}
        data-focus-ring={focusRing ? '' : undefined}
        data-muted={muted ? '' : undefined}
        data-pressed={pressed ? '' : undefined}
        data-selected={selected ? '' : undefined}
        ref={ref}
        selected={selected}
        style={style}
      />
    </ThemeColorProvider>
  )

  return node
})

Card.displayName = 'ForwardRef(Card)'
