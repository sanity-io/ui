import * as stylex from '@stylexjs/stylex'
import {Button, darkTheme, VERSION} from 'stylex-button-v1'

// A React Server Component (no 'use client'): the compiled Button and
// `stylex.props()` are plain functions with no context or effects, so they
// render on the server. Dynamic styles become inline custom properties in HTML.
export default function Page() {
  return (
    <main style={{padding: 24, fontFamily: 'system-ui'}}>
      <h1>RSC + precompiled StyleX library {VERSION}</h1>
      <p>
        <Button data-testid="rsc-primary" tone="primary" text="server rendered" />{' '}
        <Button data-testid="rsc-ghost" mode="ghost" tone="critical" text="ghost" />{' '}
        <Button data-testid="rsc-dynamic" width={160} text="width 160" />
      </p>
      <div {...stylex.props(darkTheme)} style={{padding: 16, background: '#13141b'}}>
        <Button data-testid="rsc-dark" text="dark theme" tone="positive" />
      </div>
    </main>
  )
}
