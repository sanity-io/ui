import type {Options} from 'jscodeshift'

export interface BaseOptions extends Options {
  fromPackage?: string
  toPackage?: string
}
