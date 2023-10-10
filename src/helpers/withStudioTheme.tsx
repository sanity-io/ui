import {ThemeProvider, studioTheme} from '@sanity/ui'

/**
 * Helper for local development purposes, until we have a better solution
 * for rendering the stories with the studio theme applied, and updated.
 *
 * To use it in a story, import it and wrap the story component with it.
 * ```ts
 *  export default withStudioTheme(function Story() {
 *   ...
 *  })
 * ```
 */
// eslint-disable-next-line
const withStudioTheme = (Component: any) => (props: any) => {
  return (
    <ThemeProvider theme={studioTheme}>
      <Component {...props} />
    </ThemeProvider>
  )
}

export default withStudioTheme
