import {composeClassNames, srOnly} from '@sanity/ui/css'
import {ForwardedRef, forwardRef, ReactNode} from 'react'

import {Props} from '../../types'

/**
 * @public
 */
export interface SrOnlyProps {
  children?: ReactNode
}

/**
 * @public
 */
export const SrOnly = forwardRef(function SrOnly(
  props: Props<SrOnlyProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {as: As = 'div', children, className, ...rest} = props

  return (
    <As
      data-ui="SrOnly"
      {...rest}
      aria-hidden
      className={composeClassNames(className, srOnly())}
      ref={ref}
    >
      {children}
    </As>
  )
})

SrOnly.displayName = 'ForwardRef(SrOnly)'
