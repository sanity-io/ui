import {clsx} from 'clsx'
import type {HTMLAttributes, ReactNode} from 'react'

import {badge, type BadgeVariantProps} from '../../styled-system/recipes'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, BadgeVariantProps {
  children?: ReactNode
}

/**
 * NEGATIVE CONTROL: styled with a *config* recipe (see panda.config.ts), whose
 * class names are derived from the recipe name, not from the declarations.
 */
export function Badge(props: BadgeProps): ReactNode {
  const {children, className, tone, ...rest} = props
  return (
    <span {...rest} className={clsx(badge({tone}), className)}>
      {children}
    </span>
  )
}
