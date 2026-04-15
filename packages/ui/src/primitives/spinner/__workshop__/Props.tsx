import {Flex, FONT_TEXT_SIZE, Spinner} from '@sanity/ui'
import {useBoolean, useSelect} from '@sanity/ui-workshop'

export default function Props(): React.JSX.Element {
  const muted = useBoolean('Muted', false)
  const size = useSelect('Size', FONT_TEXT_SIZE, 2)

  return (
    <Flex align="center" height="fill" justify="center">
      <Spinner muted={muted} size={size} />
    </Flex>
  )
}
