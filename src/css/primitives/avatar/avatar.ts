import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {AvatarStyleProps} from './types'

export function avatar(props: AvatarStyleProps): string | undefined {
  return composeClassNames('avatar', props.color || 'gray', _resp('avatar', props.size))
}

export function avatarArrow(): string | undefined {
  return composeClassNames('avatar-arrow')
}

export function avatarInitials(): string | undefined {
  return composeClassNames('avatar-initials')
}

export function avatarImage(): string | undefined {
  return composeClassNames('avatar-image')
}

export function avatarCounter(props: {size?: AvatarStyleProps['size']}): string | undefined {
  return composeClassNames('avatar-counter', _resp('avatar', props.size))
}

export function avatarStack(props: {size?: AvatarStyleProps['size']}): string | undefined {
  return composeClassNames('avatar-stack', _resp('avatar', props.size))
}
