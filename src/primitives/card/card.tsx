import {forwardRef} from 'react'
import {isValidElementType} from 'react-is'
import styled from 'styled-components'
import {useArrayProp} from '../../hooks'
import {
  responsiveBorderStyle,
  ResponsiveBorderStyleProps,
  responsiveRadiusStyle,
  ResponsiveRadiusStyleProps,
  responsiveShadowStyle,
  ResponsiveShadowStyleProps,
} from '../../styles/internal'
import {ThemeColorName, ThemeColorSchemeKey} from '../../theme'
import {ToneProvider} from '../../theme/toneContext/toneProvider'
import {useToneContext} from '../../theme/toneContext/useToneContext'
import {CardTone} from '../../types'
import {Box, BoxProps} from '../box'
import {ResponsiveBorderProps, ResponsiveRadiusProps, ResponsiveShadowProps} from '../types'
import {cardStyle} from './styles'
import {CardStyleProps} from './types'

/**
 * @public
 */
export interface CardProps
  extends BoxProps,
    ResponsiveBorderProps,
    ResponsiveRadiusProps,
    ResponsiveShadowProps {
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
  pressed?: boolean
  scheme?: ThemeColorSchemeKey
  tone?: CardTone
  /**
   * @internal
   * Used by the popover, as it creates a new html element that it's ouside of the previous scope of the card.
   * So if it's inheriting styles from the parent, it needs to create a new cars context
   */
  updateCssVars?: boolean
}

const Root = styled(Box)<
  CardStyleProps &
    ResponsiveRadiusStyleProps &
    ResponsiveBorderStyleProps &
    ResponsiveShadowStyleProps
>(responsiveBorderStyle, responsiveRadiusStyle, responsiveShadowStyle, cardStyle)

const Wrapper = ({
  shouldAddContext,
  scheme,
  tone,
  children,
}: {
  shouldAddContext: boolean
  scheme: ThemeColorSchemeKey
  tone: ThemeColorName
  children: React.ReactElement
}): React.ReactElement => {
  // Avoid creating a new react context if the card is just inheriting styles from the parent.
  if (shouldAddContext) {
    return (
      <ToneProvider scheme={scheme} tone={tone}>
        {children}
      </ToneProvider>
    )
  }

  return children
}

/**
 * @public
 */
export const Card = forwardRef(function Card(
  props: CardProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
  ref: React.ForwardedRef<HTMLDivElement>,
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
    pressed,
    radius = 0,
    scheme: schemeProp,
    selected,
    shadow,
    tone: toneProp = 'default',
    updateCssVars = false,
    ...restProps
  } = props

  const as = isValidElementType(asProp) ? asProp : 'div'
  const toneContext = useToneContext()
  const tone = toneProp === 'inherit' ? toneContext.tone : toneProp
  const scheme = schemeProp ?? toneContext.scheme
  const shouldAddContext = scheme !== toneContext.scheme || tone !== toneContext.tone

  return (
    <Wrapper shouldAddContext={shouldAddContext} scheme={scheme} tone={tone}>
      <Root
        data-as={typeof as === 'string' ? as : undefined}
        data-scheme={scheme}
        data-ui="Card"
        data-tone={tone}
        $scheme={scheme ?? toneContext.scheme}
        {...restProps}
        $border={useArrayProp(border)}
        $borderTop={useArrayProp(borderTop)}
        $borderRight={useArrayProp(borderRight)}
        $borderBottom={useArrayProp(borderBottom)}
        $borderLeft={useArrayProp(borderLeft)}
        $checkered={checkered}
        $focusRing={focusRing}
        $radius={useArrayProp(radius)}
        $shadow={useArrayProp(shadow)}
        $tone={tone}
        $updateCssVars={updateCssVars || shouldAddContext}
        data-checkered={checkered ? '' : undefined}
        data-pressed={pressed ? '' : undefined}
        data-selected={selected ? '' : undefined}
        forwardedAs={as}
        ref={ref}
        selected={selected}
      />
    </Wrapper>
  )
})
