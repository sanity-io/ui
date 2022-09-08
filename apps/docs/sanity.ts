import createImageUrlBuilder from '@sanity/image-url'
import {createCurrentUserHook, createPreviewSubscriptionHook} from 'next-sanity'
import {sanity} from './config'

export const imageUrlBuilder = createImageUrlBuilder(sanity)
export const usePreviewSubscription: any = createPreviewSubscriptionHook(sanity)
export const useCurrentUser = createCurrentUserHook(sanity)
