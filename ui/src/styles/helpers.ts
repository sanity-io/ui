import {Theme} from '../theme'

// @todo: invent better name
export function createObject(props: string[], value: any) {
  return props.reduce((acc: {[key: string]: any}, prop) => {
    acc[prop] = value
    return acc
  }, {})
}

export function rem(pixelValue: number): string | 0 {
  if (pixelValue === 0) return 0

  return `${pixelValue / 16}rem`
}

export function responsive(media: number[], statements: any[]) {
  return statements.map((statement, mediaIndex) => {
    if (mediaIndex === 0) return statement

    const mediaKey = `@media(min-width:${media[mediaIndex - 1]}px)`

    return {
      [mediaKey]: statement,
    }
  })
}

export function getResponsiveProp<T = number>(val: T | T[] | undefined, defaultVal: T[] = []): T[] {
  if (val === undefined) return defaultVal

  return Array.isArray(val) ? val : [val]
}

export function getResponsiveSpace(theme: Theme, props: string[], spaceIndexes: number[] = []) {
  if (!Array.isArray(spaceIndexes)) {
    throw new Error('the property must be array of numbers')
  }

  if (spaceIndexes.length === 0) {
    return null
  }

  return responsive(
    theme.media,
    spaceIndexes.map((spaceIndex) => createObject(props, rem(theme.space[spaceIndex])))
  )
}
