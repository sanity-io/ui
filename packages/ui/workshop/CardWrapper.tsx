import {Card, type ContainerOwnProps, Stack} from '@sanity/ui'
import {type BgPattern, CARD_TONES, type CardTone} from '@sanity/ui/theme'
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
      paddingX={[4, 5, 6]}
      paddingY={[5, 6, 7]}
      tone={cardTone}
    >
      <Stack margin="auto" maxWidth={1} width="fill" {...rest}>
        {children}
      </Stack>
    </Card>
  )
}
