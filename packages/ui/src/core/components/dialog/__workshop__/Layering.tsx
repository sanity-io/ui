import {Box, Card, Code, Dialog, Layer, LayerProvider, useLayer} from '@sanity/ui'
import {useAction} from '@sanity/ui-workshop'

export default function LayeringStory(): React.JSX.Element {
  return (
    <Box padding={[4, 5, 6]}>
      <LayerProvider>
        <Layer id="a" zOffset={10}>
          <Card padding={2} shadow={2}>
            <DebugLayer />
          </Card>
        </Layer>
        <Layer id="b" zOffset={10}>
          <Card padding={2} shadow={2}>
            <DebugLayer />
          </Card>
        </Layer>
        <Dialog
          header="Layering example"
          id="layering-example"
          zOffset={100}
          onClose={useAction('onEscape')}
        >
          <Box padding={4}>
            <DebugLayer />
          </Box>
        </Dialog>
      </LayerProvider>
    </Box>
  )
}

function DebugLayer() {
  const layer = useLayer()

  return (
    <Code language="json" size={1}>
      {JSON.stringify(layer, null, 2)}
    </Code>
  )
}
