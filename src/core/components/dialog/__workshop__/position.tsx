import {ArrowDownIcon, ArrowUpIcon} from '@sanity/icons'
import {Box, Dialog, LayerProvider, Stack, Text} from '@sanity/ui'
import {useBoolean, useSelect} from '@sanity/ui-workshop'

import {WORKSHOP_DIALOG_POSITION_OPTIONS} from '$workshop'

export default function PositionStory(): React.JSX.Element {
  const open = useBoolean('Open', true)
  const position = useSelect('Position', WORKSHOP_DIALOG_POSITION_OPTIONS)

  return (
    <Box padding={4}>
      <Box style={{padding: 'calc(100vh - 100px) 0'}}>
        <Stack gap={3}>
          <Text align="center">
            <ArrowUpIcon />
          </Text>
          <Text align="center">Scrollable</Text>
          <Text align="center">
            <ArrowDownIcon />
          </Text>
        </Stack>

        <LayerProvider>
          {open && <Dialog header="Position example" id="position-example" position={position} />}
        </LayerProvider>
      </Box>
    </Box>
  )
}
