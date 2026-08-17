'use client'

import {Button} from '@sanity/ui'
import {ReactElement} from 'react'

import {FigmaLogo} from '@/components/assets'

export function FigmaButton(props: {title?: string; url: string}): ReactElement {
  const {title, url} = props

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
