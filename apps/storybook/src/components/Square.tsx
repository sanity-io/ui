import type {ComponentPropsWithRef} from 'react'

export function Square({children, style}: ComponentPropsWithRef<'div'>) {
  return (
    <div
      style={{
        border: '1px solid var(--separator-low, light-dark(var(--gray-200), var(--gray-600)))',
        borderRadius: 'var(--radius-2)',
        minHeight: 80,
        minWidth: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
