import {SpinnerIcon} from '@sanity/icons'
import {animatedSpinnerIcon, composeClassNames} from '@sanity/ui/css'
import {ReactElement, SVGProps} from 'react'

/** @internal */
export function AnimatedSpinnerIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  const {className, ...restProps} = props

  return (
    <SpinnerIcon
      {...restProps}
      data-sanity-icon="animated-spinner"
      className={composeClassNames(className, animatedSpinnerIcon())}
    />
  )
}
