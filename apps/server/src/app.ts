import type { Express } from "express"
import express from "express"
import { getTodo } from "./handlers/get_todo.js"
import { getTodos } from "./handlers/get_todos.js"

export const app: Express = express()

app.get("/todos", getTodos)
app.get("/todos/:id", getTodo)
