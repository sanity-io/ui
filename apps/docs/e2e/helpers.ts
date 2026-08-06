import type {Page} from '@playwright/test'

/**
 * `media[1]` of the Sanity UI theme. The docs sidebar is `display: none` below
 * it and the breadcrumbs bar is `display: none` above it, so which node stands
 * for the article chrome depends on the viewport.
 */
export const SIDEBAR_BREAKPOINT = 600

/**
 * A sibling article under the same `[screen]`. The docs nav collapses the
 * "Primitives" branch unless the current path is inside it, so a soft
 * navigation to {@link ARTICLE_PATH} starts from another primitive's article
 * rather than from the docs landing page.
 */
export const SIBLING_ARTICLE_PATH = '/ui/docs/primitive/button'
export const ARTICLE_PATH = '/ui/docs/primitive/popover'

export const HOME_PATH = '/ui'
export const DOCS_PATH = '/ui/docs'

/** The navbar link into the docs screen. */
export function docsLink(page: Page) {
  return page.locator(`a[href="${DOCS_PATH}"]`).first()
}

/**
 * A synchronous node of the article chrome: the docs navigation. It comes from
 * the `[screen]` layout, which reads no `params`, so it belongs to the App
 * Shell rather than to the article's streamed body.
 *
 * `:visible` resolves the sidebar/breadcrumbs pair — both are always rendered,
 * one hidden per breakpoint — and skips the previous page's subtree, which the
 * App Router keeps in the DOM (hidden) after a client navigation.
 */
export function articleChrome(page: Page) {
  const {width} = page.viewportSize()!
  return width >= SIDEBAR_BREAKPOINT
    ? page.locator('[data-testid="article-sidebar-nav"]:visible')
    : page.locator('[data-testid="article-breadcrumbs-nav"]:visible')
}

/** The article body. Keyed by `params`, so it streams in behind the shell. */
export function articleContent(page: Page) {
  return page.locator('[data-testid="article-content"]:visible')
}

/** The segment's loading UI, shown in the article slot until the body arrives. */
export function articleFallback(page: Page) {
  return page.getByTestId('article-loading')
}

/**
 * The sidebar link that navigates to {@link ARTICLE_PATH}. Matched by `href`
 * rather than by accessible name: Sanity UI's `TreeItem` renders the anchor
 * with `role="treeitem"`, so a `getByRole('link')` lookup finds nothing. The
 * nav tree is rendered twice (sidebar + breadcrumbs bar), so the lookup is
 * scoped to the copy this viewport shows.
 */
export function popoverLink(page: Page) {
  return articleChrome(page).locator(`a[href="${ARTICLE_PATH}"]`)
}

export const ARCADE_PATH = '/ui/arcade'

/** The navbar link into the arcade screen. */
export function arcadeLink(page: Page) {
  return page.locator(`a[href="${ARCADE_PATH}"]`).first()
}

/** The arcade editor screen. Client-only, so it never appears in the shell. */
export function arcadeScreen(page: Page) {
  return page.locator('[data-testid="arcade-screen"]')
}
