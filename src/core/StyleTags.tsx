import {compilePalette, compileSystem, compileTheme} from '@sanity/ui/css'
import {defaultPalette, defaultTheme, PaletteConfig, RootTheme, Theme_v3} from '@sanity/ui/theme'
import {ReactNode, useEffect} from 'react'

export function StyleTags(props: {palette?: PaletteConfig; theme?: Theme_v3}): ReactNode {
  const {palette = defaultPalette, theme = defaultTheme} = props

  // palette.css
  useEffect(() => {
    let palette_style = document.getElementById('palette.css')

    if (!palette_style) {
      palette_style = document.createElement('style')
      palette_style.id = 'palette.css'
      document.head.appendChild(palette_style)
    }

    palette_style.textContent = compilePalette(palette)

    return () => {
      palette_style.remove()
    }
  }, [palette])

  // theme.css
  useEffect(() => {
    let theme_style = document.getElementById('theme.css')

    if (!theme_style) {
      theme_style = document.createElement('style')
      theme_style.id = 'theme.css'
      document.head.appendChild(theme_style)
    }

    theme_style.textContent = compileTheme({v3: theme} as RootTheme)

    return () => {
      theme_style.remove()
    }
  }, [theme])

  // system.css
  useEffect(() => {
    let system_style = document.getElementById('system.css')

    if (!system_style) {
      system_style = document.createElement('style')
      system_style.id = 'system.css'
      document.head.appendChild(system_style)
    }

    system_style.textContent = compileSystem()

    return () => {
      system_style.remove()
    }
  }, [])

  return null
}
