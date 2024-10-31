import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {AvatarStyleProps} from './types'

export function avatar(props: AvatarStyleProps): string {
  return composeClassNames(
    'avatar',
    `avatar-${props.color}`,
    `avatar-arrow-${props.arrowPosition}`,
    _resp('avatar', props.size),
  )
}

export function avatarArrow(): string {
  return composeClassNames('avatar-arrow')
}

export function avatarInitials(): string {
  return composeClassNames('avatar-initials')
}

export function avatarBgStroke(): string {
  return composeClassNames('avatar-bg-stroke')
}

export function avatarStroke(): string {
  return composeClassNames('avatar-stroke')
}

export function avatarImage(): string {
  return composeClassNames('avatar-image')
}
