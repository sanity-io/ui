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
    as: canvasUrl ? 'a' : 'button',
    disabled: !canvasUrl,
    fontSize: 1,
    href: canvasUrl,
    iconRight: LaunchIcon,
    mode: 'ghost',
    padding: 2,
    rel: 'noopener noreferrer',
    target: '_blank',
    text: 'Open story',
  }

  return <Button {...buttonProps} />
}
