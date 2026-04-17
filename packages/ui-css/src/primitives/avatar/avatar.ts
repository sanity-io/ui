import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {flexProp} from '../../props/flex/flex'
import {avatarColorClassNames} from '../../vars/component/avatar/color.css'
import {
  arrow,
  arrowSvg,
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
    avatarColorClassNames[props.color ?? 'gray'],
    _responsiveClassName(scale, props.size ?? 1),
    flexProp({flex: 'none'}),
  )
}

/** @public */
export function avatar_arrow(): string | undefined {
  return arrow
}

/** @public */
export function avatar_arrowSvg(): string | undefined {
  return arrowSvg
}

/** @public */
export function avatar_initials(): string | undefined {
  return initials
}

/** @public */
export function avatar_image(): string | undefined {
  return image
}

/** @public */
export function avatar_imageOutline(): string | undefined {
  return imageOutline
}

/** @public */
export function avatar_counter(props: {
  className?: string
  size?: AvatarStyleProps['size']
}): string | undefined {
  return _composeClassNames(props.className, counter, _responsiveClassName(scale, props.size ?? 1))
}

/** @public */
export function avatar_stack(props: {
  className?: string
  size?: AvatarStyleProps['size']
}): string | undefined {
  return _composeClassNames(props.className, stack, _responsiveClassName(scale, props.size ?? 1))
}
