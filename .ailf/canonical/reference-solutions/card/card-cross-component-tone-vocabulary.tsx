import {TrashIcon} from '@sanity/icons/Trash'
import {WarningOutlineIcon} from '@sanity/icons/WarningOutline'
import {Badge, Button, Card, Flex, Heading, Text} from '@sanity/ui'

// tone="critical" is valid on all three, but the vocabularies are not the same size:
//   Card tone:   neutral | positive | suggest | caution | critical
//   Badge tone:  neutral | positive | suggest | caution | critical
//   Button tone: neutral | critical              (narrower than Card and Badge)
// There is no "default" or "primary" tone in v5.
// Tone is only the colour channel: the Badge carries an icon, and the Card message leads
// with the state in words.
export function DeleteConfirmation() {
  return (
    <Card tone="critical" density="regular">
      <Flex flexDirection="column" gap={3}>
        <Flex alignItems="center" gap={2} flexWrap="wrap">
          <Heading as="h2" size={1}>
            Delete document
          </Heading>
          <Badge tone="critical" iconStart={WarningOutlineIcon} text="Permanent" />
        </Flex>
        <Text size={1}>Warning: deleting this document can’t be undone.</Text>
        <Flex gap={2} justifyContent="flex-end" flexWrap="wrap">
          {/* v5 Button uses `level`, not v3's `mode`. Omitting tone means neutral. */}
          <Button level="secondary" text="Cancel" />
          <Button level="primary" tone="critical" iconStart={TrashIcon} text="Delete document" />
        </Flex>
      </Flex>
    </Card>
  )
}
