import type {ComponentPropsWithRef, ElementType} from 'react'

export type Polymorphic<T extends ElementType, Props extends object> = Props &
  Omit<ComponentPropsWithRef<T>, keyof Props>
