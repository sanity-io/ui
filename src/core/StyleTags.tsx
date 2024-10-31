import {_compileSystem, _compileTheme} from '@sanity/ui/css'
import type {ReactNode} from 'react'

/** @beta */
export function StyleTags(): ReactNode {
  return (
    <>
      <style href="sanity-theme" precedence="theme">
        {_compileTheme()}
      </style>
      <style href="sanity-system" precedence="system">
        {_compileSystem()}
      </style>
    </>
  )
}

StyleTags.displayName = 'StyleTags'
