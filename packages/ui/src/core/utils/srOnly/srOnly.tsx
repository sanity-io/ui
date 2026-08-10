import {srOnly} from './srOnly.css'

/**
 * @public
 */
export interface SrOnlyProps {
  as?: React.ElementType | keyof React.JSX.IntrinsicElements
  children?: React.ReactNode
}

/**
 * @public
 */
export function SrOnly(
  props: SrOnlyProps & Omit<React.HTMLProps<HTMLDivElement>, 'aria-hidden' | 'as'>,
) {
  const {as = 'div', children, ref} = props
  // Rendering the polymorphic `as` needs one concrete element type for JSX to
  // type-check the div-flavored props (the same widening styled-components'
  // `as` prop performed here before).
  // oxlint-disable-next-line no-unsafe-type-assertion
  const Component = as as 'div'

  return (
    <Component aria-hidden className={srOnly} data-ui="SrOnly" ref={ref}>
      {children}
    </Component>
  )
}
