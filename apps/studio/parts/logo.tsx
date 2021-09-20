import {SanityMonogram} from '@sanity/logos'
import React from 'react'

export default function Logo() {
  return (
    <SanityMonogram
      style={{
        display: 'block',
        height: 'calc(2rem - 7px)',
        margin: 'calc(-0.5rem + 4px) auto',
      }}
    />
  )
}
