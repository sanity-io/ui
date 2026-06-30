/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Assign properties from `U` to `T`, excluding properties that already exist in `T`.
 *
 * @public
 */
export type Assign<T extends object, U extends object> = Omit<T, keyof U> & U

/** @public */
export type EmptyProps = object

/** @public */
export type TagType = keyof React.JSX.IntrinsicElements

/** @public */
export type ComponentType<P = any> =
  | React.FunctionComponent<P>
  | React.ComponentClass<P>
  | React.ExoticComponent<P>

/** @public */
export type ElementType<P = any> = TagType | ComponentType<P>

/**
 * Resolves the props of a polymorphic component: the props of the element/component passed to `as`
 * (defaulting to the component's own element), with the component's own props assigned on top.
 *
 * @public
 */
export type Props<P extends EmptyProps, E extends ElementType<P>> = Assign<
  E extends TagType ? React.JSX.IntrinsicElements[E] : React.ComponentProps<E>,
  P & {as?: E}
>
