import {SparklesIcon} from '@sanity/icons/Sparkles'
import {Button, Card, Flex, Text} from '@sanity/ui'

// tone="suggest" exists on the v5 Card (neutral | positive | suggest | caution | critical).
// It is NOT a Button tone — v5 Button only accepts neutral | critical.
// v5 Button takes the icon via `iconStart`/`iconEnd`, not v3's `icon`.
export function AiHint({suggestion}: {suggestion: string}) {
  return (
    <Card tone="suggest" density="compact">
      <Flex alignItems="center" justifyContent="space-between" gap={2}>
        <Text size={1}>Suggested: {suggestion}</Text>
        <Button level="tertiary" text="Apply" iconStart={SparklesIcon} />
      </Flex>
    </Card>
  )
}
