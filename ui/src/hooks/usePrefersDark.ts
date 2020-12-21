import {useEffect, useState} from 'react'

export function usePrefersDark() {
  const [dark, setDark] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')

    setDark(mq.matches)

    const handleChange = () => setDark(mq.matches)

    mq.addEventListener('change', handleChange)

    return () => mq.removeEventListener('change', handleChange)
  }, [])

  return dark
}
