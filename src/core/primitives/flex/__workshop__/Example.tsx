import {Card, Code, Flex} from '@sanity/ui'
import {useSelect} from '@sanity/ui-workshop'

import {WORKSHOP_FLEX_DIRECTION_OPTIONS} from '$workshop'

import {debugCard} from './styles.css'

export default function ExampleStory(): React.JSX.Element {
  // @ts-expect-error - TODO: fix this
  const direction = useSelect('Direction', WORKSHOP_FLEX_DIRECTION_OPTIONS, 'row')

  return (
    <Flex
      // @ts-expect-error - TODO: fix this
      direction={direction}
      height="fill"
      style={{width: '100%'}}
    >
      <Card className={debugCard} flex={1}>
        <Code size={1}>1</Code>
      </Card>

      <Card className={debugCard} flex={[1, 2, 3]}>
        <Code size={1}>[1,2,3]</Code>
      </Card>

      <Card className={debugCard} flex={['none', 'none', 1]}>
        <Code size={1}>['none', 'none', 1]</Code>
      </Card>
    </Flex>
  )
}
