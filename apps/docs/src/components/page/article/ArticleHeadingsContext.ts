'use client'

import {createContext} from 'react'

import {HeadingType} from './getHeadings'

export const ArticleHeadingsContext = createContext<HeadingType[]>([])
