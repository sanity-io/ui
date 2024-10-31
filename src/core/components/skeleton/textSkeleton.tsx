import {
  codeSkeleton,
  composeClassNames,
  headingSkeleton,
  labelSkeleton,
  ResponsiveProp,
  textSkeleton,
} from '@sanity/ui/css'
import {FontCodeSize, FontHeadingSize, FontLabelSize, FontTextSize} from '@sanity/ui/theme'
import {forwardRef} from 'react'
import {Skeleton, SkeletonProps} from './skeleton'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface TextSkeletonProps extends SkeletonProps {
  size?: ResponsiveProp<FontTextSize>
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface LabelSkeletonProps extends SkeletonProps {
  size?: ResponsiveProp<FontLabelSize>
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface HeadingSkeletonProps extends SkeletonProps {
  size?: ResponsiveProp<FontHeadingSize>
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface CodeSkeletonProps extends SkeletonProps {
  size?: ResponsiveProp<FontCodeSize>
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const TextSkeleton = forwardRef(function TextSkeleton(
  props: TextSkeletonProps &
    Omit<
      React.HTMLProps<HTMLDivElement>,
      'as' | 'children' | 'height' | 'rows' | 'size' | 'width' | 'wrap'
    >,
  ref: React.Ref<HTMLDivElement>,
) {
  const {className, size = 2, ...restProps} = props

  return (
    <Skeleton
      data-ui="TextSkeleton"
      {...restProps}
      className={composeClassNames(className, textSkeleton({size}))}
      ref={ref}
    />
  )
})

TextSkeleton.displayName = 'ForwardRef(TextSkeleton)'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const LabelSkeleton = forwardRef(function TextSkeleton(
  props: LabelSkeletonProps &
    Omit<
      React.HTMLProps<HTMLDivElement>,
      'as' | 'children' | 'height' | 'rows' | 'size' | 'width' | 'wrap'
    >,
  ref: React.Ref<HTMLDivElement>,
) {
  const {className, size = 2, ...restProps} = props

  return (
    <Skeleton
      data-ui="LabelSkeleton"
      {...restProps}
      className={composeClassNames(className, labelSkeleton({size}))}
      ref={ref}
    />
  )
})

LabelSkeleton.displayName = 'ForwardRef(LabelSkeleton)'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const HeadingSkeleton = forwardRef(function TextSkeleton(
  props: HeadingSkeletonProps &
    Omit<
      React.HTMLProps<HTMLDivElement>,
      'as' | 'children' | 'height' | 'rows' | 'size' | 'width' | 'wrap'
    >,
  ref: React.Ref<HTMLDivElement>,
) {
  const {className, size = 2, ...restProps} = props

  return (
    <Skeleton
      {...restProps}
      className={composeClassNames(className, headingSkeleton({size}))}
      ref={ref}
    />
  )
})

HeadingSkeleton.displayName = 'ForwardRef(HeadingSkeleton)'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export const CodeSkeleton = forwardRef(function TextSkeleton(
  props: CodeSkeletonProps &
    Omit<
      React.HTMLProps<HTMLDivElement>,
      'as' | 'children' | 'height' | 'rows' | 'size' | 'width' | 'wrap'
    >,
  ref: React.Ref<HTMLDivElement>,
) {
  const {className, size = 2, ...restProps} = props

  return (
    <Skeleton
      // root
      {...restProps}
      className={composeClassNames(className, codeSkeleton({size}))}
      ref={ref}
    />
  )
})

CodeSkeleton.displayName = 'ForwardRef(CodeSkeleton)'
