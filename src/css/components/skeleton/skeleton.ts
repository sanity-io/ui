import {_composeClassNames} from '../../_composeClassNames'
import {radius} from '../../props/radius/radius'
import {font, root, sprinkles} from './skeleton.css'
import type {
  CodeSkeletonStyleProps,
  HeadingSkeletonStyleProps,
  LabelSkeletonStyleProps,
  SkeletonStyleProps,
  TextSkeletonStyleProps,
} from './types'

/** @beta */
export function skeleton(props: SkeletonStyleProps): string | undefined {
  return _composeClassNames(
    props.className,
    root,
    sprinkles({
      flex: props.flex,
      margin: props.margin,
      marginX: props.marginX,
      marginY: props.marginY,
      marginTop: props.marginTop,
      marginRight: props.marginRight,
      marginBottom: props.marginBottom,
      marginLeft: props.marginLeft,
    }),
    radius(props),
  )
}

/** @beta */
export function codeSkeleton(props: CodeSkeletonStyleProps): string | undefined {
  return _composeClassNames(props.className, font, sprinkles({codeScale: props.size}))
}

/** @beta */
export function headingSkeleton(props: HeadingSkeletonStyleProps): string | undefined {
  return _composeClassNames(props.className, font, sprinkles({headingScale: props.size}))
}

/** @beta */
export function labelSkeleton(props: LabelSkeletonStyleProps): string | undefined {
  return _composeClassNames(props.className, font, sprinkles({labelScale: props.size}))
}

/** @beta */
export function textSkeleton(props: TextSkeletonStyleProps): string | undefined {
  return _composeClassNames(props.className, font, sprinkles({textScale: props.size}))
}
