import {SquareIcon} from '@sanity/icons'
import {Button, Card, Container, Grid, Stack, Text} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'

const GAP = 4
const COLUMNS = 3

const DEFAULT_PROPS = {
  icon: SquareIcon,
  iconRight: SquareIcon,
} as const

export default function DisabledButtonStory() {
  const muted = useBoolean('Muted', false)

  return (
    <Card padding={5}>
      <Container width={2}>
        <Stack gap={4}>
          <Grid columns={COLUMNS} gap={GAP}>
            <Text size={1} weight="semibold">
              Default
            </Text>
            <Text size={1} weight="semibold">
              Ghost
            </Text>
            <Text size={1} weight="semibold">
              Bleed
            </Text>
          </Grid>

          <Stack gap={2}>
            <Grid columns={COLUMNS} gap={GAP}>
              <Stack gap={2}>
                <Button {...DEFAULT_PROPS} mode="default" muted={muted} text="Enabled" />
                <Button {...DEFAULT_PROPS} disabled mode="default" muted={muted} text="Disabled" />
              </Stack>

              <Stack gap={2}>
                <Button {...DEFAULT_PROPS} mode="ghost" muted={muted} text="Enabled" />
                <Button {...DEFAULT_PROPS} disabled mode="ghost" muted={muted} text="Disabled" />
              </Stack>

              <Stack gap={2}>
                <Button {...DEFAULT_PROPS} mode="bleed" muted={muted} text="Enabled" />
                <Button {...DEFAULT_PROPS} mode="bleed" disabled muted={muted} text="Disabled" />
              </Stack>
            </Grid>
          </Stack>
        </Stack>
      </Container>
    </Card>
  )
}
