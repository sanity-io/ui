import {CubeIcon} from '@sanity/icons'
import {Box, Card, LayerProvider, Menu, MenuItem} from '@sanity/ui'
import {THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'
import {useBoolean, useSelect} from '@sanity/ui-workshop'

import {WORKSHOP_CARD_TONE_OPTIONS} from '../../../__workshop__/constants'

export default function TonesStory() {
  const disabled = useBoolean('Disabled', false, 'Props')
  const parentTone = useSelect('Parent tone', WORKSHOP_CARD_TONE_OPTIONS, 'default', 'Props')

  return (
    <LayerProvider>
      <Box padding={[4, 5, 6]}>
        <Card radius={3} shadow={3} tone={parentTone}>
          <Menu>
            {THEME_COLOR_STATE_TONES.map((tone) => (
              <MenuItem disabled={disabled} icon={CubeIcon} key={tone} text={tone} tone={tone} />
            ))}
          </Menu>
        </Card>
      </Box>
    </LayerProvider>
  )
}
