import {version} from '../../../package.json'
import {_hash} from '../_hash'
import type {Prefix} from './types'

/** @public */
export const PREFIX: Prefix = `s${_hash(version).slice(0, 5)}-`
