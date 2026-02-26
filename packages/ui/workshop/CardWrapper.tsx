import {
  type BgPattern,
  Card,
  CARD_TONES,
  type CardTone,
  type ContainerOwnProps,
  Stack,
} from '@sanity/ui'
import {useSelect} from '@sanity/ui-workshop'

export function CardWrapper({
  alignItems = 'center',
  children,
  justifyContent = 'center',
  pattern,
  tone = 'default',
  ...rest
}: {children: React.ReactNode; pattern?: BgPattern; tone?: CardTone} & ContainerOwnProps) {
  const cardTone = useSelect('Card tone', CARD_TONES, tone)

  return (
    <Card
      __unstable_pattern={pattern}
      alignItems={alignItems}
      display="flex"
      justifyContent={justifyContent}
      minHeight="full"
      tone={cardTone}
    >
      <Stack
        margin="auto"
        maxWidth={1}
        paddingX={[4, 5, 6]}
        paddingY={[5, 6, 7]}
        width="fill"
        {...rest}
      >
        {children}
      </Stack>
    </Card>
  )
}
