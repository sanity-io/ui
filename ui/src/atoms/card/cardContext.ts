import {createContext} from 'react'
import {ThemeColorSchemeKey} from '../../theme'
import {CardTone} from './types'

export interface CardContextValue {
  tone?: CardTone
  scheme: ThemeColorSchemeKey
}

export const CardContext = createContext<CardContextValue>({scheme: 'light'})
