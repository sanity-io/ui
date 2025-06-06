import {_composeClassNames} from '../../_composeClassNames'
import {_responsiveClassName} from '../../_responsiveClassName'
import {flex} from '../../props/flex/flex'
import {
  arrow,
  arrowSvg,
  colors,
  counter,
  image,
  imageOutline,
  initials,
  root,
  scale,
  stack,
} from './avatar.css'
import type {AvatarStyleProps} from './types'

/** @public */
export function avatar(props: AvatarStyleProps): string | undefined {
  return _composeClassNames(
    props.className,
    root,
    colors[props.color ?? 'gray'],
    _responsiveClassName(scale, props.size ?? 1),
    flex({flex: 'none'}),
  )
}

/** @public */
export function avatarArrow(): string | undefined {
  return arrow
}

/** @public */
export function avatarArrowSvg(): string | undefined {
  return arrowSvg
}

/** @public */
export function avatarInitials(): string | undefined {
  return initials
}

/** @public */
export function avatarImage(): string | undefined {
  return image
}

/** @public */
export function avatarImageOutline(): string | undefined {
  return imageOutline
}

/** @public */
export function avatarCounter(props: {
  className?: string
  size?: AvatarStyleProps['size']
}): string | undefined {
  return _composeClassNames(props.className, counter, _responsiveClassName(scale, props.size ?? 1))
}

/** @public */
export function avatarStack(props: {
  className?: string
  size?: AvatarStyleProps['size']
}): string | undefined {
  return _composeClassNames(props.className, stack, _responsiveClassName(scale, props.size ?? 1))
}
