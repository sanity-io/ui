import {useEffect, useMemo, useState} from 'react'

export function usePrefersDark() {
  const match = useMemo(
    () =>
      typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null,
    []
  )

  const [dark, setDark] = useState(match ? match.matches : false)

  useEffect(() => {
    if (!match) return undefined

    const handleChange = () => setDark(match.matches)

    match.addListener(handleChange)

    return () => match.removeListener(handleChange)
  }, [match])

  return dark
}
