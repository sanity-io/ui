import {useEffect, useMemo, useState} from 'react'
import {_getMediaManager} from '../lib/media'
import {useTheme} from '../theme'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function useMediaIndex(): number {
  const theme = useTheme()
  const {media} = theme.sanity
  const manager = useMemo(() => _getMediaManager(media), [media])
  const [index, setIndex] = useState(manager.getCurrentIndex)

  useEffect(() => manager.subscribe(setIndex), [manager])

  return index
}
