export function Square({children}: React.PropsWithChildren) {
  return (
    <div
      style={{
        backgroundImage:
          'radial-gradient(circle, var(--gray-100) 1px, transparent 1px), radial-gradient(circle, var(--gray-100) 1px, transparent 1px)',
        backgroundSize: '0.5rem 0.5rem',
        backgroundPosition: '0 0, calc(0.5rem / 2) calc(0.5rem / 2)',
        border: '1px solid var(--gray-100)',
        minHeight: 80,
        minWidth: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  )
}
