import {styled} from 'styled-components'

import {ThemeFontWeightKey} from '../../../theme/system/font'
import {fontColorStyle} from '../../styles/font/fontColorStyle'
import {_fontWeight, _responsiveFontSize} from '../../styles/font/responsiveFont'
import {responsiveTextAlignStyle} from '../../styles/font/textAlignStyle'
import {ResponsiveFontSizeStyleProps, ResponsiveFontStyleProps} from '../../styles/font/types'
import {_getArrayProp} from '../../styles/helpers'
import {ElementType, Props} from '../../types/component'
import {TextAlign} from '../../types/text'
import {SpanWithTextOverflow} from '../../utils/spanWithTextOverflow'
import {textBaseStyle} from './styles'

/**
 * @public
 */
export interface TextOwnProps {
  accent?: boolean
  align?: TextAlign | TextAlign[]
  /** When `true` the text color will be muted. */
  muted?: boolean
  size?: number | number[]
  /**
   * Controls how overflowing text is treated.
   * Use `textOverflow="ellipsis"` to render text as a single line which is concatenated with a `…` symbol.
   * @beta
   */
  textOverflow?: 'ellipsis'
  weight?: ThemeFontWeightKey
}

/**
 * @public
 */
export type TextProps<E extends ElementType = 'div'> = Props<TextOwnProps, E>

const TextBase = styled.div`@layer u-styled {
  ${textBaseStyle}
}`

const TextSize = styled(TextBase)<ResponsiveFontSizeStyleProps>`@layer u-styled {
  ${(props) => _responsiveFontSize('text', props)}
}`

const StyledText = styled(TextSize)<ResponsiveFontStyleProps>`@layer u-styled {
  ${(props) => _fontWeight('text', props)}
  ${responsiveTextAlignStyle}
  ${fontColorStyle}
}`

function TextComponent(
  props: TextOwnProps & {as?: ElementType} & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'size'>,
) {
  const {
    accent = false,
    align,
    children: childrenProp,
    muted = false,
    ref,
    size = 2,
    textOverflow,
    weight,
    ...restProps
  } = props

  let children = childrenProp

  if (textOverflow === 'ellipsis') {
    children = <SpanWithTextOverflow>{children}</SpanWithTextOverflow>
  }

  return (
    <StyledText
      data-ui="Text"
      {...restProps}
      $accent={accent}
      $align={_getArrayProp(align)}
      $muted={muted}
      ref={ref}
      $size={_getArrayProp(size)}
      $weight={weight}
    >
      <span>{children}</span>
    </StyledText>
  )
}

/**
 * The `Text` component is an agile, themed typographic element.
 *
 * @public
 */
export const Text: <E extends ElementType = 'div'>(props: TextProps<E>) => React.JSX.Element =
  TextComponent
