import {useBoolean} from '@sanity/ui-workshop'
import {useCallback, useMemo, useState} from 'react'
import {BoundaryElementProvider} from '../../../utils'
import {Button} from '../../button'
import {Card} from '../../card'
import {Flex} from '../../flex'
import {Text} from '../../text'
import {Popover, PopoverProps} from '../popover'
import {PopoverProvider} from '../popoverProvider'
import {usePopover} from '../usePopover'

function PopoverComponent({
  referenceElement,
  boundaryElement,
}: {
  referenceElement: PopoverProps['referenceElement']
  boundaryElement: PopoverProps['boundaryElement']
}) {
  return (
    <Popover
      open
      content={
        <Card padding={5} radius={3}>
          <Text weight="semibold" muted>
            I should follow my reference element <br />
            when the parent container is resized.
          </Text>
        </Card>
      }
      referenceElement={referenceElement}
      boundaryElement={boundaryElement}
    />
  )
}

export default function PositionStory() {
  return (
    <PopoverProvider>
      <InnerStory />
    </PopoverProvider>
  )
}

function InnerStory() {
  const [size, setSize] = useState(0.5)
  const [referenceElement, setReferenceElement] = useState<PopoverProps['referenceElement']>(null)
  const [boundaryElement, setBoundaryElement] = useState<PopoverProps['boundaryElement']>(null)
  const updatePositionOnClick = useBoolean('Force popover update on size change', false, 'Props')
  const {forceUpdate} = usePopover()

  // Random number between 0.2 and 5
  const handleSetSize = useCallback(() => {
    const s = Math.random() * (0.5 - 0.2) + 0.2

    setSize(s)

    if (updatePositionOnClick) {
      forceUpdate()
    }
  }, [updatePositionOnClick])

  const element = useMemo(() => {
    return (
      <Card
        as="span"
        border
        radius={2}
        style={{display: 'inline', padding: '0.4, 1'}}
        ref={setReferenceElement}
        tone="primary"
      >
        nunc
      </Card>
    )
  }, [])

  return (
    <>
      <PopoverComponent referenceElement={referenceElement} boundaryElement={boundaryElement} />

      <BoundaryElementProvider element={boundaryElement as HTMLDivElement}>
        <Flex height="fill">
          <Card borderRight flex={size} tone="transparent">
            <Flex align="center" justify="center" height="fill">
              <Button text="Change size" onClick={handleSetSize} />
            </Flex>
          </Card>

          <Card flex={1} ref={setBoundaryElement}>
            <Flex height="fill" padding={5}>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies, nisl ut
                aliquet ultricies, nunc sapien ultricies tortor, nec tincidunt elit risus ac nunc.
                Nulla facilisi. Sed aliquam, {element} eget aliquam ultricies, diam diam aliquam
                augue, eget ultricies nisl nunc eget nunc. Nulla facilisi. Sed aliquam,
              </Text>
            </Flex>
          </Card>
        </Flex>
      </BoundaryElementProvider>
    </>
  )
}
