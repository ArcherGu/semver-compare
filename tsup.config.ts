import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'semver-compare-action',
  entry: ['src/index.ts'],
  clean: true,
  splitting: false,
  noExternal: ['@actions/core'],
})
