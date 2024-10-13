import type { Express } from "express"
import express from "express"
import { getTodo } from "./handlers/get_todo.ts"
import { getTodos } from "./handlers/get_todos.ts"

export const app: Express = express()

app.get("/todos", getTodos)
app.get("/todos/:id", getTodo)
