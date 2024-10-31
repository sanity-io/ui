import {_composeClassNames} from '../../_composeClassNames'
import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import {radius} from '../../aspects/radius'
import type {
  CodeSkeletonStyleProps,
  HeadingSkeletonStyleProps,
  LabelSkeletonStyleProps,
  SkeletonStyleProps,
  TextSkeletonStyleProps,
} from './types'

/** @beta */
export function skeleton(props: SkeletonStyleProps): string | undefined {
  return _composeClassNames(_scopeClassNames('skeleton'), radius(props))
}

/** @beta */
export function codeSkeleton(props: CodeSkeletonStyleProps): string | undefined {
  return _scopeClassNames('font-skeleton', _resp('code-skeleton', props.size))
}

/** @beta */
export function headingSkeleton(props: HeadingSkeletonStyleProps): string | undefined {
  return _scopeClassNames('font-skeleton', _resp('heading-skeleton', props.size))
}

/** @beta */
export function labelSkeleton(props: LabelSkeletonStyleProps): string | undefined {
  return _scopeClassNames('font-skeleton', _resp('label-skeleton', props.size))
}

/** @beta */
export function textSkeleton(props: TextSkeletonStyleProps): string | undefined {
  return _scopeClassNames('font-skeleton', _resp('text-skeleton', props.size))
}
