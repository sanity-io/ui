import {SanityLogo, SanityMonogram} from '@sanity/logos'
import {LogoGrid} from '../logoGrid'

const logos: {component: React.ComponentType; name: string}[] = [
  {
    component: SanityLogo,
    name: 'SanityLogo',
  },
  {
    component: SanityMonogram,
    name: 'SanityMonogram',
  },
]

export function SanityLogoGrid() {
  return <LogoGrid logos={logos} />
}
