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

export function getChildrenArray(prop: React.ReactNode | React.ReactNode[]) {
  const children = Array.isArray(prop) ? prop : [prop]

  return children.reduce((acc: React.ReactNode[], x) => {
    if (Array.isArray(x)) return acc.concat(x)
    return acc.concat([x])
  }, [])
}
