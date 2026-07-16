import {Button} from '@sanity/ui'
import {stegaClean} from 'next-sanity'

import {FigmaLogo} from '@/components/assets'
import type {PortableTextValue} from '@/types'

export function FigmaButton(props: {
  data: Extract<PortableTextValue[number], {_type: 'content.figmaButton'}>
}) {
  const {title, url} = stegaClean(props.data)

  if (!url) return null

  return (
    <Button
      as="a"
      href={url}
      icon={FigmaLogo}
      mode="ghost"
      rel="noreferrer"
      target="_blank"
      text={title}
    />
  )
}
