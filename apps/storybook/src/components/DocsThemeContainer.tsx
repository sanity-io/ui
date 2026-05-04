import {DocsContainer, type DocsContainerProps} from '@storybook/addon-docs/blocks'
import {useEffect, useState} from 'react'
import {addons} from 'storybook/preview-api'
import {themes} from 'storybook/theming'
import {DARK_MODE_EVENT_NAME} from 'storybook-dark-mode'

const channel = addons.getChannel()

export function DocsThemeContainer({
  children,
  context,
}: React.PropsWithChildren<DocsContainerProps>) {
  const [theme, setTheme] = useState('')

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, (value) => {
      setTheme(value ? 'dark' : 'light')
    })
  }, [])

  return (
    <DocsContainer theme={theme === 'dark' ? themes.dark : themes.light} context={context}>
      {children}
    </DocsContainer>
  )
}
