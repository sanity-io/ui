import {SpinnerIcon} from '@sanity/icons'
import {_composeClassNames, animatedSpinnerIcon} from '@sanity/ui/css'
import type {ReactElement, SVGProps} from 'react'

/** @internal */
export function AnimatedSpinnerIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  const {className, ...rest} = props

  return (
    <SpinnerIcon
      {...rest}
      data-sanity-icon="animated-spinner"
      className={_composeClassNames(className, animatedSpinnerIcon())}
    />
  )
}

AnimatedSpinnerIcon.displayName = 'AnimatedSpinnerIcon'
