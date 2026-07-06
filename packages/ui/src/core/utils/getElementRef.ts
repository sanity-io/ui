// Based on https://github.com/radix-ui/primitives/blob/0bade6a704e5821b90a6da0f3d8cfa8a7711127d/packages/react/slot/src/Slot.tsx#L128-L150
// Before React 19 accessing `element.props.ref` will throw a warning and suggest using `element.ref`
// After React 19 accessing `element.ref` does the opposite.
// https://github.com/facebook/react/pull/28348
//
// Access the ref using the method that doesn't yield a warning.
export function getElementRef(element: React.ReactElement) {
  // React <=18 in DEV
  let getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get
  let mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning

  if (mayWarn) {
    return (element as any).ref
  }

  // React 19 in DEV
  getter = Object.getOwnPropertyDescriptor(element, 'ref')?.get
  mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning

  if (mayWarn) {
    return (element.props as {ref?: React.Ref<unknown>}).ref
  }

  // Not DEV
  return (element.props as {ref?: React.Ref<unknown>}).ref || (element as any).ref
}
