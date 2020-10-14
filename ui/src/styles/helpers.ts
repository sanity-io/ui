import {Theme} from '../theme'

// @todo: invent better name
export function createObject(props: string[], value: any) {
  return props.reduce((acc: {[key: string]: any}, prop) => {
    acc[prop] = value
    return acc
  }, {})
}

export function rem(pixelValue: number): string {
  return `${pixelValue / 16}rem`
}

export function responsive(theme: Theme, statements: any[]) {
  return statements.map((statement, mediaIndex) => {
    if (mediaIndex === 0) return statement

    const mediaKey = `@media(min-width:${theme.media[mediaIndex - 1]}px)`

    return {
      [mediaKey]: statement,
    }
  })
}
