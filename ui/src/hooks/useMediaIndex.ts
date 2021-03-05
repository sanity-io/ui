import {useEffect, useState} from 'react'
import {useTheme} from '../theme'

function _getMediaQuery(media: number[], index: number) {
  return index === 0
    ? `(max-width: ${media[index] - 1}px)`
    : `screen and (min-width: ${media[index - 1]}px) and (max-width: ${media[index] - 1}px)`
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function useMediaIndex() {
  const theme = useTheme()
  const {media} = theme.sanity

  // Get initial index
  const [index, setIndex] = useState(() => {
    if (typeof window !== 'undefined') {
      for (let idx = 0; idx < media.length; idx += 1) {
        const mq = window.matchMedia(_getMediaQuery(media, idx))

        if (mq.matches) {
          return idx
        }
      }
    }

    return 0
  })

  useEffect(() => {
    const disposeFns = media.map((_, idx) => {
      const mq = window.matchMedia(_getMediaQuery(media, idx))

      const handleChange = () => {
        if (mq.matches) setIndex(idx)
      }

      mq.addEventListener('change', handleChange)

      return () => {
        mq.removeEventListener('change', handleChange)
      }
    })

    return () => {
      disposeFns.forEach((disposeFn) => disposeFn())
    }
  }, [media])

  return index
}
