import {qs} from '../lib/qs'
import {WorkshopLocation} from '../types'

/** @public */
export interface WorkshopLocationStore {
  get: () => Omit<WorkshopLocation, 'type'>
  push: (nextLocation: Omit<WorkshopLocation, 'type'>) => void
  replace: (nextLocation: Omit<WorkshopLocation, 'type'>) => void
  subscribe: (subscriber: (nextLocation: WorkshopLocation) => void) => () => void
}

function _buildLocationUrl(loc: Omit<WorkshopLocation, 'type'>): string {
  const search = qs.stringify(loc.query || {})

  return `${loc.path}${search ? `?${search}` : ''}`
}

function _getStateFromWindow(): Omit<WorkshopLocation, 'type'> {
  return {
    path: location.pathname,
    query: qs.parse(location.search.substr(1)),
  }
}

/** @internal */
export function createLocationStore(): WorkshopLocationStore {
  const _subscribers = new Set<(nextLocation: WorkshopLocation) => void>()

  function _handlePopState() {
    _notifySubscribers({type: 'pop', ..._getStateFromWindow()})
  }

  function _notifySubscribers(loc: WorkshopLocation) {
    for (const subscriber of _subscribers) {
      subscriber(loc)
    }
  }

  function _mount() {
    window.addEventListener('popstate', _handlePopState)
  }

  function _unmount() {
    window.removeEventListener('popstate', _handlePopState)
  }

  return {
    get() {
      return _getStateFromWindow()
    },
    push(nextLocation) {
      window.history.pushState(null, document.title, _buildLocationUrl(nextLocation))
      _notifySubscribers({type: 'push', ...nextLocation})
    },
    replace(nextLocation) {
      window.history.replaceState(null, document.title, _buildLocationUrl(nextLocation))
      _notifySubscribers({type: 'replace', ...nextLocation})
    },
    subscribe(subscribe: (nextLocation: WorkshopLocation) => void) {
      _subscribers.add(subscribe)

      if (_subscribers.size === 1) _mount()

      return () => {
        _subscribers.delete(subscribe)

        if (_subscribers.size === 0) _unmount()
      }
    },
  }
}
