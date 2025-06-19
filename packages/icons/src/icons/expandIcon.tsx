/* THIS FILE IS AUTO-GENERATED – DO NOT EDIT */

import {forwardRef, type ForwardRefExoticComponent, type RefAttributes, type SVGProps} from 'react'

/**
 * @public
 */
export const ExpandIcon: ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
> = forwardRef(function ExpandIcon(props, ref) {
  return (
    <svg
      data-sanity-icon="expand"
      width="1em"
      height="1em"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      ref={ref}
    >
      <path
        d="M14 6.5H18.5V11M11 18.5H6.5V14"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <path
        d="M18.5 6.5L14 11M6.5 18.5L11 14"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
    </svg>
  )
})
ExpandIcon.displayName = 'ForwardRef(ExpandIcon)'
