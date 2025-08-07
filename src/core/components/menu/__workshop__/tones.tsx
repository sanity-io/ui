import {CubeIcon} from '@sanity/icons'
import {Box, Card, LayerProvider, Menu, MenuItem} from '@sanity/ui'
import {ELEMENT_TONES} from '@sanity/ui/theme'
import {useBoolean, useSelect} from '@sanity/ui-workshop'

import {WORKSHOP_CARD_TONE_OPTIONS} from '$workshop'

export default function TonesStory(): React.JSX.Element {
  const disabled = useBoolean('Disabled', false)
  // @ts-expect-error - TODO: fix this
  const parentTone = useSelect('Parent tone', WORKSHOP_CARD_TONE_OPTIONS, 'default')

  return (
    <LayerProvider>
      <Box padding={[4, 5, 6]}>
        <Card
          radius={3}
          shadow={3}
          // @ts-expect-error - TODO: fix this
          tone={parentTone}
        >
          <Menu>
            {ELEMENT_TONES.map((tone) => (
              <MenuItem disabled={disabled} icon={CubeIcon} key={tone} text={tone} tone={tone} />
            ))}
          </Menu>
        </Card>
      </Box>
    </LayerProvider>
  )
}
