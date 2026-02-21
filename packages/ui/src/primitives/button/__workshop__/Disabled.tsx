import {ArrowLeftIcon, ArrowRightIcon} from '@sanity/icons'
import {Button, type ButtonProps, Stack, Text} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'

import {CardWrapper} from '$workshop'

const sharedProps: ButtonProps<'button'> = {
  icon: ArrowLeftIcon,
  iconRight: ArrowRightIcon,
  justify: 'space-between',
}

export default function DisabledButtonStory(): React.JSX.Element {
  const muted = useBoolean('Muted', false)

  return (
    <CardWrapper gap={5} width={0}>
      <Stack gap={3}>
        <Text size={1} weight="medium">
          Default button
        </Text>
        <Button {...sharedProps} mode="default" muted={muted} text="Enabled" />
        <Button {...sharedProps} disabled mode="default" muted={muted} text="Disabled" />
      </Stack>

      <Stack gap={3}>
        <Text size={1} weight="medium">
          Ghost button
        </Text>
        <Button {...sharedProps} mode="ghost" muted={muted} text="Enabled" />
        <Button {...sharedProps} disabled mode="ghost" muted={muted} text="Disabled" />
      </Stack>

      <Stack gap={3}>
        <Text size={1} weight="medium">
          Bleed button
        </Text>
        <Button {...sharedProps} mode="bleed" muted={muted} text="Enabled" />
        <Button {...sharedProps} disabled mode="bleed" muted={muted} text="Disabled" />
      </Stack>
    </CardWrapper>
  )
}
