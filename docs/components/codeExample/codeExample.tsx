import * as ui from '@sanity/ui'
import {Box, Card, Code} from '@sanity/ui'
import React from 'react'
import {renderCode, renderHooks} from '~/lib/eval'

export function CodeExample(props: {code: string; hookCode?: string; language: string}) {
  const {code, hookCode, language} = props
  const hook = renderHooks(hookCode || '', {React, ...ui})
  const hooksState = hook.fn ? hook.fn() : {}
  const result = renderCode(code, {React, ...hooksState, ...ui})

  return (
    <Card marginY={[2, 2, 3, 4]} radius={2} shadow={1} style={{overflow: 'hidden'}}>
      <Card style={{overflow: 'auto'}} tone="transparent">
        {result.type === 'success' && <Box padding={[3, 3, 4, 5]}>{result.node}</Box>}
        {result.type === 'error' && (
          <Card padding={[3, 3, 4, 5]}>
            <Code style={{color: 'red'}} size={[2, 2, 3, 4]}>
              {result.error.message}
            </Code>
          </Card>
        )}
      </Card>
      <Card padding={[3, 3, 4, 5]} style={{overflow: 'auto'}}>
        <Code language={language} muted size={[2, 2, 3]}>
          {code}
        </Code>
      </Card>
    </Card>
  )
}
