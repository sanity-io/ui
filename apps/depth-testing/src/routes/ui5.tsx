import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Divider,
  Heading,
  HStack,
  Link,
  Modal,
  Radio,
  Switch,
  Text,
  VStack,
} from '@sanity/ui'

import '@sanity/ui/styles.css'
import {useState} from 'react'

function Ui5() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Box margin={4}>
      <Heading as="h2" marginBottom={5}>
        UI 5
      </Heading>
      <Text as="p" marginBottom={4}>
        A measure of the USS Sanity’s DOM engines
      </Text>
      <Box marginY={5}>
        <Button text="Open a hailing frequency" onClick={() => setModalOpen(true)} />
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} header="Greetings, Admiral">
          <Modal.Content>
            <Text>I believe you’ll find everything is in order for the festivities.</Text>
          </Modal.Content>
        </Modal>
      </Box>
      <Card tone="neutral" density="loose">
        <Container size={2} marginLeft={0}>
          <VStack gap={[1, 2]}>
            <Checkbox name="checkboxes" label="Hey" defaultChecked />
            <Checkbox name="checkboxes" label="Ho" />
            <Card>
              <HStack gap={3}>
                <Radio name="radios" label="Let’s go" defaultChecked />
                <Radio name="radios" label="Let’s not go" />
              </HStack>
            </Card>
            <Switch label="Engage warp drive" />
          </VStack>
        </Container>
        <Divider marginY={4} />
        <Box marginY={3}>
          <HStack gap={3}>
            <Button density="loose" text="Make it so, Number One" />
            <Button
              density="loose"
              level="secondary"
              tone="critical"
              text="Belay that order, Commander"
            />
            <Link href="https://example.org">Refer to the Prime Directive</Link>
          </HStack>
        </Box>
      </Card>
    </Box>
  )
}

export default Ui5
