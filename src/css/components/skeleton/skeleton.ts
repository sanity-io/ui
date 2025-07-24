import {_composeClassNames} from '../../_composeClassNames'
import {_responsiveClassName} from '../../_responsiveClassName'
import {flex} from '../../props/flex/flex'
import {margin} from '../../props/margin/margin'
import {radius} from '../../props/radius/radius'
import {codeScale, font, headingScale, labelScale, root, textScale} from './skeleton.css'
import type {
  CodeSkeletonStyleProps,
  HeadingSkeletonStyleProps,
  LabelSkeletonStyleProps,
  SkeletonStyleProps,
  TextSkeletonStyleProps,
} from './types'

/** @beta */
export function skeleton(props: SkeletonStyleProps): string | undefined {
  return _composeClassNames(props.className, root, flex(props), radius(props), margin(props))
}

/** @beta */
export function codeSkeleton(props: CodeSkeletonStyleProps): string | undefined {
  return _composeClassNames(props.className, font, _responsiveClassName(codeScale, props.size))
}

/** @beta */
export function headingSkeleton(props: HeadingSkeletonStyleProps): string | undefined {
  return _composeClassNames(props.className, font, _responsiveClassName(headingScale, props.size))
}

/** @beta */
export function labelSkeleton(props: LabelSkeletonStyleProps): string | undefined {
  return _composeClassNames(props.className, font, _responsiveClassName(labelScale, props.size))
}

/** @beta */
export function textSkeleton(props: TextSkeletonStyleProps): string | undefined {
  return _composeClassNames(props.className, font, _responsiveClassName(textScale, props.size))
}
