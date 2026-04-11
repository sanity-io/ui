/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Assign properties from `U` to `T`, excluding properties that already exist in `T`.
 *
 * @public
 */
export type Assign<T extends {}, U extends {}> = Omit<T, keyof U> & U

/** @public */
export type EmptyProps = {}

/** @public */
export type TagType = keyof React.JSX.IntrinsicElements

/** @public */
export type ComponentType<P = any> =
  | React.FunctionComponent<P>
  | React.ComponentClass<P>
  | React.ExoticComponent<P>

/** @public */
export type ElementType<P> = TagType | ComponentType<P>

/** @public */
export type Props<P extends EmptyProps, E extends ElementType<P>> = Assign<
  E extends TagType ? React.JSX.IntrinsicElements[E] : React.ComponentProps<E>,
  P & {as?: E}
>

/**
 * Placement of floating UI elements.
 *
 * @public
 */
export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'

/** @public */
export type Delay =
  | number
  | Partial<{
      open: number
      close: number
    }>
