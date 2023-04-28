import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import tsConfigPaths from 'vite-tsconfig-paths'
import { EsLinter, linterPlugin } from 'vite-plugin-linter'

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  resolve: {
    alias: {
      '@fontsource': resolve('./node_modules/@fontsource'),
    },
  },
  plugins: [
    react(),
    tsConfigPaths(),
    linterPlugin({
      include: ['./src/**/*.{ts,tsx}'],
      linters: [new EsLinter({ configEnv })],
    }),
    svgrPlugin(),
  ],
}))
