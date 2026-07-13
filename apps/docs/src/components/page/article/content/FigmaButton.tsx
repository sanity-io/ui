import {Button} from '@sanity/ui'
import {stegaClean} from 'next-sanity'
import React from 'react'

import {FigmaLogo} from '@/components/assets'
import {FigmaButtonData} from '@/lib/data'

export function FigmaButton(props: {data: FigmaButtonData}) {
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
