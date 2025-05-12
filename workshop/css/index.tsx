import {_raf2, StyleTags, useRootTheme} from '@sanity/ui'
import {card, scopeClassName as _} from '@sanity/ui/css'
import {RootTheme} from '@sanity/ui/theme'
import {WorkshopPlugin} from '@sanity/ui-workshop'
import {useEffect} from 'react'

export function cssPlugin(options?: {theme: RootTheme}): WorkshopPlugin {
  return {
    name: 'css',
    title: 'CSS',
    provider: function CSSProvider({children}) {
      const {scheme, tone} = useRootTheme()

      useEffect(() => {
        const els = document.querySelectorAll(`.${_('button')} .${_('card')} .${_('font')}`)

        // temporarily disable all transitions when the theme changes
        for (const el of els) {
          if (el instanceof HTMLElement) {
            el.style.transition = 'none'
          }
        }

        _raf2(() => {
          document.documentElement.className = card({scheme, tone}) ?? ''

          _raf2(() => {
            for (const el of els) {
              if (el instanceof HTMLElement) {
                el.style.transition = ''
              }
            }
          })
        })

        return () => {
          document.documentElement.className = ''
        }
      }, [scheme, tone])

      return (
        <>
          <StyleTags theme={options?.theme.v3} />
          {children}
        </>
      )
    },
  }
}
