import {isValidElementType} from 'react-is'
import {styled} from 'styled-components'

import {ThemeColorSchemeKey} from '../../../theme/system/color/_system'
import {responsiveBorderStyle} from '../../styles/border/borderStyle'
import {ResponsiveBorderStyleProps} from '../../styles/border/types'
import {_getArrayProp} from '../../styles/helpers'
import {responsiveRadiusStyle} from '../../styles/radius/radiusStyle'
import {ResponsiveRadiusStyleProps} from '../../styles/radius/types'
import {responsiveShadowStyle} from '../../styles/shadow/shadowStyle'
import {ResponsiveShadowStyleProps} from '../../styles/shadow/types'
import {ThemeColorProvider} from '../../theme/themeColorProvider'
import {useRootTheme} from '../../theme/useRootTheme'
import {CardTone} from '../../types/card'
import {ElementType, Props} from '../../types/component'
import {Box, BoxOwnProps} from '../box/box'
import {ResponsiveBorderProps, ResponsiveRadiusProps, ResponsiveShadowProps} from '../types'
import {cardStyle} from './styles'
import {CardStyleProps} from './types'

/**
 * @public
 */
export interface CardOwnProps
  extends BoxOwnProps, ResponsiveBorderProps, ResponsiveRadiusProps, ResponsiveShadowProps {
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
  muted?: boolean
  pressed?: boolean
  scheme?: ThemeColorSchemeKey
  selected?: boolean
  tone?: CardTone
}

/**
 * @public
 */
export type CardProps<E extends ElementType = 'div'> = Props<CardOwnProps, E>

const StyledCard = styled(Box)<
  CardStyleProps &
    ResponsiveRadiusStyleProps &
    ResponsiveBorderStyleProps &
    ResponsiveShadowStyleProps
>(responsiveBorderStyle, responsiveRadiusStyle, responsiveShadowStyle, cardStyle)

const CardComponent = function Card(
  props: CardOwnProps & {as?: ElementType} & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
) {
  const {
    __unstable_checkered: checkered = false,
    __unstable_focusRing: focusRing = false,
    as: asProp,
    border,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    muted,
    pressed,
    radius = 0,
    ref,
    scheme,
    selected,
    shadow,
    tone: toneProp = 'default',
    ...restProps
  } = props

  const as = isValidElementType(asProp) ? asProp : 'div'
  const rootTheme = useRootTheme()
  const tone = toneProp === 'inherit' ? rootTheme.tone : toneProp

  // todo: Consider adding the wrapper approach for nested cards in which the tones are not changing, avoid unnecessary ThemeColorProvider
  return (
    <ThemeColorProvider scheme={scheme} tone={tone}>
      <StyledCard
        data-as={typeof as === 'string' ? as : undefined}
        data-scheme={rootTheme.scheme}
        data-ui="Card"
        data-tone={tone}
        {...restProps}
        $border={_getArrayProp(border)}
        $borderTop={_getArrayProp(borderTop)}
        $borderRight={_getArrayProp(borderRight)}
        $borderBottom={_getArrayProp(borderBottom)}
        $borderLeft={_getArrayProp(borderLeft)}
        $checkered={checkered}
        $focusRing={focusRing}
        $muted={muted}
        $radius={_getArrayProp(radius)}
        $shadow={_getArrayProp(shadow)}
        $tone={tone}
        data-checkered={checkered ? '' : undefined}
        data-pressed={pressed ? '' : undefined}
        data-selected={selected ? '' : undefined}
        forwardedAs={as}
        ref={ref}
        selected={selected}
      />
    </ThemeColorProvider>
  )
}

/**
 * The `Card` component acts much like a `Box`, but with a background and foreground color.
 * Components within a `Card` inherit its colors.
 *
 * @public
 */
// oxlint-disable-next-line no-unsafe-type-assertion
export const Card = CardComponent as unknown as <E extends ElementType = 'div'>(
  props: CardProps<E>,
) => React.JSX.Element
