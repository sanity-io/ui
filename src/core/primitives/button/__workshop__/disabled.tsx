import {SquareIcon} from '@sanity/icons'
import {Card} from '../../card/card'
import {Container} from '../../container/container'
import {Grid} from '../../grid/grid'
import {Stack} from '../../stack/stack'
import {Text} from '../../text/text'
import {Button, ButtonProps} from '../button'

const GAP = 4
const COLUMNS = 3

const DEFAULT_PROPS: ButtonProps = {
  icon: SquareIcon,
  iconRight: SquareIcon,
}

function Layout() {
  return (
    <Container width={2}>
      <Stack space={4}>
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

        <Stack space={2}>
          <Grid columns={COLUMNS} gap={GAP}>
            <Stack space={2}>
              <Button {...DEFAULT_PROPS} mode="default" text="Enabled" />
              <Button {...DEFAULT_PROPS} disabled mode="default" text="Disabled" />
              <Button {...DEFAULT_PROPS} disabled mode="default" muted text="Disabled (muted)" />
            </Stack>

            <Stack space={2}>
              <Button {...DEFAULT_PROPS} mode="ghost" text="Enabled" />
              <Button {...DEFAULT_PROPS} disabled mode="ghost" text="Disabled" />
              <Button {...DEFAULT_PROPS} disabled mode="ghost" muted text="Disabled (muted)" />
            </Stack>

            <Stack space={2}>
              <Button {...DEFAULT_PROPS} mode="bleed" text="Enabled" />
              <Button {...DEFAULT_PROPS} mode="bleed" disabled text="Disabled" />
              <Button {...DEFAULT_PROPS} disabled mode="bleed" muted text="Disabled (muted)" />
            </Stack>
          </Grid>
        </Stack>
      </Stack>
    </Container>
  )
}

export default function DisabledButtonStory() {
  return (
    <Stack>
      <Stack space={4}>
        <Card padding={5} scheme="light">
          <Layout />
        </Card>

        <Card padding={5} scheme="dark">
          <Layout />
        </Card>
      </Stack>
    </Stack>
  )
}
