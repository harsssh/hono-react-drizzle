import { zValidator } from "@hono/zod-validator"
import { drizzle } from "drizzle-orm/d1"
import { Hono } from "hono"
import { z } from 'zod'
import type { Bindings } from "../bindings"
import * as schema from "../db/schema"

const users = new Hono<{ Bindings: Bindings }>()
  .get('/', async (c) => {
    const db = drizzle(c.env.DB, { schema })
    const users = await db.query.users.findMany()
    return c.json(users)
  })
  .post('/', zValidator('json', z.object({
    name: z.string(),
    age: z.number(),
    email: z.string().email()
  })), async (c) => {
    const newUserData = c.req.valid('json')

    const db = drizzle(c.env.DB, { schema })
    try {
      await db.insert(schema.users).values(newUserData)
    } catch (e) {
      console.log(e)
    }

    return c.body(null, 201)
  })

export default users
