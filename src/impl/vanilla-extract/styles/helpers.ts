import {clamp} from '../lib/clamp'
import {Media, Space} from '../types'

export function getSpace(value: number): Space {
  return clamp(value, 0, 9) as Space
}

export function getMedia(value: number): Media {
  return clamp(value, 0, 9) as Media
}
