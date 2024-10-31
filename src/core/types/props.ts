import type {ComponentProps, ElementType} from 'react'

export interface PolymorphicProps {
  as?: ElementType
}

/** @public */
export type ElementProps<E extends ElementType> = Omit<ComponentProps<E>, 'as' | 'ref'>

/** @public */
export type Assign<T, U> = Omit<T, keyof U> & U

/** @public */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type Props<P extends {} = {}, E extends ElementType = ElementType> = Assign<
  ElementProps<E> & PolymorphicProps,
  P
>
