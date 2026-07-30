import {styled} from 'styled-components'

import {ThemeFontKey} from '../../../theme/system/font'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_getArrayProp, _responsive} from '../../styles/helpers'
import {ThemeProps} from '../../styles/types'
import {Skeleton, SkeletonProps} from './skeleton'

const StyledSkeleton = styled(Skeleton)<{$size: number[]; $style: ThemeFontKey}>((
  props: {
    $size: number[]
    $style: ThemeFontKey
  } & ThemeProps,
) => {
  const {$size, $style} = props
  const {font, media} = getTheme_v2(props.theme)
  const fontStyle = font[$style]

  const styles = _responsive(media, $size, (sizeIndex) => {
    const fontSize = fontStyle.sizes[sizeIndex]
    const capHeight = fontSize.lineHeight - fontSize.ascenderHeight - fontSize.descenderHeight

    return {height: capHeight}
  })

  return styles
})

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
export const TextSkeleton = function TextSkeleton(
  props: TextSkeletonProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'height' | 'size'>,
) {
  const {size = 2, ...restProps} = props
  const $size = _getArrayProp(size)

  return <StyledSkeleton {...restProps} $size={$size} $style="text" />
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const LabelSkeleton = function LabelSkeleton(
  props: LabelSkeletonProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'height' | 'size'>,
) {
  const {size = 2, ...restProps} = props
  const $size = _getArrayProp(size)

  return <StyledSkeleton {...restProps} $size={$size} $style="label" />
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const HeadingSkeleton = function HeadingSkeleton(
  props: HeadingSkeletonProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'height' | 'size'>,
) {
  const {size = 2, ...restProps} = props
  const $size = _getArrayProp(size)

  return <StyledSkeleton {...restProps} $size={$size} $style="heading" />
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const CodeSkeleton = function CodeSkeleton(
  props: CodeSkeletonProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'height' | 'size'>,
) {
  const {size = 2, ...restProps} = props
  const $size = _getArrayProp(size)

  return <StyledSkeleton {...restProps} $size={$size} $style="code" />
}
