import {SpinnerIcon} from '@sanity/icons'
import {spinner_animatedIcon} from '@sanity/ui/css'
import type {SVGProps} from 'react'

/** @internal */
export function AnimatedSpinnerIcon(
  props: Omit<SVGProps<SVGSVGElement>, 'className'>,
): React.JSX.Element {
  const {...rest} = props

  return (
    <SpinnerIcon data-sanity-icon="spinner-animated" {...rest} className={spinner_animatedIcon()} />
  )
}
