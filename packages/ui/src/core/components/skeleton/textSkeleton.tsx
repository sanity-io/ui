import {css, styled} from 'styled-components'

import {ThemeFontKey} from '../../../theme/system/font'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_getArrayProp, responsiveRules} from '../../styles/helpers'
import {ThemeProps} from '../../styles/types'
import {Skeleton, SkeletonProps} from './skeleton'

function textSkeletonHeightStyle(props: {$size: number[]; $style: ThemeFontKey} & ThemeProps) {
  const {$size, $style} = props
  const {font, media} = getTheme_v2(props.theme)
  const fontStyle = font[$style]

  return responsiveRules(media, $size, (sizeIndex) => {
    const fontSize = fontStyle.sizes[sizeIndex]
    const capHeight = fontSize.lineHeight - fontSize.ascenderHeight - fontSize.descenderHeight

    return css`
      height: ${capHeight}px;
    `
  })
}

const StyledSkeleton = styled(Skeleton)<{$size: number[]; $style: ThemeFontKey}>`
  @layer u-styled {
    ${textSkeletonHeightStyle}
  }
`

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface TextSkeletonProps extends SkeletonProps {
  size?: number | number[]
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface LabelSkeletonProps extends SkeletonProps {
  size?: number | number[]
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface HeadingSkeletonProps extends SkeletonProps {
  size?: number | number[]
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface CodeSkeletonProps extends SkeletonProps {
  size?: number | number[]
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function TextSkeleton(
  props: TextSkeletonProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'height' | 'size'>,
) {
  const {size = 2, ...restProps} = props
  const $size = _getArrayProp(size)

  return <StyledSkeleton data-ui="TextSkeleton" {...restProps} $size={$size} $style="text" />
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function LabelSkeleton(
  props: LabelSkeletonProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'height' | 'size'>,
) {
  const {size = 2, ...restProps} = props
  const $size = _getArrayProp(size)

  return <StyledSkeleton data-ui="LabelSkeleton" {...restProps} $size={$size} $style="label" />
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function HeadingSkeleton(
  props: HeadingSkeletonProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'height' | 'size'>,
) {
  const {size = 2, ...restProps} = props
  const $size = _getArrayProp(size)

  return <StyledSkeleton data-ui="HeadingSkeleton" {...restProps} $size={$size} $style="heading" />
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function CodeSkeleton(
  props: CodeSkeletonProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'height' | 'size'>,
) {
  const {size = 2, ...restProps} = props
  const $size = _getArrayProp(size)

  return <StyledSkeleton data-ui="CodeSkeleton" {...restProps} $size={$size} $style="code" />
}
