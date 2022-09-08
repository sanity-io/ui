export function ready(opts?: {timeout?: number}) {
  const timeout = opts?.timeout || 10000

  return new Promise<void>((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve()

      return
    }

    const startTime = Date.now()

    const tick = () => {
      const duration = Date.now() - startTime

      if (duration > timeout) {
        reject(new Error('IDE.ready: timeout'))

        return
      }

      if ((window as any).Babel !== undefined) {
        resolve()

        return
      }

      setTimeout(tick, 100)
    }

    setTimeout(tick, 100)
  })
}
