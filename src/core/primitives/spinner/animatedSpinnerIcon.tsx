import {SpinnerIcon} from '@sanity/icons'
import {animatedSpinnerIcon} from '@sanity/ui/css'
import type {ReactElement, SVGProps} from 'react'

/** @internal */
export function AnimatedSpinnerIcon(
  props: Omit<SVGProps<SVGSVGElement>, 'className'>,
): ReactElement {
  const {...rest} = props

  return (
    <SpinnerIcon data-sanity-icon="animated-spinner" {...rest} className={animatedSpinnerIcon()} />
  )
}
