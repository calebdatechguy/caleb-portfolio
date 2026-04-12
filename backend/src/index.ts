import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/*', cors())

app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Add your API routes here
// Example:
// app.get('/api/users', async (c) => {
//   const result = await db.select().from(users)
//   return c.json(result)
// })

const port = Number(process.env.PORT) || 4001

export default {
  port,
  fetch: app.fetch,
}
