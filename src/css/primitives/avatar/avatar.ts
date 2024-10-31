import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import type {AvatarStyleProps} from './types'

/** @public */
export function avatar(props: AvatarStyleProps): string | undefined {
  return _scopeClassNames('avatar', props.color || 'gray', _resp('avatar', props.size))
}

/** @public */
export function avatarArrow(): string | undefined {
  return _scopeClassNames('avatar-arrow')
}

/** @public */
export function avatarInitials(): string | undefined {
  return _scopeClassNames('avatar-initials')
}

/** @public */
export function avatarImage(): string | undefined {
  return _scopeClassNames('avatar-image')
}

/** @public */
export function avatarCounter(props: {size?: AvatarStyleProps['size']}): string | undefined {
  return _scopeClassNames('avatar-counter', _resp('avatar', props.size))
}

/** @public */
export function avatarStack(props: {size?: AvatarStyleProps['size']}): string | undefined {
  return _scopeClassNames('avatar-stack', _resp('avatar', props.size))
}
