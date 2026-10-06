import {Button, PortalProvider, Text, ThemeProvider} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import {Tooltip} from '@sanity/ui/tooltip'
import {useMemo, useState} from 'react'
import {describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'
import {page, userEvent} from 'vitest/browser'

const theme = buildTheme()

const POLL = {timeout: 5000}

// `DEFAULT_TOOLTIP_PADDING` in `core/primitives/tooltip/constants.ts`
const TOOLTIP_PADDING = 4

const LONG_CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mollis consectetur malesuada. Sed lobortis est dolor, eget imperdiet velit placerat et. Aenean posuere mi non aliquet iaculis.'

function tooltipLayer(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-ui="Tooltip"]')
}

function NarrowBoundary() {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)

  return (
    <ThemeProvider theme={theme}>
      <div
        data-testid="boundary"
        ref={setBoundaryElement}
        style={{height: 300, overflow: 'hidden', position: 'relative', width: 240}}
      >
        <Tooltip
          boundaryElement={boundaryElement}
          content={<Text size={1}>{LONG_CONTENT}</Text>}
          portal
        >
          <Button mode="bleed" style={{left: 10, position: 'absolute', top: 10}} text="Hover me" />
        </Tooltip>
      </div>
    </ThemeProvider>
  )
}

function NarrowPortal() {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)
  const elements = useMemo(() => ({narrow: portalElement}), [portalElement])

  return (
    <ThemeProvider theme={theme}>
      <PortalProvider __unstable_elements={elements}>
        <div
          data-testid="boundary"
          ref={setBoundaryElement}
          style={{height: 300, left: 0, position: 'absolute', top: 0, width: 300}}
        >
          <Tooltip
            boundaryElement={boundaryElement}
            content={<Text size={1}>{LONG_CONTENT}</Text>}
            portal="narrow"
          >
            <Button
              mode="bleed"
              style={{left: 10, position: 'absolute', top: 10}}
              text="Hover me"
            />
          </Tooltip>
        </div>
        {/* To the right of the boundary, without overlapping it */}
        <div
          data-testid="portal"
          ref={setPortalElement}
          style={{height: 100, left: 450, position: 'absolute', top: 0, width: 160}}
        />
      </PortalProvider>
    </ThemeProvider>
  )
}

function EmptyPortalMountPoint() {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)

  return (
    <ThemeProvider theme={theme}>
      <PortalProvider element={portalElement}>
        <div
          data-testid="boundary"
          ref={setBoundaryElement}
          style={{height: 300, overflow: 'hidden', position: 'relative', width: 240}}
        >
          <Tooltip
            boundaryElement={boundaryElement}
            content={<Text size={1}>{LONG_CONTENT}</Text>}
            portal
          >
            <Button
              mode="bleed"
              style={{left: 10, position: 'absolute', top: 10}}
              text="Hover me"
            />
          </Tooltip>
        </div>
        {/* An empty, unpositioned mount point like the Studio's, here without even a width */}
        <div ref={setPortalElement} style={{height: 0, width: 0}} />
      </PortalProvider>
    </ThemeProvider>
  )
}

// The tooltip's `max-width` comes from Floating UI's `size` middleware (boundary and viewport),
// capped to the portal element's width. jsdom has no layout, so the applied values are checked
// against real layout here; `tooltip.maxWidth.test.tsx` in the package covers when the
// measurement runs.
describe('tooltip max width', () => {
  test('caps the tooltip to a narrow boundary element', async () => {
    await page.viewport(800, 600)
    const screen = await render(<NarrowBoundary />)
    const boundary = screen.getByTestId('boundary').element()

    await userEvent.hover(screen.getByRole('button', {name: 'Hover me'}))

    const expectedMaxWidth = boundary.clientWidth - 2 * TOOLTIP_PADDING

    await expect.poll(() => tooltipLayer()?.style.maxWidth, POLL).toBe(`${expectedMaxWidth}px`)

    const layerRect = tooltipLayer()!.getBoundingClientRect()
    const boundaryRect = boundary.getBoundingClientRect()

    expect(layerRect.width).toBeLessThanOrEqual(expectedMaxWidth + 0.5)
    // Wide enough to have been constrained, not collapsed
    expect(layerRect.width).toBeGreaterThan(expectedMaxWidth / 2)
    expect(layerRect.left).toBeGreaterThanOrEqual(boundaryRect.left + TOOLTIP_PADDING - 0.5)
    expect(layerRect.right).toBeLessThanOrEqual(boundaryRect.right - TOOLTIP_PADDING + 0.5)
  })

  test('caps the tooltip to a narrow portal element, even one that does not overlap the boundary', async () => {
    await page.viewport(800, 600)
    const screen = await render(<NarrowPortal />)
    const portal = screen.getByTestId('portal').element()

    await userEvent.hover(screen.getByRole('button', {name: 'Hover me'}))

    const expectedMaxWidth = portal.clientWidth - 2 * TOOLTIP_PADDING

    await expect.poll(() => tooltipLayer()?.style.maxWidth, POLL).toBe(`${expectedMaxWidth}px`)

    const layer = tooltipLayer()!

    expect(portal.contains(layer)).toBe(true)
    expect(layer.getBoundingClientRect().width).toBeLessThanOrEqual(expectedMaxWidth + 0.5)
  })

  test('ignores an empty portal mount point without a width', async () => {
    await page.viewport(800, 600)
    const screen = await render(<EmptyPortalMountPoint />)
    const boundary = screen.getByTestId('boundary').element()

    await userEvent.hover(screen.getByRole('button', {name: 'Hover me'}))

    await expect
      .poll(() => tooltipLayer()?.style.maxWidth, POLL)
      .toBe(`${boundary.clientWidth - 2 * TOOLTIP_PADDING}px`)
  })
})
