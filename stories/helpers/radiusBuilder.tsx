import {ReactNode} from 'react'
import {studioTheme} from '../../src/theme'
import {Radius} from '../../src/types'

interface RadiusBuilderProps {
  renderItem: ({radius}: {radius: Radius}) => ReactNode
}

export const radiusBuilder = ({renderItem}: RadiusBuilderProps): ReactNode => {
  const radii = [...Array(studioTheme.radius.length).keys(), 'full'] as Radius[]

  return <>{radii.map((radius) => renderItem({radius}))}</>
}
