import {Button, Card, Container, Flex, Inline, useTheme} from '@sanity/ui'
import React from 'react'
import {ArcadeFrame} from './frame'
import {ContainerWidth} from './types'

export function CanvasPane(props: {
  hookCode: string
  jsxCode: string
  onWidthChange: (v: ContainerWidth) => void
  width: ContainerWidth
}) {
  const theme = useTheme()
  const {hookCode, jsxCode, onWidthChange, width} = props

  return (
    <Flex direction="column" height="fill">
      <Card borderBottom paddingX={4} paddingY={2} style={{textAlign: 'center', minHeight: 'auto'}}>
        <Inline space={[1, 1, 2]}>
          <Button
            fontSize={1}
            mode="bleed"
            onClick={() => onWidthChange('auto')}
            padding={2}
            selected={width === 'auto'}
            style={{verticalAlign: 'top'}}
            text="Full"
          />
          <Button
            fontSize={1}
            mode="bleed"
            onClick={() => onWidthChange(2)}
            padding={2}
            selected={width === 2}
            style={{verticalAlign: 'top'}}
            text={`${theme.sanity.container[2]}px`}
          />
          <Button
            fontSize={1}
            mode="bleed"
            onClick={() => onWidthChange(1)}
            padding={2}
            selected={width === 1}
            style={{verticalAlign: 'top'}}
            text={`${theme.sanity.container[1]}px`}
          />
          <Button
            fontSize={1}
            mode="bleed"
            onClick={() => onWidthChange(0)}
            padding={2}
            selected={width === 0}
            style={{verticalAlign: 'top'}}
            text={`${theme.sanity.container[0]}px`}
          />
        </Inline>
      </Card>

      <Card flex={1} padding={[2, 2, 3]} tone="transparent">
        <Container height="fill" style={{position: 'relative'}} width={width}>
          <Card height="fill" shadow={1}>
            <ArcadeFrame hookCode={hookCode} jsxCode={jsxCode} />
          </Card>
        </Container>
      </Card>
    </Flex>
  )
}
