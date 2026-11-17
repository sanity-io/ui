import type {ComponentPropsWithRef, ElementType} from 'react'

export type Polymorphic<T extends ElementType, Props extends object> = Props &
  Omit<
    T extends (props: infer AsProps, ...args: never) => unknown
      ? AsProps
      : ComponentPropsWithRef<T>,
    keyof Props
  >
