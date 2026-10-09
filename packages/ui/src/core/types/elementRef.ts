/**
 * A ref holding a DOM element, for inputs that are read when they are used (inside a Floating UI
 * positioning pass, an event handler) rather than during render.
 *
 * @internal
 */
export type ElementRef = React.RefObject<HTMLElement | null>
