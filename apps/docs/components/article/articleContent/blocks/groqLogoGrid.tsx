import {GroqLogo, GroqMonogram} from '@sanity/logos'
import {LogoGrid} from '../logoGrid'

const logos: {component: React.ComponentType; name: string}[] = [
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
