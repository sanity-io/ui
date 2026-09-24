import {useToast} from '@sanity/ui/toast'
import {useCallback, useEffect, useRef, useState} from 'react'

import {readImagePixels} from './imageFile'
import {extractImagePalette, ImagePalette} from './imagePalette'

/**
 * Extracts the palette of image files on device and hands it to `onPalette`,
 * along with the file it came from. Failures end up as a toast.
 *
 * @internal
 */
export function useImagePalette(onPalette: (palette: ImagePalette, file: File) => void): {
  busy: boolean
  pickImage: (file: File) => void
} {
  const toast = useToast()
  const [busy, setBusy] = useState(false)
  const onPaletteRef = useRef(onPalette)
  const mountedRef = useRef(true)
  // Picks are numbered so that a slow earlier image cannot overwrite a later
  // pick once its extraction finishes
  const latestPickRef = useRef(0)

  useEffect(() => {
    onPaletteRef.current = onPalette
  }, [onPalette])

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  }, [])

  const pickImage = useCallback(
    (file: File) => {
      const pick = ++latestPickRef.current

      setBusy(true)

      // Whether this pick still matters: it is the latest one and the
      // component that asked for it is still around
      const isCurrent = () => mountedRef.current && latestPickRef.current === pick

      const extract = async () => {
        const palette = extractImagePalette(await readImagePixels(file))

        if (!isCurrent()) return

        if (Object.values(palette).every((swatch) => swatch === null)) {
          toast.push({status: 'warning', title: 'Found no colors in that image'})
        } else {
          onPaletteRef.current(palette, file)
        }
      }

      extract()
        .catch(() => {
          if (isCurrent()) toast.push({status: 'error', title: 'Could not read that image'})
        })
        .finally(() => {
          if (isCurrent()) setBusy(false)
        })
    },
    [toast],
  )

  return {busy, pickImage}
}
