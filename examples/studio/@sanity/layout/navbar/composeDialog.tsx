import {Box, Card, CardProvider, Dialog, Flex, Stack, Text} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 0.75em;
`

export function ComposeDialog({onClose}: {onClose: () => void}) {
  return (
    <CardProvider scheme="light">
      <Dialog header="New document" id="compose-dialog" onClose={onClose} width={2}>
        <Box padding={4}>
          <Grid>
            <TemplatePreview />
            <TemplatePreview />
            <TemplatePreview />
            <TemplatePreview />
            <TemplatePreview />
            <TemplatePreview />
            <TemplatePreview />
            <TemplatePreview />
            <TemplatePreview />
            <TemplatePreview />
            <TemplatePreview />
            <TemplatePreview />
            <TemplatePreview />
            <TemplatePreview />
            <TemplatePreview />
            <TemplatePreview />
            <TemplatePreview />
          </Grid>
        </Box>
      </Dialog>
    </CardProvider>
  )
}

function TemplatePreview() {
  return (
    <Card as="button" padding={3} radius={2} shadow={1}>
      <Flex align="center">
        <Box>
          <Card radius={1} style={{width: 41, height: 41}} tone="transparent" />
        </Box>
        <Box flex={1} marginLeft={2}>
          <Stack space={2}>
            <Text style={{fontWeight: 500}}>Title</Text>
            <Text muted size={1}>
              Subtitle
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Card>
  )
}
