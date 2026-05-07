import type {ComponentPropsWithRef} from 'react'

export function Square({children, style}: ComponentPropsWithRef<'div'>) {
  return (
    <div
      style={{
        backgroundImage:
          'radial-gradient(circle, light-dark(var(--gray-100), var(--gray-700)) 1px, transparent 1px), radial-gradient(circle, light-dark(var(--gray-100), var(--gray-700)) 1px, transparent 1px)',
        backgroundSize: '0.5rem 0.5rem',
        backgroundPosition: '0 0, calc(0.5rem / 2) calc(0.5rem / 2)',
        border: '1px solid light-dark(var(--gray-200), var(--gray-600))',
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
