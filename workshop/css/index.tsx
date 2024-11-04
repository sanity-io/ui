import {_raf2, StyleTags, useRootTheme} from '@sanity/ui'
import {WorkshopPlugin} from '@sanity/ui-workshop'
import {useEffect} from 'react'

export function cssPlugin(): WorkshopPlugin {
  return {
    name: 'css',
    title: 'CSS',
    provider: function CSSProvider({children}) {
      // const prefersDark = usePrefersDark()
      const {scheme} = useRootTheme()

      useEffect(() => {
        const els = document.querySelectorAll('.button, .card, .font')

        // temporarily disable all transitions when the theme changes
        for (const el of els) {
          if (el instanceof HTMLElement) {
            el.style.transition = 'none'
          }
        }

        _raf2(() => {
          document.documentElement.classList.add('card', scheme, 'surface')

          _raf2(() => {
            for (const el of els) {
              if (el instanceof HTMLElement) {
                el.style.transition = ''
              }
            }
          })
        })

        return () => {
          document.documentElement.classList.remove('card', scheme, 'surface')
        }
      }, [scheme])

      return (
        <>
          <StyleTags />
          {children}
        </>
      )
    },
  }
}
