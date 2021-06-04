import {ErrorOutlineIcon, ToggleArrowRightIcon, WarningOutlineIcon} from '@sanity/icons'
import {Box, Card, CardTone, Code, Flex, Stack, Text} from '@sanity/ui'
import axe, {AxeResults} from 'axe-core'
import React, {createElement, useCallback, useState} from 'react'

function Details(props: {children?: React.ReactNode; summary?: React.ReactNode; tone?: CardTone}) {
  const {children, summary, tone} = props
  const [open, setOpen] = useState(false)

  const toggleOpen = useCallback(() => setOpen((o) => !o), [])

  return (
    <Card radius={2} tone={tone}>
      <Flex onClick={toggleOpen} padding={2}>
        <Box marginRight={1}>
          <Text size={1}>
            <ToggleArrowRightIcon style={{transform: open ? 'rotate(90deg)' : 'rotate(0)'}} />
          </Text>
        </Box>
        <Box flex={1}>
          <Text size={1} weight="semibold">
            {summary}
          </Text>
        </Box>
      </Flex>

      <div hidden={!open}>{children}</div>
    </Card>
  )
}

export function InspectAxeResults(props: {axeResults: AxeResults}): React.ReactElement {
  const {axeResults} = props
  const violations = axeResults.violations.filter((node) => node.id !== 'page-has-heading-one')
  const incomplete = axeResults.incomplete

  return (
    <Stack padding={3} space={1}>
      <Details summary={<>Violations ({violations.length})</>} tone="critical">
        <Stack marginTop={1} padding={2} paddingTop={0} space={1}>
          {violations.map((node) => (
            <AxeResultPreview icon={ErrorOutlineIcon} key={node.id} result={node} />
          ))}
        </Stack>
      </Details>

      <Details summary={<>Incomplete ({incomplete.length})</>} tone="caution">
        <Stack marginTop={1} padding={2} paddingTop={0} space={1}>
          {incomplete.map((node) => (
            <AxeResultPreview icon={WarningOutlineIcon} key={node.id} result={node} />
          ))}
        </Stack>
      </Details>

      <Code hidden language="json" size={1}>
        {JSON.stringify(axeResults, null, 2)}
      </Code>
    </Stack>
  )
}

function AxeResultPreview(props: {icon: React.ComponentType; result: axe.Result}) {
  const {icon, result: node} = props

  return (
    <Card padding={3} radius={1} shadow={1} tone="inherit">
      <Flex>
        <Box marginRight={4}>
          <Text size={1}>{createElement(icon)}</Text>
        </Box>
        <Stack space={3}>
          <Text size={1} weight="semibold">
            {node.help}
          </Text>
          <Text muted size={1}>
            {node.description}
          </Text>
        </Stack>
      </Flex>

      <Stack marginTop={4}>
        {node.nodes.map((n, nIndex) => (
          <Card border key={nIndex} padding={2}>
            <Text size={1}>{n.failureSummary}</Text>
            <Card marginTop={2} overflow="auto" padding={2} scheme="dark">
              <Code language="html" size={0}>
                {n.html}
              </Code>
            </Card>
          </Card>
        ))}
      </Stack>

      <Card marginTop={4} overflow="auto" padding={2} scheme="dark" tone="inherit">
        <Code language="json" size={0}>
          {JSON.stringify(node, null, 2)}
        </Code>
      </Card>
    </Card>
  )
}
