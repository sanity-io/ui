import {LaunchIcon} from '@sanity/icons'
import {Button, type ButtonProps} from '@sanity/ui'
import {useMemo} from 'react'

import {buildFrameUrl} from '../helpers'
import {useWorkshop} from '../useWorkshop'

/** @internal */
export function OpenCanvasButton() {
  const {frameUrl, path, payload, zoom, viewport} = useWorkshop()

  const canvasUrl = useMemo(
    () =>
      path === '/' ? undefined : buildFrameUrl({baseUrl: frameUrl, path, payload, zoom, viewport}),
    [frameUrl, path, payload, zoom, viewport],
  )

  const buttonProps: ButtonProps = {
    iconRight: LaunchIcon,
    mode: 'ghost',
    padding: 2,
    text: 'Open story',
  }

  if (canvasUrl) {
    buttonProps.as = 'a'
    buttonProps['href'] = canvasUrl
    buttonProps['rel'] = 'noopener noreferrer'
    buttonProps['target'] = '_blank'
  } else {
    buttonProps['disabled'] = true
  }

  return <Button {...buttonProps} />
}
