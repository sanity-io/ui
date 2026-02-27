import {LaunchIcon} from '@sanity/icons'
import {Button} from '@sanity/ui'
import {memo, useMemo} from 'react'

import {buildFrameUrl} from '../helpers'
import {useWorkshop} from '../useWorkshop'

/** @internal */
export const OpenCanvasButton = memo(function OpenCanvasButton() {
  const {frameUrl, path, payload, scheme, zoom, viewport} = useWorkshop()

  const canvasUrl = useMemo(
    () =>
      path === '/'
        ? undefined
        : buildFrameUrl({baseUrl: frameUrl, path, payload, scheme, zoom, viewport}),
    [frameUrl, path, payload, scheme, zoom, viewport],
  )

  return (
    <Button
      as={canvasUrl ? 'a' : 'button'}
      disabled={!canvasUrl}
      fontSize={1}
      href={canvasUrl}
      iconRight={LaunchIcon}
      mode="ghost"
      padding={2}
      rel="noopener noreferrer"
      target="_blank"
      text="Open story"
    />
  )
})
