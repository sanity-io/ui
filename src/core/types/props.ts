/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type {ComponentClass, ComponentProps, ExoticComponent, FunctionComponent, JSX} from 'react'

/**
 * Assign properties from `U` to `T`, excluding properties that already exist in `T`.
 *
 * @public
 */
export type Assign<T extends {}, U extends {}> = Omit<T, keyof U> & U

/** @public */
export type EmptyProps = {}

/** @public */
export type TagType = keyof JSX.IntrinsicElements

/** @public */
export type ComponentType<P = any> = FunctionComponent<P> | ComponentClass<P> | ExoticComponent<P>

/** @public */
export type ElementType<P> = TagType | ComponentType<P>

/** @public */
export type Props<P extends EmptyProps, E extends ElementType<P>> = Assign<
  E extends TagType ? JSX.IntrinsicElements[E] : ComponentProps<E>,
  P & {as?: E}
>
