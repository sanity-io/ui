import {useEffect, useState} from 'react'

/**
 * @public
 */
export function usePrefersDark(): boolean {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')

    setDark(mq.matches)

    const handleChange = () => setDark(mq.matches)

    mq.addEventListener('change', handleChange)

    return () => mq.removeEventListener('change', handleChange)
  }, [])

  return dark
}
