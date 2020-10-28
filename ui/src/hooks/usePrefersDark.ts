import {useEffect, useState} from 'react'

export function usePrefersDark() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')

    setDark(mq.matches)

    const handleChange = () => {
      console.log('change', mq.matches)
      setDark(mq.matches)
    }

    mq.addListener(handleChange)

    return () => mq.removeListener(handleChange)
  }, [])

  return dark
}
