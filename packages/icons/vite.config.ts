import babel from '@rolldown/plugin-babel'
import react, {reactCompilerPreset} from '@vitejs/plugin-react'
import {defineConfig} from 'vitest/config'

export default defineConfig({
  plugins: [react(), babel({presets: [reactCompilerPreset({target: '19'})]})],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
  },
})
