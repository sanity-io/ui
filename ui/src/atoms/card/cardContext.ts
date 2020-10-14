import {createContext} from 'react'
import {ColorSchemeKey} from '../../theme'
import {CardTone} from './types'

export interface CardContextValue {
  tone?: CardTone
  scheme: ColorSchemeKey
}

export const CardContext = createContext<CardContextValue>({scheme: 'light'})
