import {StyleTags} from '@sanity/ui'
import {WorkshopPlugin} from '@sanity/ui-workshop'

export function cssPlugin(): WorkshopPlugin {
  return {
    name: 'css',
    title: 'CSS',
    provider: function CSSProvider({children}) {
      return (
        <>
          <StyleTags />
          {children}
        </>
      )
    },
  }
}
