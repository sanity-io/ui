// Based on https://github.com/radix-ui/primitives/blob/0bade6a704e5821b90a6da0f3d8cfa8a7711127d/packages/react/slot/src/Slot.tsx#L128-L150
// Before React 19 accessing `element.props.ref` will throw a warning and suggest using `element.ref`
// After React 19 accessing `element.ref` does the opposite.
// https://github.com/facebook/react/pull/28348
//
// Access the ref using the method that doesn't yield a warning.
//
// The element type of the ref is the caller's to know (`T`): an element carries no type for it.
export function getElementRef<T = unknown>(element: React.ReactElement): React.Ref<T> | undefined {
  // React <=18 in DEV
  // oxlint-disable-next-line unbound-method
  let getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get
  let mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning

  if (mayWarn) {
    // oxlint-disable-next-line no-unsafe-type-assertion
    return (element as {ref?: React.Ref<T>}).ref
  }

  // React 19 in DEV
  // oxlint-disable-next-line unbound-method
  getter = Object.getOwnPropertyDescriptor(element, 'ref')?.get
  mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning

  if (mayWarn) {
    // oxlint-disable-next-line no-unsafe-type-assertion
    return (element.props as {ref?: React.Ref<T>}).ref
  }

  // Not DEV
  // oxlint-disable-next-line no-unsafe-type-assertion
  return (element.props as {ref?: React.Ref<T>}).ref || (element as {ref?: React.Ref<T>}).ref
}
