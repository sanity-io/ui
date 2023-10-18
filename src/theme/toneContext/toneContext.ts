import {createContext} from 'react'
import {globalScope} from '../../lib/globalScope'
import {ToneContextValue} from './types'

const key = Symbol.for('@sanity/ui/context/toneContext')

globalScope[key] = globalScope[key] || createContext<ToneContextValue | null>(null)

/**
 * @internal
 */
export const ToneContext: React.Context<ToneContextValue | null> = globalScope[key]
