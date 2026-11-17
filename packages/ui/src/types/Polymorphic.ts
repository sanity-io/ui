import type {ComponentPropsWithRef, ElementType} from 'react'

export type Polymorphic<T extends ElementType, OwnProps extends object> = OwnProps &
  Omit<ComponentPropsWithRef<T>, keyof OwnProps>
