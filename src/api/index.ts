import { Hono } from "hono"
import type { Bindings } from "../bindings"
import users from "./users"

const api = new Hono<{ Bindings: Bindings }>().route('/users', users)

export default api
