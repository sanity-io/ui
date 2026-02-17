import {_fromEntries} from '../_fromEntries'
import {_rem} from '../_rem'
import type {SanityDimensionToken} from '../_sanity/schema'
import type {TokenCollection} from '../types'
import type {ContainerScale} from './types'

export const CONTAINER_NAMESPACE = 'container'

export interface ContainerCollectionTokens {
  [CONTAINER_NAMESPACE]: Record<ContainerScale, SanityDimensionToken>
}

export type ContainerCollection = TokenCollection<
  typeof CONTAINER_NAMESPACE,
  'default',
  ContainerCollectionTokens
>

export const containerCollection: ContainerCollection = {
  namespace: CONTAINER_NAMESPACE,
  title: 'Container',
  modes: {
    default: {
      [CONTAINER_NAMESPACE]: {
        0: _rem(320, {scopes: ['width']}),
        1: _rem(640, {scopes: ['width']}),
        2: _rem(960, {scopes: ['width']}),
        3: _rem(1280, {scopes: ['width']}),
        4: _rem(1600, {scopes: ['width']}),
        5: _rem(1920, {scopes: ['width']}),
      },
    },
  },
}
