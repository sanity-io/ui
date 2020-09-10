import {isElement, isFragment} from 'react-is'

export function getResponsiveProp(
  val: number | number[] | undefined,
  defaultVal: number[]
): number[] {
  if (val === undefined) return defaultVal

  return Array.isArray(val) ? val : [val]
}

export function rem(pixelValue: number): string {
  return `${pixelValue / 16}rem`
}

export function childrenToElementArray(
  children: React.ReactNode
): Array<React.ReactElement | string> {
  const childrenArray = Array.isArray(children) ? children : [children]

  return childrenArray.filter(
    (node) => isElement(node) || isFragment(node) || typeof node === 'string'
  ) as Array<React.ReactElement | string>
}
