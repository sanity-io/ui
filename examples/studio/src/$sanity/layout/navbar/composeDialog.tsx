import {Box, Card, Dialog, Flex, Stack, Text, ThemeColorProvider} from '@sanity/ui'
import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 0.75em;
`

export function ComposeDialog({onClose}: {onClose: () => void}) {
  return (
    <ThemeColorProvider scheme="light">
      <Dialog header="New document" id="compose-dialog" onClose={onClose} width={2}>
        <Box padding={4}>
          <Grid>
            <TemplatePreview onClick={onClose} />
            <TemplatePreview onClick={onClose} />
            <TemplatePreview onClick={onClose} />
            <TemplatePreview onClick={onClose} />
            <TemplatePreview onClick={onClose} />
            <TemplatePreview onClick={onClose} />
            <TemplatePreview onClick={onClose} />
            <TemplatePreview onClick={onClose} />
            <TemplatePreview onClick={onClose} />
            <TemplatePreview onClick={onClose} />
            <TemplatePreview onClick={onClose} />
            <TemplatePreview onClick={onClose} />
            <TemplatePreview onClick={onClose} />
            <TemplatePreview onClick={onClose} />
            <TemplatePreview onClick={onClose} />
            <TemplatePreview onClick={onClose} />
            <TemplatePreview onClick={onClose} />
          </Grid>
        </Box>
      </Dialog>
    </ThemeColorProvider>
  )
}

function TemplatePreview({onClick}: {onClick: () => void}) {
  return (
    <Card as="button" border onClick={onClick} padding={3} radius={2}>
      <Flex align="center">
        <Box flex={1} marginRight={2}>
          <Stack space={2}>
            <Text style={{fontWeight: 500}}>Title</Text>
            <Text muted size={1}>
              Subtitle
            </Text>
          </Stack>
        </Box>
        <Box>
          <Card radius={1} style={{width: 41, height: 41}} tone="transparent" />
        </Box>
      </Flex>
    </Card>
  )
}
