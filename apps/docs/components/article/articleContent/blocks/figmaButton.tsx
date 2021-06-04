import {Button} from '@sanity/ui'
import React from 'react'
import {FigmaLogo} from '$components/assets/figmaLogo'

export function FigmaButton(props: any) {
  const {url} = props.node || {}

  if (!url) {
    return null
  }

  return (
    <Button
      as="a"
      href={url}
      icon={FigmaLogo}
      mode="ghost"
      rel="noreferrer"
      target="_blank"
      text={props.node.title}
    />
  )
}
