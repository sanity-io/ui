import * as icons from '@sanity/icons'
import * as ui from '@sanity/ui'
import React, {memo} from 'react'
import {evalHook} from './eval'

interface ScopeRendererProps {
  code: string
  onChange: (arg: [Record<string, unknown> | null, Error | null]) => void
}

export const ScopeRenderer = memo((props: ScopeRendererProps) => {
  const {code, onChange} = props

  try {
    const result = evalHook(code, {...icons, ...ui, React})

    if (result && result.type === 'success') {
      const ret = result.fn() || null

      onChange([ret, null])
    }
  } catch (err) {
    onChange([null, err])
  }

  return <></>
})

ScopeRenderer.displayName = 'ScopeRenderer'
