/**
 * @public
 */
export type ClickOutsideListener = (event: MouseEvent) => void

/**
 * @public
 */
export type ClickOutsideElements = (HTMLElement | null | (HTMLElement | null)[])[]

/**
 * @public
 * @deprecated replaced by the new `useClickOutsideEvent` hook, instead of:
 * ```tsx
 * const [button, setButtonElement] = useState(null)
 * useClickOutside((event) => {}, [button])
 * return <button ref={setButtonElement} />
 * ```
 * do:
 * ```tsx
 * const buttonRef = useRef()
 * useClickOutsideEvent((event) => {}, () => [buttonRef.current])
 * return <button ref={buttonRef} />
 * ```
 */
export function useClickOutside(
  _listener?: never,
  _elementsArg?: never,
  _boundaryElement?: never,
): never {
  throw new Error(
    '`useClickOutside` was removed in @sanity/ui v4. Use `useClickOutsideEvent` instead.',
  )
}
