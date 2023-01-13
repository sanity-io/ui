import {Button, Card, Popover, Text} from '@sanity/ui'

export default function OpenOnMountStory() {
  return (
    <Card height="fill" padding={3} sizing="border">
      <Popover content={<Text>popover content</Text>} open padding={3}>
        <Button text="This button is the popover reference" />
      </Popover>
    </Card>
  )
}
