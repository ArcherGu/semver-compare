import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  format: 'cjs',
  target: 'node20',
  fixedExtension: false,
  deps: {
    alwaysBundle: ['@actions/core', 'semver'],
  },
})
