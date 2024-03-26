import {ThemeFontKey, getTheme_v2} from '@sanity/ui/theme'
import {forwardRef} from 'react'
import styled from 'styled-components'
import {useArrayProp} from '../../hooks'
import {ThemeProps, _responsive} from '../../styles'
import {Skeleton, SkeletonProps} from './skeleton'

const Root = styled(Skeleton)<{$size: number[]; $style: ThemeFontKey}>((
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
export const TextSkeleton = forwardRef(function TextSkeleton(
  props: TextSkeletonProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'height' | 'size'>,
  ref: React.Ref<HTMLDivElement>,
) {
  const {size = 2, ...restProps} = props
  const $size = useArrayProp(size)

  return <Root {...restProps} $size={$size} ref={ref} $style="text" />
})

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const LabelSkeleton = forwardRef(function TextSkeleton(
  props: LabelSkeletonProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'height' | 'size'>,
  ref: React.Ref<HTMLDivElement>,
) {
  const {size = 2, ...restProps} = props
  const $size = useArrayProp(size)

  return <Root {...restProps} $size={$size} ref={ref} $style="label" />
})

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const HeadingSkeleton = forwardRef(function TextSkeleton(
  props: HeadingSkeletonProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'height' | 'size'>,
  ref: React.Ref<HTMLDivElement>,
) {
  const {size = 2, ...restProps} = props
  const $size = useArrayProp(size)

  return <Root {...restProps} $size={$size} ref={ref} $style="heading" />
})

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const CodeSkeleton = forwardRef(function TextSkeleton(
  props: CodeSkeletonProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'height' | 'size'>,
  ref: React.Ref<HTMLDivElement>,
) {
  const {size = 2, ...restProps} = props
  const $size = useArrayProp(size)

  return <Root {...restProps} $size={$size} ref={ref} $style="code" />
})
