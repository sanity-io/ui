import {Button, Card, Popover, Text} from '@sanity/ui'

export default function OpenOnMountStory(): React.JSX.Element {
  return (
    <Card height="fill" padding={3} sizing="border">
      <Popover content={<Text size={1}>popover content</Text>} open padding={3} tone="default">
        <Button text="This button is the popover reference" />
      </Popover>
    </Card>
  )
}
