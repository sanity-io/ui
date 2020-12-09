import * as icons from '@sanity/icons'
import * as ui from '@sanity/ui'
import {Box, Card, Code} from '@sanity/ui'
import React from 'react'
import {renderCode, renderHooks} from '$lib/eval'

const useIsomorphicEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export function CodeExample(props: {code: string; hookCode?: string; language: string}) {
  const {code, hookCode, language} = props
  const hook = renderHooks(hookCode || '', {React, ...icons, ...ui})
  const [isSSR, setSSR] = React.useState(true)

  useIsomorphicEffect(() => {
    setSSR(false)
  }, [])

  const hooksState = hook.fn ? hook.fn() : {}

  const result = isSSR ? null : renderCode(code, {React, ...hooksState, ...icons, ...ui})

  return (
    <Card marginY={[2, 2, 3, 4]} overflow="auto" radius={2} shadow={1}>
      <Card overflow="auto" tone="transparent">
        {result?.type === 'success' && <Box padding={[3, 3, 4]}>{result.node}</Box>}
        {result?.type === 'error' && (
          <Card padding={[3, 3, 4]} tone="critical">
            <Code muted size={[2, 2, 3, 4]}>
              {result.error.name}: {result.error.message}
            </Code>
          </Card>
        )}
      </Card>
      <Card overflow="auto" padding={[3, 3, 4]}>
        <Code language={language} muted size={[2, 2, 3]}>
          {code}
        </Code>
      </Card>
    </Card>
  )
}
