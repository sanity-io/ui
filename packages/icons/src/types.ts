import type {ForwardRefExoticComponent, RefAttributes, SVGProps} from 'react'

/**
 * @public
 */
export type IconComponent = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
>
