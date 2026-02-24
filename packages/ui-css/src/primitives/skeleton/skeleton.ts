import {_composeClassNames} from '../../_composeClassNames'
import {_responsiveClassName} from '../../_responsiveClassName'
import {flexProp} from '../../props/flex/flex'
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
  return _composeClassNames(props.className, root, flexProp(props), radius(props), margin(props))
}

/** @beta */
export function code_skeleton(props: CodeSkeletonStyleProps): string | undefined {
  return _composeClassNames(props.className, font, _responsiveClassName(codeScale, props.size))
}

/** @beta */
export function heading_skeleton(props: HeadingSkeletonStyleProps): string | undefined {
  return _composeClassNames(props.className, font, _responsiveClassName(headingScale, props.size))
}

/** @beta */
export function label_skeleton(props: LabelSkeletonStyleProps): string | undefined {
  return _composeClassNames(props.className, font, _responsiveClassName(labelScale, props.size))
}

/** @beta */
export function text_skeleton(props: TextSkeletonStyleProps): string | undefined {
  return _composeClassNames(props.className, font, _responsiveClassName(textScale, props.size))
}
