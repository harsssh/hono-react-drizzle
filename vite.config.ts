import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig(({mode}) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: {
            client: 'src/client.tsx',
          },
          output: {
            entryFileNames: 'static/[name].js',
          }
        }
      }
    }
  }

  return {
    plugins: [
      build(),
      devServer({
        adapter,
        entry: 'src/index.tsx',
      }),
    ],
  }
})
