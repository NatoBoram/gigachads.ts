import type { Express } from "express"
import express from "express"
import { deleteTodo } from "./handlers/delete_todo.ts"
import { getTodo } from "./handlers/get_todo.ts"
import { getTodos } from "./handlers/get_todos.ts"
import { patchTodo } from "./handlers/patch_todo.ts"
import { postTodo } from "./handlers/post_todo.ts"
import { putTodo } from "./handlers/put_todo.ts"
import { useToken } from "./middlewares/use_token.ts"

export const app: Express = express()

app.use(useToken)

app.delete("/todos/:id", deleteTodo)
app.get("/todos", getTodos)
app.get("/todos/:id", getTodo)
app.patch("/todos/:id", patchTodo)
app.post("/todos", postTodo)
app.put("/todos/:id", putTodo)
