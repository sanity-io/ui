import {SanityMonogram} from '@sanity/logos'
import React from 'react'

export default function Logo() {
  return (
    <SanityMonogram
      style={{
        display: 'block',
        height: 'calc(2rem - 5px)',
        margin: -8,
      }}
    />
  )
}
