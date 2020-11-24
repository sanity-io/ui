import {GroqLogo, GroqMonogram} from '@sanity/logos'
import React from 'react'
import {LogoGrid} from '../logoGrid'

const logos = [
  {
    component: GroqLogo,
    name: 'GroqLogo',
  },
  {
    component: GroqMonogram,
    name: 'GroqMonogram',
  },
]

export function GroqLogoGrid() {
  return <LogoGrid logos={logos} />
}
