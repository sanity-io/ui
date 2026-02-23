/**
 * Accepted values for the `pointerEvents` style prop.
 *
 * @remarks
 * Maps to the CSS `pointer-events` property.
 *
 * - `"auto"` – The element responds to pointer events as normal.
 * - `"none"` – The element is never the target of pointer events; events pass through to elements beneath it.
 *
 * @public
 */
export type PointerEvents = 'auto' | 'none'

/**
 * Style props for controlling whether an element responds to pointer events.
 *
 * @public
 */
export interface PointerEventsStyleProps {
  /**
   * Controls whether the element can be the target of pointer events (clicks, taps, hovers).
   *
   * @remarks
   * Maps to the CSS `pointer-events` property.
   *
   * Accepted values:
   * - `"auto"` – The element responds to pointer events as normal.
   * - `"none"` – The element ignores pointer events; events pass through to elements beneath it.
   *
   * @type {PointerEvents}
   * @defaultValue undefined
   * @optional
   */
  pointerEvents?: PointerEvents
}
