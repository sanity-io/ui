import {unwrapData, WrappedValue} from '@sanity/react-loader/jsx'
import {Button} from '@sanity/ui'
import React from 'react'

import {FigmaLogo} from '@/components/assets'
import {FigmaButtonData} from '@/lib/data'

export function FigmaButton(props: {data: WrappedValue<FigmaButtonData>}) {
  const {title, url} = unwrapData(props.data)

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
