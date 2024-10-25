import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'
import api from "./api"
import type { Bindings } from "./bindings"

const app = new Hono<{ Bindings: Bindings }>()
  .route('/api', api)
  .get('*', (c) => {
    return c.html(
      renderToString(
        <html lang='ja'>
          <head>
            <meta charSet='utf-8' />
            <meta
              content='width=device-width, initial-scale=1'
              name='viewport'
            />
            <title>Hono + React</title>
            {import.meta.env.PROD ? (
              <script type='module' src='/static/client.js' />
            ) : (
              <script type='module' src='/src/client.tsx' />
            )}
          </head>
          <body>
            <div id='root' />
          </body>
        </html>,
      ),
    )
  })

export type AppType = typeof app
export default app
