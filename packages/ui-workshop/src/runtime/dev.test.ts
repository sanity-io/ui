import fs from 'fs/promises'
import path from 'path'
import type {UserConfig} from 'vite'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {dev} from './dev'

/**
 * @vitest-environment node
 *
 * Minimal test for dev server functionality.
 * Tests that the server starts and can restart when config changes.
 */
describe('dev', () => {
  const fixtureDir = path.resolve(__dirname, '__fixtures__/test-project')
  const runtimeConfigPath = path.join(fixtureDir, 'workshop.runtime.ts')
  const packageRoot = path.resolve(__dirname, '../..')

  let originalConfig: string
  let cleanup: (() => Promise<void>) | undefined
  let consoleLogSpy: ReturnType<typeof vi.spyOn>

  // Test-only Vite config override to resolve @sanity/ui-workshop imports
  const viteConfigOverride = (baseConfig: UserConfig): UserConfig => {
    const aliases = [
      // {find: '@sanity/ui-workshop/runtime', replacement: path.resolve(packageRoot, 'exports/runtime.ts')},
      {find: '@sanity/ui-workshop', replacement: path.resolve(packageRoot, 'exports')},
    ]

    return {
      ...baseConfig,
      resolve: {
        ...baseConfig.resolve,
        alias: [
          ...(Array.isArray(baseConfig.resolve?.alias) ? baseConfig.resolve.alias : []),
          ...aliases,
        ],
      },
      server: {
        ...baseConfig.server,
        // Use custom HMR port for tests to avoid conflicts
        hmr: {
          port: 24680,
        },
      },
      ssr: {
        ...baseConfig.ssr,
        noExternal: ['@sanity/ui-workshop'],
      },
      optimizeDeps: {
        // Disable dependency pre-bundling in tests to avoid race conditions during server restart
        noDiscovery: true,
        include: [],
      },
    }
  }

  beforeEach(async () => {
    // Spy on console.log to capture output (suppress display but capture calls)
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    // Save original config
    originalConfig = await fs.readFile(runtimeConfigPath, 'utf-8')

    // Ensure `.workshop` directory doesn't exist
    const workshopDir = path.join(fixtureDir, '.workshop')
    await fs.rm(workshopDir, {recursive: true, force: true})

    // Ensure `node_modules` directory doesn't exist
    const nodeModulesDir = path.join(fixtureDir, 'node_modules')
    await fs.rm(nodeModulesDir, {recursive: true, force: true})
  })

  afterEach(async () => {
    // Call cleanup if server was started
    if (cleanup) {
      await cleanup()
      cleanup = undefined
    }

    // Restore original config
    await fs.writeFile(runtimeConfigPath, originalConfig, 'utf-8')

    // Clean up .workshop directory
    const workshopDir = path.join(fixtureDir, '.workshop')
    await fs.rm(workshopDir, {recursive: true, force: true})

    // Clean up `node_modules` directory
    const nodeModulesDir = path.join(fixtureDir, 'node_modules')
    await fs.rm(nodeModulesDir, {recursive: true, force: true})

    // Restore console methods
    vi.restoreAllMocks()
  })

  /**
   * Helper to wait for server to be ready by polling
   */
  async function waitForServer(url: string, timeoutMs = 10000): Promise<void> {
    const startTime = Date.now()

    while (Date.now() - startTime < timeoutMs) {
      try {
        const response = await fetch(url)
        if (response.ok) {
          return
        }
      } catch {
        // Server not ready yet, continue polling
      }

      // Wait 100ms before next attempt
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    throw new Error(`Server did not become ready within ${timeoutMs}ms`)
  }

  it('should start the dev server', async () => {
    // Start dev server with test config override
    cleanup = await dev({
      cwd: fixtureDir,
      _viteConfigOverride: viteConfigOverride,
    })

    // Wait for server to be ready
    await waitForServer('http://localhost:13337')

    // Verify console output shows server started
    expect(consoleLogSpy).toHaveBeenCalledWith('[workshop] Listening on http://localhost:13337')

    // Additional verification: check that console.log was called at least once
    expect(consoleLogSpy.mock.calls.length).toBeGreaterThan(0)

    // Verify server is accessible
    const response = await fetch('http://localhost:13337')
    expect(response.ok).toBe(true)

    // Verify we get HTML content
    const html = await response.text()
    expect(html.toLowerCase()).toContain('<!doctype html>')

    // Clear console calls to check shutdown message
    consoleLogSpy.mockClear()

    // Manually call cleanup to test shutdown message
    await cleanup()
    cleanup = undefined // Prevent double cleanup in afterEach

    // Verify shutdown message was logged
    expect(consoleLogSpy).toHaveBeenCalledWith('[workshop] Shutting down gracefully...')
  }, 15000)

  it('should restart when runtime config changes', async () => {
    // Start dev server with test config override
    cleanup = await dev({cwd: fixtureDir, _viteConfigOverride: viteConfigOverride})

    // Wait for server to be ready
    await waitForServer('http://localhost:13337')

    // Verify initial server started
    expect(consoleLogSpy).toHaveBeenCalledWith('[workshop] Listening on http://localhost:13337')

    // Verify initial server is accessible
    const response1 = await fetch('http://localhost:13337')
    expect(response1.ok).toBe(true)

    // Clear previous console calls to track restart messages
    consoleLogSpy.mockClear()

    // Modify the runtime config with a comment to trigger change detection
    const modifiedConfig = originalConfig.replace(
      'port: 13337, // Use non-standard port for testing',
      'port: 13338, // Use non-standard port for testing',
    )

    await fs.writeFile(runtimeConfigPath, modifiedConfig, 'utf-8')

    // Wait for restart to complete
    // The server logs "Runtime config changed, restarting server..."
    // Give it time to restart (3 seconds should be enough)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Verify restart message was logged
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '[workshop] Runtime config changed, restarting server...',
    )

    // Verify server restarted and is listening again
    expect(consoleLogSpy).toHaveBeenCalledWith('[workshop] Listening on http://localhost:13338')

    // Verify server is still accessible after restart
    const response2 = await fetch('http://localhost:13338')
    expect(response2.ok).toBe(true)

    // Verify we still get HTML content
    const html = await response2.text()
    expect(html.toLowerCase()).toContain('<!doctype html>')
  }, 20000)
})
