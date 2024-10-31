import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {radius} from '../../styles/radius'
import {
  CodeSkeletonStyleProps,
  HeadingSkeletonStyleProps,
  LabelSkeletonStyleProps,
  SkeletonStyleProps,
  TextSkeletonStyleProps,
} from './types'

/** @beta */
export function skeleton(props: SkeletonStyleProps): string {
  return composeClassNames('skeleton', radius(props))
}

export function codeSkeleton(props: CodeSkeletonStyleProps): string {
  return composeClassNames('font-skeleton', _resp('code-skeleton', props.size))
}

export function headingSkeleton(props: HeadingSkeletonStyleProps): string {
  return composeClassNames('font-skeleton', _resp('heading-skeleton', props.size))
}

export function labelSkeleton(props: LabelSkeletonStyleProps): string {
  return composeClassNames('font-skeleton', _resp('label-skeleton', props.size))
}

export function textSkeleton(props: TextSkeletonStyleProps): string {
  return composeClassNames('font-skeleton', _resp('text-skeleton', props.size))
}
