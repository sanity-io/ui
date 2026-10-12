/** @vitest-environment jsdom */

import {act, fireEvent, screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Button} from '../../primitives/button/button'
import {BoundaryElementProvider} from '../../utils/boundaryElement/boundaryElementProvider'
import {PortalProvider} from '../../utils/portal/portalProvider'
import {Dialog} from './dialog'

function appendElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  parent: HTMLElement,
  label: string,
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName)

  element.setAttribute('data-testid', label)
  element.textContent = label
  parent.appendChild(element)

  return element
}

/**
 * Lets the `setTimeout(0)` the dialog schedules on a click inside it run to completion.
 */
async function flushTimeouts() {
  await act(async () => {
    await new Promise<void>((resolve) => setTimeout(resolve, 0))
  })
}

/**
 * The dialog treats the boundary element and the portal element it renders into as "in scope":
 * clicks and key presses whose target (or focused element) is outside both are ignored, and focus
 * that lands outside both after a click inside the dialog is moved back into the dialog.
 *
 * `Portal` falls back to the `default` named element when the entry for a named portal is
 * missing. The dialog resolves the element through the same `resolvePortalElement` function, so
 * the element it scopes to is the one its content ends up in. Resolving the name on its own would
 * give `null` for a missing entry, which disables the scoping altogether: every element in the
 * document counts as in scope.
 */
describe('Dialog', () => {
  describe('with a named portal whose entry is missing', () => {
    // The provider's `element`. Named portals skip it: a missing entry falls back to `default`.
    let providerElement: HTMLDivElement
    // The `default` named element the dialog renders into.
    let defaultPortalElement: HTMLDivElement
    // Inside the default portal element, outside the dialog.
    let portalButton: HTMLButtonElement
    let boundaryElement: HTMLDivElement
    // Inside the boundary element, outside every portal element.
    let boundaryButton: HTMLButtonElement
    // Outside the boundary element and every portal element.
    let outsideButton: HTMLButtonElement
    let portalElements: Record<string, HTMLElement>

    beforeEach(() => {
      providerElement = appendElement('div', document.body, 'provider-element')
      defaultPortalElement = appendElement('div', document.body, 'default-portal-element')
      portalButton = appendElement('button', defaultPortalElement, 'portal-button')
      boundaryElement = appendElement('div', document.body, 'boundary-element')
      boundaryButton = appendElement('button', boundaryElement, 'boundary-button')
      outsideButton = appendElement('button', document.body, 'outside-button')
      portalElements = {default: defaultPortalElement}
    })

    afterEach(() => {
      providerElement.remove()
      defaultPortalElement.remove()
      boundaryElement.remove()
      outsideButton.remove()
    })

    function renderDialog(props: {onClickOutside?: () => void; onClose?: () => void} = {}) {
      return render(
        <BoundaryElementProvider element={boundaryElement}>
          <PortalProvider element={providerElement} __unstable_elements={portalElements}>
            <Dialog header="Dialog" id="dialog" portal="missing" {...props}>
              <Button text="Inside the dialog" />
            </Dialog>
          </PortalProvider>
        </BoundaryElementProvider>,
      )
    }

    it('renders into the default portal element', () => {
      renderDialog()

      const dialog = screen.getByRole('dialog')

      expect(defaultPortalElement).toContainElement(dialog)
      expect(providerElement).not.toContainElement(dialog)
    })

    it('scopes click-outside handling to the boundary and default portal elements', () => {
      const onClickOutside = vi.fn()

      renderDialog({onClickOutside})

      // Outside the boundary element and every portal element: not in scope
      fireEvent.mouseDown(outsideButton)
      expect(onClickOutside).not.toHaveBeenCalled()

      // The provider's element is not where a named portal renders: not in scope either
      fireEvent.mouseDown(providerElement)
      expect(onClickOutside).not.toHaveBeenCalled()

      // Inside the dialog itself: not a click outside
      fireEvent.mouseDown(screen.getByRole('button', {name: 'Inside the dialog'}))
      expect(onClickOutside).not.toHaveBeenCalled()

      // Inside the default portal element, outside the dialog: a click outside
      fireEvent.mouseDown(portalButton)
      expect(onClickOutside).toHaveBeenCalledTimes(1)

      // Inside the boundary element: a click outside
      fireEvent.mouseDown(boundaryButton)
      expect(onClickOutside).toHaveBeenCalledTimes(2)
    })

    it('scopes the Escape key to the boundary and default portal elements', () => {
      const onClose = vi.fn()

      renderDialog({onClose})

      // Focus outside the boundary element and every portal element: ignored
      act(() => outsideButton.focus())
      expect(outsideButton).toHaveFocus()
      fireEvent.keyDown(outsideButton, {key: 'Escape'})
      expect(onClose).not.toHaveBeenCalled()

      // Focus inside the default portal element, outside the dialog: closes
      act(() => portalButton.focus())
      expect(portalButton).toHaveFocus()
      fireEvent.keyDown(portalButton, {key: 'Escape'})
      expect(onClose).toHaveBeenCalledTimes(1)

      // Focus inside the boundary element: closes
      act(() => boundaryButton.focus())
      expect(boundaryButton).toHaveFocus()
      fireEvent.keyDown(boundaryButton, {key: 'Escape'})
      expect(onClose).toHaveBeenCalledTimes(2)
    })

    it('moves focus back into the dialog after a click inside it leaves focus out of scope', async () => {
      renderDialog()

      const dialog = screen.getByRole('dialog')
      const insideButton = screen.getByRole('button', {name: 'Inside the dialog'})

      // The dialog focuses its first focusable descendant on mount
      expect(insideButton).toHaveFocus()

      // Focus that ends up outside the boundary element and every portal element is moved back
      act(() => outsideButton.focus())
      fireEvent.click(dialog)
      await flushTimeouts()
      expect(insideButton).toHaveFocus()

      // Focus that ends up inside the default portal element is left alone
      act(() => portalButton.focus())
      fireEvent.click(dialog)
      await flushTimeouts()
      expect(portalButton).toHaveFocus()
    })
  })
})
