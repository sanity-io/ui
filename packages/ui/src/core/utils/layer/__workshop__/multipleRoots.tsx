import {Card, Layer, LayerProvider, Stack} from '@sanity/ui'

import {LayerDebugInfo} from './_debug'

export default function MultipleRootsStory() {
  return (
    // oxlint-disable-next-line no-deprecated
    <Stack space={4}>
      <LayerProvider zOffset={100}>
        <Card padding={3} shadow={1}>
          {/* oxlint-disable-next-line no-deprecated */}
          <Stack space={3}>
            <LayerDebugInfo />
            <Layer>
              <Card padding={3} shadow={1}>
                {/* oxlint-disable-next-line no-deprecated */}
                <Stack space={3}>
                  <LayerDebugInfo />
                  <Layer>
                    <Card padding={3} shadow={1}>
                      <LayerDebugInfo />
                    </Card>
                  </Layer>
                </Stack>
              </Card>
            </Layer>
          </Stack>
        </Card>
      </LayerProvider>

      <LayerProvider zOffset={200}>
        <Card as={Layer} padding={3} shadow={5} style={{top: -50, left: 30}}>
          {/* oxlint-disable-next-line no-deprecated */}
          <Stack space={3}>
            <LayerDebugInfo />
            <Layer>
              <Card padding={3} shadow={1}>
                {/* oxlint-disable-next-line no-deprecated */}
                <Stack space={3}>
                  <LayerDebugInfo />
                  <Layer>
                    <Card padding={3} shadow={1}>
                      <LayerDebugInfo />
                    </Card>
                  </Layer>
                </Stack>
              </Card>
            </Layer>
          </Stack>
        </Card>
      </LayerProvider>
    </Stack>
  )
}
