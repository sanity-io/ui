import {Layer} from '@sanity/ui'

import {LayerDebugInfo} from './_debug'

export default function ResponsiveZOffsetStory(): React.JSX.Element {
  return (
    <Layer
      id="responsive-layer"
      padding={[1, 2, 3, 4, 5, 6, 7]}
      shadow={1}
      sizing="border"
      zOffset={[1, 2, 3, 4, 5, 6, 7]}
    >
      <LayerDebugInfo />
    </Layer>
  )
}
