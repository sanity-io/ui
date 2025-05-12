import {_comp} from '../../_comp'
import {_resp} from '../../_resp'
import {AvatarStyleProps} from './types'

export function avatar(props: AvatarStyleProps): string | undefined {
  return _comp('avatar', props.color || 'gray', _resp('avatar', props.size))
}

export function avatarArrow(): string | undefined {
  return _comp('avatar-arrow')
}

export function avatarInitials(): string | undefined {
  return _comp('avatar-initials')
}

export function avatarImage(): string | undefined {
  return _comp('avatar-image')
}

export function avatarCounter(props: {size?: AvatarStyleProps['size']}): string | undefined {
  return _comp('avatar-counter', _resp('avatar', props.size))
}

export function avatarStack(props: {size?: AvatarStyleProps['size']}): string | undefined {
  return _comp('avatar-stack', _resp('avatar', props.size))
}
